
import React, { useEffect, useRef } from 'react';
import { useInView } from '../hooks/useInView';

const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { threshold: 0.2, once: true });
  
  const quoteRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (isInView) {
      if (quoteRef.current) quoteRef.current.classList.add('animate-fade-in-right');
      if (storyRef.current) storyRef.current.classList.add('animate-fade-in-left');
    }
  }, [isInView]);

  return (
    <section id="about" ref={sectionRef} className="section bg-gradient-to-b from-waraha-midnight to-[#192236]">
      <div className="container mx-auto">
        <h2 className="section-title">About Us</h2>
        
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div 
            ref={quoteRef} 
            className={`md:w-1/2 glassmorphism p-8 rounded-lg`}
            style={{
              opacity: isInView ? 1 : 0,
              transform: isInView ? 'translateX(0)' : 'translateX(-20px)',
              transition: 'opacity 0.7s ease-out, transform 0.7s ease-out'
            }}
          >
            <h3 className="text-2xl font-serif text-waraha-gold mb-4">Our Philosophy</h3>
            <p className="text-lg italic text-gray-200 mb-6">
              "No one is completely right or wrong—everyone sees life through their own perspective."
            </p>
            <p className="text-gray-300">
              This philosophy guides our approach to consultancy. We understand that every 
              organization has unique needs, challenges, and visions. Our expertise lies in 
              seeing your business through your lens while providing expert solutions that 
              align with your goals.
              Join hands with Waraha Group — where expertise meets execution.
Let us guide your business toward digital, financial, and regulatory excellence.
            </p>
          </div>
          
          <div 
            ref={storyRef} 
            className={`md:w-1/2`}
            style={{
              opacity: isInView ? 1 : 0,
              transform: isInView ? 'translateX(0)' : 'translateX(20px)',
              transition: 'opacity 0.7s ease-out, transform 0.7s ease-out'
            }}
          >
            <h3 className="text-2xl font-serif text-waraha-silver mb-4">The Waraha Vision</h3>
            <p className="mb-4 text-gray-300">
             Waraha Group is a UAE-based consulting firm built on a passion for excellence, integrity, and strategic insight. Since our inception, we have been a trusted partner for startups, SMEs, and enterprises, helping them navigate complex compliance requirements, implement scalable IT systems, and make informed real estate investments.

Our consultants bring deep industry expertise, global best practices, and personalized service that empower our clients to succeed with confidence
            </p>
            <p className="text-gray-300">
.

💼 What We Offer
IT Consultancy: Optimizing your digital infrastructure with scalable, secure, and cost-efficient IT solutions tailored to your business goals.

Taxation Services: Assisting businesses with accurate tax filing, planning, and compliance aligned with UAE VAT and international tax laws.

Auditing Services: Conducting independent, transparent audits that promote financial integrity and regulatory compliance.

AML Compliance: Helping organizations identify and mitigate financial crime risks through robust anti-money laundering strategies and systems.

Real Estate Consultancy: Offering strategic advice on property acquisition, investment planning, and market insights for residential and commercial clients.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
