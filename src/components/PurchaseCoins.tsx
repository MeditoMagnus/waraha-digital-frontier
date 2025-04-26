
import React from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface PurchaseOption {
  amount: number;
  coins: number;
  label: string;
}

const purchaseOptions: PurchaseOption[] = [
  { amount: 1, coins: 100, label: "100 coins ($1)" },
  { amount: 5, coins: 500, label: "500 coins ($5)" },
  { amount: 10, coins: 1000, label: "1000 coins ($10)" },
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
          Purchase {option.label}
        </Button>
      ))}
    </div>
  );
};

export default PurchaseCoins;
