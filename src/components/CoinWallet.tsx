
import React from 'react';
import { Coins } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface CoinWalletProps {
  onPurchaseClick: () => void;
}

const CoinWallet = ({ onPurchaseClick }: CoinWalletProps) => {
  const { toast } = useToast();
  
  const { data: walletData, isLoading, refetch } = useQuery({
    queryKey: ['wallet'],
    queryFn: async () => {
      try {
        console.log("Fetching wallet data");
        
        // Get the current user
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error("Session error:", sessionError);
          throw new Error(sessionError.message);
        }
        
        if (!session || !session.user) {
          console.error("No active session");
          throw new Error("Auth session missing!");
        }
        
        // Query the wallet using the user ID
        const { data, error } = await supabase
          .from('user_wallets')
          .select('*')
          .eq('user_id', session.user.id)
          .maybeSingle();
        
        if (error) {
          console.error("Wallet fetch error:", error);
          throw error;
        }
        
        // If no wallet found, return default values
        if (!data) {
          console.log("No wallet found, returning default");
          return { coin_balance: 0, id: null, user_id: session.user.id };
        }
        
        console.log("Wallet fetched successfully:", data);
        return data;
      } catch (error) {
        console.error("Wallet fetch error:", error);
        
        // Show a toast for authentication errors
        if (String(error).includes("Auth session")) {
          toast({
            title: "Authentication Error",
            description: "Please log in to view your wallet.",
            variant: "destructive",
          });
        }
        
        throw error;
      }
    },
    refetchInterval: 5000, // Refetch every 5 seconds to keep the balance updated
    refetchOnWindowFocus: true, // Refetch when the window regains focus
    retry: 3, // Retry 3 times if there's an error
  });

  const handlePurchaseClick = () => {
    onPurchaseClick();
    // Only refetch if we're not already loading
    if (!isLoading) {
      refetch();
    }
  };

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
            onClick={handlePurchaseClick}
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
