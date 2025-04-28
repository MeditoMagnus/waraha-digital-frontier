
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

// CORS headers for browser access
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Get the API key from the environment variable
const OPENAI_API_KEY = Deno.env.get('OPEN_AI_KEY');

if (!OPENAI_API_KEY) {
  console.error('OPEN_AI_KEY environment variable is not set');
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Starting ai-query function execution");
    
    // Get request data
    let body;
    try {
      body = await req.json();
    } catch (e) {
      console.error("Error parsing request body:", e);
      return new Response(
        JSON.stringify({ success: false, error: "Invalid request body" }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    const { query } = body;
    
    if (!query || typeof query !== 'string') {
      console.error("Invalid query provided:", query);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Invalid query - must provide a query string' 
        }), 
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get the JWT token from the request to identify the user
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      console.error("No authorization header provided");
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'No authorization header provided' 
        }), 
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Create a Supabase client with the server role key
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    
    if (!supabaseUrl || !supabaseServiceKey) {
      console.error("Missing Supabase environment variables");
      throw new Error('Missing Supabase environment variables');
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // Get user from token
    const { data: { user }, error: userError } = await supabase.auth.getUser(
      authHeader.replace('Bearer ', '')
    );

    if (userError || !user) {
      console.error('User authentication error:', userError);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: userError?.message || 'User not authenticated' 
        }), 
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Processing query for user ${user.id}`);
    
    // Step 1: Directly check and update user's wallet balance using our database function
    console.log("Checking wallet and preparing transaction");
    
    // First check if user has enough coins
    const { data: balanceCheckData, error: balanceCheckError } = await supabase
      .from('user_wallets')
      .select('coin_balance')
      .eq('user_id', user.id)
      .maybeSingle();
      
    if (balanceCheckError) {
      console.error("Error checking wallet balance:", balanceCheckError);
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Error checking wallet balance'
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    const currentBalance = balanceCheckData?.coin_balance || 0;
    console.log(`Current balance for user ${user.id}: ${currentBalance}`);
    
    if (currentBalance < 25) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Insufficient coins. You need 25 coins for an AI consultation.'
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Step 2: Call OpenAI API to get a response
    console.log('Calling OpenAI API...');
    // Determine if the query is IT-related using basic keyword detection
    const itRelatedKeywords = [
      "software", "hardware", "network", "server", "cloud", "database", 
      "security", "programming", "code", "development", "IT", "technology", 
      "integration", "api", "system", "architecture", "infrastructure",
      "deployment", "configuration", "service", "application", "solution",
      "platform", "tech", "compute", "storage", "web", "mobile", "device",
      "pricing", "cost", "subscription", "license", "enterprise", "ITSM"
    ];
    
    const isITRelated = itRelatedKeywords.some(keyword => 
      query.toLowerCase().includes(keyword.toLowerCase())
    );

    const systemMessage = isITRelated 
      ? 'You are a highly skilled IT solutions consultant. Help users with queries related to software, IT services, architecture, pricing, configurations, or integrations.'
      : 'You are a highly skilled IT solutions consultant. If the question is not related to IT, technology, or business solutions, politely decline to answer and explain that you are specifically an IT consultant who can only help with technology-related queries.';

    let aiResponse;
    try {
      const openAIResponse = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o',
          messages: [
            {
              role: 'system',
              content: systemMessage
            },
            {
              role: 'user',
              content: query
            }
          ],
          temperature: 0.7,
          max_tokens: 1000
        }),
      });

      if (!openAIResponse.ok) {
        const openAIError = await openAIResponse.json();
        console.error('OpenAI API error:', openAIError);
        throw new Error(openAIError.error?.message || 'Failed to get AI response');
      }

      const aiData = await openAIResponse.json();
      aiResponse = aiData.choices[0].message.content;
    } catch (error) {
      console.error('Error calling OpenAI:', error);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Failed to generate AI response. Please try again.' 
        }), 
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    console.log('AI response received, deducting coins...');

    // Step 3: Deduct coins using direct database update
    try {
      // Deduct coins from wallet
      const { error: updateError } = await supabase
        .from('user_wallets')
        .update({ 
          coin_balance: currentBalance - 25,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id);
      
      if (updateError) {
        console.error('Error updating wallet:', updateError);
        return new Response(
          JSON.stringify({
            success: false,
            error: 'Failed to deduct coins from wallet'
          }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      // Record transaction
      const { error: transactionError } = await supabase
        .from('coin_transactions')
        .insert({
          user_id: user.id,
          amount: -25,
          transaction_type: 'usage',
          description: 'AI consultation cost'
        });
      
      if (transactionError) {
        console.error('Error recording transaction:', transactionError);
        // We'll continue even if transaction recording fails
      }
      
      const newBalance = currentBalance - 25;
      
      console.log('Transaction completed successfully, new balance:', newBalance);
      
      // Step 4: Return success with AI response and updated balance
      return new Response(
        JSON.stringify({ 
          success: true, 
          response: aiResponse,
          transaction: {
            success: true,
            message: 'Coins deducted successfully',
            newBalance: newBalance
          }
        }), 
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    } catch (error) {
      console.error('Error in coin deduction:', error);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Failed to process coin transaction' 
        }), 
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
  } catch (error) {
    console.error('Unhandled error in ai-query function:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || 'An unexpected error occurred' 
      }), 
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
