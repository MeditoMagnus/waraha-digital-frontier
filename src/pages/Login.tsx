
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { AuthForms } from '@/components/AuthForms';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const checkAuthAndRole = async () => {
      try {
        setIsLoading(true);
        
        // Check if a user is logged in via Supabase
        const { data: { user } } = await supabase.auth.getUser();
        
        // Check localStorage for static admin credentials
        const userRole = localStorage.getItem('userRole');
        
        // For admin credentials in localStorage, skip further checks and redirect immediately
        if (userRole === 'admin') {
          navigate('/admin-dashboard');
          return;
        }
        
        // For regular user credentials in localStorage, redirect accordingly
        if (userRole === 'user' && !user) {
          navigate('/presales-consultancy');
          return;
        }

        // Only proceed with Supabase role check if we have a logged-in user
        if (user) {
          // Query the user_roles table to get the role for Supabase users
          const { data: roles, error } = await supabase
            .from('user_roles')
            .select('role')
            .eq('user_id', user.id);
          
          if (error) throw error;
          
          // Check if user has admin role
          const isAdmin = roles && roles.some(role => role.role === 'admin');
          
          if (isAdmin) {
            localStorage.setItem('userRole', 'admin');
            navigate('/admin-dashboard');
          } else {
            localStorage.setItem('userRole', 'user');
            navigate('/presales-consultancy');
          }
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        toast({
          title: 'Error',
          description: 'Failed to verify your account status.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuthAndRole();
  }, [navigate, toast]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Checking authentication status...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link 
          to="/" 
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Waraha Group
        </Link>
      </div>
      
      <div className="max-w-md mx-auto my-8">
        <AuthForms />
      </div>
    </div>
  );
};

export default Login;
