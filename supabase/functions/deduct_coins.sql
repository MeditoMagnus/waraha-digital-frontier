
CREATE OR REPLACE FUNCTION public.deduct_coins(amount INTEGER, description TEXT)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Update the user's wallet
  UPDATE public.user_wallets
  SET 
    coin_balance = coin_balance - amount,
    updated_at = now()
  WHERE user_id = auth.uid()
  AND coin_balance >= amount;

  -- Record the transaction
  INSERT INTO public.coin_transactions (
    user_id,
    amount,
    transaction_type,
    description
  )
  VALUES (
    auth.uid(),
    -amount,
    'usage',
    description
  );
END;
$$;
