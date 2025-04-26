
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";
import { registerSchema } from '@/utils/authUtils';
import { useWalletCreation } from './useWalletCreation';

interface UseRegistrationProps {
  onSuccess: () => void;
  setLoginEmail: (email: string) => void;
}

export const useRegistration = ({ onSuccess, setLoginEmail }: UseRegistrationProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { ensureWalletCreated } = useWalletCreation();

  const handleRegistration = async (values: z.infer<typeof registerSchema>) => {
    if (isSubmitting) return;
    
    try {
      setIsSubmitting(true);
      
      // Check if user exists
      const { data: existingUser, error: checkError } = await supabase.auth.signUp({
        email: values.email,
        password: "checking-only",
        options: { emailRedirectTo: window.location.origin }
      });

      if (existingUser?.user && !existingUser.user.identities?.length) {
        toast({
          title: "Registration Failed",
          description: "Email already registered",
          variant: "destructive",
        });
        return;
      }

      // Register user
      const { data, error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: {
            name: values.name,
            phone_number: values.phoneNumber || null,
            designation: values.designation || null,
          },
          emailRedirectTo: window.location.origin
        },
      });

      if (error) {
        console.error("Registration error:", error);
        
        if (error.code === 'over_email_send_rate_limit') {
          toast({
            title: "Registration Paused",
            description: "Too many attempts. Please wait about a minute before trying again.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Registration Failed",
            description: error.message,
            variant: "destructive",
          });
        }
        return;
      }

      if (data.user) {
        try {
          await ensureWalletCreated(data.user.id);
          
          toast({
            title: "Registration Successful",
            description: "You can now login with your credentials. You've received 369 coins as a welcome bonus!",
          });

          try {
            await supabase.auth.signInWithPassword({
              email: values.email,
              password: values.password
            });
          } catch (signInError) {
            console.log("Auto sign-in failed, proceeding to login page:", signInError);
          }

          setLoginEmail(values.email);
          onSuccess();
        } catch (walletError: any) {
          console.error("Wallet setup error:", walletError);
          toast({
            title: "Registration Completed",
            description: "Account created but there was an issue setting up your wallet. You can try to create a wallet later.",
          });
          
          setLoginEmail(values.email);
          onSuccess();
        }
      }
    } catch (error: any) {
      console.error("Error in registration:", error);
      toast({
        title: "Registration Failed",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    handleRegistration,
    isSubmitting
  };
};
