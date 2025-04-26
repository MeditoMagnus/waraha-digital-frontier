
import { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from '@/utils/authUtils';
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { LoginAlerts } from './login/LoginAlerts';
import { LoginFormFields } from './login/LoginFormFields';
import { useLogin } from '@/hooks/useLogin';

interface LoginFormProps {
  defaultEmail?: string;
}

export const LoginForm = ({ defaultEmail = "" }: LoginFormProps) => {
  const { handleLogin, isLoading, loginError, setLoginError } = useLogin();
  
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: defaultEmail,
      password: "",
    },
  });

  useEffect(() => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
  }, []);

  useEffect(() => {
    if (loginError && form.getValues("email") !== defaultEmail) {
      setLoginError(null);
    }
  }, [form.getValues("email"), loginError, defaultEmail, setLoginError]);

  return (
    <>
      <LoginAlerts 
        loginError={loginError}
        defaultEmail={defaultEmail}
      />
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-4">
          <LoginFormFields control={form.control} />
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </Form>
    </>
  );
};
