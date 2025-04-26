
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

// Track a query in the database
export const trackQuery = async (query: string, response: string) => {
  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      console.error("No authenticated user found", userError);
      return false;
    }
    
    const { error } = await supabase.from('query_history').insert({
      user_id: user.id,
      query_text: query,
      response_text: response,
      response_length: response.length
    });
    
    if (error) {
      console.error("Error tracking query:", error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error("Error tracking query:", error);
    return false;
  }
}

// Get query statistics
export const getQueryStatistics = async () => {
  try {
    const { data, error } = await supabase
      .from('query_statistics')
      .select('*')
      .limit(1);
    
    if (error) {
      console.error("Error getting query statistics:", error);
      toast({
        title: "Error",
        description: "Failed to fetch query statistics",
        variant: "destructive",
      });
      
      return {
        totalQueries: 0,
        averageLength: 0,
        uniqueUsers: 0
      };
    }
    
    return data[0] || {
      totalQueries: 0,
      averageLength: 0,
      uniqueUsers: 0
    };
  } catch (error) {
    console.error("Error getting query statistics:", error);
    return {
      totalQueries: 0,
      averageLength: 0,
      uniqueUsers: 0
    };
  }
}
