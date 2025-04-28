
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { loginSchema } from '@/utils/authUtils';
import { supabase } from '@/integrations/supabase/client';

export const LoginForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [isResetMode, setIsResetMode] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  
  React.useEffect(() => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
  }, []);
  
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handlePasswordReset = async () => {
    try {
      const email = form.getValues("email");
      
      if (!email || !email.match(/^\S+@\S+\.\S+$/)) {
        toast({
          title: "Invalid Email",
          description: "Please enter a valid email address",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + '/login',
      });
      
      if (error) {
        toast({
          title: "Reset Failed",
          description: error.message,
          variant: "destructive",
        });
        return;
      }
      
      setResetSent(true);
      toast({
        title: "Password Reset Email Sent",
        description: "Check your inbox for password reset instructions",
      });
    } catch (error: any) {
      console.error("Password reset error:", error);
      toast({
        title: "Reset Failed",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
    }
  };

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });
      
      if (error) {
        toast({
          title: "Login Failed",
          description: error.message,
          variant: "destructive",
        });
        return;
      }
      
      if (data.user) {
        localStorage.setItem('userRole', 'user');
        localStorage.setItem('userEmail', data.user.email || '');
        localStorage.setItem('userName', data.user.user_metadata?.name || 'User');
        
        toast({
          title: "Login Successful",
          description: `Welcome, ${data.user.user_metadata?.name || 'User'}!`,
        });
        
        setTimeout(() => {
          navigate('/presales-consultancy');
        }, 100);
      }
    } catch (error: any) {
      console.error("Login error:", error);
      toast({
        title: "Login Failed",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
    }
  };

  if (isResetMode) {
    return (
      <div className="space-y-4">
        <div className="text-center mb-4">
          <h3 className="text-lg font-medium">Reset Password</h3>
          <p className="text-sm text-muted-foreground">
            Enter your email and we'll send you reset instructions
          </p>
        </div>
        
        {resetSent ? (
          <div className="bg-blue-50 border border-blue-200 rounded-md p-4 text-center">
            <p className="text-blue-800">Check your email for reset instructions</p>
            <Button 
              variant="link" 
              className="mt-2 p-0"
              onClick={() => {
                setIsResetMode(false);
                setResetSent(false);
              }}
            >
              Return to login
            </Button>
          </div>
        ) : (
          <>
            <Form {...form}>
              <form className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="you@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex flex-col gap-2">
                  <Button type="button" onClick={handlePasswordReset} className="w-full">
                    Send Reset Instructions
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setIsResetMode(false)}
                    className="w-full"
                  >
                    Back to Login
                  </Button>
                </div>
              </form>
            </Form>
          </>
        )}
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="you@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input 
                    type={showPassword ? "text" : "password"} 
                    {...field} 
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">Login</Button>
        
        <div className="text-center">
          <Button 
            type="button" 
            variant="link" 
            onClick={() => setIsResetMode(true)}
            className="p-0 h-auto text-sm"
          >
            Forgot your password?
          </Button>
        </div>
      </form>
    </Form>
  );
};
