
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { BrandLogo } from './navbar/BrandLogo';
import { DesktopNav } from './navbar/DesktopNav';
import { MobileMenu } from './navbar/MobileMenu';
import { NavLinkType } from './navbar/types';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: NavLinkType[] = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#comprehensive-services' },
    { name: 'Why Us', href: '#why-us' },
    { name: 'Contact', href: '#contact' },
    { 
      name: 'AI Consultant', 
      href: '/consultant-access', 
      isPageLink: true,
      isPremium: true
    },
  ];
  
  const authLinks: NavLinkType[] = [];

  return (
    <>
      {/* Backdrop blur overlay that appears when scrolled */}
      {isScrolled && (
        <div className="fixed top-0 left-0 right-0 h-20 navbar-bg backdrop-blur-xl border-b navbar-border z-40" />
      )}
      
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'navbar-bg shadow-2xl py-2' 
            : 'bg-transparent py-4'
        }`}
      >
        <div className="container mx-auto flex justify-between items-center px-4">
          <BrandLogo />
          
          <DesktopNav links={navLinks} authLinks={authLinks} />
          
          <button 
            className="md:hidden navbar-text z-50 relative"
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
    </>
  );
};

export default Navbar;
