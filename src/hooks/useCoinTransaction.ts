
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";

interface TransactionParams {
  amount: number;
  description: string;
  transactionType: 'usage' | 'purchase' | 'bonus' | 'refund';
}

export const useCoinTransaction = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const processTransaction = async ({ amount, description, transactionType }: TransactionParams) => {
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
      
      if (!wallet) {
        throw new Error("Wallet not found");
      }

      // Check balance for deductions
      if (amount < 0 && wallet.coin_balance < Math.abs(amount)) {
        return {
          success: false,
          message: "Insufficient coins in wallet",
          newBalance: wallet.coin_balance
        };
      }

      // Update wallet balance
      const newBalance = wallet.coin_balance + amount;
      const { data: updatedWallet, error: updateError } = await supabase
        .from('user_wallets')
        .update({ coin_balance: newBalance })
        .eq('user_id', user.id)
        .select('coin_balance')
        .maybeSingle();
      
      if (updateError) {
        throw updateError;
      }
      
      if (!updatedWallet) {
        throw new Error("Failed to update wallet balance");
      }
      
      // Record transaction
      const { error: transactionError } = await supabase
        .from('coin_transactions')
        .insert({
          user_id: user.id,
          amount,
          transaction_type: transactionType,
          description
        });
        
      if (transactionError) {
        console.error("Failed to record transaction:", transactionError);
      }
      
      // Refresh wallet data in UI
      queryClient.invalidateQueries({ queryKey: ['wallet'] });
      
      return {
        success: true,
        message: "Transaction completed successfully",
        newBalance: updatedWallet.coin_balance
      };
      
    } catch (error: any) {
      console.error("Transaction error:", error);
      toast({
        title: "Transaction Failed",
        description: error.message || "Failed to process coin transaction",
        variant: "destructive",
      });
      
      return {
        success: false,
        message: error.message || "Transaction failed",
        newBalance: null
      };
    }
  };
  
  return { processTransaction };
};
