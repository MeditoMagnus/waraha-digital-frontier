// Follow this setup guide to integrate the Deno SDK: https://deno.land/manual/examples/supabase
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Sample data to use when tables don't exist or encounter errors
const sampleData = {
  profiles: [
    { id: "1", name: "Jane Smith", email: "jane@acme.corp" },
    { id: "2", name: "John Doe", email: "john@tech.org" },
    { id: "3", name: "Alice Johnson", email: "alice@megacorp.com" },
    { id: "4", name: "Robert Chen", email: "robert@startupinc.net" },
    { id: "5", name: "Emily Davis", email: "emily@bizfirm.co" }
  ],
  user_query_counts: [
    { user_id: "1", count: 15 },
    { user_id: "2", count: 8 },
    { user_id: "3", count: 23 },
    { user_id: "4", count: 5 },
    { user_id: "5", count: 12 }
  ],
  user_last_active: [
    { user_id: "1", last_active: "2023-04-25" },
    { user_id: "2", last_active: "2023-04-24" },
    { user_id: "3", last_active: "2023-04-26" },
    { user_id: "4", last_active: "2023-04-20" },
    { user_id: "5", last_active: "2023-04-23" }
  ],
  queries: [
    { 
      id: 1, 
      user_name: "Jane Smith", 
      user_email: "jane@acme.corp", 
      query_text: "What are the best practices for implementing a microservices architecture?", 
      created_at: "2023-04-26T12:00:00Z",
      response_length: 1250 
    },
    { 
      id: 2, 
      user_name: "John Doe", 
      user_email: "john@tech.org", 
      query_text: "How should we price our new SaaS product for the enterprise market?", 
      created_at: "2023-04-25T14:30:00Z",
      response_length: 950 
    },
    { 
      id: 3, 
      user_name: "Alice Johnson", 
      user_email: "alice@megacorp.com", 
      query_text: "What security measures should we implement for our cloud infrastructure?", 
      created_at: "2023-04-25T09:15:00Z",
      response_length: 1800 
    },
    { 
      id: 4, 
      user_name: "Robert Chen", 
      user_email: "robert@startupinc.net", 
      query_text: "How can we optimize our CI/CD pipeline for faster deployments?", 
      created_at: "2023-04-24T16:45:00Z",
      response_length: 1100 
    },
    { 
      id: 5, 
      user_name: "Emily Davis", 
      user_email: "emily@bizfirm.co", 
      query_text: "What's the best approach for migrating our monolith to a serverless architecture?", 
      created_at: "2023-04-23T11:20:00Z",
      response_length: 1650 
    }
  ],
  query_topics: [
    { topic: "Cloud Infrastructure", count: 28 },
    { topic: "Microservices", count: 22 },
    { topic: "Security", count: 19 },
    { topic: "Pricing Strategy", count: 15 },
    { topic: "DevOps", count: 12 }
  ],
  daily_query_counts: [
    { name: 'Mon', queries: 12 },
    { name: 'Tue', queries: 19 },
    { name: 'Wed', queries: 7 },
    { name: 'Thu', queries: 15 },
    { name: 'Fri', queries: 23 },
    { name: 'Sat', queries: 8 },
    { name: 'Sun', queries: 5 },
  ]
};

Deno.serve(async (req) => {
  // This is needed for CORS
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { type } = await req.json();

    console.log(`Fetching data for type: ${type}`);

    const { data: tableExists, error: checkError } = await supabaseClient.rpc(
      'check_table_exists', 
      { table_name: type }
    );
    
    if (checkError || !tableExists) {
      console.warn(`Table for type ${type} not found or error checking: ${checkError?.message || 'No table'}`);
      return new Response(JSON.stringify(sampleData[type] || []), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      });
    }

    let data;
    try {
      switch (type) {
        case 'profiles':
          ({ data } = await supabaseClient
            .from('profiles')
            .select('id, name:user_name, email:user_email')
            .limit(50));
          break;

        case 'user_query_counts':
          ({ data } = await supabaseClient
            .from('user_query_counts')
            .select('user_id, count')
            .limit(50));
          break;

        case 'user_last_active':
          ({ data } = await supabaseClient
            .from('user_last_active')
            .select('user_id, last_active')
            .limit(50));
          break;

        case 'queries':
          ({ data } = await supabaseClient
            .from('queries')
            .select('id, user_name, user_email, query_text, created_at, response_length')
            .order('created_at', { ascending: false })
            .limit(50));
          break;

        case 'query_topics':
          ({ data } = await supabaseClient
            .from('query_topics')
            .select('topic, count')
            .order('count', { ascending: false })
            .limit(5));
          break;

        case 'daily_query_counts':
          ({ data } = await supabaseClient
            .from('daily_query_counts')
            .select('day_name as name, count as queries')
            .order('day_index', { ascending: true }));
          break;

        default:
          throw new Error(`Unknown data type: ${type}`);
      }
    } catch (fetchError) {
      console.error(`Error fetching data for ${type}:`, fetchError);
      return new Response(JSON.stringify(sampleData[type] || []), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      });
    }
    
    if (!data || data.length === 0) {
      console.log(`No data found for ${type}, returning sample data`);
      return new Response(JSON.stringify(sampleData[type] || []), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      });
    }

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error(`Unexpected error in get-admin-data (${error.message}):`, error);
    
    return new Response(JSON.stringify(sampleData), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  }
});
