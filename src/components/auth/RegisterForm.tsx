
import React from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { registerSchema } from '@/utils/authUtils';
import { StudentOption } from './registration/StudentOption';
import { PersonalInfoFields } from './registration/PersonalInfoFields';
import { PasswordFields } from './registration/PasswordFields';
import { useRegistration } from '@/hooks/useRegistration';

interface RegisterFormProps {
  onSuccess: () => void;
  setLoginEmail: (email: string) => void;
}

export const RegisterForm = ({ onSuccess, setLoginEmail }: RegisterFormProps) => {
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

  const { handleRegistration, isSubmitting } = useRegistration({ 
    onSuccess, 
    setLoginEmail 
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleRegistration)} className="space-y-6">
        <StudentOption control={form.control} />
        <PersonalInfoFields control={form.control} isStudent={form.watch("isStudent")} />
        <PasswordFields control={form.control} />
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Registering..." : "Register"}
        </Button>
      </form>
    </Form>
  );
};
