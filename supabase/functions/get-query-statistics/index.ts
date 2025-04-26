
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

    // Execute a direct SQL query to get query statistics
    // This bypasses TypeScript type checking since we're using raw SQL
    const { data, error } = await supabaseClient.rpc('get_query_statistics');

    if (error) {
      throw error;
    }

    return new Response(JSON.stringify({
      totalQueries: data.total_queries || 0,
      averageLength: data.average_length || 0
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ 
      error: error.message,
      totalQueries: 0,
      averageLength: 0
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    });
  }
});
