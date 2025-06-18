
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
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-slate-800 to-amber-900">
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
        <section className="section bg-gradient-to-b from-slate-900/95 to-slate-800/95 backdrop-blur-sm">
          <div className="container mx-auto text-center">
            <h1 className="section-title text-slate-100">
              The Waraha Management Consultancy
            </h1>
            <h2 className="text-2xl md:text-3xl font-serif mb-6 text-yellow-400">
              Service Comparison
            </h2>
            <p className="text-lg text-slate-300 mb-8 max-w-3xl mx-auto">
              Choose the perfect plan for your business needs. All packages include dedicated support and expert guidance.
            </p>
            <Button 
              onClick={handleDownloadPDF}
              className="bg-yellow-600 hover:bg-yellow-500 text-slate-900 font-semibold px-6 py-3 rounded-lg transition-all duration-300 shadow-lg"
            >
              <Download className="h-5 w-5 mr-2" />
              Download PDF
            </Button>
          </div>
        </section>

        {/* Pricing Table Section */}
        <section className="section bg-gradient-to-b from-slate-800/95 to-slate-700/95 backdrop-blur-sm">
          <div className="container mx-auto">
            {/* Mobile-friendly cards for smaller screens */}
            <div className="block lg:hidden space-y-6">
              {/* Basic Plan */}
              <Card className="bg-slate-800/80 backdrop-blur-md border-slate-600/50 shadow-2xl">
                <CardHeader className="text-center bg-gradient-to-r from-slate-700/50 to-slate-600/50">
                  <CardTitle className="text-2xl font-serif text-slate-100">Basic</CardTitle>
                  <div className="text-3xl font-bold text-slate-100">AED 299<span className="text-sm font-normal text-slate-300">/month</span></div>
                </CardHeader>
                <CardContent className="p-6">
                  <ul className="space-y-3">
                    {services.map((service) => (
                      <li key={service.name} className="flex justify-between items-center py-2 border-b border-slate-600/30">
                        <span className="text-sm text-slate-200">{service.name}</span>
                        {renderServiceValue(service.basic)}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Standard Plan */}
              <Card className="bg-gradient-to-br from-yellow-900/80 to-amber-800/80 backdrop-blur-md border-yellow-500/50 shadow-2xl border-2">
                <CardHeader className="text-center bg-gradient-to-r from-yellow-700/50 to-amber-600/50">
                  <CardTitle className="text-2xl font-serif text-yellow-100">Standard</CardTitle>
                  <div className="text-3xl font-bold text-yellow-400">AED 799<span className="text-sm font-normal text-yellow-200">/month</span></div>
                  <div className="text-xs text-yellow-300 font-medium">RECOMMENDED</div>
                </CardHeader>
                <CardContent className="p-6">
                  <ul className="space-y-3">
                    {services.map((service) => (
                      <li key={service.name} className="flex justify-between items-center py-2 border-b border-yellow-600/30">
                        <span className="text-sm text-yellow-100">{service.name}</span>
                        {renderServiceValue(service.standard)}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Premium Plan */}
              <Card className="bg-slate-800/80 backdrop-blur-md border-slate-600/50 shadow-2xl">
                <CardHeader className="text-center bg-gradient-to-r from-slate-700/50 to-slate-600/50">
                  <CardTitle className="text-2xl font-serif text-slate-100">Premium</CardTitle>
                  <div className="text-3xl font-bold text-slate-100">AED 1799<span className="text-sm font-normal text-slate-300">/month</span></div>
                </CardHeader>
                <CardContent className="p-6">
                  <ul className="space-y-3">
                    {services.map((service) => (
                      <li key={service.name} className="flex justify-between items-center py-2 border-b border-slate-600/30">
                        <span className="text-sm text-slate-200">{service.name}</span>
                        {renderServiceValue(service.premium)}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Desktop table for larger screens */}
            <div className="hidden lg:block overflow-x-auto">
              <div className="bg-gradient-to-br from-slate-800/90 to-slate-700/90 backdrop-blur-md rounded-2xl overflow-hidden shadow-2xl border border-slate-600/30">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-slate-700/80 to-slate-600/80">
                      <th className="px-6 py-6 text-left font-serif text-lg text-slate-200">Service</th>
                      <th className="px-6 py-6 text-center font-serif text-lg border-l border-slate-600/30">
                        <div className="text-slate-200">Basic</div>
                        <div className="text-2xl font-bold mt-2 text-slate-100">AED 299</div>
                        <div className="text-sm font-normal text-slate-300">per month</div>
                      </th>
                      <th className="px-6 py-6 text-center font-serif text-lg border-l-2 border-r-2 border-yellow-500/50 bg-gradient-to-br from-yellow-900/60 to-amber-800/60">
                        <div className="text-yellow-200">Standard</div>
                        <div className="text-2xl font-bold mt-2 text-yellow-400">AED 799</div>
                        <div className="text-sm font-normal text-yellow-300">per month</div>
                        <div className="text-xs text-yellow-300 font-medium mt-1">RECOMMENDED</div>
                      </th>
                      <th className="px-6 py-6 text-center font-serif text-lg border-l border-slate-600/30">
                        <div className="text-slate-200">Premium</div>
                        <div className="text-2xl font-bold mt-2 text-slate-100">AED 1799</div>
                        <div className="text-sm font-normal text-slate-300">per month</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {services.map((service, index) => (
                      <tr 
                        key={service.name} 
                        className={`${index % 2 === 0 ? 'bg-slate-700/20' : 'bg-slate-600/20'} hover:bg-slate-600/30 transition-colors`}
                      >
                        <td className="px-6 py-4 font-medium text-slate-200 border-b border-slate-600/20">{service.name}</td>
                        <td className="px-6 py-4 text-center border-b border-slate-600/20 border-l border-slate-600/30">{renderServiceValue(service.basic)}</td>
                        <td className="px-6 py-4 text-center border-b border-slate-600/20 border-l-2 border-r-2 border-yellow-500/30 bg-yellow-900/10">{renderServiceValue(service.standard)}</td>
                        <td className="px-6 py-4 text-center border-b border-slate-600/20 border-l border-slate-600/30">{renderServiceValue(service.premium)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Terms & Conditions */}
        <section className="section bg-gradient-to-b from-slate-700/95 to-slate-800/95 backdrop-blur-sm">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-2xl font-serif mb-6 text-yellow-400 text-center">Terms & Conditions</h3>
              <Card className="bg-slate-800/80 backdrop-blur-md border-slate-600/50 shadow-2xl">
                <CardContent className="p-6">
                  <ul className="space-y-4 text-slate-200">
                    <li className="flex items-start gap-3">
                      <span className="text-yellow-400 mt-1 text-lg">•</span>
                      <span>Agreement duration is 1 year.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-yellow-400 mt-1 text-lg">•</span>
                      <span>Payment of FY payable upon signing of the agreement as cash/bank transfer or current dated cheque for the first quarter and 3 PDC.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-yellow-400 mt-1 text-lg">•</span>
                      <span>Accountant available from 9 AM to 6 PM except on holidays.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-yellow-400 mt-1 text-lg">•</span>
                      <span>VAT refund possible only if the client is in possession of valid invoices & documents as filed in the FTA.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-yellow-400 mt-1 text-lg">•</span>
                      <span>Financial audit report issued for the previous FY and/or for the coming financial year.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-yellow-400 mt-1 text-lg">•</span>
                      <span>5% VAT applicable.</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="section bg-gradient-to-b from-slate-800/95 to-slate-900/95 backdrop-blur-sm">
          <div className="container mx-auto">
            <div className="max-w-2xl mx-auto text-center">
              <h3 className="text-2xl font-serif mb-8 text-yellow-400">Contact Information</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="bg-slate-800/80 backdrop-blur-md border-slate-600/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6 text-center">
                    <Phone className="h-8 w-8 text-yellow-400 mx-auto mb-3" />
                    <p className="text-sm text-slate-400 mb-2">Phone</p>
                    <a href="tel:+971549984344" className="text-slate-100 hover:text-yellow-400 transition-colors font-medium">
                      +971 54 998 4344
                    </a>
                  </CardContent>
                </Card>
                
                <Card className="bg-slate-800/80 backdrop-blur-md border-slate-600/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6 text-center">
                    <Mail className="h-8 w-8 text-yellow-400 mx-auto mb-3" />
                    <p className="text-sm text-slate-400 mb-2">Email</p>
                    <a href="mailto:info@warahagroup.com" className="text-slate-100 hover:text-yellow-400 transition-colors font-medium">
                      info@warahagroup.com
                    </a>
                  </CardContent>
                </Card>
                
                <Card className="bg-slate-800/80 backdrop-blur-md border-slate-600/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6 text-center">
                    <Globe className="h-8 w-8 text-yellow-400 mx-auto mb-3" />
                    <p className="text-sm text-slate-400 mb-2">Website</p>
                    <a href="https://www.warahagroup.com" target="_blank" rel="noopener noreferrer" className="text-slate-100 hover:text-yellow-400 transition-colors font-medium">
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
