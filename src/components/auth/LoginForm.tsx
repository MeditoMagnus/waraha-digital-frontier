
import React from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { loginSchema, verifyPassword } from '@/utils/authUtils';
import { supabase } from '@/integrations/supabase/client';

export const LoginForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Clear any existing session data on component mount to prevent conflicts
  React.useEffect(() => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
  }, []);
  
  // Admin credentials
  const ADMIN_EMAIL = "admin@warahagroup.com";
  const ADMIN_PASSWORD = "22Waraha#*";
  
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      isAdmin: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    try {
      // Check if this is the admin user
      if (values.email === ADMIN_EMAIL && values.password === ADMIN_PASSWORD) {
        // Store admin info in localStorage
        localStorage.setItem('userRole', 'admin');
        localStorage.setItem('userName', 'Admin');
        localStorage.setItem('userEmail', ADMIN_EMAIL);
        
        toast({
          title: "Login Successful",
          description: "Welcome, Admin!",
        });
        
        // Use setTimeout to avoid issues with redirects
        setTimeout(() => {
          navigate('/admin-dashboard');
        }, 100);
        return;
      }
      
      // Regular user authentication using Supabase
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
        // Set regular user role
        localStorage.setItem('userRole', 'user');
        localStorage.setItem('userEmail', data.user.email || '');
        localStorage.setItem('userName', data.user.user_metadata.name || 'User');
        
        toast({
          title: "Login Successful",
          description: `Welcome, ${data.user.user_metadata.name || 'User'}!`,
        });
        
        // Use setTimeout to avoid issues with redirects
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
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">Login</Button>
      </form>
    </Form>
  );
};
