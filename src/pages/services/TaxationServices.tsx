
import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ParticleBackground from '../../components/ParticleBackground';
import SEOMetaTags from '../../components/SEOMetaTags';
import { Calculator, CheckCircle, ArrowLeft } from 'lucide-react';
import { Button } from '../../components/ui/button';

const TaxationServices: React.FC = () => {
  const subServices = [
    'Corporate Tax Health Check',
    'VAT Health Check & Reconciliation',
    'International Tax Advisory',
    'Withholding Tax Guidance',
    'Excise Tax Consulting',
    'Personal Tax Planning (For Expats & NRIs)',
    'Tax Residency Certification Support',
    'Transaction Structuring for Tax Efficiency',
    'Transfer Pricing Support'
  ];

  return (
    <div className="min-h-screen w-full">
      <SEOMetaTags 
        title="Taxation Services - Waraha Group UAE"
        description="Comprehensive taxation services in UAE including VAT compliance, corporate tax, and international tax advisory by Waraha Group experts."
        keywords={['UAE taxation', 'VAT compliance', 'corporate tax UAE', 'tax advisory Dubai']}
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
              <Calculator size={32} />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Taxation Services
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Navigate UAE tax regulations with confidence. Our taxation experts provide comprehensive 
              VAT compliance, tax planning, and corporate tax services tailored to your business needs.
            </p>
          </div>

          <div className="glassmorphism rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-semibold mb-6 text-white">Our Taxation Sub-Services</h2>
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

export default TaxationServices;
