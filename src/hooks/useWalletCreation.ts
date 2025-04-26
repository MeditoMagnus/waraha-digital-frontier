
import { supabase } from "@/integrations/supabase/client";

export const useWalletCreation = () => {
  const ensureWalletCreated = async (userId: string) => {
    try {
      console.log("Creating wallet for user:", userId);
      
      // First, check if role already exists to avoid duplicate errors
      const { data: existingRole } = await supabase
        .from('user_roles')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();

      // Only assign role if not already assigned
      if (!existingRole) {
        const roleToAssign = 'user'; // Default role
        console.log(`Assigning role ${roleToAssign} to user ${userId}`);
        
        const { error: roleError } = await supabase
          .from('user_roles')
          .insert({ 
            user_id: userId, 
            role: roleToAssign 
          });
        
        if (roleError) {
          console.error("Role assignment error:", roleError);
        } else {
          console.log("Role assigned successfully:", roleToAssign);
        }
      } else {
        console.log("User already has a role assigned:", existingRole);
      }
      
      // Check if wallet already exists
      const { data: existingWallet } = await supabase
        .from('user_wallets')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();
      
      if (existingWallet) {
        console.log("Wallet already exists:", existingWallet);
        return existingWallet;
      }
      
      // Create wallet
      const { data: wallet, error: walletError } = await supabase
        .from('user_wallets')
        .insert({ 
          user_id: userId, 
          coin_balance: 369 
        })
        .select()
        .single();
      
      if (walletError) {
        console.error("Wallet creation error:", walletError);
        throw walletError;
      }
      
      console.log("Wallet created successfully:", wallet);

      // Record welcome bonus transaction
      const { error: transactionError } = await supabase
        .from('coin_transactions')
        .insert({
          user_id: userId,
          amount: 369,
          transaction_type: 'bonus',
          description: 'Welcome bonus'
        });
      
      if (transactionError) {
        console.error("Transaction record error:", transactionError);
      } else {
        console.log("Welcome bonus transaction recorded");
      }
      
      return wallet;
    } catch (error) {
      console.error('Error ensuring wallet created:', error);
      throw error;
    }
  };

  return { ensureWalletCreated };
};
