
import React, { useRef } from 'react';
import { useInView } from '../hooks/useInView';
import { 
  HelpCircle, 
  Activity, 
  HardDrive, 
  Smartphone, 
  Users, 
  Database, 
  FileSearch, 
  Shield 
} from 'lucide-react';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, icon, delay }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { threshold: 0.1, once: true });

  return (
    <div 
      ref={cardRef}
      className={`glassmorphism rounded-lg p-6 card-hover ${
        isInView ? 'animate-fade-in' : 'opacity-0'
      }`}
      style={{ 
        animationDelay: `${delay}ms`,
        opacity: isInView ? 1 : 0,
        transform: isInView ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.7s ease-out, transform 0.7s ease-out'
      }}
    >
      <div className="flex items-center mb-4">
        <div className="p-2 bg-waraha-gold/10 rounded-md text-waraha-gold mr-3">
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-white">{title}</h3>
      </div>
      <p className="text-gray-300">{description}</p>
    </div>
  );
};

const ServicesSection: React.FC = () => {
  const services = [
    {
      title: 'IT Helpdesk Management',
      description: 'Round-the-clock support and issue resolution to keep your business running smoothly.',
      icon: <HelpCircle size={24} />,
    },
    {
      title: 'Network Monitoring',
      description: 'Proactive monitoring and management of your network infrastructure for optimal performance.',
      icon: <Activity size={24} />,
    },
    {
      title: 'Asset Management',
      description: 'Comprehensive tracking and management of all your IT assets throughout their lifecycle.',
      icon: <HardDrive size={24} />,
    },
    {
      title: 'Endpoint Management',
      description: 'Secure and efficient management of all endpoints in your organization.',
      icon: <Smartphone size={24} />,
    },
    {
      title: 'Active Directory & Entra ID',
      description: 'Expert management of user identities, access control, and directory services.',
      icon: <Users size={24} />,
    },
    {
      title: 'Backup Solutions',
      description: 'Reliable data backup and recovery solutions to protect your valuable information.',
      icon: <Database size={24} />,
    },
    {
      title: 'IT Devices Auditing',
      description: 'Thorough auditing of your IT infrastructure to ensure compliance and security.',
      icon: <FileSearch size={24} />,
    },
    {
      title: 'Privileged Access Management',
      description: 'Secure management of privileged accounts to protect against unauthorized access.',
      icon: <Shield size={24} />,
    },
  ];

  return (
    <section id="services" className="section bg-[#192236]">
      <div className="container mx-auto">
        <h2 className="section-title">Our Services</h2>
        <p className="text-center text-gray-300 mb-12 max-w-3xl mx-auto">
          We offer a comprehensive range of IT consultancy and outsourcing services
          designed to optimize your technology infrastructure and drive business growth.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <ServiceCard 
              key={service.title}
              title={service.title}
              description={service.description}
              icon={service.icon}
              delay={index * 150}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
