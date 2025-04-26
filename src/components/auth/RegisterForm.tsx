import React from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
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
} from "@/components/ui/form";
import { registerSchema } from '@/utils/authUtils';
import { supabase } from '@/integrations/supabase/client';
import { Checkbox } from "@/components/ui/checkbox";

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

  const onSubmit = async (values: z.infer<typeof registerSchema>) => {
    try {
      // Check if the user already exists
      const { data: existingAuth, error: authError } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: "dummy-password-for-check",
      });
      
      // If no error about invalid credentials, it means the email exists
      if (!authError || authError.message !== "Invalid login credentials") {
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

      // Assign user role based on student status
      if (data.user) {
        const roleToAssign = values.isStudent ? 'student' : 'user';
        const { error: roleError } = await supabase
          .from('user_roles')
          .insert({ 
            user_id: data.user.id, 
            role: roleToAssign 
          });

        if (roleError) {
          console.error("Role assignment error:", roleError);
          toast({
            title: "Role Assignment Failed",
            description: "Could not assign user role",
            variant: "destructive",
          });
        }
      }

      // Track the registration
      await trackRegistration(values.email, values.name);

      // If registration was successful
      toast({
        title: "Registration Successful",
        description: "You can now login with your credentials",
      });

      setLoginEmail(values.email);
      onSuccess();

    } catch (error: any) {
      console.error("Error in registration:", error);
      toast({
        title: "Registration Failed",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
    }
  };

  // Helper function to track registration
  const trackRegistration = async (email: string, name: string) => {
    try {
      await supabase.functions.invoke('track-registration', {
        body: { email, name }
      });
    } catch (error) {
      console.error("Error tracking registration:", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="John Smith" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Email</FormLabel>
              <FormControl>
                <Input placeholder="yourname@company.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="+1234567890" {...field} />
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

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="designation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Designation (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="Software Engineer, Product Manager, etc." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isStudent"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 border rounded">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  I am a student looking for IT career guidance
                </FormLabel>
                <p className="text-sm text-muted-foreground">
                  Students get access to our upcoming resume services and career guidance
                </p>
              </div>
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">Register</Button>
      </form>
    </Form>
  );
};
