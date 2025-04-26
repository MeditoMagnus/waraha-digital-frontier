
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
    
    // Use generic type with any to bypass TypeScript's strict type checking
    // This is necessary because the query_history table isn't in the generated types
    const { error } = await supabase
      .from('query_history' as any)
      .insert({
        user_id: user.id,
        query_text: query,
        response_text: response,
        response_length: response.length
      } as any);
    
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
    // Use generic type with any to bypass TypeScript's strict type checking
    // This is necessary because the query_statistics view isn't in the generated types
    const { data, error } = await supabase
      .from('query_statistics' as any)
      .select('*')
      .limit(1)
      .single();
    
    if (error) {
      console.error("Error getting query statistics:", error);
      toast({
        title: "Error",
        description: "Failed to fetch query statistics",
        variant: "destructive",
      });
      
      return {
        total_queries: 0,
        average_length: 0,
        unique_users: 0
      };
    }
    
    return data || {
      total_queries: 0,
      average_length: 0,
      unique_users: 0
    };
  } catch (error) {
    console.error("Error getting query statistics:", error);
    return {
      total_queries: 0,
      average_length: 0,
      unique_users: 0
    };
  }
}
