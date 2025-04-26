
import React from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { registerSchema } from '@/utils/authUtils';
import { supabase } from '@/integrations/supabase/client';
import { StudentOption } from './registration/StudentOption';
import { PersonalInfoFields } from './registration/PersonalInfoFields';
import { PasswordFields } from './registration/PasswordFields';

interface RegisterFormProps {
  onSuccess: () => void;
  setLoginEmail: (email: string) => void;
}

export const RegisterForm = ({ onSuccess, setLoginEmail }: RegisterFormProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
      designation: "",
      isStudent: false
    },
  });

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
        const roleToAssign = form.watch("isStudent") ? 'student' : 'user';
        console.log(`Assigning role ${roleToAssign} to user ${userId}`);
        
        const { error: roleError } = await supabase
          .from('user_roles')
          .insert({ 
            user_id: userId, 
            role: roleToAssign 
          });
        
        if (roleError) {
          console.error("Role assignment error:", roleError);
          // Continue despite role error - we'll try to create wallet anyway
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
      
      // Create wallet directly
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

      // Record the welcome bonus transaction
      try {
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
          // Don't throw here, we want to return the wallet even if transaction recording fails
        } else {
          console.log("Welcome bonus transaction recorded");
        }
      } catch (txError) {
        console.error("Error recording transaction:", txError);
        // Continue despite transaction error
      }
      
      return wallet;
    } catch (error) {
      console.error('Error ensuring wallet created:', error);
      throw error;
    }
  };

  const onSubmit = async (values: z.infer<typeof registerSchema>) => {
    try {
      // Check if the user already exists
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

      // Register the user with Supabase Auth
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
        toast({
          title: "Registration Failed",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      // Ensure the user has a wallet with welcome bonus
      if (data.user) {
        try {
          await ensureWalletCreated(data.user.id);
          
          // If registration was successful
          toast({
            title: "Registration Successful",
            description: "You can now login with your credentials. You've received 369 coins as a welcome bonus!",
          });

          // Attempt to sign in immediately after registration
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
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <StudentOption control={form.control} />
        <PersonalInfoFields control={form.control} isStudent={form.watch("isStudent")} />
        <PasswordFields control={form.control} />
        <Button type="submit" className="w-full">Register</Button>
      </form>
    </Form>
  );
};
