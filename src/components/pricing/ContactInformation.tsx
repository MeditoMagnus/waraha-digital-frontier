
import React from 'react';
import { Phone, Mail, Globe } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const ContactInformation: React.FC = () => {
  return (
    <section className="section bg-gradient-to-b from-slate-800/95 to-slate-900/95 backdrop-blur-sm dark:from-slate-800/95 dark:to-slate-900/95 light:from-off-white-exact light:to-pure-white-exact">
      <div className="container mx-auto">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="text-2xl font-serif mb-8 text-yellow-400 dark:text-yellow-400 light:text-waraha-gold-exact">Contact Information</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-slate-800/80 backdrop-blur-md border-slate-600/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 dark:bg-slate-800/80 dark:border-slate-600/50 light:bg-pure-white-exact light:border-muted-gray-exact">
              <CardContent className="p-6 text-center">
                <Phone className="h-8 w-8 text-yellow-400 mx-auto mb-3 dark:text-yellow-400 light:text-waraha-gold-exact" />
                <p className="text-sm text-slate-400 mb-2 dark:text-slate-400 light:text-charcoal-black-exact/70">Phone</p>
                <a href="tel:+971549984344" className="text-slate-100 hover:text-yellow-400 transition-colors font-medium dark:text-slate-100 dark:hover:text-yellow-400 light:text-charcoal-black-exact light:hover:text-waraha-gold-exact">
                  +971 54 998 4344
                </a>
              </CardContent>
            </Card>
            
            <Card className="bg-slate-800/80 backdrop-blur-md border-slate-600/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 dark:bg-slate-800/80 dark:border-slate-600/50 light:bg-pure-white-exact light:border-muted-gray-exact">
              <CardContent className="p-6 text-center">
                <Mail className="h-8 w-8 text-yellow-400 mx-auto mb-3 dark:text-yellow-400 light:text-waraha-gold-exact" />
                <p className="text-sm text-slate-400 mb-2 dark:text-slate-400 light:text-charcoal-black-exact/70">Email</p>
                <a href="mailto:info@warahagroup.com" className="text-slate-100 hover:text-yellow-400 transition-colors font-medium dark:text-slate-100 dark:hover:text-yellow-400 light:text-charcoal-black-exact light:hover:text-waraha-gold-exact">
                  info@warahagroup.com
                </a>
              </CardContent>
            </Card>
            
            <Card className="bg-slate-800/80 backdrop-blur-md border-slate-600/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 dark:bg-slate-800/80 dark:border-slate-600/50 light:bg-pure-white-exact light:border-muted-gray-exact">
              <CardContent className="p-6 text-center">
                <Globe className="h-8 w-8 text-yellow-400 mx-auto mb-3 dark:text-yellow-400 light:text-waraha-gold-exact" />
                <p className="text-sm text-slate-400 mb-2 dark:text-slate-400 light:text-charcoal-black-exact/70">Website</p>
                <a href="https://www.warahagroup.com" target="_blank" rel="noopener noreferrer" className="text-slate-100 hover:text-yellow-400 transition-colors font-medium dark:text-slate-100 dark:hover:text-yellow-400 light:text-charcoal-black-exact light:hover:text-waraha-gold-exact">
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
