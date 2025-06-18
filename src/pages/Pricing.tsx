
import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ParticleBackground from '../components/ParticleBackground';
import SEOMetaTags from '../components/SEOMetaTags';
import PricingHero from '../components/pricing/PricingHero';
import ServiceComparisonTable from '../components/pricing/ServiceComparisonTable';
import ServiceComparisonCards from '../components/pricing/ServiceComparisonCards';
import TermsAndConditions from '../components/pricing/TermsAndConditions';
import ContactInformation from '../components/pricing/ContactInformation';

const Pricing: React.FC = () => {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'gtag' in window) {
      // @ts-ignore - Google Analytics tracking
      window.gtag('event', 'page_view', {
        page_title: 'Pricing - Waraha Group',
        page_path: window.location.pathname,
        page_location: window.location.href,
      });
    }
  }, []);

  const services = [
    { name: 'Accounting Software ZOHO', basic: true, standard: true, premium: true },
    { name: 'No. of Entries', basic: false, standard: true, premium: 'Unlimited' },
    { name: 'P&L Balance Sheet', basic: false, standard: false, premium: true },
    { name: 'Bank Reconciliation', basic: false, standard: true, premium: true },
    { name: 'Payroll Management', basic: true, standard: false, premium: true },
    { name: 'Business Analysis', basic: false, standard: true, premium: true },
    { name: 'VAT Registration', basic: false, standard: false, premium: true },
    { name: 'VAT Filing', basic: true, standard: true, premium: true },
    { name: 'VAT Amendment', basic: true, standard: true, premium: true },
    { name: 'VAT Refund', basic: false, standard: true, premium: true },
    { name: 'Corporate Tax Registration & Filing', basic: false, standard: true, premium: true },
    { name: 'VAT Advisory', basic: true, standard: true, premium: true },
    { name: 'One Year Auditing', basic: false, standard: true, premium: true },
    { name: 'Corporate Tax Training', basic: true, standard: true, premium: true },
    { name: 'Dedicated Accountant', basic: true, standard: true, premium: true },
  ];

  return (
    <div className="pricing-page-container">
      <SEOMetaTags 
        title="Pricing - Waraha Group Management Consultancy Services"
        description="Compare our Basic, Standard, and Premium consultancy packages. Comprehensive VAT, accounting, and business services starting from AED 299/month."
        keywords={[
          'consultancy pricing UAE',
          'VAT services cost',
          'accounting packages Dubai',
          'business consultancy rates',
          'corporate tax services pricing',
          'VAT filing charges UAE'
        ]}
      />
      <ParticleBackground />
      <Navbar />
      
      <main className="pt-20">
        <PricingHero />

        {/* Pricing Table Section */}
        <section className="pricing-table-section">
          <div className="container mx-auto">
            <ServiceComparisonCards services={services} />
            <ServiceComparisonTable services={services} />
          </div>
        </section>

        <TermsAndConditions />
        <ContactInformation />
      </main>
      
      <Footer />
    </div>
  );
};

export default Pricing;
