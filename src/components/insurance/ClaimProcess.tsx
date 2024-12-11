import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Building2, CheckCircle, Phone } from 'lucide-react';

const steps = [
  {
    icon: Building2, // Changed from Hospital to Building2
    title: "Hospital Admission",
    description: "Get admitted to a network hospital with your health card",
    color: "bg-blue-100 text-blue-600"
  },
  {
    icon: FileText,
    title: "Document Submission",
    description: "Submit required documents to the TPA desk",
    color: "bg-violet-100 text-violet-600"
  },
  {
    icon: CheckCircle,
    title: "Claim Processing",
    description: "Claim is processed within 30 minutes for cashless treatment",
    color: "bg-emerald-100 text-emerald-600"
  },
  {
    icon: Phone,
    title: "24/7 Support",
    description: "Get assistance anytime through our helpline",
    color: "bg-amber-100 text-amber-600"
  }
];

const ClaimProcess = () => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">Claim Process</h3>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step, index) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative"
          >
            <div className={`w-12 h-12 rounded-xl ${step.color} 
              flex items-center justify-center mb-4`}>
              <step.icon className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h4>
            <p className="text-gray-600">{step.description}</p>

            {index < steps.length - 1 && (
              <div className="hidden lg:block absolute top-6 left-full w-full h-0.5 
                bg-gradient-to-r from-gray-200 to-gray-100 transform -translate-x-6" />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ClaimProcess;