
import React from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { useCoinTransaction } from "@/hooks/useCoinTransaction";

interface QueryFormProps {
  onQuerySubmit: (response: string) => void;
}

const QueryForm = ({ onQuerySubmit }: QueryFormProps) => {
  const [query, setQuery] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { processTransaction } = useCoinTransaction();

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
      
      // Force refresh wallet data before proceeding
      await queryClient.invalidateQueries({ queryKey: ['wallet'] });
      
      // Get user's wallet
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error("User not authenticated");
      }
      
      const { data: wallets, error: walletError } = await supabase
        .from('user_wallets')
        .select('coin_balance')
        .eq('user_id', user.id);

      if (walletError) throw walletError;

      if (!wallets || wallets.length === 0 || wallets[0].coin_balance < 25) {
        toast({
          title: "Insufficient Coins",
          description: "You need 25 coins to generate an AI response. Please purchase more coins.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }
      
      // Get response from AI first before deducting coins
      const { data, error } = await supabase.functions.invoke('chat-with-ai', {
        body: { query },
      });

      if (error) throw error;
      
      if (!data || !data.response) {
        throw new Error("No response received from AI");
      }
      
      // Process the coin transaction after getting response
      const transactionResult = await processTransaction({
        amount: -25, 
        description: 'AI consultation cost',
        transactionType: 'usage'
      });
      
      if (!transactionResult.success) {
        toast({
          title: "Transaction Failed",
          description: transactionResult.message,
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }
      
      // Process successful response
      onQuerySubmit(data.response);
      setQuery('');
      
      toast({
        title: "Success",
        description: "Response generated successfully. 25 coins have been deducted.",
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
      // Force refresh wallet data after query attempt
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
