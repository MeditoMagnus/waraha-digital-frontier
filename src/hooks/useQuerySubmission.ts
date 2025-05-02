
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { getCachedFormData } from "@/utils/formCache";

export const useQuerySubmission = (onResponse: (response: string) => void) => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  const handleSubmit = async () => {
    if (!query.trim()) {
      toast({
        title: "Error",
        description: "Please enter your technical query first.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Get cached user data
      const cachedData = getCachedFormData();
      
      // Use cached data if available, otherwise fallback to localStorage
      const userEmail = cachedData.email || localStorage.getItem('userEmail');
      const companyName = cachedData.companyName || localStorage.getItem('companyName');
      const companySize = cachedData.companySize || localStorage.getItem('companySize');
      
      if (!userEmail) {
        toast({
          title: "Information Required",
          description: "Please provide your information to use the AI consultant.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      // Call the edge function for AI query
      const { data, error } = await supabase.functions.invoke('ai-query', {
        body: { 
          query,
          userEmail,
          companyName,
          companySize
        },
      });

      if (error) {
        console.error('Edge function error:', error);
        throw new Error(error.message || "Failed to process query");
      }

      if (!data) {
        throw new Error("No response received");
      }
      
      if (!data.success) {
        throw new Error(data.error || "Failed to process query");
      }

      console.log("Query processed successfully:", data);
      
      // Process successful response
      onResponse(data.response);
      setQuery('');
      
      // Show success toast
      toast({
        title: "Success",
        description: "Response generated successfully.",
      });
    } catch (error: any) {
      console.error('Error:', error);
      
      toast({
        title: "Error",
        description: error.message || "Failed to generate response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    query,
    setQuery,
    isLoading,
    handleSubmit
  };
};
