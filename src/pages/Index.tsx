import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import AboutUsExtended from '../components/AboutUsExtended';
import ComprehensiveServicesSection from '../components/ComprehensiveServicesSection';
import ChooseUsSection from '../components/ChooseUsSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import ParticleBackground from '../components/ParticleBackground';
import SEOMetaTags from '../components/SEOMetaTags';

const Index: React.FC = () => {
  // This effect runs once when the component mounts
  useEffect(() => {
    // Track page view
    if (typeof window !== 'undefined' && 'gtag' in window) {
      // @ts-ignore - Google Analytics tracking
      window.gtag('event', 'page_view', {
        page_title: 'Home - Waraha Group',
        page_path: window.location.pathname,
        page_location: window.location.href,
      });
    }
  }, []);

  return (
    <div className="min-h-screen w-full">
      <SEOMetaTags 
        title="Waraha Group – IT, Taxation, Auditing & Real Estate Consultancy in UAE"
        description="Waraha Group offers premium IT consultancy, taxation services, auditing, AML compliance, and real estate consultancy across UAE. Expert solutions tailored for business growth."
        keywords={[
          'UAE IT consultancy',
          'taxation services Dubai',
          'auditing firms UAE',
          'AML compliance experts',
          'real estate consultancy UAE',
          'business advisory Dubai',
          'VAT compliance UAE',
          'corporate tax Dubai',
          'IT solutions UAE',
          'financial services Abu Dhabi'
        ]}
      />
      <ParticleBackground />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <AboutUsExtended />
      <ComprehensiveServicesSection />
      <ChooseUsSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
