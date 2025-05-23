
import React, { useRef } from 'react';
import { useInView } from '../hooks/useInView';
import { 
  Computer, 
  Calculator, 
  FileSearch, 
  Shield, 
  Building, 
  BarChart3
} from 'lucide-react';
import { Button } from './ui/button';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay: number;
  keywords: string[];
  link: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, icon, delay, keywords, link }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { threshold: 0.1, once: true });

  return (
    <div 
      ref={cardRef}
      className="glassmorphism rounded-lg p-6 card-hover flex flex-col h-full"
      style={{ 
        animationDelay: `${delay}ms`,
        opacity: isInView ? 1 : 0,
        transform: isInView ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.7s ease-out, transform 0.7s ease-out'
      }}
    >
      <div className="h-12 w-12 mb-4 text-waraha-gold bg-waraha-midnight/50 rounded-full flex items-center justify-center">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
      <p className="text-gray-300 mb-4 flex-grow">{description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {keywords.map((keyword, index) => (
          <span key={index} className="text-xs bg-waraha-gold/20 text-waraha-gold px-2 py-1 rounded-full">
            {keyword}
          </span>
        ))}
      </div>
      <Button 
        asChild
        className="w-full bg-waraha-silver/20 hover:bg-waraha-gold hover:text-waraha-midnight border border-waraha-silver/30"
      >
        <a href={link}>Learn More</a>
      </Button>
    </div>
  );
};

const ComprehensiveServicesSection: React.FC = () => {
  const services = [
    {
      title: 'IT Consultancy',
      description: 'Strategic technology solutions tailored to your business needs. Our UAE-based IT experts provide comprehensive digital transformation services.',
      icon: <Computer size={24} />,
      keywords: ['Digital Transformation', 'Cloud Solutions', 'Cybersecurity'],
      link: '/services/it-consultancy'
    },
    {
      title: 'Taxation Services',
      description: 'Navigate UAE tax regulations with confidence. Our taxation experts provide VAT compliance, tax planning, and corporate tax services.',
      icon: <Calculator size={24} />,
      keywords: ['VAT Compliance', 'Tax Planning', 'UAE Corporate Tax'],
      link: '/services/taxation'
    },
    {
      title: 'Auditing & Accounting',
      description: 'Comprehensive auditing services ensuring financial transparency and regulatory compliance for businesses across the UAE.',
      icon: <FileSearch size={24} />,
      keywords: ['Financial Audits', 'Regulatory Compliance', 'Risk Assessment'],
      link: '/services/auditing'
    },
    {
      title: 'AML Compliance',
      description: 'Stay compliant with UAE\'s anti-money laundering regulations. Our AML experts provide comprehensive compliance solutions.',
      icon: <Shield size={24} />,
      keywords: ['Regulatory Compliance', 'Risk Management', 'Due Diligence'],
      link: '/services/aml-compliance'
    },
    {
      title: 'Real Estate Consultancy',
      description: 'Expert guidance for real estate investments in the UAE market. From property valuation to investment strategy, we\'ve got you covered.',
      icon: <Building size={24} />,
      keywords: ['Property Investment', 'Market Analysis', 'UAE Real Estate'],
      link: '/services/real-estate'
    },
    {
      title: 'Business Advisory',
      description: 'Strategic business consulting to optimize performance, manage risks, and achieve sustainable growth in the competitive UAE market.',
      icon: <BarChart3 size={24} />,
      keywords: ['Business Strategy', 'Performance Optimization', 'Growth Planning'],
      link: '/services/business-advisory'
    },
  ];

  return (
    <section id="comprehensive-services" className="section bg-gradient-to-b from-waraha-midnight to-[#192236] py-20">
      <div className="container mx-auto">
        <h2 className="section-title">Our Comprehensive Services</h2>
        <p className="text-center text-gray-300 mb-12 max-w-3xl mx-auto">
          At Waraha Group, we deliver a wide range of professional services tailored to the UAE business landscape.
          Our integrated approach ensures excellence across IT, taxation, auditing, compliance, and real estate consultancy.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard 
              key={service.title}
              title={service.title}
              description={service.description}
              icon={service.icon}
              delay={index * 150}
              keywords={service.keywords}
              link={service.link}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ComprehensiveServicesSection;
