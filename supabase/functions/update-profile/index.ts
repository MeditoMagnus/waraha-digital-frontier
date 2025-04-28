
// Follow this setup guide to integrate the Deno SDK: https://deno.land/manual/examples/supabase
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // This is needed for CORS
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );
    
    // Get the current user's session
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Missing Authorization header' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 401 }
      );
    }

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabaseClient.auth.getUser(token);

    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: authError?.message || 'User not authenticated' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 401 }
      );
    }

    const { action, userData } = await req.json();
    
    if (action === 'update_profile') {
      // Update user metadata
      const { data: updateData, error: updateError } = await supabaseClient.auth.admin.updateUserById(
        user.id,
        {
          user_metadata: {
            name: userData.name,
            phone_number: userData.phoneNumber,
            full_name: userData.name,
            ...userData
          }
        }
      );
      
      if (updateError) {
        throw updateError;
      }
      
      // Also update the profiles table
      const { error: profileError } = await supabaseClient
        .from('profiles')
        .upsert({
          id: user.id,
          designation: userData.designation || null,
          updated_at: new Date().toISOString()
        });
      
      if (profileError) {
        console.error("Profile update error:", profileError);
      }
      
      return new Response(
        JSON.stringify({ success: true, user: updateData }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
      );
    }

    return new Response(
      JSON.stringify({ error: 'Unknown action' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
    );
    
  } catch (error) {
    console.error("Error in update-profile function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
