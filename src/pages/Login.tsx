
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { AuthForms } from '@/components/AuthForms';

const Login = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const userRole = localStorage.getItem('userRole');
    if (userRole === 'user') {
      navigate('/presales-consultancy');
    } else if (userRole === 'admin') {
      navigate('/admin-dashboard');
    }
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
