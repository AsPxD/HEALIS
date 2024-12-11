import React from 'react';
import { motion } from 'framer-motion';
import { Check, Shield, AlertCircle, Info } from 'lucide-react';
import Button from '../shared/Button';
import { InsurancePlan } from './types';

interface InsurancePlanCardProps {
  plan: InsurancePlan;
  isPopular?: boolean;
  onSelect: () => void;
}

const InsurancePlanCard = ({ plan, isPopular, onSelect }: InsurancePlanCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative h-full bg-white rounded-2xl p-6 shadow-xl border border-gray-200 
        transition-all duration-300 hover:shadow-2xl flex flex-col"
    >
      {isPopular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="px-4 py-1 bg-gradient-to-r from-violet-600 to-indigo-600 
            text-white text-sm font-medium rounded-full whitespace-nowrap">
            Most Popular
          </span>
        </div>
      )}

      <div className="flex items-center gap-4 mb-6">
        <div className={`w-12 h-12 rounded-xl ${plan.color} flex items-center justify-center`}>
          <Shield className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-900">{plan.name}</h3>
          <p className="text-gray-600">{plan.provider}</p>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-baseline mb-4">
          <span className="text-3xl font-bold text-gray-900">₹{plan.monthlyPremium}</span>
          <span className="text-gray-600 ml-2">/month</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Info className="w-4 h-4" />
          <span>Sum Insured: ₹{parseInt(plan.sumInsured).toLocaleString()}</span>
        </div>
      </div>

      <div className="flex-1 space-y-4 mb-6">
        <div>
          <h4 className="font-medium text-gray-900 mb-2">Key Features</h4>
          <ul className="space-y-2">
            {plan.keyFeatures.map((feature, index) => (
              <li key={index} className="flex items-start gap-2 text-gray-600">
                <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {plan.additionalBenefits.length > 0 && (
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Additional Benefits</h4>
            <ul className="space-y-2">
              {plan.additionalBenefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-2 text-gray-600">
                  <Check className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="space-y-4 mt-auto">
        <Button onClick={onSelect} className="w-full">
          Select Plan
        </Button>
        
        <div className="flex items-start gap-2 text-sm text-gray-500">
          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <p>Premium may vary based on age, medical history, and location</p>
        </div>
      </div>
    </motion.div>
  );
};

export default InsurancePlanCard;