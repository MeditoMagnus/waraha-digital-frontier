
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
import { countries } from '@/data/countries';

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
      isStudent: false,
      country: ""
    },
  });

  const onSubmit = async (values: z.infer<typeof registerSchema>) => {
    try {
      // Format phone number with country code if provided
      let formattedPhoneNumber = values.phoneNumber;
      if (values.phoneNumber && values.country) {
        const country = countries.find(c => c.code === values.country);
        if (country) {
          formattedPhoneNumber = `${country.dialCode}${values.phoneNumber.replace(/^0+/, '')}`;
        }
      }

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
            phone_number: formattedPhoneNumber || null,
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
        
        // Also track registration in Edge Function for analytics
        try {
          // Use the constant URL instead of accessing supabaseUrl property
          const response = await fetch("https://iympksahhwfpirxtoljs.supabase.co/functions/v1/track-registration", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              // Use the constant API key from the imports
              'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml5bXBrc2FoaHdmcGlyeHRvbGpzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU2NTM4NzksImV4cCI6MjA2MTIyOTg3OX0.-cNhRxmkcpnoor42GieeKhuHwYWUqTCBqWCxDjwcpAs`
            },
            body: JSON.stringify({
              email: values.email,
              name: values.name
            })
          });
          
          if (!response.ok) {
            console.warn('Failed to track registration:', await response.text());
          }
        } catch (trackError) {
          console.warn('Error tracking registration:', trackError);
        }
      }

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
