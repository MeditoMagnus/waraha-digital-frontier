
import { useState } from 'react';
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { getCachedFormData } from "@/utils/formCache";

export const useQuerySubmission = (onResponse: (response: string) => void) => {
  const [query, setQuery] = useState('');
  const [domain, setDomain] = useState('it');
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = async () => {
    if (!query.trim()) {
      toast({
        title: "Error",
        description: "Please enter your query first.",
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

      // Call the Supabase edge function with the domain parameter
      const { data, error } = await supabase.functions.invoke('chat-with-ai', {
        body: { 
          query,
          domain,
          userEmail,
          companyName,
          companySize
        },
      });

      if (error) {
        throw new Error(error.message || "Failed to generate response");
      }

      // Process successful response
      if (data && data.response) {
        onResponse(data.response);
        setQuery('');
        
        toast({
          title: `${data.domain || 'AI'} Response`,
          description: "Response generated successfully.",
        });
      }
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
    domain,
    setDomain,
    isLoading,
    handleSubmit
  };
};
