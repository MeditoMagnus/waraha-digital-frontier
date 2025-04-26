
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

    const { type } = await req.json();

    let data;
    let error;

    switch (type) {
      case 'profiles':
        // Fetch user profiles
        ({ data, error } = await supabaseClient
          .from('profiles')
          .select('id, name:user_name, email:user_email')
          .limit(50));
        break;

      case 'user_query_counts':
        // Fetch query counts per user
        ({ data, error } = await supabaseClient
          .from('user_query_counts')
          .select('user_id, count')
          .limit(50));
        break;

      case 'user_last_active':
        // Fetch last active dates
        ({ data, error } = await supabaseClient
          .from('user_last_active')
          .select('user_id, last_active')
          .limit(50));
        break;

      case 'queries':
        // Fetch queries
        ({ data, error } = await supabaseClient
          .from('queries')
          .select('id, user_name, user_email, query_text, created_at, response_length')
          .order('created_at', { ascending: false })
          .limit(50));
        break;

      case 'query_topics':
        // Fetch topics
        ({ data, error } = await supabaseClient
          .from('query_topics')
          .select('topic, count')
          .order('count', { ascending: false })
          .limit(5));
        break;

      case 'daily_query_counts':
        // Fetch daily query counts
        ({ data, error } = await supabaseClient
          .from('daily_query_counts')
          .select('day_name, count')
          .order('day_index', { ascending: true }));
        break;

      default:
        throw new Error(`Unknown data type: ${type}`);
    }
    
    if (error) {
      throw error;
    }

    return new Response(JSON.stringify(data || []), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error(`Error in get-admin-data (${error.message}):`, error);
    
    return new Response(JSON.stringify({ 
      error: error.message,
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    });
  }
});
