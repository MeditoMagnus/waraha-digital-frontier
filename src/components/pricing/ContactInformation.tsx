
import React from 'react';
import { Phone, Mail, Globe } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const ContactInformation: React.FC = () => {
  return (
    <section className="section bg-gradient-to-b from-slate-800/95 to-slate-900/95 backdrop-blur-sm dark:from-slate-800/95 dark:to-slate-900/95 light:from-muted-gray/95 light:to-off-white/95">
      <div className="container mx-auto">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="text-2xl font-serif mb-8 text-yellow-400 dark:text-yellow-400 light:text-waraha-gold">Contact Information</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-slate-800/80 backdrop-blur-md border-slate-600/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 dark:bg-slate-800/80 dark:border-slate-600/50 light:bg-white/90 light:border-muted-gray/50">
              <CardContent className="p-6 text-center">
                <Phone className="h-8 w-8 text-yellow-400 mx-auto mb-3 dark:text-yellow-400 light:text-waraha-gold" />
                <p className="text-sm text-slate-400 mb-2 dark:text-slate-400 light:text-charcoal-black/70">Phone</p>
                <a href="tel:+971549984344" className="text-slate-100 hover:text-yellow-400 transition-colors font-medium dark:text-slate-100 dark:hover:text-yellow-400 light:text-charcoal-black light:hover:text-waraha-gold">
                  +971 54 998 4344
                </a>
              </CardContent>
            </Card>
            
            <Card className="bg-slate-800/80 backdrop-blur-md border-slate-600/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 dark:bg-slate-800/80 dark:border-slate-600/50 light:bg-white/90 light:border-muted-gray/50">
              <CardContent className="p-6 text-center">
                <Mail className="h-8 w-8 text-yellow-400 mx-auto mb-3 dark:text-yellow-400 light:text-waraha-gold" />
                <p className="text-sm text-slate-400 mb-2 dark:text-slate-400 light:text-charcoal-black/70">Email</p>
                <a href="mailto:info@warahagroup.com" className="text-slate-100 hover:text-yellow-400 transition-colors font-medium dark:text-slate-100 dark:hover:text-yellow-400 light:text-charcoal-black light:hover:text-waraha-gold">
                  info@warahagroup.com
                </a>
              </CardContent>
            </Card>
            
            <Card className="bg-slate-800/80 backdrop-blur-md border-slate-600/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 dark:bg-slate-800/80 dark:border-slate-600/50 light:bg-white/90 light:border-muted-gray/50">
              <CardContent className="p-6 text-center">
                <Globe className="h-8 w-8 text-yellow-400 mx-auto mb-3 dark:text-yellow-400 light:text-waraha-gold" />
                <p className="text-sm text-slate-400 mb-2 dark:text-slate-400 light:text-charcoal-black/70">Website</p>
                <a href="https://www.warahagroup.com" target="_blank" rel="noopener noreferrer" className="text-slate-100 hover:text-yellow-400 transition-colors font-medium dark:text-slate-100 dark:hover:text-yellow-400 light:text-charcoal-black light:hover:text-waraha-gold">
                  www.warahagroup.com
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactInformation;
