import React from 'react';
import { motion } from 'framer-motion';
import { Phone, AlertCircle } from 'lucide-react';

const EmergencyButton = () => {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const handleEmergencyCall = () => {
    window.location.href = 'tel:102';
  };

  return (
    <div className="mb-8">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleEmergencyCall}
        className="w-full bg-red-500 hover:bg-red-600 text-white rounded-2xl p-6 
          shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden"
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-64 h-64 bg-red-400 rounded-full animate-ping opacity-20" />
        </div>
        
        <div className="relative flex items-center justify-center gap-4">
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
            <Phone className="w-8 h-8 text-white" />
          </div>
          <div className="text-left">
            <h2 className="text-2xl font-bold">Emergency Ambulance</h2>
            <p className="text-white/90">Call 102 for immediate assistance</p>
          </div>
        </div>
      </motion.button>

      <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-xl">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-6 h-6 text-amber-500 flex-shrink-0" />
          <p className="text-amber-700 text-sm">
            Only use emergency services for genuine medical emergencies. For non-emergency medical advice,
            please consult your regular healthcare provider or use our telemedicine services.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmergencyButton;