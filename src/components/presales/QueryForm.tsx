
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";

interface QueryFormProps {
  onQuerySubmit: (response: string) => void;
}

const QueryForm = ({ onQuerySubmit }: QueryFormProps) => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

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
      console.log("Checking authentication status");
      // Check if user is authenticated
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast({
          title: "Authentication Required",
          description: "Please log in to use the AI consultant.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      console.log("Sending query to edge function");
      // Call our edge function that handles both AI response and coin deduction
      const { data, error } = await supabase.functions.invoke('ai-query', {
        body: { query },
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
      
      // Force refresh wallet data after successful query
      queryClient.invalidateQueries({ queryKey: ['wallet'] });
      
      // Process successful response
      onQuerySubmit(data.response);
      setQuery('');
      
      // Show success toast with updated balance
      toast({
        title: "Success",
        description: `Response generated successfully. Your new balance is ${data.transaction.newBalance} coins.`,
      });
    } catch (error: any) {
      console.error('Error:', error);
      
      // More specific error messages based on error content
      let errorMessage = "Failed to generate response. Please try again.";
      
      if (error.message.includes("Insufficient coins")) {
        errorMessage = "You don't have enough coins. Please purchase more coins to continue.";
      } else if (error.message.includes("authentication") || error.message.includes("User not authenticated")) {
        errorMessage = "Authentication error. Please log in again.";
      }
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      
      // Force refresh wallet data even after error to ensure accuracy
      queryClient.invalidateQueries({ queryKey: ['wallet'] });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Textarea
        placeholder="Ask your technical query..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="min-h-[120px] text-base"
      />
      
      <Button 
        onClick={handleSubmit} 
        className="w-full flex items-center justify-center gap-2"
        disabled={isLoading || !query.trim()}
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            Generate Response
          </>
        )}
      </Button>
    </div>
  );
};

export default QueryForm;
