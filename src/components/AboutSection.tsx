
import React, { useEffect, useRef } from 'react';
import { useInView } from '../hooks/useInView';

const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { threshold: 0.2 });
  
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
            className="md:w-1/2 glassmorphism p-8 rounded-lg opacity-0"
          >
            <h3 className="text-2xl font-serif text-waraha-gold mb-4">Our Philosophy</h3>
            <p className="text-lg italic text-gray-200 mb-6">
              "No one is completely right or wrong—everyone sees life through their own perspective."
            </p>
            <p className="text-gray-300">
              This philosophy guides our approach to IT consultancy. We understand that every 
              organization has unique needs, challenges, and visions. Our expertise lies in 
              seeing your business through your lens while providing expert solutions that 
              align with your goals.
            </p>
          </div>
          
          <div 
            ref={storyRef} 
            className="md:w-1/2 opacity-0"
          >
            <h3 className="text-2xl font-serif text-waraha-silver mb-4">The Waraha Story</h3>
            <p className="mb-4 text-gray-300">
              Founded in 2018, Waraha Group was born from the vision of bridging the gap between 
              complex IT infrastructure and seamless business operations. Our name, "Waraha," 
              derives from an ancient symbol representing perspective and insight—a perfect 
              embodiment of our mission.
            </p>
            <p className="text-gray-300">
              Today, we're a team of dedicated IT professionals committed to providing 
              cutting-edge consultancy and outsourcing services to businesses of all sizes. 
              Our approach combines technical expertise with a deep understanding of business 
              processes, allowing us to deliver solutions that truly transform operations.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
