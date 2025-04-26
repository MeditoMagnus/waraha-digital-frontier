
import React from 'react';
import { Link } from 'react-router-dom';

interface NavLinkProps {
  href: string;
  name: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  isLogout?: boolean;
  isPageLink?: boolean;
  onClick?: () => void;
}

export const NavLink = ({ 
  href, 
  name, 
  icon: Icon, 
  isLogout, 
  isPageLink, 
  onClick 
}: NavLinkProps) => {
  if (isLogout) {
    return (
      <button 
        onClick={onClick}
        className="text-white hover:text-waraha-gold transition-colors duration-300 flex items-center"
      >
        {Icon && <Icon className="mr-1 h-4 w-4" />}
        {name}
      </button>
    );
  }
  
  if (isPageLink) {
    return (
      <Link 
        to={href}
        className="text-white hover:text-waraha-gold transition-colors duration-300 relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-waraha-gold after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left flex items-center"
      >
        {Icon && <Icon className="mr-1 h-4 w-4" />}
        {name}
      </Link>
    );
  }
  
  return (
    <a 
      href={href}
      className="text-white hover:text-waraha-gold transition-colors duration-300 relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-waraha-gold after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
    >
      {name}
    </a>
  );
};
