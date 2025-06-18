
import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ParticleBackground from '../components/ParticleBackground';
import SEOMetaTags from '../components/SEOMetaTags';
import { Check, X, Phone, Mail, Globe, Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { generateResponsePDF } from '../utils/pdfGenerator';

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
      return <Check className="h-5 w-5 text-emerald-400 mx-auto" />;
    } else if (value === false) {
      return <X className="h-5 w-5 text-red-400 mx-auto" />;
    } else {
      return <span className="text-yellow-400 font-semibold">{value}</span>;
    }
  };

  const handleDownloadPDF = () => {
    const content = `
# The Waraha Management Consultancy - Service Comparison

## Service Packages

### Basic Package - AED 299/month
- Accounting Software ZOHO ✓
- Payroll Management ✓
- VAT Filing ✓
- VAT Amendment ✓
- VAT Advisory ✓
- Corporate Tax Training ✓
- Dedicated Accountant ✓

### Standard Package - AED 799/month
- Accounting Software ZOHO ✓
- No. of Entries ✓
- Bank Reconciliation ✓
- Business Analysis ✓
- VAT Filing ✓
- VAT Amendment ✓
- VAT Refund ✓
- Corporate Tax Registration & Filing ✓
- VAT Advisory ✓
- One Year Auditing ✓
- Corporate Tax Training ✓
- Dedicated Accountant ✓

### Premium Package - AED 1799/month
- Accounting Software ZOHO ✓
- No. of Entries: Unlimited
- P&L Balance Sheet ✓
- Bank Reconciliation ✓
- Payroll Management ✓
- Business Analysis ✓
- VAT Registration ✓
- VAT Filing ✓
- VAT Amendment ✓
- VAT Refund ✓
- Corporate Tax Registration & Filing ✓
- VAT Advisory ✓
- One Year Auditing ✓
- Corporate Tax Training ✓
- Dedicated Accountant ✓

## Terms & Conditions

• Agreement duration is 1 year.
• Payment of FY payable upon signing of the agreement as cash/bank transfer or current dated cheque for the first quarter and 3 PDC.
• Accountant available from 9 AM to 6 PM except on holidays.
• VAT refund possible only if the client is in possession of valid invoices & documents as filed in the FTA.
• Financial audit report issued for the previous FY and/or for the coming financial year.
• 5% VAT applicable.

## Contact Information

📱 Phone: +971 54 998 4344
📧 Email: info@warahagroup.com
🌐 Website: www.warahagroup.com
    `;
    
    generateResponsePDF(content, 'Waraha Group - Service Comparison');
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-waraha-midnight via-slate-800 to-amber-900 dark:from-waraha-midnight dark:via-slate-800 dark:to-amber-900 light:from-off-white light:via-muted-gray light:to-amber-50">
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
        <section className="section bg-gradient-to-b from-slate-900/95 to-slate-800/95 backdrop-blur-sm dark:from-slate-900/95 dark:to-slate-800/95 light:from-off-white/95 light:to-muted-gray/95">
          <div className="container mx-auto text-center">
            <h1 className="section-title text-slate-100 dark:text-slate-100 light:text-charcoal-black">
              The Waraha Management Consultancy
            </h1>
            <h2 className="text-2xl md:text-3xl font-serif mb-6 text-yellow-400 dark:text-yellow-400 light:text-waraha-gold">
              Service Comparison
            </h2>
            <p className="text-lg text-slate-300 mb-8 max-w-3xl mx-auto dark:text-slate-300 light:text-charcoal-black">
              Choose the perfect plan for your business needs. All packages include dedicated support and expert guidance.
            </p>
          </div>
        </section>

        {/* Pricing Table Section */}
        <section className="section bg-gradient-to-b from-slate-800/95 to-slate-700/95 backdrop-blur-sm dark:from-slate-800/95 dark:to-slate-700/95 light:from-muted-gray/95 light:to-off-white/95">
          <div className="container mx-auto">
            {/* Mobile-friendly cards for smaller screens */}
            <div className="block lg:hidden space-y-6">
              {/* Basic Plan */}
              <Card className="bg-slate-800/80 backdrop-blur-md border-slate-600/50 shadow-2xl dark:bg-slate-800/80 dark:border-slate-600/50 light:bg-white/90 light:border-muted-gray/50">
                <CardHeader className="text-center bg-gradient-to-r from-slate-700/50 to-slate-600/50 dark:from-slate-700/50 dark:to-slate-600/50 light:from-muted-gray/50 light:to-muted-gray/30">
                  <CardTitle className="text-2xl font-serif text-slate-100 dark:text-slate-100 light:text-charcoal-black">Basic</CardTitle>
                  <div className="text-3xl font-bold text-slate-100 dark:text-slate-100 light:text-charcoal-black">AED 299<span className="text-sm font-normal text-slate-300 dark:text-slate-300 light:text-charcoal-black/70">/month</span></div>
                </CardHeader>
                <CardContent className="p-6">
                  <ul className="space-y-3">
                    {services.map((service) => (
                      <li key={service.name} className="flex justify-between items-center py-2 border-b border-slate-600/30 dark:border-slate-600/30 light:border-muted-gray/30">
                        <span className="text-sm text-slate-200 dark:text-slate-200 light:text-charcoal-black">{service.name}</span>
                        {renderServiceValue(service.basic)}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Standard Plan */}
              <Card className="bg-gradient-to-br from-yellow-900/80 to-amber-800/80 backdrop-blur-md border-yellow-500/50 shadow-2xl border-2 dark:from-yellow-900/80 dark:to-amber-800/80 dark:border-yellow-500/50 light:from-waraha-gold/20 light:to-amber-100/80 light:border-waraha-gold/50">
                <CardHeader className="text-center bg-gradient-to-r from-yellow-700/50 to-amber-600/50 dark:from-yellow-700/50 dark:to-amber-600/50 light:from-waraha-gold/30 light:to-amber-200/50">
                  <CardTitle className="text-2xl font-serif text-yellow-100 dark:text-yellow-100 light:text-charcoal-black">Standard</CardTitle>
                  <div className="text-3xl font-bold text-yellow-400 dark:text-yellow-400 light:text-waraha-gold">AED 799<span className="text-sm font-normal text-yellow-200 dark:text-yellow-200 light:text-charcoal-black/70">/month</span></div>
                  <div className="text-xs text-yellow-300 font-medium dark:text-yellow-300 light:text-waraha-gold">RECOMMENDED</div>
                </CardHeader>
                <CardContent className="p-6">
                  <ul className="space-y-3">
                    {services.map((service) => (
                      <li key={service.name} className="flex justify-between items-center py-2 border-b border-yellow-600/30 dark:border-yellow-600/30 light:border-waraha-gold/30">
                        <span className="text-sm text-yellow-100 dark:text-yellow-100 light:text-charcoal-black">{service.name}</span>
                        {renderServiceValue(service.standard)}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Premium Plan */}
              <Card className="bg-slate-800/80 backdrop-blur-md border-slate-600/50 shadow-2xl dark:bg-slate-800/80 dark:border-slate-600/50 light:bg-white/90 light:border-muted-gray/50">
                <CardHeader className="text-center bg-gradient-to-r from-slate-700/50 to-slate-600/50 dark:from-slate-700/50 dark:to-slate-600/50 light:from-muted-gray/50 light:to-muted-gray/30">
                  <CardTitle className="text-2xl font-serif text-slate-100 dark:text-slate-100 light:text-charcoal-black">Premium</CardTitle>
                  <div className="text-3xl font-bold text-slate-100 dark:text-slate-100 light:text-charcoal-black">AED 1799<span className="text-sm font-normal text-slate-300 dark:text-slate-300 light:text-charcoal-black/70">/month</span></div>
                </CardHeader>
                <CardContent className="p-6">
                  <ul className="space-y-3">
                    {services.map((service) => (
                      <li key={service.name} className="flex justify-between items-center py-2 border-b border-slate-600/30 dark:border-slate-600/30 light:border-muted-gray/30">
                        <span className="text-sm text-slate-200 dark:text-slate-200 light:text-charcoal-black">{service.name}</span>
                        {renderServiceValue(service.premium)}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Desktop table for larger screens */}
            <div className="hidden lg:block overflow-x-auto">
              <div className="bg-gradient-to-br from-slate-800/90 to-slate-700/90 backdrop-blur-md rounded-2xl overflow-hidden shadow-2xl border border-slate-600/30 dark:from-slate-800/90 dark:to-slate-700/90 dark:border-slate-600/30 light:from-white/90 light:to-muted-gray/30 light:border-muted-gray/30">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-slate-700/80 to-slate-600/80 dark:from-slate-700/80 dark:to-slate-600/80 light:from-muted-gray/80 light:to-muted-gray/60">
                      <th className="px-6 py-6 text-left font-serif text-lg text-slate-200 dark:text-slate-200 light:text-charcoal-black">Service</th>
                      <th className="px-6 py-6 text-center font-serif text-lg border-l border-slate-600/30 dark:border-slate-600/30 light:border-muted-gray/30">
                        <div className="text-slate-200 dark:text-slate-200 light:text-charcoal-black">Basic</div>
                        <div className="text-2xl font-bold mt-2 text-slate-100 dark:text-slate-100 light:text-charcoal-black">AED 299</div>
                        <div className="text-sm font-normal text-slate-300 dark:text-slate-300 light:text-charcoal-black/70">per month</div>
                      </th>
                      <th className="px-6 py-6 text-center font-serif text-lg border-l-2 border-r-2 border-yellow-500/50 bg-gradient-to-br from-yellow-900/60 to-amber-800/60 dark:border-yellow-500/50 dark:from-yellow-900/60 dark:to-amber-800/60 light:border-waraha-gold/50 light:from-waraha-gold/20 light:to-amber-100/60">
                        <div className="text-yellow-200 dark:text-yellow-200 light:text-charcoal-black">Standard</div>
                        <div className="text-2xl font-bold mt-2 text-yellow-400 dark:text-yellow-400 light:text-waraha-gold">AED 799</div>
                        <div className="text-sm font-normal text-yellow-300 dark:text-yellow-300 light:text-charcoal-black/70">per month</div>
                        <div className="text-xs text-yellow-300 font-medium mt-1 dark:text-yellow-300 light:text-waraha-gold">RECOMMENDED</div>
                      </th>
                      <th className="px-6 py-6 text-center font-serif text-lg border-l border-slate-600/30 dark:border-slate-600/30 light:border-muted-gray/30">
                        <div className="text-slate-200 dark:text-slate-200 light:text-charcoal-black">Premium</div>
                        <div className="text-2xl font-bold mt-2 text-slate-100 dark:text-slate-100 light:text-charcoal-black">AED 1799</div>
                        <div className="text-sm font-normal text-slate-300 dark:text-slate-300 light:text-charcoal-black/70">per month</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {services.map((service, index) => (
                      <tr 
                        key={service.name} 
                        className={`${index % 2 === 0 ? 'bg-slate-700/20 dark:bg-slate-700/20 light:bg-muted-gray/10' : 'bg-slate-600/20 dark:bg-slate-600/20 light:bg-white/50'} hover:bg-slate-600/30 dark:hover:bg-slate-600/30 light:hover:bg-muted-gray/20 transition-colors`}
                      >
                        <td className="px-6 py-4 font-medium text-slate-200 border-b border-slate-600/20 dark:text-slate-200 dark:border-slate-600/20 light:text-charcoal-black light:border-muted-gray/20">{service.name}</td>
                        <td className="px-6 py-4 text-center border-b border-slate-600/20 border-l border-slate-600/30 dark:border-slate-600/20 dark:border-l dark:border-slate-600/30 light:border-muted-gray/20 light:border-l light:border-muted-gray/30">{renderServiceValue(service.basic)}</td>
                        <td className="px-6 py-4 text-center border-b border-slate-600/20 border-l-2 border-r-2 border-yellow-500/30 bg-yellow-900/10 dark:border-slate-600/20 dark:border-l-2 dark:border-r-2 dark:border-yellow-500/30 dark:bg-yellow-900/10 light:border-muted-gray/20 light:border-l-2 light:border-r-2 light:border-waraha-gold/30 light:bg-waraha-gold/5">{renderServiceValue(service.standard)}</td>
                        <td className="px-6 py-4 text-center border-b border-slate-600/20 border-l border-slate-600/30 dark:border-slate-600/20 dark:border-l dark:border-slate-600/30 light:border-muted-gray/20 light:border-l light:border-muted-gray/30">{renderServiceValue(service.premium)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Terms & Conditions */}
        <section className="section bg-gradient-to-b from-slate-700/95 to-slate-800/95 backdrop-blur-sm dark:from-slate-700/95 dark:to-slate-800/95 light:from-off-white/95 light:to-muted-gray/95">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-2xl font-serif mb-6 text-yellow-400 text-center dark:text-yellow-400 light:text-waraha-gold">Terms & Conditions</h3>
              <Card className="bg-slate-800/80 backdrop-blur-md border-slate-600/50 shadow-2xl dark:bg-slate-800/80 dark:border-slate-600/50 light:bg-white/90 light:border-muted-gray/50">
                <CardContent className="p-6">
                  <ul className="space-y-4 text-slate-200 dark:text-slate-200 light:text-charcoal-black">
                    <li className="flex items-start gap-3">
                      <span className="text-yellow-400 mt-1 text-lg dark:text-yellow-400 light:text-waraha-gold">•</span>
                      <span>Agreement duration is 1 year.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-yellow-400 mt-1 text-lg dark:text-yellow-400 light:text-waraha-gold">•</span>
                      <span>Payment of FY payable upon signing of the agreement as cash/bank transfer or current dated cheque for the first quarter and 3 PDC.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-yellow-400 mt-1 text-lg dark:text-yellow-400 light:text-waraha-gold">•</span>
                      <span>Accountant available from 9 AM to 6 PM except on holidays.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-yellow-400 mt-1 text-lg dark:text-yellow-400 light:text-waraha-gold">•</span>
                      <span>VAT refund possible only if the client is in possession of valid invoices & documents as filed in the FTA.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-yellow-400 mt-1 text-lg dark:text-yellow-400 light:text-waraha-gold">•</span>
                      <span>Financial audit report issued for the previous FY and/or for the coming financial year.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-yellow-400 mt-1 text-lg dark:text-yellow-400 light:text-waraha-gold">•</span>
                      <span>5% VAT applicable.</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Contact Information */}
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

        {/* Download PDF Section */}
        <section className="section bg-gradient-to-b from-slate-900/95 to-waraha-midnight/95 backdrop-blur-sm dark:from-slate-900/95 dark:to-waraha-midnight/95 light:from-off-white/95 light:to-muted-gray/95">
          <div className="container mx-auto text-center">
            <h3 className="text-2xl font-serif mb-6 text-yellow-400 dark:text-yellow-400 light:text-waraha-gold">Download Service Details</h3>
            <p className="text-slate-300 mb-8 max-w-2xl mx-auto dark:text-slate-300 light:text-charcoal-black">
              Get a comprehensive PDF document with all our service packages, terms, and contact information for your reference.
            </p>
            <Button 
              onClick={handleDownloadPDF}
              className="bg-yellow-600 hover:bg-yellow-500 text-slate-900 font-semibold px-8 py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 dark:bg-yellow-600 dark:hover:bg-yellow-500 dark:text-slate-900 light:bg-waraha-gold light:hover:bg-waraha-gold/90 light:text-white"
            >
              <Download className="h-5 w-5 mr-2" />
              Download PDF
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Pricing;
