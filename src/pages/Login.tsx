
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { AuthForms } from '@/components/AuthForms';
import { supabase } from '@/integrations/supabase/client';

const Login = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // First check localStorage for admin role
    const userRole = localStorage.getItem('userRole');
    if (userRole === 'admin') {
      navigate('/admin-dashboard');
      return;
    }
    
    // Then check Supabase auth session for regular users
    const checkAuthSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        localStorage.setItem('userRole', 'user');
        navigate('/presales-consultancy');
      }
    };
    
    checkAuthSession();
  }, [navigate]);

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
