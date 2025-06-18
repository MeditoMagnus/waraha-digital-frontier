
import React from 'react';
import { Check, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Service {
  name: string;
  basic: boolean | string;
  standard: boolean | string;
  premium: boolean | string;
}

interface ServiceComparisonCardsProps {
  services: Service[];
}

const ServiceComparisonCards: React.FC<ServiceComparisonCardsProps> = ({ services }) => {
  const renderServiceValue = (value: boolean | string) => {
    if (value === true) {
      return <Check className="h-5 w-5 text-emerald-400 mx-auto" />;
    } else if (value === false) {
      return <X className="h-5 w-5 text-red-400 mx-auto" />;
    } else {
      return <span className="text-yellow-400 font-semibold">{value}</span>;
    }
  };

  return (
    <div className="block lg:hidden space-y-6">
      {/* Basic Plan */}
      <Card className="bg-slate-800/80 backdrop-blur-md border-slate-600/50 shadow-2xl dark:bg-slate-800/80 dark:border-slate-600/50 light:bg-white/90 light:border-muted-gray/50">
        <CardHeader className="text-center bg-gradient-to-r from-slate-700/50 to-slate-600/50 dark:from-slate-700/50 dark:to-slate-600/50 light:from-muted-gray/50 light:to-muted-gray/30">
          <CardTitle className="text-2xl font-serif text-slate-100 dark:text-slate-100 light:text-charcoal-black">Basic</CardTitle>
          <div className="text-3xl font-bold text-slate-100 dark:text-slate-100 light:text-charcoal-black">AED 299<span className="text-sm font-normal text-slate-300 dark:text-slate-300 light:text-charcoal-black/70">/month</span></div>
        </CardHeader>
        <CardContent className="p-6">
          <ul className="space-y-3">
            {services.map((service) => (
              <li key={service.name} className="flex justify-between items-center py-2 border-b border-slate-600/30 dark:border-slate-600/30 light:border-muted-gray/30">
                <span className="text-sm text-slate-200 dark:text-slate-200 light:text-charcoal-black">{service.name}</span>
                {renderServiceValue(service.basic)}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Standard Plan */}
      <Card className="bg-gradient-to-br from-yellow-900/80 to-amber-800/80 backdrop-blur-md border-yellow-500/50 shadow-2xl border-2 dark:from-yellow-900/80 dark:to-amber-800/80 dark:border-yellow-500/50 light:from-waraha-gold/20 light:to-amber-100/80 light:border-waraha-gold/50">
        <CardHeader className="text-center bg-gradient-to-r from-yellow-700/50 to-amber-600/50 dark:from-yellow-700/50 dark:to-amber-600/50 light:from-waraha-gold/30 light:to-amber-200/50">
          <CardTitle className="text-2xl font-serif text-yellow-100 dark:text-yellow-100 light:text-charcoal-black">Standard</CardTitle>
          <div className="text-3xl font-bold text-yellow-400 dark:text-yellow-400 light:text-waraha-gold">AED 799<span className="text-sm font-normal text-yellow-200 dark:text-yellow-200 light:text-charcoal-black/70">/month</span></div>
          <div className="text-xs text-yellow-300 font-medium dark:text-yellow-300 light:text-waraha-gold">RECOMMENDED</div>
        </CardHeader>
        <CardContent className="p-6">
          <ul className="space-y-3">
            {services.map((service) => (
              <li key={service.name} className="flex justify-between items-center py-2 border-b border-yellow-600/30 dark:border-yellow-600/30 light:border-waraha-gold/30">
                <span className="text-sm text-yellow-100 dark:text-yellow-100 light:text-charcoal-black">{service.name}</span>
                {renderServiceValue(service.standard)}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Premium Plan */}
      <Card className="bg-slate-800/80 backdrop-blur-md border-slate-600/50 shadow-2xl dark:bg-slate-800/80 dark:border-slate-600/50 light:bg-white/90 light:border-muted-gray/50">
        <CardHeader className="text-center bg-gradient-to-r from-slate-700/50 to-slate-600/50 dark:from-slate-700/50 dark:to-slate-600/50 light:from-muted-gray/50 light:to-muted-gray/30">
          <CardTitle className="text-2xl font-serif text-slate-100 dark:text-slate-100 light:text-charcoal-black">Premium</CardTitle>
          <div className="text-3xl font-bold text-slate-100 dark:text-slate-100 light:text-charcoal-black">AED 1799<span className="text-sm font-normal text-slate-300 dark:text-slate-300 light:text-charcoal-black/70">/month</span></div>
        </CardHeader>
        <CardContent className="p-6">
          <ul className="space-y-3">
            {services.map((service) => (
              <li key={service.name} className="flex justify-between items-center py-2 border-b border-slate-600/30 dark:border-slate-600/30 light:border-muted-gray/30">
                <span className="text-sm text-slate-200 dark:text-slate-200 light:text-charcoal-black">{service.name}</span>
                {renderServiceValue(service.premium)}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default ServiceComparisonCards;
