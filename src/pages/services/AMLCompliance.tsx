
import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ParticleBackground from '../../components/ParticleBackground';
import SEOMetaTags from '../../components/SEOMetaTags';
import { Shield, CheckCircle, ArrowLeft } from 'lucide-react';
import { Button } from '../../components/ui/button';

const AMLCompliance: React.FC = () => {
  const subServices = [
    'AML Policy Development',
    'KYC & Customer Due Diligence Procedures',
    'Suspicious Transaction Reporting Support',
    'AML Risk Assessment & Framework Setup',
    'AML Training & Awareness Programs',
    'AML Compliance Software Integration',
    'FATF Regulation Readiness'
  ];

  return (
    <div className="min-h-screen w-full">
      <SEOMetaTags 
        title="AML Compliance Services - Waraha Group UAE"
        description="Expert AML compliance services in UAE including policy development, KYC procedures, and regulatory compliance support."
        keywords={['UAE AML compliance', 'anti-money laundering Dubai', 'KYC procedures', 'FATF compliance']}
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
              <Shield size={32} />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              AML Compliance
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Stay compliant with UAE's anti-money laundering regulations. Our AML experts provide 
              comprehensive compliance solutions to protect your business and ensure regulatory adherence.
            </p>
          </div>

          <div className="glassmorphism rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-semibold mb-6 text-white">Our AML Compliance Sub-Services</h2>
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

export default AMLCompliance;
