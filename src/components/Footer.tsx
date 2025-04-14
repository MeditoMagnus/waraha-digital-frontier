
import React from 'react';
import { ArrowUp, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0a0f1a] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="mb-6 md:mb-0">
            <a href="#home" className="text-3xl font-serif font-bold flex items-center">
              <span className="text-waraha-gold">W</span>araha <span className="text-waraha-silver ml-1">Group</span>
            </a>
            <p className="mt-2 text-gray-400 max-w-md">
              Transforming IT challenges into strategic advantages for businesses worldwide.
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-end">
            <button
              onClick={scrollToTop}
              className="mb-4 bg-waraha-midnight/60 hover:bg-waraha-midnight p-3 rounded-full text-white transition-colors duration-300"
              aria-label="Scroll to top"
            >
              <ArrowUp size={20} />
            </button>
            
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-gray-400 hover:text-waraha-gold transition-colors duration-300"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-waraha-gold transition-colors duration-300"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-waraha-gold transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-waraha-gold transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-500 text-sm">
              © {currentYear} Waraha Group. All rights reserved.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <a href="#" className="text-gray-400 hover:text-waraha-gold transition-colors duration-300">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-waraha-gold transition-colors duration-300">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-waraha-gold transition-colors duration-300">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
