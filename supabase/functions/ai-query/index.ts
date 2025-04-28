
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
    // Get request data
    const { query } = await req.json();
    
    if (!query || typeof query !== 'string') {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Invalid query - must provide a query string' 
        }), 
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get the JWT token from the request to identify the user
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'No authorization header provided' 
        }), 
        { 
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Create a Supabase client with the server role key
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    
    if (!supabaseUrl || !supabaseServiceKey) {
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
        { 
          status: 401, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log(`Processing query for user ${user.id}`);
    
    // Step 1: Check if user has enough coins (25) for a query using our database function
    const { data: walletCheck, error: walletError } = await supabase.rpc(
      'process_coin_transaction',
      {
        p_amount: 0, // Just checking balance, not deducting yet
        p_description: 'Balance check for AI consultation',
        p_transaction_type: 'check'
      }
    );

    if (walletError) {
      console.error('Wallet check error:', walletError);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: walletError.message || 'Error checking wallet balance'
        }), 
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Check wallet balance
    if (!walletCheck.success) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: walletCheck.message || 'Failed to check wallet balance'
        }), 
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }
    
    const currentBalance = walletCheck.new_balance;
    console.log(`Current balance for user ${user.id}: ${currentBalance}`);
    
    if (currentBalance < 25) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Insufficient coins. You need 25 coins for an AI consultation.' 
        }), 
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
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
    const aiResponse = aiData.choices[0].message.content;
    
    console.log('AI response received, deducting coins...');

    // Step 3: Deduct coins for the successful AI response
    const { data: transaction, error: transactionError } = await supabase.rpc(
      'process_coin_transaction',
      {
        p_amount: -25, // Deduct 25 coins
        p_description: 'AI consultation cost',
        p_transaction_type: 'usage'
      }
    );

    if (transactionError) {
      console.error('Transaction error:', transactionError);
      // We still send the response but inform the user about the transaction error
      return new Response(
        JSON.stringify({ 
          success: true, 
          response: aiResponse,
          transaction: {
            success: false,
            message: transactionError.message,
            error: 'Failed to deduct coins, but response provided'
          }
        }), 
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log('Transaction completed successfully');
    
    // Step 4: Return success with AI response and updated balance
    return new Response(
      JSON.stringify({ 
        success: true, 
        response: aiResponse,
        transaction: {
          success: transaction.success,
          message: transaction.message,
          newBalance: transaction.new_balance
        }
      }), 
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Error in ai-query function:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || 'An unexpected error occurred' 
      }), 
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
