
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";

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
      // Get current user
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError || !user) {
        throw new Error(userError?.message || "User not authenticated");
      }
      
      // Get user's wallet
      const { data: wallet, error: walletError } = await supabase
        .from('user_wallets')
        .select('coin_balance')
        .eq('user_id', user.id)
        .maybeSingle();

      if (walletError) throw walletError;

      if (!wallet || wallet.coin_balance < 25) {
        toast({
          title: "Insufficient Coins",
          description: "You need 25 coins to generate an AI response. Please purchase more coins.",
          variant: "destructive",
        });
        return null;
      }

      // Get response from AI first before deducting coins
      const { data, error } = await supabase.functions.invoke('chat-with-ai', {
        body: { query },
      });

      if (error) throw error;

      // Only deduct coins if we successfully get a response
      if (data && data.response) {
        // Call the deduct_coins function to handle the transaction
        const { data: deductResult, error: deductError } = await supabase
          .rpc('deduct_coins', { 
            amount: 25, 
            description: 'AI consultation cost' 
          });
        
        if (deductError) {
          console.error("Deduct coins error:", deductError);
          throw new Error(`Failed to deduct coins: ${deductError.message}`);
        }
        
        if (!deductResult) {
          throw new Error("Failed to deduct coins. You may not have sufficient balance.");
        }
        
        // Immediately invalidate the wallet query to refresh the UI
        queryClient.invalidateQueries({ queryKey: ['wallet'] });
        
        // Process successful response
        onSuccess(data.response);
        
        toast({
          title: "Success",
          description: "Response generated successfully. 25 coins have been deducted.",
        });
  
        return data.response;
      } else {
        throw new Error("No response received from AI");
      }
      
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
