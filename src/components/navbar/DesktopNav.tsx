
import React from 'react';
import { NavLink } from './NavLink';
import { NavLinkType } from './types';
import ThemeToggle from '../ThemeToggle';

interface DesktopNavProps {
  links: NavLinkType[];
  authLinks: NavLinkType[];
}

export const DesktopNav = ({ links, authLinks }: DesktopNavProps) => {
  return (
    <div className="hidden md:flex items-center space-x-8">
      {links.map((link) => (
        <NavLink key={link.name} {...link} />
      ))}
      {authLinks.map((link) => (
        <NavLink key={link.name} {...link} />
      ))}
      <ThemeToggle />
    </div>
  );
};
