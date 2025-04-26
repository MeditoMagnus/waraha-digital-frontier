
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
    // In a real implementation, you would send this data to Supabase
    // For now, we'll just log it
    console.log("Query tracked:", {
      query,
      response: response.substring(0, 100) + "...",
      email: userEmail,
      user: userName,
      timestamp: new Date()
    });
    
    return true;
  } catch (error) {
    console.error("Error tracking query:", error);
    return false;
  }
}

// Get statistics about queries
export const getQueryStatistics = async () => {
  try {
    // For a real implementation, you would query Supabase
    // For demonstration, we'll return mock data that's consistent
    return {
      totalQueries: 63,
      averageLength: 432
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
