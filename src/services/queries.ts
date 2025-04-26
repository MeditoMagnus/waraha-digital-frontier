
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
    
    // Insert the query data into Supabase
    const { data, error } = await supabase
      .from('queries')
      .insert({
        query,
        response: response.substring(0, 500) + (response.length > 500 ? "..." : ""),
        user_email: userEmail,
        user_name: userName,
        timestamp: new Date().toISOString()
      })
      .select();
    
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
    // Get real statistics from the database
    const { data, error } = await supabase
      .from('queries')
      .select('*');
    
    if (error) {
      throw error;
    }
    
    // Calculate statistics
    return {
      totalQueries: data?.length || 0,
      averageLength: data?.length ? 
        Math.round(data.reduce((acc, curr) => acc + (curr.query?.length || 0), 0) / data.length) : 0
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
