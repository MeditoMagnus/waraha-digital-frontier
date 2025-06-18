
import React from 'react';
import { Phone, Mail, Globe } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const ContactInformation: React.FC = () => {
  return (
    <section className="contact-info-section">
      <div className="container mx-auto">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="contact-info-title">Contact Information</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="contact-info-card">
              <CardContent className="p-6 text-center">
                <Phone className="contact-info-icon" />
                <p className="contact-info-label">Phone</p>
                <a href="tel:+971549984344" className="contact-info-link">
                  +971 54 998 4344
                </a>
              </CardContent>
            </Card>
            
            <Card className="contact-info-card">
              <CardContent className="p-6 text-center">
                <Mail className="contact-info-icon" />
                <p className="contact-info-label">Email</p>
                <a href="mailto:info@warahagroup.com" className="contact-info-link">
                  info@warahagroup.com
                </a>
              </CardContent>
            </Card>
            
            <Card className="contact-info-card">
              <CardContent className="p-6 text-center">
                <Globe className="contact-info-icon" />
                <p className="contact-info-label">Website</p>
                <a href="https://www.warahagroup.com" target="_blank" rel="noopener noreferrer" className="contact-info-link">
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
