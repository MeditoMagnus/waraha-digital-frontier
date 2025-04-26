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
        
        // Check if a user is logged in
        const { data: { user } } = await supabase.auth.getUser();
        
        // Also check localStorage for static admin credentials
        const userRole = localStorage.getItem('userRole');
        
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
        } else if (userRole === 'admin') {
          // If no Supabase user but admin is in localStorage, keep admin privileges
          navigate('/admin-dashboard');
        } else if (userRole === 'user') {
          // If no Supabase user but user is in localStorage, keep user privileges
          navigate('/presales-consultancy');
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
