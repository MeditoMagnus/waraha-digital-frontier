
import React from 'react';
import { Check, X } from 'lucide-react';

interface Service {
  name: string;
  basic: boolean | string;
  standard: boolean | string;
  premium: boolean | string;
}

interface ServiceComparisonTableProps {
  services: Service[];
}

const ServiceComparisonTable: React.FC<ServiceComparisonTableProps> = ({ services }) => {
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
    <div className="hidden lg:block overflow-x-auto">
      <div className="bg-gradient-to-br from-slate-800/90 to-slate-700/90 backdrop-blur-md rounded-2xl overflow-hidden shadow-2xl border border-slate-600/30 dark:from-slate-800/90 dark:to-slate-700/90 dark:border-slate-600/30 light:from-white/90 light:to-muted-gray/30 light:border-muted-gray/30">
        <table className="w-full">
          <thead>
            <tr className="bg-gradient-to-r from-slate-700/80 to-slate-600/80 dark:from-slate-700/80 dark:to-slate-600/80 light:from-muted-gray/80 light:to-muted-gray/60">
              <th className="px-6 py-6 text-left font-serif text-lg text-slate-200 dark:text-slate-200 light:text-charcoal-black">Service</th>
              <th className="px-6 py-6 text-center font-serif text-lg border-l border-slate-600/30 dark:border-slate-600/30 light:border-muted-gray/30">
                <div className="text-slate-200 dark:text-slate-200 light:text-charcoal-black">Basic</div>
                <div className="text-2xl font-bold mt-2 text-slate-100 dark:text-slate-100 light:text-charcoal-black">AED 299</div>
                <div className="text-sm font-normal text-slate-300 dark:text-slate-300 light:text-charcoal-black/70">per month</div>
              </th>
              <th className="px-6 py-6 text-center font-serif text-lg border-l-2 border-r-2 border-yellow-500/50 bg-gradient-to-br from-yellow-900/60 to-amber-800/60 dark:border-yellow-500/50 dark:from-yellow-900/60 dark:to-amber-800/60 light:border-waraha-gold/50 light:from-waraha-gold/20 light:to-amber-100/60">
                <div className="text-yellow-200 dark:text-yellow-200 light:text-charcoal-black">Standard</div>
                <div className="text-2xl font-bold mt-2 text-yellow-400 dark:text-yellow-400 light:text-waraha-gold">AED 799</div>
                <div className="text-sm font-normal text-yellow-300 dark:text-yellow-300 light:text-charcoal-black/70">per month</div>
                <div className="text-xs text-yellow-300 font-medium mt-1 dark:text-yellow-300 light:text-waraha-gold">RECOMMENDED</div>
              </th>
              <th className="px-6 py-6 text-center font-serif text-lg border-l border-slate-600/30 dark:border-slate-600/30 light:border-muted-gray/30">
                <div className="text-slate-200 dark:text-slate-200 light:text-charcoal-black">Premium</div>
                <div className="text-2xl font-bold mt-2 text-slate-100 dark:text-slate-100 light:text-charcoal-black">AED 1799</div>
                <div className="text-sm font-normal text-slate-300 dark:text-slate-300 light:text-charcoal-black/70">per month</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {services.map((service, index) => (
              <tr 
                key={service.name} 
                className={`${index % 2 === 0 ? 'bg-slate-700/20 dark:bg-slate-700/20 light:bg-muted-gray/10' : 'bg-slate-600/20 dark:bg-slate-600/20 light:bg-white/50'} hover:bg-slate-600/30 dark:hover:bg-slate-600/30 light:hover:bg-muted-gray/20 transition-colors`}
              >
                <td className="px-6 py-4 font-medium text-slate-200 border-b border-slate-600/20 dark:text-slate-200 dark:border-slate-600/20 light:text-charcoal-black light:border-muted-gray/20">{service.name}</td>
                <td className="px-6 py-4 text-center border-b border-slate-600/20 border-l border-slate-600/30 dark:border-slate-600/20 dark:border-l dark:border-slate-600/30 light:border-muted-gray/20 light:border-l light:border-muted-gray/30">{renderServiceValue(service.basic)}</td>
                <td className="px-6 py-4 text-center border-b border-slate-600/20 border-l-2 border-r-2 border-yellow-500/30 bg-yellow-900/10 dark:border-slate-600/20 dark:border-l-2 dark:border-r-2 dark:border-yellow-500/30 dark:bg-yellow-900/10 light:border-muted-gray/20 light:border-l-2 light:border-r-2 light:border-waraha-gold/30 light:bg-waraha-gold/5">{renderServiceValue(service.standard)}</td>
                <td className="px-6 py-4 text-center border-b border-slate-600/20 border-l border-slate-600/30 dark:border-slate-600/20 dark:border-l dark:border-slate-600/30 light:border-muted-gray/20 light:border-l light:border-muted-gray/30">{renderServiceValue(service.premium)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ServiceComparisonTable;
