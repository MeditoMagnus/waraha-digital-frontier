
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkUserRole = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        setIsLoggedIn(true);
        const { data: roles } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id)
          .single();
        
        setIsAdmin(roles?.role === 'admin');
      } else {
        setIsLoggedIn(false);
        setIsAdmin(false);
      }
    };
    
    checkUserRole();
  }, []);

  const navLinks = [
    { 
      name: 'Home', 
      href: '/', 
      isPageLink: true 
    },
  ];
  
  const authLinks = isAdmin ? 
    [{ name: 'Admin Dashboard', href: '/admin-dashboard', isPageLink: true }] : 
    [];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const renderNavLink = (link: { name: string; href: string; isPageLink?: boolean; icon?: any }) => {
    if (link.isPageLink) {
      return (
        <Link 
          key={link.name} 
          to={link.href}
          className="text-white hover:text-waraha-gold transition-colors duration-300 relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-waraha-gold after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left flex items-center"
        >
          {link.icon && <link.icon className="mr-1 h-4 w-4" />}
          {link.name}
        </Link>
      );
    }
    
    return (
      <a 
        key={link.name} 
        href={link.href}
        className="text-white hover:text-waraha-gold transition-colors duration-300 relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-waraha-gold after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
      >
        {link.name}
      </a>
    );
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glassmorphism py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <a href="/" className="text-2xl font-serif font-bold text-white flex items-center">
          <span className="text-waraha-gold">W</span>araha <span className="text-waraha-silver ml-1">Group</span>
        </a>
        
        <div className="hidden md:flex space-x-8">
          {navLinks.map((link) => renderNavLink(link))}
          {authLinks.map((link) => renderNavLink(link))}
        </div>
        
        <button 
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {isMobileMenuOpen && (
        <div className="md:hidden glassmorphism fixed top-[60px] left-0 w-full z-50">
          <div className="flex flex-col space-y-4 p-4">
            {navLinks.map((link) => (
              <div key={link.name} onClick={() => setIsMobileMenuOpen(false)}>
                {renderNavLink(link)}
              </div>
            ))}
            {authLinks.map((link) => (
              <div key={link.name} onClick={() => setIsMobileMenuOpen(false)}>
                {renderNavLink(link)}
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
