import React from 'react';
import { motion } from 'framer-motion';
import PageHeader from '../components/shared/PageHeader';
import InsuranceHero from '../components/insurance/InsuranceHero';
import InsuranceCalculator from '../components/insurance/InsuranceCalculator';
import InsuranceComparison from '../components/insurance/InsuranceComparison';
import PlanComparison from '../components/insurance/PlanComparison';
import ClaimProcess from '../components/insurance/ClaimProcess';
import FAQSection from '../components/insurance/FAQSection';
import { FloatingElements, GradientBlob } from '../components/shared/BackgroundElements';

const InsuranceGuide = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="pt-24 pb-16 min-h-screen relative"
    >
      <FloatingElements />
      <GradientBlob />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <PageHeader
          title="Health Insurance Guide"
          subtitle="Compare plans, calculate premiums, and make informed decisions"
          gradient="from-violet-500 to-purple-500"
        />

        <InsuranceHero />

        <div className="space-y-16">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <InsuranceCalculator />
            </div>
            <div className="lg:col-span-2">
              <InsuranceComparison />
            </div>
          </div>

          <PlanComparison />
          <ClaimProcess />
          <FAQSection />
        </div>
      </div>
    </motion.div>
  );
};

export default InsuranceGuide;