import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

const MedicalDisclaimer = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-8"
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
          <AlertTriangle className="w-6 h-6 text-amber-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-amber-800 mb-2">Medical Disclaimer</h3>
          <p className="text-amber-700 leading-relaxed">
            The information provided here is for educational purposes only and is not intended as medical advice. 
            Always consult with a qualified healthcare professional before starting, changing, or stopping any 
            medication. They can provide personalized recommendations based on your specific medical history 
            and current conditions.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default MedicalDisclaimer;