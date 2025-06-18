
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
      return <span className="text-yellow-400 font-semibold dark:text-yellow-400 light:text-waraha-gold-exact">{value}</span>;
    }
  };

  return (
    <div className="hidden lg:block overflow-x-auto">
      <div className="bg-gradient-to-br from-slate-800/90 to-slate-700/90 backdrop-blur-md rounded-2xl overflow-hidden shadow-2xl border border-slate-600/30 dark:from-slate-800/90 dark:to-slate-700/90 dark:border-slate-600/30 light:from-pure-white-exact light:to-off-white-exact light:border-muted-gray-exact">
        <table className="w-full">
          <thead>
            <tr className="bg-gradient-to-r from-slate-700/80 to-slate-600/80 dark:from-slate-700/80 dark:to-slate-600/80 light:from-muted-gray-exact/50 light:to-muted-gray-exact/30">
              <th className="px-6 py-6 text-left font-serif text-lg text-slate-200 dark:text-slate-200 light:text-charcoal-black-exact">Service</th>
              <th className="px-6 py-6 text-center font-serif text-lg border-l border-slate-600/30 dark:border-slate-600/30 light:border-muted-gray-exact">
                <div className="text-slate-200 dark:text-slate-200 light:text-charcoal-black-exact">Basic</div>
                <div className="text-2xl font-bold mt-2 text-slate-100 dark:text-slate-100 light:text-charcoal-black-exact">AED 299</div>
                <div className="text-sm font-normal text-slate-300 dark:text-slate-300 light:text-charcoal-black-exact/70">per month</div>
              </th>
              <th className="px-6 py-6 text-center font-serif text-lg border-l-2 border-r-2 border-yellow-500/50 bg-gradient-to-br from-yellow-900/60 to-amber-800/60 dark:border-yellow-500/50 dark:from-yellow-900/60 dark:to-amber-800/60 light:border-waraha-gold-exact light:from-waraha-gold-exact/20 light:to-waraha-gold-exact/10 light:bg-waraha-gold-exact/5">
                <div className="text-yellow-200 dark:text-yellow-200 light:text-charcoal-black-exact">Standard</div>
                <div className="text-2xl font-bold mt-2 text-yellow-400 dark:text-yellow-400 light:text-waraha-gold-exact">AED 799</div>
                <div className="text-sm font-normal text-yellow-300 dark:text-yellow-300 light:text-charcoal-black-exact/70">per month</div>
                <div className="text-xs text-yellow-300 font-medium mt-1 dark:text-yellow-300 light:text-waraha-gold-exact">RECOMMENDED</div>
              </th>
              <th className="px-6 py-6 text-center font-serif text-lg border-l border-slate-600/30 dark:border-slate-600/30 light:border-muted-gray-exact">
                <div className="text-slate-200 dark:text-slate-200 light:text-charcoal-black-exact">Premium</div>
                <div className="text-2xl font-bold mt-2 text-slate-100 dark:text-slate-100 light:text-charcoal-black-exact">AED 1799</div>
                <div className="text-sm font-normal text-slate-300 dark:text-slate-300 light:text-charcoal-black-exact/70">per month</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {services.map((service, index) => (
              <tr 
                key={service.name} 
                className={`${index % 2 === 0 ? 'bg-slate-700/20 dark:bg-slate-700/20 light:bg-off-white-exact' : 'bg-slate-600/20 dark:bg-slate-600/20 light:bg-pure-white-exact'} hover:bg-slate-600/30 dark:hover:bg-slate-600/30 light:hover:bg-muted-gray-exact/20 transition-colors`}
              >
                <td className="px-6 py-4 font-medium text-slate-200 border-b border-slate-600/20 dark:text-slate-200 dark:border-slate-600/20 light:text-charcoal-black-exact light:border-muted-gray-exact/30">{service.name}</td>
                <td className="px-6 py-4 text-center border-b border-slate-600/20 border-l border-slate-600/30 dark:border-slate-600/20 dark:border-l dark:border-slate-600/30 light:border-muted-gray-exact/30 light:border-l light:border-muted-gray-exact">{renderServiceValue(service.basic)}</td>
                <td className="px-6 py-4 text-center border-b border-slate-600/20 border-l-2 border-r-2 border-yellow-500/30 bg-yellow-900/10 dark:border-slate-600/20 dark:border-l-2 dark:border-r-2 dark:border-yellow-500/30 dark:bg-yellow-900/10 light:border-muted-gray-exact/30 light:border-l-2 light:border-r-2 light:border-waraha-gold-exact/50 light:bg-waraha-gold-exact/5">{renderServiceValue(service.standard)}</td>
                <td className="px-6 py-4 text-center border-b border-slate-600/20 border-l border-slate-600/30 dark:border-slate-600/20 dark:border-l dark:border-slate-600/30 light:border-muted-gray-exact/30 light:border-l light:border-muted-gray-exact">{renderServiceValue(service.premium)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ServiceComparisonTable;
