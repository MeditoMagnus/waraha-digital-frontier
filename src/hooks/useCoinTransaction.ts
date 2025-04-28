
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
      const { data: wallets, error: walletError } = await supabase
        .from('user_wallets')
        .select('coin_balance')
        .eq('user_id', user.id);

      if (walletError) {
        console.error("Wallet fetch error:", walletError);
        throw new Error(walletError.message || "Failed to fetch wallet");
      }
      
      // Check if wallet exists
      if (!wallets || wallets.length === 0) {
        throw new Error("Wallet not found");
      }

      const wallet = wallets[0];
      
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
      const { error: updateError } = await supabase
        .from('user_wallets')
        .update({ 
          coin_balance: newBalance,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id);
      
      if (updateError) {
        console.error("Update error:", updateError);
        throw new Error(updateError.message || "Failed to update wallet balance");
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
        console.error("Transaction recording error:", transactionError);
        // Don't throw here, just log the error since the balance was already updated
      }
      
      // Refresh wallet data in UI
      queryClient.invalidateQueries({ queryKey: ['wallet'] });
      
      return {
        success: true,
        message: "Transaction completed successfully",
        newBalance: newBalance
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
