
import React, { useEffect, useRef } from 'react';
import { ArrowDown } from 'lucide-react';

const HeroSection: React.FC = () => {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

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

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="container mx-auto px-4 py-32 md:py-0 z-10 text-center md:text-left flex flex-col md:flex-row items-center justify-between">
        <div className="md:w-3/5 space-y-6">
          <h1 
            ref={headlineRef}
            className="text-4xl md:text-5xl lg:text-7xl font-serif text-white opacity-0"
            style={{opacity: 1, transition: 'opacity 0.7s ease-out, transform 0.7s ease-out'}}
          >
            Your <span className="text-waraha-gold">Perspective.</span> <br />
            Our <span className="text-waraha-silver">Expertise.</span>
          </h1>
          
          <p 
            ref={subheadlineRef}
            className="text-lg md:text-xl text-gray-300 max-w-2xl opacity-0"
            style={{opacity: 1, transition: 'opacity 0.7s ease-out, transform 0.7s ease-out'}}
          >
            Waraha Group delivers cutting-edge IT consultancy and outsourcing services 
            that transform your business challenges into strategic advantages.
          </p>
          
          <div 
            ref={ctaRef} 
            className="mt-8 opacity-0"
            style={{opacity: 1, transition: 'opacity 0.7s ease-out, transform 0.7s ease-out'}}
          >
            <a 
              href="#contact" 
              className="glassmorphism px-8 py-4 text-white text-lg border border-waraha-gold hover:bg-waraha-gold hover:text-waraha-midnight transition-all duration-300 rounded-md inline-block"
            >
              Get a Free IT Assessment
            </a>
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
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white animate-bounce"
        aria-label="Scroll down"
      >
        <ArrowDown size={32} />
      </button>
    </section>
  );
};

export default HeroSection;
