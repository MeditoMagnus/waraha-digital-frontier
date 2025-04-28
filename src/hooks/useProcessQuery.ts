
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";

// This hook is deprecated and no longer used.
// We're now handling query processing directly in the QueryForm component
// for better error handling and to avoid SQL RPC errors.
// See QueryForm.tsx for the current implementation.

export const useProcessQuery = (onSuccess: (response: string) => void) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const processQuery = async (query: string) => {
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
      // Implementation removed since it's now handled in QueryForm.tsx
      return null;
    } catch (error: any) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to generate response. Please try again.",
        variant: "destructive",
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    processQuery,
    isLoading
  };
};
