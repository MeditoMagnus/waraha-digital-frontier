
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
        // First, update the wallet balance
        const { error: updateError } = await supabase
          .from('user_wallets')
          .update({ 
            coin_balance: wallet.coin_balance - 25,
            updated_at: new Date().toISOString()
          })
          .eq('user_id', user.id);
  
        if (updateError) throw updateError;
        
        // Then perform the transaction record insert with the same user ID
        try {
          const { error: transactionError } = await supabase
            .from('coin_transactions')
            .insert([{
              user_id: user.id,
              amount: -25,
              transaction_type: 'usage',
              description: 'AI consultation cost'
            }]);
  
          if (transactionError) {
            console.error("Transaction insert error:", transactionError);
          }
        } catch (insertErr) {
          console.error("Error during transaction insert:", insertErr);
        }
        
        // Important: Immediately invalidate the wallet query to refresh the UI
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
