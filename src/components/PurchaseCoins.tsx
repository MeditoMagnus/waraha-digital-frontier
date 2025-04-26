
import React from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface PurchaseOption {
  amount: number;
  coins: number;
  requests: number;
}

const calculateRequests = (coins: number): number => {
  if (coins <= 1000) {
    return Math.floor(coins / 25); // Each request costs 25 coins
  } else {
    // After 1000 coins, 8 requests per 100 coins
    const baseRequests = 40; // First 1000 coins give 40 requests
    const extraCoins = coins - 1000;
    const extraRequests = Math.floor((extraCoins / 100) * 8);
    return baseRequests + extraRequests;
  }
};

const purchaseOptions: PurchaseOption[] = [
  { amount: 1, coins: 100, requests: calculateRequests(100) },
  { amount: 5, coins: 500, requests: calculateRequests(500) },
  { amount: 10, coins: 1000, requests: calculateRequests(1000) },
  { amount: 20, coins: 2000, requests: calculateRequests(2000) }
];

const PurchaseCoins = () => {
  const { toast } = useToast();

  const handlePurchase = async (option: PurchaseOption) => {
    try {
      const { data, error } = await supabase.functions.invoke('create-payment', {
        body: { amount: option.amount, coins: option.coins }
      });

      if (error) throw error;

      // Redirect to Stripe checkout
      window.location.href = data.url;
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to initiate purchase",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="grid gap-4">
      {purchaseOptions.map((option) => (
        <Button
          key={option.coins}
          onClick={() => handlePurchase(option)}
          className="w-full"
          variant="outline"
        >
          {option.coins} coins ({option.requests} requests)
        </Button>
      ))}
    </div>
  );
};

export default PurchaseCoins;

