
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const useProcessQuery = (onSuccess: (response: string) => void) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

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
        return;
      }

      // Get response from AI
      const { data, error } = await supabase.functions.invoke('chat-with-ai', {
        body: { query },
      });

      if (error) throw error;
      
      // Use the secure deduct_coins function to deduct coins and record the transaction
      const { error: deductError } = await supabase.rpc('deduct_coins', {
        amount: 25, 
        description: 'AI consultation cost'
      });

      if (deductError) throw deductError;
      
      onSuccess(data.response);
      
      toast({
        title: "Success",
        description: "Response generated successfully. 25 coins have been deducted.",
      });

      return data.response;
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
    processQuery,
    isLoading
  };
};
