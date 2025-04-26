import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  
  // Check login status whenever component mounts
  useEffect(() => {
    const role = localStorage.getItem('userRole');
    setIsLoggedIn(!!role);
    setUserRole(role);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Why Us', href: '#why-us' },
    { name: 'Contact', href: '#contact' },
    { 
      name: 'AI Consultant', 
      href: '/login', 
      isPageLink: true 
    },
  ];
  
  // Add admin dashboard link if user is admin
  const authLinks = isLoggedIn && userRole === 'admin' ? 
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
        <a href="#home" className="text-2xl font-serif font-bold text-white flex items-center">
          <span className="text-waraha-gold">W</span>araha <span className="text-waraha-silver ml-1">Group</span>
        </a>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          {navLinks.map((link) => renderNavLink(link))}
          {authLinks.map((link) => renderNavLink(link))}
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Menu */}
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
