
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
    const supabaseClient = createClient(
      // Get these from environment variables
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { email, name } = await req.json();

    // Execute a direct SQL query to track registrations
    // This bypasses TypeScript type checking since we're using raw SQL
    const { error } = await supabaseClient.rpc('track_registration', {
      email_param: email,
      name_param: name
    });

    if (error) {
      throw error;
    }

    // Let's also make sure user profile data is synchronized
    // Get the user ID from the email
    const { data: userData, error: userError } = await supabaseClient.auth.admin
      .listUsers({
        filter: {
          email: email
        }
      });
    
    if (userError || !userData || !userData.users || userData.users.length === 0) {
      throw userError || new Error("User not found");
    }
    
    const userId = userData.users[0].id;
    
    // Update the profiles table with user data including name
    const { error: profileError } = await supabaseClient
      .from('profiles')
      .upsert({
        id: userId,
        designation: userData.users[0].user_metadata?.designation || null,
        updated_at: new Date().toISOString()
      });

    if (profileError) {
      console.error("Profile update error:", profileError);
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    });
  }
});
