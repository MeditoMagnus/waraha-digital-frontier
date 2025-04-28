
CREATE OR REPLACE FUNCTION public.deduct_coins(amount INTEGER, description TEXT)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  current_balance INTEGER;
  success BOOLEAN := false;
BEGIN
  -- Check if user has enough coins
  SELECT coin_balance INTO current_balance
  FROM public.user_wallets
  WHERE user_id = auth.uid();
  
  IF current_balance IS NULL THEN
    RETURN false; -- User wallet doesn't exist
  END IF;
  
  IF current_balance >= amount THEN
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
    
    success := true;
  END IF;
  
  RETURN success;
END;
$$;
