
import React, { useRef } from 'react';
import { useInView } from '../hooks/useInView';
import { Phone, Mail, MapPin, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ContactSection: React.FC = () => {
  const contactRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(contactRef, { threshold: 0.1, once: true });
  
  const handleMailClick = () => {
    window.location.href = 'mailto:info@warahagroup.com';
  };

  return (
    <section id="contact" className="section bg-waraha-midnight">
      <div className="container mx-auto">
        <h2 className="section-title">Contact Us</h2>
        
        <div className="flex flex-col lg:flex-row gap-12">
          <div 
            ref={contactRef}
            className={`lg:w-2/3 glassmorphism rounded-lg p-8 flex flex-col items-center justify-center ${
              isInView ? 'animate-fade-in' : 'opacity-0'
            }`}
          >
            <h3 className="text-2xl font-serif mb-6 text-center">Get a Free IT Assessment</h3>
            <p className="text-gray-300 text-center max-w-2xl mb-8">
              We'd love to hear about your IT challenges and discuss how Waraha Group can help transform your business. 
              Click below to send us an email and we'll get back to you as soon as possible.
            </p>
            
            <Button
              onClick={handleMailClick}
              variant="default"
              size="lg"
              className="bg-waraha-gold hover:bg-waraha-gold/90 text-waraha-midnight font-semibold rounded-md px-8 py-6 flex items-center justify-center gap-3"
            >
              <Mail size={20} />
              Mail Us Now
              <ExternalLink size={16} />
            </Button>
            
          </div>
          
          <div className="lg:w-1/3 space-y-8">
            <div className="glassmorphism rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <Phone size={20} className="text-waraha-gold mt-1 mr-3" />
                  <div>
                    <p className="text-gray-200">Phone</p>
                    <p className="text-white">+1 (555) 123-4567</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Mail size={20} className="text-waraha-gold mt-1 mr-3" />
                  <div>
                    <p className="text-gray-200">Email</p>
                    <p className="text-white">info@warahagroup.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MapPin size={20} className="text-waraha-gold mt-1 mr-3" />
                  <div>
                    <p className="text-gray-200">Address</p>
                    <p className="text-white">123 Tech Plaza, Suite 400<br />San Francisco, CA 94105</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="glassmorphism rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Business Hours</h3>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span className="text-gray-300">Monday - Friday:</span>
                  <span className="text-white">9:00 AM - 6:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-300">Saturday:</span>
                  <span className="text-white">10:00 AM - 4:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-300">Sunday:</span>
                  <span className="text-white">Closed</span>
                </li>
              </ul>
              <p className="mt-4 text-sm text-gray-400">24/7 emergency IT support available for clients.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
