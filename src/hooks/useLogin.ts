
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from "zod";
import { supabase } from '@/integrations/supabase/client';
import { useToast } from "@/hooks/use-toast";
import { loginSchema } from '@/utils/authUtils';

export const useLogin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const handleLogin = async (values: z.infer<typeof loginSchema>) => {
    setLoginError(null);
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });
      
      if (error) {
        console.error("Login error:", error);
        
        if (error.message.includes("Invalid login credentials")) {
          setLoginError("Your account may still be processing. If you just registered, please wait a minute and try again.");
        } else {
          setLoginError(error.message);
        }
        
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
        localStorage.setItem('userName', data.user.user_metadata.name || 'User');
        
        toast({
          title: "Login Successful",
          description: `Welcome, ${data.user.user_metadata.name || 'User'}!`,
        });
        
        setTimeout(() => {
          navigate('/presales-consultancy');
        }, 100);
      }
    } catch (error: any) {
      console.error("Login error:", error);
      setLoginError(error.message || "An unexpected error occurred");
      toast({
        title: "Login Failed",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleLogin,
    isLoading,
    loginError,
    setLoginError
  };
};
