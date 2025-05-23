
import React, { useRef } from 'react';
import { useInView } from '../hooks/useInView';

const benefits = [
  {
    title: "Industry Expertise",
    description: "Over 10 years of combined experience in IT, taxation, and real estate consultancy in UAE.",
    count: "10+",
  },
  {
    title: "Response Time",
    description: "Average response time for critical issues, ensuring minimal downtime for your business.",
    count: "15 min",
  },
  {
    title: "Client Satisfaction",
    description: "Of our clients report improved operational efficiency after partnering with us.",
    count: "98%",
  },
  {
    title: "Cost Reduction",
    description: "Average reduction in operational costs for businesses using our comprehensive services.",
    count: "30%",
  },
];

const ChooseUsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { threshold: 0.1, once: true });

  return (
    <section id="why-us" ref={sectionRef} className="section bg-gradient-to-b from-[#192236] to-waraha-midnight py-20">
      <div className="container mx-auto">
        <h2 className="section-title">Why Choose Us</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20 transition-opacity duration-1000">
          {benefits.map((benefit, index) => (
            <div 
              key={benefit.title} 
              className="bg-waraha-midnight/70 p-6 rounded-lg border border-waraha-silver/20 text-center"
              style={{ 
                transitionDelay: `${index * 200}ms`,
                opacity: isInView ? 1 : 0,
                transform: isInView ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 1s ease, transform 1s ease'
              }}
            >
              <div className="text-4xl md:text-5xl font-serif text-waraha-gold mb-4">{benefit.count}</div>
              <h3 className="text-xl font-semibold text-white mb-2">{benefit.title}</h3>
              <p className="text-gray-300">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ChooseUsSection;
