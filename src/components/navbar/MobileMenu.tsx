
import React from 'react';
import { X } from 'lucide-react';
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
      {/* Full screen backdrop with blur */}
      <div 
        className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-lg z-40"
        onClick={onClose}
      />
      
      {/* Mobile menu panel */}
      <div className="md:hidden fixed top-0 right-0 h-full w-80 max-w-[80vw] bg-waraha-midnight/98 backdrop-blur-xl border-l border-white/20 shadow-2xl z-50 transform transition-transform duration-300">
        {/* Close button */}
        <div className="flex justify-end p-4">
          <button 
            onClick={onClose}
            className="text-white hover:text-waraha-gold transition-colors p-2 rounded-full hover:bg-white/10"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="flex flex-col h-full pt-4 px-6 pb-8">
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
