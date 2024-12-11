import React from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import Button from '../shared/Button';

interface Feature {
  name: string;
  basic: boolean;
  standard: boolean;
  premium: boolean;
}

const features: Feature[] = [
  { name: "Hospitalization Cover", basic: true, standard: true, premium: true },
  { name: "Pre & Post Hospitalization", basic: true, standard: true, premium: true },
  { name: "Day Care Procedures", basic: true, standard: true, premium: true },
  { name: "Room Rent Limit", basic: false, standard: true, premium: true },
  { name: "Maternity Cover", basic: false, standard: false, premium: true },
  { name: "International Coverage", basic: false, standard: false, premium: true },
  { name: "Alternative Treatments", basic: false, standard: true, premium: true },
  { name: "Health Checkup", basic: false, standard: true, premium: true },
  { name: "Organ Donor Expenses", basic: false, standard: true, premium: true },
  { name: "Air Ambulance", basic: false, standard: false, premium: true }
];

const PlanComparison = () => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 overflow-x-auto">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">Plan Comparison</h3>
      
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left py-4 px-6">Features</th>
            <th className="text-center py-4 px-6">
              <div className="text-gray-900 font-semibold">Basic</div>
              <div className="text-violet-600 font-bold mt-1">₹5,999/year</div>
            </th>
            <th className="text-center py-4 px-6">
              <div className="text-gray-900 font-semibold">Standard</div>
              <div className="text-violet-600 font-bold mt-1">₹9,999/year</div>
            </th>
            <th className="text-center py-4 px-6">
              <div className="text-gray-900 font-semibold">Premium</div>
              <div className="text-violet-600 font-bold mt-1">₹14,999/year</div>
            </th>
          </tr>
        </thead>
        <tbody>
          {features.map((feature, index) => (
            <motion.tr
              key={feature.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="border-t border-gray-100"
            >
              <td className="py-4 px-6 text-gray-900">{feature.name}</td>
              <td className="py-4 px-6 text-center">
                {feature.basic ? (
                  <Check className="w-5 h-5 text-green-500 mx-auto" />
                ) : (
                  <X className="w-5 h-5 text-gray-300 mx-auto" />
                )}
              </td>
              <td className="py-4 px-6 text-center">
                {feature.standard ? (
                  <Check className="w-5 h-5 text-green-500 mx-auto" />
                ) : (
                  <X className="w-5 h-5 text-gray-300 mx-auto" />
                )}
              </td>
              <td className="py-4 px-6 text-center">
                {feature.premium ? (
                  <Check className="w-5 h-5 text-green-500 mx-auto" />
                ) : (
                  <X className="w-5 h-5 text-gray-300 mx-auto" />
                )}
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>

      <div className="grid grid-cols-3 gap-4 mt-8">
        <Button variant="outline">Select Basic</Button>
        <Button variant="outline">Select Standard</Button>
        <Button>Select Premium</Button>
      </div>
    </div>
  );
};

export default PlanComparison;