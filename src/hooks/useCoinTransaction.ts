
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
      
      // First, verify the user's wallet exists and has enough balance
      const { data: walletData, error: walletError } = await supabase
        .from('user_wallets')
        .select('*')
        .eq('user_id', user.id)
        .single();
      
      if (walletError) {
        console.error("Error fetching wallet:", walletError);
        throw new Error(walletError.message || "Failed to fetch wallet");
      }
      
      if (!walletData) {
        // Create a wallet if it doesn't exist
        const { data: newWallet, error: createError } = await supabase
          .from('user_wallets')
          .insert({
            user_id: user.id,
            coin_balance: amount > 0 ? amount : 0, // Initial balance
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          })
          .select('*')
          .single();
          
        if (createError) {
          console.error("Error creating wallet:", createError);
          throw new Error(createError.message || "Failed to create wallet");
        }
        
        // Record transaction for new wallet
        await supabase
          .from('coin_transactions')
          .insert({
            user_id: user.id,
            amount: amount,
            transaction_type: transactionType,
            description: description
          });
          
        queryClient.invalidateQueries({ queryKey: ['wallet'] });
        
        return {
          success: true,
          message: "New wallet created and transaction completed",
          newBalance: amount > 0 ? amount : 0
        };
      }
      
      // Check balance for deductions
      if (amount < 0 && walletData.coin_balance < Math.abs(amount)) {
        return {
          success: false,
          message: "Insufficient coins in wallet",
          newBalance: walletData.coin_balance
        };
      }

      // Calculate new balance
      const newBalance = walletData.coin_balance + amount;
      
      // Update wallet balance
      const { error: updateError } = await supabase
        .from('user_wallets')
        .update({
          coin_balance: newBalance,
          updated_at: new Date().toISOString()
        })
        .eq('id', walletData.id); // Use the wallet ID for more precise targeting
      
      if (updateError) {
        console.error("Error updating wallet:", updateError);
        throw new Error(updateError.message || "Failed to update wallet balance");
      }
      
      // Record transaction
      const { error: transactionError } = await supabase
        .from('coin_transactions')
        .insert({
          user_id: user.id,
          amount: amount,
          transaction_type: transactionType,
          description: description
        });
        
      if (transactionError) {
        console.error("Error recording transaction:", transactionError);
        // Don't throw here since the balance was updated successfully
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
