
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const TermsAndConditions: React.FC = () => {
  return (
    <section className="terms-conditions-section">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto">
          <h3 className="terms-conditions-title">Terms & Conditions</h3>
          <Card className="terms-conditions-card">
            <CardContent className="p-6">
              <ul className="space-y-4 terms-conditions-list">
                <li className="terms-conditions-item">
                  <span className="terms-conditions-bullet">•</span>
                  <span>Agreement duration is 1 year.</span>
                </li>
                <li className="terms-conditions-item">
                  <span className="terms-conditions-bullet">•</span>
                  <span>Payment of FY payable upon signing of the agreement as cash/bank transfer or current dated cheque for the first quarter and 3 PDC.</span>
                </li>
                <li className="terms-conditions-item">
                  <span className="terms-conditions-bullet">•</span>
                  <span>Accountant available from 9 AM to 6 PM except on holidays.</span>
                </li>
                <li className="terms-conditions-item">
                  <span className="terms-conditions-bullet">•</span>
                  <span>VAT refund possible only if the client is in possession of valid invoices & documents as filed in the FTA.</span>
                </li>
                <li className="terms-conditions-item">
                  <span className="terms-conditions-bullet">•</span>
                  <span>Financial audit report issued for the previous FY and/or for the coming financial year.</span>
                </li>
                <li className="terms-conditions-item">
                  <span className="terms-conditions-bullet">•</span>
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
