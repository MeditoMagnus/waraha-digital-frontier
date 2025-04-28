
import React from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Loader2 } from "lucide-react";
import { useProcessQuery } from "@/hooks/useProcessQuery";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface QueryFormProps {
  onQuerySubmit: (response: string) => void;
}

const QueryForm = ({ onQuerySubmit }: QueryFormProps) => {
  const [query, setQuery] = React.useState('');
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { processQuery, isLoading } = useProcessQuery(onQuerySubmit);

  const handleSubmit = async () => {
    if (!query.trim()) {
      toast({
        title: "Error",
        description: "Please enter your technical query first.",
        variant: "destructive",
      });
      return;
    }
    
    // Get latest wallet data before proceeding
    await queryClient.invalidateQueries({ queryKey: ['wallet'] });
    
    // Check if user is authenticated
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      toast({
        title: "Authentication Required",
        description: "Please log in to use the AI consultant.",
        variant: "destructive",
      });
      return;
    }
    
    const response = await processQuery(query);
    if (response) {
      setQuery('');
      // Force refresh wallet data after successful query
      queryClient.invalidateQueries({ queryKey: ['wallet'] });
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
