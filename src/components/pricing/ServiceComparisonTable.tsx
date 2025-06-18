
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
      <div className="pricing-table-container">
        <table className="w-full">
          <thead>
            <tr className="pricing-table-header">
              <th className="pricing-table-service-header">Service</th>
              <th className="pricing-table-plan-header">
                <div className="pricing-table-plan-name">Basic</div>
                <div className="pricing-table-price">AED 299</div>
                <div className="pricing-table-period">per month</div>
              </th>
              <th className="pricing-table-plan-header pricing-table-recommended">
                <div className="pricing-table-plan-name">Standard</div>
                <div className="pricing-table-price pricing-table-recommended-price">AED 799</div>
                <div className="pricing-table-period">per month</div>
                <div className="pricing-table-badge">RECOMMENDED</div>
              </th>
              <th className="pricing-table-plan-header">
                <div className="pricing-table-plan-name">Premium</div>
                <div className="pricing-table-price">AED 1799</div>
                <div className="pricing-table-period">per month</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {services.map((service, index) => (
              <tr 
                key={service.name} 
                className={`pricing-table-row ${index % 2 === 0 ? 'pricing-table-row-even' : 'pricing-table-row-odd'}`}
              >
                <td className="pricing-table-service-cell">{service.name}</td>
                <td className="pricing-table-value-cell">{renderServiceValue(service.basic)}</td>
                <td className="pricing-table-value-cell pricing-table-recommended-cell">{renderServiceValue(service.standard)}</td>
                <td className="pricing-table-value-cell">{renderServiceValue(service.premium)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ServiceComparisonTable;
