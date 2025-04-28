
import React from 'react';
import { Coins } from 'lucide-react';
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

  const { data: walletData, isLoading, refetch } = useQuery({
    queryKey: ['wallet'],
    queryFn: async () => {
      try {
        // Get the current user
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        
        if (userError || !user) {
          throw new Error(userError?.message || "User not authenticated");
        }
        
        // Query the wallet using the user ID
        const { data, error } = await supabase
          .from('user_wallets')
          .select('*')
          .eq('user_id', user.id)
          .maybeSingle();
        
        if (error) {
          throw error;
        }
        
        return data || { coin_balance: 0 };
      } catch (error: any) {
        console.error("Wallet fetch error:", error);
        toast({
          title: "Error fetching wallet",
          description: error.message,
          variant: "destructive",
        });
        return { coin_balance: 0 };
      }
    },
    refetchInterval: 3000, // Refetch every 3 seconds to keep the balance updated
    refetchOnWindowFocus: true, // Refetch when the window regains focus
    staleTime: 0, // Consider data immediately stale so it always refreshes
  });

  return (
    <Card className="mb-6">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold">Your Coin Balance</CardTitle>
        <Coins className="h-6 w-6 text-yellow-500" />
      </CardHeader>
      <CardContent>
        <div className="mt-2 flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <CardDescription className="text-xl">
              Available Coins
            </CardDescription>
            <span className="text-2xl font-bold">
              {isLoading ? "..." : walletData?.coin_balance || 0}
            </span>
          </div>
          <Button 
            onClick={() => {
              onPurchaseClick();
              refetch(); // Refresh wallet data when purchase dialog opens
            }}
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
