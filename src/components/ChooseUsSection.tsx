
import React, { useRef, useState, useEffect } from 'react';
import { useInView } from '../hooks/useInView';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const benefits = [
  {
    title: "Industry Expertise",
    description: "Over 15 years of combined experience in IT consultancy and managed services.",
    count: "15+",
  },
  {
    title: "Response Time",
    description: "Average response time for critical issues, ensuring minimal downtime.",
    count: "15 min",
  },
  {
    title: "Client Satisfaction",
    description: "Of our clients report improved IT efficiency after partnering with us.",
    count: "98%",
  },
  {
    title: "Cost Reduction",
    description: "Average reduction in IT operational costs for our clients.",
    count: "30%",
  },
];

const testimonials = [
  {
    name: "Sarah Johnson",
    position: "CTO, Tech Innovations",
    quote: "Waraha Group transformed our IT infrastructure completely. Their expertise and proactive approach have reduced our downtime by 70% and significantly improved our team's productivity.",
  },
  {
    name: "Michael Chen",
    position: "Operations Director, Global Retail",
    quote: "The team at Waraha truly understands our business needs. They've implemented solutions that not only solved our immediate IT challenges but positioned us for future growth.",
  },
  {
    name: "Amelia Rodriguez",
    position: "CEO, Healthcare Solutions",
    quote: "We've worked with several IT consultancies before, but none have delivered the level of service and expertise that Waraha provides. They're not just vendors—they're strategic partners.",
  },
];

const ChooseUsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { threshold: 0.1, once: true });
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const testimonialsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const goToPrevious = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section id="why-us" ref={sectionRef} className="section bg-gradient-to-b from-[#192236] to-waraha-midnight">
      <div className="container mx-auto">
        <h2 className="section-title">Why Choose Us</h2>
        
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20 ${isInView ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000`}>
          {benefits.map((benefit, index) => (
            <div 
              key={benefit.title} 
              className="bg-waraha-midnight/70 p-6 rounded-lg border border-waraha-silver/20 text-center"
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="text-4xl md:text-5xl font-serif text-waraha-gold mb-4">{benefit.count}</div>
              <h3 className="text-xl font-semibold text-white mb-2">{benefit.title}</h3>
              <p className="text-gray-300">{benefit.description}</p>
            </div>
          ))}
        </div>
        
        <h3 className="text-2xl font-serif text-center mb-12">What Our Clients Say</h3>
        
        <div className="max-w-4xl mx-auto relative">
          <div 
            ref={testimonialsRef}
            className="glassmorphism rounded-lg p-8 md:p-12 overflow-hidden"
          >
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="min-w-full px-4">
                  <p className="text-lg md:text-xl italic text-gray-200 mb-6">"{testimonial.quote}"</p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-waraha-gold/30 flex items-center justify-center text-white font-semibold">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div className="ml-4">
                      <p className="font-semibold text-white">{testimonial.name}</p>
                      <p className="text-waraha-silver text-sm">{testimonial.position}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <button 
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-waraha-midnight/80 rounded-full p-2 text-white hover:text-waraha-gold transition-colors duration-300"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button 
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-waraha-midnight/80 rounded-full p-2 text-white hover:text-waraha-gold transition-colors duration-300"
            aria-label="Next testimonial"
          >
            <ChevronRight size={24} />
          </button>
          
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full ${
                  currentTestimonial === index ? 'bg-waraha-gold' : 'bg-waraha-silver/30'
                } transition-colors duration-300`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChooseUsSection;
