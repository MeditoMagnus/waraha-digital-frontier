
// Follow this setup guide to integrate the Deno SDK: https://deno.land/manual/examples/supabase
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

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
    const { name, email, companyName, description, hasAttachment, attachmentName } = await req.json();

    // Validate user input
    if (!name || !email || !companyName || !description) {
      throw new Error("All fields are required");
    }

    // Create a supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Insert the assessment request into the database
    const { data, error } = await supabaseClient
      .from('assessment_requests')
      .insert({
        name,
        email,
        company_name: companyName,
        description,
        has_attachment: hasAttachment || false,
        attachment_name: attachmentName || null,
      });

    if (error) throw error;

    return new Response(JSON.stringify({
      success: true,
      message: "Assessment request submitted successfully",
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
