
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

  const { data: walletData, isLoading } = useQuery({
    queryKey: ['wallet'],
    queryFn: async () => {
      const { data: wallet, error } = await supabase
        .from('user_wallets')
        .select('*')
        .single();
      
      if (error) {
        toast({
          title: "Error fetching wallet",
          description: error.message,
          variant: "destructive",
        });
        return null;
      }
      
      return wallet;
    }
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
