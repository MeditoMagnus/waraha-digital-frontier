
import React from 'react';

const PricingHero: React.FC = () => {
  return (
    <section className="section bg-gradient-to-b from-slate-900/95 to-slate-800/95 backdrop-blur-sm dark:from-slate-900/95 dark:to-slate-800/95 light:from-off-white-exact light:to-pure-white-exact">
      <div className="container mx-auto text-center">
        <h1 className="section-title text-slate-100 dark:text-slate-100 light:text-charcoal-black-exact">
          The Waraha Management Consultancy
        </h1>
        <h2 className="text-2xl md:text-3xl font-serif mb-6 text-yellow-400 dark:text-yellow-400 light:text-waraha-gold-exact">
          Service Comparison
        </h2>
        <p className="text-lg text-slate-300 mb-8 max-w-3xl mx-auto dark:text-slate-300 light:text-charcoal-black-exact">
          Choose the perfect plan for your business needs. All packages include dedicated support and expert guidance.
        </p>
      </div>
    </section>
  );
};

export default PricingHero;
