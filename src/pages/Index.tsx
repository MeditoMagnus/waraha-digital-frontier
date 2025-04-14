
import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import ServicesSection from '../components/ServicesSection';
import ChooseUsSection from '../components/ChooseUsSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import ParticleBackground from '../components/ParticleBackground';

const Index: React.FC = () => {
  // This effect runs once when the component mounts
  useEffect(() => {
    document.title = 'Waraha Group – IT Consultancy & Outsourcing';
  }, []);

  return (
    <div className="min-h-screen w-full">
      <ParticleBackground />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ChooseUsSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
