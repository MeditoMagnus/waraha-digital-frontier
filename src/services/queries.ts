
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

// Track a query in the database
export const trackQuery = async (query: string, response: string) => {
  try {
    // First, try to get the authenticated user from Supabase
    const { data: { user } } = await supabase.auth.getUser();
    
    // If no authenticated user, check localStorage for admin
    const userEmail = user?.email || localStorage.getItem('userEmail') || 'anonymous';
    const userName = user?.user_metadata?.name || localStorage.getItem('userName') || 'Anonymous User';
    
    // Log the data for debugging
    console.log("Tracking query for:", { userEmail, userName });
    
    // Use raw SQL insert since the queries table isn't defined in the TypeScript schema
    const { error } = await supabase.rpc('insert_query', {
      query_text: query,
      response_text: response.substring(0, 500) + (response.length > 500 ? "..." : ""),
      user_email_param: userEmail,
      user_name_param: userName
    });
    
    if (error) {
      console.error("Error inserting query:", error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error("Error tracking query:", error);
    return false;
  }
}

// Get statistics about queries
export const getQueryStatistics = async () => {
  try {
    // Use raw SQL query since the queries table isn't defined in the TypeScript schema
    const { data, error } = await supabase.rpc('get_query_statistics');
    
    if (error) {
      throw error;
    }
    
    if (data) {
      return {
        totalQueries: data.total_queries || 0,
        averageLength: data.average_length || 0
      };
    }
    
    return {
      totalQueries: 0,
      averageLength: 0
    };
  } catch (error) {
    console.error("Error getting query statistics:", error);
    toast({
      title: "Error",
      description: "Failed to fetch query statistics",
      variant: "destructive",
    });
    return {
      totalQueries: 0,
      averageLength: 0
    };
  }
}
