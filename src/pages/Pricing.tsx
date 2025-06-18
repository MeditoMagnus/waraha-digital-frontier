
import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ParticleBackground from '../components/ParticleBackground';
import SEOMetaTags from '../components/SEOMetaTags';
import { Check, X, Phone, Mail, Globe } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Pricing: React.FC = () => {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'gtag' in window) {
      // @ts-ignore - Google Analytics tracking
      window.gtag('event', 'page_view', {
        page_title: 'Pricing - Waraha Group',
        page_path: window.location.pathname,
        page_location: window.location.href,
      });
    }
  }, []);

  const services = [
    { name: 'Accounting Software ZOHO', basic: true, standard: true, premium: true },
    { name: 'No. of Entries', basic: false, standard: true, premium: 'Unlimited' },
    { name: 'P&L Balance Sheet', basic: false, standard: false, premium: true },
    { name: 'Bank Reconciliation', basic: false, standard: true, premium: true },
    { name: 'Payroll Management', basic: true, standard: false, premium: true },
    { name: 'Business Analysis', basic: false, standard: true, premium: true },
    { name: 'VAT Registration', basic: false, standard: false, premium: true },
    { name: 'VAT Filing', basic: true, standard: true, premium: true },
    { name: 'VAT Amendment', basic: true, standard: true, premium: true },
    { name: 'VAT Refund', basic: false, standard: true, premium: true },
    { name: 'Corporate Tax Registration & Filing', basic: false, standard: true, premium: true },
    { name: 'VAT Advisory', basic: true, standard: true, premium: true },
    { name: 'One Year Auditing', basic: false, standard: true, premium: true },
    { name: 'Corporate Tax Training', basic: true, standard: true, premium: true },
    { name: 'Dedicated Accountant', basic: true, standard: true, premium: true },
  ];

  const renderServiceValue = (value: boolean | string) => {
    if (value === true) {
      return <Check className="h-5 w-5 text-green-500 mx-auto" />;
    } else if (value === false) {
      return <X className="h-5 w-5 text-red-500 mx-auto" />;
    } else {
      return <span className="text-waraha-gold font-semibold">{value}</span>;
    }
  };

  return (
    <div className="min-h-screen w-full">
      <SEOMetaTags 
        title="Pricing - Waraha Group Management Consultancy Services"
        description="Compare our Basic, Standard, and Premium consultancy packages. Comprehensive VAT, accounting, and business services starting from AED 299/month."
        keywords={[
          'consultancy pricing UAE',
          'VAT services cost',
          'accounting packages Dubai',
          'business consultancy rates',
          'corporate tax services pricing',
          'VAT filing charges UAE'
        ]}
      />
      <ParticleBackground />
      <Navbar />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="section bg-gradient-to-b from-waraha-midnight to-waraha-dark">
          <div className="container mx-auto text-center">
            <h1 className="section-title">
              The Waraha Management Consultancy
            </h1>
            <h2 className="text-2xl md:text-3xl font-serif mb-8 text-waraha-gold">
              Service Comparison
            </h2>
            <p className="text-lg text-waraha-silver mb-12 max-w-3xl mx-auto">
              Choose the perfect plan for your business needs. All packages include dedicated support and expert guidance.
            </p>
          </div>
        </section>

        {/* Pricing Table Section */}
        <section className="section bg-waraha-dark">
          <div className="container mx-auto">
            {/* Mobile-friendly cards for smaller screens */}
            <div className="block lg:hidden space-y-6">
              {/* Basic Plan */}
              <Card className="glassmorphism">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-serif text-waraha-gold">Basic</CardTitle>
                  <div className="text-3xl font-bold">AED 299<span className="text-sm font-normal">/month</span></div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {services.map((service) => (
                      <li key={service.name} className="flex justify-between items-center">
                        <span className="text-sm">{service.name}</span>
                        {renderServiceValue(service.basic)}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Standard Plan */}
              <Card className="glassmorphism border-waraha-gold">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-serif text-waraha-gold">Standard</CardTitle>
                  <div className="text-3xl font-bold">AED 799<span className="text-sm font-normal">/month</span></div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {services.map((service) => (
                      <li key={service.name} className="flex justify-between items-center">
                        <span className="text-sm">{service.name}</span>
                        {renderServiceValue(service.standard)}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Premium Plan */}
              <Card className="glassmorphism">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-serif text-waraha-gold">Premium</CardTitle>
                  <div className="text-3xl font-bold">AED 1799<span className="text-sm font-normal">/month</span></div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {services.map((service) => (
                      <li key={service.name} className="flex justify-between items-center">
                        <span className="text-sm">{service.name}</span>
                        {renderServiceValue(service.premium)}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Desktop table for larger screens */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full glassmorphism rounded-lg overflow-hidden">
                <thead className="bg-waraha-gold/20">
                  <tr>
                    <th className="px-6 py-4 text-left font-serif text-lg">Service</th>
                    <th className="px-6 py-4 text-center font-serif text-lg">
                      <div>Basic</div>
                      <div className="text-2xl font-bold mt-2">AED 299</div>
                      <div className="text-sm font-normal">per month</div>
                    </th>
                    <th className="px-6 py-4 text-center font-serif text-lg border-x-2 border-waraha-gold">
                      <div>Standard</div>
                      <div className="text-2xl font-bold mt-2 text-waraha-gold">AED 799</div>
                      <div className="text-sm font-normal">per month</div>
                    </th>
                    <th className="px-6 py-4 text-center font-serif text-lg">
                      <div>Premium</div>
                      <div className="text-2xl font-bold mt-2">AED 1799</div>
                      <div className="text-sm font-normal">per month</div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {services.map((service, index) => (
                    <tr key={service.name} className={index % 2 === 0 ? 'bg-white/5' : ''}>
                      <td className="px-6 py-4 font-medium">{service.name}</td>
                      <td className="px-6 py-4 text-center">{renderServiceValue(service.basic)}</td>
                      <td className="px-6 py-4 text-center border-x-2 border-waraha-gold/30">{renderServiceValue(service.standard)}</td>
                      <td className="px-6 py-4 text-center">{renderServiceValue(service.premium)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Terms & Conditions */}
        <section className="section bg-waraha-midnight">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-2xl font-serif mb-6 text-waraha-gold text-center">Terms & Conditions</h3>
              <Card className="glassmorphism">
                <CardContent className="p-6">
                  <ul className="space-y-3 text-waraha-silver">
                    <li className="flex items-start gap-2">
                      <span className="text-waraha-gold mt-1">•</span>
                      Agreement duration is 1 year.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-waraha-gold mt-1">•</span>
                      Payment of FY payable upon signing of the agreement as cash/bank transfer or current dated cheque for the first quarter and 3 PDC.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-waraha-gold mt-1">•</span>
                      Accountant available from 9 AM to 6 PM except on holidays.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-waraha-gold mt-1">•</span>
                      VAT refund possible only if the client is in possession of valid invoices & documents as filed in the FTA.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-waraha-gold mt-1">•</span>
                      Financial audit report issued for the previous FY and/or for the coming financial year.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-waraha-gold mt-1">•</span>
                      5% VAT applicable.
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="section bg-waraha-dark">
          <div className="container mx-auto">
            <div className="max-w-2xl mx-auto text-center">
              <h3 className="text-2xl font-serif mb-8 text-waraha-gold">Contact Information</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="glassmorphism">
                  <CardContent className="p-6 text-center">
                    <Phone className="h-8 w-8 text-waraha-gold mx-auto mb-3" />
                    <p className="text-sm text-waraha-silver mb-2">Phone</p>
                    <a href="tel:+971549984344" className="text-white hover:text-waraha-gold transition-colors">
                      +971 54 998 4344
                    </a>
                  </CardContent>
                </Card>
                
                <Card className="glassmorphism">
                  <CardContent className="p-6 text-center">
                    <Mail className="h-8 w-8 text-waraha-gold mx-auto mb-3" />
                    <p className="text-sm text-waraha-silver mb-2">Email</p>
                    <a href="mailto:info@warahagroup.com" className="text-white hover:text-waraha-gold transition-colors">
                      info@warahagroup.com
                    </a>
                  </CardContent>
                </Card>
                
                <Card className="glassmorphism">
                  <CardContent className="p-6 text-center">
                    <Globe className="h-8 w-8 text-waraha-gold mx-auto mb-3" />
                    <p className="text-sm text-waraha-silver mb-2">Website</p>
                    <a href="https://www.warahagroup.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-waraha-gold transition-colors">
                      www.warahagroup.com
                    </a>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Pricing;
