
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
    <div className="md:hidden glassmorphism fixed top-[60px] left-0 w-full z-50">
      <div className="flex flex-col space-y-4 p-4">
        {links.map((link) => (
          <div key={link.name} onClick={onClose}>
            <NavLink {...link} />
          </div>
        ))}
        {authLinks.map((link) => (
          <div key={link.name} onClick={onClose}>
            <NavLink {...link} />
          </div>
        ))}
      </div>
    </div>
  );
};
