
import React from 'react';
import { Check, Computer, LandmarkIcon, SearchIcon, ShieldCheck, Building2Icon } from 'lucide-react';
import { cn } from "@/lib/utils";

interface DomainSelectorProps {
  selectedDomain: string;
  onDomainChange: (domain: string) => void;
}

const domains = [
  {
    id: 'it',
    name: 'IT Consultancy',
    icon: <Computer className="h-4 w-4 mr-2" />,
    description: 'Software, hardware, cloud, cybersecurity'
  },
  {
    id: 'taxation',
    name: 'Taxation',
    icon: <LandmarkIcon className="h-4 w-4 mr-2" />,
    description: 'VAT, corporate tax, compliance'
  },
  {
    id: 'auditing',
    name: 'Auditing',
    icon: <SearchIcon className="h-4 w-4 mr-2" />,
    description: 'Financial audits, compliance reviews'
  },
  {
    id: 'aml',
    name: 'AML Compliance',
    icon: <ShieldCheck className="h-4 w-4 mr-2" />,
    description: 'Anti-money laundering, KYC, compliance'
  },
  {
    id: 'realestate',
    name: 'Real Estate',
    icon: <Building2Icon className="h-4 w-4 mr-2" />,
    description: 'Property investment, management, valuation'
  }
];

const DomainSelector: React.FC<DomainSelectorProps> = ({ selectedDomain, onDomainChange }) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-muted-foreground">Select Consultancy Domain:</label>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2">
        {domains.map((domain) => (
          <button
            key={domain.id}
            onClick={() => onDomainChange(domain.id)}
            className={cn(
              "flex flex-col items-start p-3 border rounded-md transition-colors text-left",
              selectedDomain === domain.id 
                ? "border-primary bg-primary/10" 
                : "border-border hover:border-primary/50"
            )}
          >
            <div className="flex items-center w-full justify-between mb-1">
              <div className="flex items-center font-medium">
                {domain.icon}
                {domain.name}
              </div>
              {selectedDomain === domain.id && (
                <Check className="h-4 w-4 text-primary" />
              )}
            </div>
            <p className="text-xs text-muted-foreground line-clamp-1">
              {domain.description}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default DomainSelector;
