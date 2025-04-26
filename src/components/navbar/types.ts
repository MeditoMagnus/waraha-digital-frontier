
import { ComponentType } from 'react';

export interface NavLinkType {
  name: string;
  href: string;
  isPageLink?: boolean;
  isLogout?: boolean;
  icon?: ComponentType;
  onClick?: () => void;
}
