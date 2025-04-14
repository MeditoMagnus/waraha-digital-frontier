
import React, { useState, useRef } from 'react';
import { useInView } from '../hooks/useInView';
import { Phone, Mail, MapPin, Check } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const ContactSection: React.FC = () => {
  const { toast } = useToast();
  const formRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(formRef, { threshold: 0.1 });
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: '',
  });
  
  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    message: '',
  });
  
  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validate form
    const errors = {
      name: formData.name ? '' : 'Name is required',
      email: !formData.email 
        ? 'Email is required' 
        : !validateEmail(formData.email) 
          ? 'Please enter a valid email' 
          : '',
      message: formData.message ? '' : 'Message is required',
    };
    
    setFormErrors(errors);
    
    // Check if there are any errors
    if (Object.values(errors).some(error => error)) {
      return;
    }
    
    // Form is valid, submit it (in a real app, this would be an API call)
    toast({
      title: "Message Sent!",
      description: "We've received your message and will contact you soon.",
      duration: 5000,
    });
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      company: '',
      phone: '',
      message: '',
    });
  };

  return (
    <section id="contact" className="section bg-waraha-midnight">
      <div className="container mx-auto">
        <h2 className="section-title">Contact Us</h2>
        
        <div className="flex flex-col lg:flex-row gap-12">
          <div 
            ref={formRef}
            className={`lg:w-2/3 glassmorphism rounded-lg p-8 ${
              isInView ? 'animate-fade-in' : 'opacity-0'
            }`}
          >
            <h3 className="text-2xl font-serif mb-6">Get a Free IT Assessment</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block mb-2 text-gray-200">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full bg-white/5 border ${
                      formErrors.name ? 'border-red-500' : 'border-white/20'
                    } rounded-md p-3 text-white focus:outline-none focus:border-waraha-gold`}
                  />
                  {formErrors.name && (
                    <p className="mt-1 text-red-500 text-sm">{formErrors.name}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="email" className="block mb-2 text-gray-200">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full bg-white/5 border ${
                      formErrors.email ? 'border-red-500' : 'border-white/20'
                    } rounded-md p-3 text-white focus:outline-none focus:border-waraha-gold`}
                  />
                  {formErrors.email && (
                    <p className="mt-1 text-red-500 text-sm">{formErrors.email}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="company" className="block mb-2 text-gray-200">Company Name</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/20 rounded-md p-3 text-white focus:outline-none focus:border-waraha-gold"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block mb-2 text-gray-200">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/20 rounded-md p-3 text-white focus:outline-none focus:border-waraha-gold"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="message" className="block mb-2 text-gray-200">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full bg-white/5 border ${
                    formErrors.message ? 'border-red-500' : 'border-white/20'
                  } rounded-md p-3 text-white focus:outline-none focus:border-waraha-gold`}
                />
                {formErrors.message && (
                  <p className="mt-1 text-red-500 text-sm">{formErrors.message}</p>
                )}
              </div>
              
              <div>
                <button
                  type="submit"
                  className="bg-waraha-gold text-waraha-midnight px-8 py-3 rounded-md font-semibold hover:bg-waraha-gold/90 transition-colors duration-300 flex items-center"
                >
                  <Check size={18} className="mr-2" /> Send Message
                </button>
              </div>
            </form>
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
