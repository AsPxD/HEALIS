import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Heart, FileText, Calculator } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: "Comprehensive Coverage",
    description: "Protection for you and your family",
    color: "bg-blue-100 text-blue-600"
  },
  {
    icon: Heart,
    title: "Family First",
    description: "Special family plans and benefits",
    color: "bg-rose-100 text-rose-600"
  },
  {
    icon: FileText,
    title: "Easy Claims",
    description: "Hassle-free claim processing",
    color: "bg-emerald-100 text-emerald-600"
  },
  {
    icon: Calculator,
    title: "Smart Calculator",
    description: "Get instant premium estimates",
    color: "bg-violet-100 text-violet-600"
  }
];

const InsuranceHero = () => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      {features.map((feature, index) => (
        <motion.div
          key={feature.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-xl p-6 shadow-lg border border-gray-200"
        >
          <div className={`w-12 h-12 rounded-xl ${feature.color} 
            flex items-center justify-center mb-4`}>
            <feature.icon className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
          <p className="text-gray-600">{feature.description}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default InsuranceHero;