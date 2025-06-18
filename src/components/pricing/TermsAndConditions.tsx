
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const TermsAndConditions: React.FC = () => {
  return (
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
  );
};

export default TermsAndConditions;
