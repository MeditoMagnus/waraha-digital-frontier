
import React, { useRef } from 'react';
import { useInView } from '../hooks/useInView';
import { Medal, Users, Globe, TrendingUp } from 'lucide-react';

const AboutUsExtended: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { threshold: 0.1, once: true });
  
  return (
    <section id="about-extended" ref={sectionRef} className="about-extended-section py-20">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div 
            className="lg:w-1/2"
            style={{ 
              opacity: isInView ? 1 : 0,
              transform: isInView ? 'translateX(0)' : 'translateX(-20px)',
              transition: 'opacity 0.7s ease-out, transform 0.7s ease-out'
            }}
          >
            <h2 className="text-3xl md:text-4xl font-serif mb-6 about-extended-title">Our Vision & Mission</h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="mt-1 h-10 w-10 about-extended-icon-bg rounded-full flex items-center justify-center flex-shrink-0">
                  <Medal className="h-5 w-5 text-waraha-gold" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 about-extended-subtitle">Excellence in Every Service</h3>
                  <p className="about-extended-text">
                    At Waraha Group, we are committed to delivering exceptional consultancy services 
                    across IT, taxation, auditing, AML compliance, and real estate sectors throughout the UAE.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="mt-1 h-10 w-10 about-extended-icon-bg rounded-full flex items-center justify-center flex-shrink-0">
                  <Users className="h-5 w-5 text-waraha-gold" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 about-extended-subtitle">Client-Centered Approach</h3>
                  <p className="about-extended-text">
                    Our mission is to understand each client's unique needs and deliver tailored solutions 
                    that drive business growth and operational excellence across the UAE.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div 
            className="lg:w-1/2 mt-8 lg:mt-0"
            style={{ 
              opacity: isInView ? 1 : 0,
              transform: isInView ? 'translateX(0)' : 'translateX(20px)',
              transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
              transitionDelay: '0.3s'
            }}
          >
            <h2 className="text-3xl md:text-4xl font-serif mb-6 about-extended-title">Why Waraha Group?</h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="mt-1 h-10 w-10 about-extended-icon-bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                  <Globe className="h-5 w-5 text-waraha-silver" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 about-extended-subtitle">UAE Market Expertise</h3>
                  <p className="about-extended-text">
                    With deep understanding of the UAE business landscape, we provide context-aware consultancy
                    that addresses the unique challenges and opportunities of this dynamic market.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="mt-1 h-10 w-10 about-extended-icon-bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="h-5 w-5 text-waraha-silver" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 about-extended-subtitle">Integrated Service Approach</h3>
                  <p className="about-extended-text">
                    Our multi-disciplinary team delivers seamless integration across all service areas,
                    providing holistic solutions that drive efficiency and competitive advantage.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div 
          className="mt-16 p-8 about-extended-card rounded-lg text-center"
          style={{ 
            opacity: isInView ? 1 : 0,
            transform: isInView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
            transitionDelay: '0.6s'
          }}
        >
          <h3 className="text-2xl font-serif mb-4 about-extended-card-title">Our UAE Presence</h3>
          <p className="about-extended-card-text max-w-3xl mx-auto">
            With offices in key UAE locations, Waraha Group provides accessible consultancy services 
            to businesses of all sizes across Dubai, Abu Dhabi, Sharjah, and beyond. Our local expertise
            combined with global best practices ensures world-class service delivery throughout the Emirates.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutUsExtended;
