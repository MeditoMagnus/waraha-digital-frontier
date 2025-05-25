
import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ParticleBackground from '../../components/ParticleBackground';
import SEOMetaTags from '../../components/SEOMetaTags';
import { FileSearch, CheckCircle, ArrowLeft } from 'lucide-react';
import { Button } from '../../components/ui/button';

const AuditingServices: React.FC = () => {
  const subServices = [
    'Internal Audit Services',
    'External Statutory Audit',
    'Bookkeeping & General Ledger Maintenance',
    'IFRS Implementation Support',
    'Budgeting & Forecasting',
    'Payroll Audit',
    'Audit Readiness & Internal Controls',
    'Forensic Audit'
  ];

  return (
    <div className="min-h-screen w-full">
      <SEOMetaTags 
        title="Auditing & Accounting Services - Waraha Group UAE"
        description="Professional auditing and accounting services in UAE including internal audits, statutory audits, and IFRS implementation by certified experts."
        keywords={['UAE auditing', 'accounting services Dubai', 'internal audit UAE', 'statutory audit']}
      />
      <ParticleBackground />
      <Navbar />
      
      <section className="section bg-gradient-to-b from-waraha-midnight to-[#192236] pt-32">
        <div className="container mx-auto">
          <Button 
            asChild
            className="mb-8 bg-waraha-silver/20 hover:bg-waraha-gold hover:text-waraha-midnight border border-waraha-silver/30"
          >
            <a href="/#comprehensive-services" className="flex items-center gap-2">
              <ArrowLeft size={16} />
              Back to Services
            </a>
          </Button>

          <div className="text-center mb-12">
            <div className="h-16 w-16 mx-auto mb-6 text-waraha-gold bg-waraha-midnight/50 rounded-full flex items-center justify-center">
              <FileSearch size={32} />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Auditing & Accounting
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Comprehensive auditing services ensuring financial transparency and regulatory compliance 
              for businesses across the UAE with expert audit and accounting solutions.
            </p>
          </div>

          <div className="glassmorphism rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-semibold mb-6 text-white">Our Auditing & Accounting Sub-Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {subServices.map((service, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-waraha-midnight/30 rounded-lg">
                  <CheckCircle className="text-waraha-gold mt-1 flex-shrink-0" size={16} />
                  <span className="text-gray-300">{service}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <Button 
              asChild
              className="bg-waraha-gold hover:bg-waraha-gold/90 text-waraha-midnight font-semibold px-8 py-3"
            >
              <a href="/consultant-access">Get Expert Consultation</a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AuditingServices;
