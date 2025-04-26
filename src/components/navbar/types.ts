
import { SVGProps } from 'react';

export interface NavLinkType {
  name: string;
  href: string;
  isPageLink?: boolean;
  isLogout?: boolean;
  isPremium?: boolean;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  onClick?: () => void;
}
