
import React, { useEffect, useRef } from 'react';
import { ArrowDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HeroSection: React.FC = () => {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const headline = headlineRef.current;
    const subheadline = subheadlineRef.current;
    const cta = ctaRef.current;

    if (headline) headline.classList.add('animate-fade-in');
    
    setTimeout(() => {
      if (subheadline) subheadline.classList.add('animate-fade-in');
    }, 400);
    
    setTimeout(() => {
      if (cta) cta.classList.add('animate-fade-in');
    }, 800);
  }, []);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const goToAIConsultant = () => {
    navigate('/consultant-access');
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="container mx-auto px-4 py-32 md:py-0 z-10 text-center md:text-left flex flex-col md:flex-row items-center justify-between">
        <div className="md:w-3/5 space-y-6">
          <h1 
            ref={headlineRef}
            className="text-4xl md:text-5xl lg:text-7xl font-serif opacity-0 dark:text-white"
            style={{opacity: 1, transition: 'opacity 0.7s ease-out, transform 0.7s ease-out'}}
          >
            Your <span className="text-waraha-gold font-bold">Perspective.</span> <br />
            Our <span className="text-waraha-silver">Expertise.</span>
          </h1>
          
          <p 
            ref={subheadlineRef}
            className="text-lg md:text-xl text-gray-300 dark:text-gray-300 max-w-2xl opacity-0"
            style={{opacity: 1, transition: 'opacity 0.7s ease-out, transform 0.7s ease-out'}}
          >
            At Waraha Group, we are committed to delivering end-to-end consultancy solutions that drive growth, compliance, and innovation for businesses across the UAE and beyond. With a strong foundation in IT consultancy, taxation, auditing, anti-money laundering (AML) compliance, and real estate advisory, our multidisciplinary team ensures your organization thrives in today's fast-changing regulatory and economic landscape.
          </p>
          
          <div 
            ref={ctaRef} 
            className="mt-8 opacity-0 flex space-x-4"
            style={{opacity: 1, transition: 'opacity 0.7s ease-out, transform 0.7s ease-out'}}
          >
            <a 
              href="#contact" 
              className="glassmorphism px-8 py-4 text-lg border border-waraha-gold hover:bg-waraha-gold transition-all duration-300 rounded-md inline-block font-semibold"
            >
              Get a Free Assessment
            </a>
            <button 
              onClick={goToAIConsultant}
              className="glassmorphism px-8 py-4 text-lg border border-waraha-silver hover:bg-waraha-silver transition-all duration-300 rounded-md inline-block font-semibold"
            >
              Try our AI Consultants
            </button>
          </div>
        </div>
        
        <div className="hidden md:block md:w-2/5">
          <div className="relative w-full h-80 animate-float">
            <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-waraha-gold/30 to-transparent rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-tl from-waraha-silver/20 to-transparent rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>
      
      <button 
        onClick={scrollToAbout}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-white dark:text-white"
        aria-label="Scroll down"
      >
        <ArrowDown size={32} />
      </button>
    </section>
  );
};

export default HeroSection;
