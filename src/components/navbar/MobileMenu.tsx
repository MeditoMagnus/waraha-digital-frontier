
import React from 'react';
import { NavLink } from './NavLink';
import { NavLinkType } from './types';

interface MobileMenuProps {
  isOpen: boolean;
  links: NavLinkType[];
  authLinks: NavLinkType[];
  onClose: () => void;
}

export const MobileMenu = ({ isOpen, links, authLinks, onClose }: MobileMenuProps) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop overlay */}
      <div 
        className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        onClick={onClose}
      />
      
      {/* Mobile menu */}
      <div className="md:hidden fixed top-0 right-0 h-full w-80 max-w-[80vw] bg-waraha-midnight/95 backdrop-blur-md border-l border-white/10 shadow-xl z-50 transform transition-transform duration-300">
        <div className="flex flex-col h-full pt-20 px-6">
          <div className="flex flex-col space-y-6">
            {links.map((link) => (
              <div key={link.name} onClick={onClose} className="text-lg">
                <NavLink {...link} />
              </div>
            ))}
            {authLinks.map((link) => (
              <div key={link.name} onClick={onClose} className="text-lg">
                <NavLink {...link} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
