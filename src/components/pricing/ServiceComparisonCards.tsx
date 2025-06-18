
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
      <Card className="pricing-card pricing-card-basic">
        <CardHeader className="pricing-card-header pricing-card-header-basic">
          <CardTitle className="pricing-card-title">Basic</CardTitle>
          <div className="pricing-card-price">AED 299<span className="pricing-card-period">/month</span></div>
        </CardHeader>
        <CardContent className="p-6">
          <ul className="space-y-3">
            {services.map((service) => (
              <li key={service.name} className="pricing-card-service-item">
                <span className="pricing-card-service-name">{service.name}</span>
                {renderServiceValue(service.basic)}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Standard Plan */}
      <Card className="pricing-card pricing-card-standard">
        <CardHeader className="pricing-card-header pricing-card-header-standard">
          <CardTitle className="pricing-card-title pricing-card-title-standard">Standard</CardTitle>
          <div className="pricing-card-price pricing-card-price-standard">AED 799<span className="pricing-card-period pricing-card-period-standard">/month</span></div>
          <div className="pricing-card-badge">RECOMMENDED</div>
        </CardHeader>
        <CardContent className="p-6">
          <ul className="space-y-3">
            {services.map((service) => (
              <li key={service.name} className="pricing-card-service-item pricing-card-service-item-standard">
                <span className="pricing-card-service-name pricing-card-service-name-standard">{service.name}</span>
                {renderServiceValue(service.standard)}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Premium Plan */}
      <Card className="pricing-card pricing-card-premium">
        <CardHeader className="pricing-card-header pricing-card-header-premium">
          <CardTitle className="pricing-card-title">Premium</CardTitle>
          <div className="pricing-card-price">AED 1799<span className="pricing-card-period">/month</span></div>
        </CardHeader>
        <CardContent className="p-6">
          <ul className="space-y-3">
            {services.map((service) => (
              <li key={service.name} className="pricing-card-service-item">
                <span className="pricing-card-service-name">{service.name}</span>
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
