
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

    // Query the database for statistics
    const { data: queriesData, error: queriesError } = await supabaseClient
      .from('queries')
      .select('id, response_length');
    
    if (queriesError) {
      throw queriesError;
    }
    
    // Calculate statistics
    const totalQueries = queriesData?.length || 0;
    let averageLength = 0;
    
    if (totalQueries > 0 && queriesData) {
      const totalLength = queriesData.reduce((sum, query) => sum + (query.response_length || 0), 0);
      averageLength = Math.round(totalLength / totalQueries);
    }

    return new Response(JSON.stringify({
      totalQueries,
      averageLength
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error("Error in get-query-statistics:", error);
    
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
