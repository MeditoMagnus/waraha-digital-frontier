
import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Star } from "lucide-react";

interface NavLinkProps {
  href: string;
  name: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  isLogout?: boolean;
  isPageLink?: boolean;
  isPremium?: boolean;
  onClick?: () => void;
}

export const NavLink = ({ 
  href, 
  name, 
  icon: Icon, 
  isLogout, 
  isPageLink,
  isPremium,
  onClick 
}: NavLinkProps) => {
  const content = (
    <span className="flex items-center gap-2">
      {Icon && <Icon className="mr-1 h-4 w-4" />}
      {name}
      {isPremium && (
        <Badge variant="secondary" className="ml-1 py-0 px-1.5 h-5 bg-amber-200/10 text-amber-500 hover:bg-amber-200/20">
          <Star className="h-3 w-3 mr-0.5" />
          <span className="text-[10px] font-medium">PRO</span>
        </Badge>
      )}
    </span>
  );

  const wrappedContent = isPremium ? (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {content}
        </TooltipTrigger>
        <TooltipContent>
          <p>Premium Feature - Exclusive for Paid Users</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ) : content;

  if (isLogout) {
    return (
      <button 
        onClick={onClick}
        className="text-white hover:text-waraha-gold transition-colors duration-300 flex items-center"
      >
        {wrappedContent}
      </button>
    );
  }
  
  if (isPageLink) {
    return (
      <Link 
        to={href}
        className="text-white hover:text-waraha-gold transition-colors duration-300 relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-waraha-gold after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left flex items-center"
      >
        {wrappedContent}
      </Link>
    );
  }
  
  return (
    <a 
      href={href}
      className="text-white hover:text-waraha-gold transition-colors duration-300 relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-waraha-gold after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
    >
      {wrappedContent}
    </a>
  );
};
