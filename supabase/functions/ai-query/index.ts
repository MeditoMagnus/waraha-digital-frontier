
// Follow this setup guide to integrate the Deno SDK: https://deno.land/manual/examples/supabase
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';
import { OpenAI } from "https://esm.sh/openai@4.18.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  // This is needed for CORS
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { query, userEmail, companyName, companySize } = await req.json();

    if (!query) {
      throw new Error("Query is required");
    }

    // Validate user input
    if (!userEmail) {
      throw new Error("User email is required");
    }

    // Initialize OpenAI client
    const openai = new OpenAI({
      apiKey: Deno.env.get('OPEN_AI_KEY') || '',
    });

    // Create a supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Track the query for analytics
    try {
      await supabaseClient.from('technical_queries').insert({
        email: userEmail,
        company_name: companyName || null,
        company_size: companySize || null,
        query: query,
        created_at: new Date().toISOString(),
      });
    } catch (trackError) {
      // Log but don't fail if tracking fails
      console.error("Error tracking query:", trackError);
    }

    // Generate a proper system prompt for the AI
    const systemPrompt = `
      You are an expert IT Consultancy AI assistant for Waraha Group. Your role is to provide detailed, 
      accurate technical advice on software development, IT services, cloud infrastructure, 
      system architecture, pricing estimations, configurations, and integrations.
      
      When providing consultation:
      1. Always be professional, clear, and concise
      2. Structure your answers with relevant headings
      3. Provide specific technical recommendations with justifications
      4. Include code examples when appropriate
      5. Suggest practical steps for implementation
      6. Consider cost-effectiveness and business value
      
      Company context: The user works at ${companyName || "a company"} with approximately ${companySize || "an unknown number of"} employees.
      
      Remember, you're representing Waraha Group, a professional IT consultancy firm with expertise across various technology domains.
    `;

    // Generate response using OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: query,
        },
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    const aiResponse = completion.choices[0].message.content;

    return new Response(JSON.stringify({
      success: true,
      response: aiResponse,
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    console.error("Error processing request:", error.message);
    
    return new Response(JSON.stringify({
      success: false,
      error: error.message || "An unknown error occurred",
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});
