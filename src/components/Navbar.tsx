
import React, { useState, useEffect } from 'react';
import { Menu, X, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from "@/hooks/use-toast";
import { BrandLogo } from './navbar/BrandLogo';
import { DesktopNav } from './navbar/DesktopNav';
import { MobileMenu } from './navbar/MobileMenu';
import { NavLinkType } from './navbar/types';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Check login status whenever component mounts
  useEffect(() => {
    const checkAuth = async () => {
      // First check localStorage for admin
      const storedRole = localStorage.getItem('userRole');
      
      if (storedRole === 'admin') {
        setIsLoggedIn(true);
        setUserRole('admin');
        return;
      }
      
      // Then check Supabase auth for regular users
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setIsLoggedIn(true);
        setUserRole('user');
      } else {
        setIsLoggedIn(false);
        setUserRole(null);
      }
    };
    
    checkAuth();
    
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_IN') {
          setIsLoggedIn(true);
          setUserRole('user');
        } else if (event === 'SIGNED_OUT') {
          // Only clear if not admin
          if (localStorage.getItem('userRole') !== 'admin') {
            setIsLoggedIn(false);
            setUserRole(null);
          }
        }
      }
    );
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    
    await supabase.auth.signOut();
    
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully",
    });
    
    navigate('/login');
  };

  const navLinks: NavLinkType[] = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Why Us', href: '#why-us' },
    { name: 'Contact', href: '#contact' },
    { 
      name: isLoggedIn ? 'AI Consultant' : 'AI Consultant', 
      href: isLoggedIn && userRole === 'user' ? '/presales-consultancy' : '/login', 
      isPageLink: true 
    },
  ];
  
  const authLinks: NavLinkType[] = isLoggedIn ? (
    userRole === 'admin' ? [
      { name: 'Admin Dashboard', href: '/admin-dashboard', isPageLink: true },
      { name: 'Logout', href: '#', isLogout: true, icon: LogOut, onClick: handleLogout }
    ] : [
      { name: 'Logout', href: '#', isLogout: true, icon: LogOut, onClick: handleLogout }
    ]
  ) : [];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glassmorphism py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <BrandLogo />
        
        <DesktopNav links={navLinks} authLinks={authLinks} />
        
        <button 
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      <MobileMenu 
        isOpen={isMobileMenuOpen}
        links={navLinks}
        authLinks={authLinks}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </nav>
  );
};

export default Navbar;
