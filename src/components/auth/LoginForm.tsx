
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, LogIn, UserRound, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { loginSchema, MOCK_USERS, verifyPassword } from '@/utils/authUtils';

export const LoginForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      isAdmin: false,
    },
  });

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    if (values.isAdmin) {
      // Admin authentication
      if (values.email === "admin@warahagroup.com" && values.password === "22Waraha#*") {
        // Clear any existing conflicting data first
        localStorage.clear();
        
        // Store admin credentials in localStorage
        localStorage.setItem("userRole", "admin");
        localStorage.setItem("userName", "Admin");
        
        toast({
          title: "Admin Login Successful",
          description: "Welcome to the admin dashboard",
        });
        
        // Navigate to admin dashboard after a delay to ensure localStorage is set
        setTimeout(() => {
          navigate("/admin-dashboard");
        }, 300);
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid admin credentials",
          variant: "destructive",
        });
      }
    } else {
      // Regular user authentication
      const user = MOCK_USERS.find(user => user.email === values.email);
      
      if (user && verifyPassword(values.password, user.passwordHash)) {
        // Clear any existing conflicting data first
        localStorage.clear();
        
        localStorage.setItem("userRole", "user");
        localStorage.setItem("userEmail", user.email);
        localStorage.setItem("userName", user.name);
        
        toast({
          title: "Login Successful",
          description: `Welcome back, ${user.name}`,
        });
        
        // Using a small timeout to ensure localStorage is updated
        setTimeout(() => {
          navigate("/presales-consultancy");
        }, 300);
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid email or password",
          variant: "destructive",
        });
      }
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
                <div className="flex items-center border rounded-md focus-within:ring-1 focus-within:ring-ring">
                  <div className="p-2 text-muted-foreground">
                    <UserRound size={20} />
                  </div>
                  <Input
                    placeholder="yourname@company.com"
                    className="border-0 focus-visible:ring-0"
                    {...field}
                  />
                </div>
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
                <div className="flex items-center border rounded-md focus-within:ring-1 focus-within:ring-ring">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="border-0 focus-visible:ring-0"
                    {...field}
                  />
                  <div 
                    className="p-2 cursor-pointer text-muted-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isAdmin"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="flex items-center">
                  <Shield className="mr-1 h-4 w-4" />
                  Login as Admin
                </FormLabel>
              </div>
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          <LogIn className="mr-2 h-4 w-4" /> Sign In
        </Button>
      </form>
    </Form>
  );
};
