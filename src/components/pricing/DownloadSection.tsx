
import React from 'react';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { generateResponsePDF } from '../../utils/pdfGenerator';

const DownloadSection: React.FC = () => {
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
  );
};

export default DownloadSection;
