
import React, { useState } from 'react';
import { Coins, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

interface CoinWalletProps {
  onPurchaseClick: () => void;
}

const CoinWallet = ({ onPurchaseClick }: CoinWalletProps) => {
  const { toast } = useToast();
  const [isCreatingWallet, setIsCreatingWallet] = useState(false);

  const { data: walletData, isLoading, error, refetch } = useQuery({
    queryKey: ['wallet'],
    queryFn: async () => {
      try {
        // Get the current user
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        
        if (userError || !user) {
          console.error("User auth error:", userError);
          throw new Error(userError?.message || "User not authenticated");
        }
        
        console.log("Fetching wallet for user:", user.id); // Debug log
        
        // Query the wallet using the user ID
        const { data, error } = await supabase
          .from('user_wallets')
          .select('*')
          .eq('user_id', user.id)
          .maybeSingle();
        
        if (error) {
          console.error("Wallet fetch error:", error); // Debug log
          throw error;
        }

        console.log("Wallet data received:", data); // Debug log
        
        // Return wallet data if exists, otherwise return default
        return data || { coin_balance: 0 };
      } catch (error: any) {
        console.error("Error in wallet query:", error); // Debug log
        toast({
          title: "Error fetching wallet",
          description: error.message,
          variant: "destructive",
        });
        return { coin_balance: 0 };
      }
    },
    retry: 2, // Retry failed requests up to 2 times
    refetchOnWindowFocus: true, // Refresh when window regains focus
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  const createWallet = async () => {
    try {
      setIsCreatingWallet(true);
      
      // Get the current user
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError || !user) {
        throw new Error(userError?.message || "User not authenticated");
      }
      
      // Check if wallet already exists
      const { data: existingWallet } = await supabase
        .from('user_wallets')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();
      
      if (existingWallet) {
        // Wallet exists, just refetch
        await refetch();
        return;
      }
      
      // Create wallet with default coins
      const { error: walletError } = await supabase
        .from('user_wallets')
        .insert({ 
          user_id: user.id, 
          coin_balance: 369 
        });
      
      if (walletError) {
        throw walletError;
      }
      
      // Create initial transaction record
      await supabase
        .from('coin_transactions')
        .insert({
          user_id: user.id,
          amount: 369,
          transaction_type: 'bonus',
          description: 'Welcome bonus'
        });
      
      toast({
        title: "Wallet Created",
        description: "Your wallet has been created with 369 bonus coins!",
      });
      
      // Refetch wallet data
      await refetch();
    } catch (error: any) {
      console.error("Error creating wallet:", error);
      toast({
        title: "Error Creating Wallet",
        description: error.message || "Failed to create wallet",
        variant: "destructive",
      });
    } finally {
      setIsCreatingWallet(false);
    }
  };

  // If there's an error or no wallet found, show recovery options
  if (error || (!isLoading && (!walletData || walletData.coin_balance === undefined))) {
    return (
      <Card className="mb-6">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">Your Coin Balance</CardTitle>
          <Coins className="h-6 w-6 text-yellow-500" />
        </CardHeader>
        <CardContent>
          <div className="mt-2 space-y-4">
            <CardDescription className="text-red-500">
              {error ? "Failed to load wallet data" : "No wallet found"}
            </CardDescription>
            <div className="flex flex-col gap-2">
              <Button 
                onClick={() => refetch()} 
                variant="secondary"
                disabled={isLoading}
                className="flex items-center gap-2"
              >
                <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
                Retry Loading
              </Button>
              
              <Button 
                onClick={createWallet} 
                variant="default"
                disabled={isCreatingWallet}
              >
                {isCreatingWallet ? "Creating..." : "Create New Wallet"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-6">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold">Your Coin Balance</CardTitle>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => refetch()} 
          disabled={isLoading}
          className="rounded-full p-1"
        >
          <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
          <span className="sr-only">Refresh balance</span>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="mt-2 flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <CardDescription className="text-xl mr-2">
                Available Coins
              </CardDescription>
              <Coins className="h-5 w-5 text-yellow-500" />
            </div>
            <span className="text-2xl font-bold">
              {isLoading ? "..." : walletData?.coin_balance || 0}
            </span>
          </div>
          <Button 
            onClick={onPurchaseClick}
            className="w-full"
          >
            Buy More Coins
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CoinWallet;
