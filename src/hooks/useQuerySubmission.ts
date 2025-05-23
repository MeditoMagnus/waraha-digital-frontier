
import { useState } from 'react';
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { getCachedFormData } from "@/utils/formCache";

export const useQuerySubmission = (onResponse: (response: string) => void) => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
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

      // For demonstration, simulate a successful response
      // In production, this would call the Supabase function
      setTimeout(() => {
        const demoResponse = `# Technical Analysis for ${companyName}

**Based on your query, here is a detailed analysis:**

## Overview
Your request involves complex technical architecture decisions that will impact your system's scalability and performance.

## Recommended Approach
Here's a phased approach to implementation:

### Phase 1: Infrastructure Setup
- Set up cloud resources and configure networking
- Implement CI/CD pipelines for automated deployments

### Phase 2: Core Development
- Develop key features and components
- Implement authentication and authorization

### Phase 3: Integration & Testing
- Integrate with third-party services
- Conduct comprehensive testing and bug fixes

## Cost Implications
The estimated cost for this implementation would be in the range of $20,000-30,000 depending on your exact requirements.

## Next Steps
Please review this proposal and let us know if you need any clarifications or have additional requirements.
`;
        onResponse(demoResponse);
        setQuery('');
        
        toast({
          title: "Success",
          description: "Response generated successfully.",
        });
      }, 2000);
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
