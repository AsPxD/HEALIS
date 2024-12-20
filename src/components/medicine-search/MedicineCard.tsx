import React from 'react';
import { motion } from 'framer-motion';
import { Pill, AlertCircle, Clock, Shield, ImageOff} from 'lucide-react';
import { Medicine } from './types';

interface MedicineCardProps {
  medicine: Medicine;
}

const MedicineCard = ({ medicine }: MedicineCardProps) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [imageError, setImageError] = React.useState(false);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setImageError(true);
  };

  const getFallbackImageUrl = () => {
    return 'https://via.placeholder.com/350x350.png?text=Medicine+Image';
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
    >
      {/* Image Section */}
      <div className="relative h-48 w-full">
        <img
          src={imageError ? getFallbackImageUrl() : medicine.img_url || getFallbackImageUrl()}
          alt={medicine.name || 'Medicine Image'}
          onError={handleImageError}
          className="w-full h-full object-cover"
        />
        {imageError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="text-center text-gray-500">
              <ImageOff className="mx-auto mb-2 text-gray-400" size={48} />
              <p className="text-sm">Image Not Available</p>
            </div>
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">{medicine.name}</h3>
            <p className="text-gray-500">{medicine.genericName}</p>
          </div>
          <div 
            className={`px-3 py-1 rounded-full text-sm
              ${medicine.prescriptionRequired
                ? 'bg-amber-100 text-amber-700'
                : 'bg-emerald-100 text-emerald-700'
              }`}
          >
            {medicine.prescriptionRequired ? 'Prescription Required' : 'OTC'}
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2 text-gray-600">
            <Pill className="w-5 h-5 text-teal-500" />
            <span>{medicine.dosageForm}</span>
          </div>
          
          <motion.div
            layout
            className={`space-y-3 ${isExpanded ? '' : 'line-clamp-3'}`}
          >
            <div className="flex items-start gap-2 text-gray-600">
              <AlertCircle className="w-5 h-5 text-teal-500 flex-shrink-0 mt-1" />
              <p>{medicine.description}</p>
            </div>

            {isExpanded && (
              <>
                {/* Uses Section */}
                <div className="flex items-start gap-2 text-gray-600">
                  
                  <div>
                    <p className="font-medium">Uses:</p>
                    <ul className="list-disc list-inside">
                      {medicine.uses.map((use, index) => (
                        <li key={index}>{use}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex items-start gap-2 text-gray-600">
                  <Clock className="w-5 h-5 text-teal-500 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-medium">Dosage:</p>
                    <p>{medicine.dosage}</p>
                  </div>
                </div>

                <div className="flex items-start gap-2 text-gray-600">
                  <Shield className="w-5 h-5 text-teal-500 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-medium">Side Effects:</p>
                    <ul className="list-disc list-inside">
                      {medicine.sideEffects.map((effect, index) => (
                        <li key={index}>{effect}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-4 text-teal-600 hover:text-teal-700 font-medium"
        >
          {isExpanded ? 'Show Less' : 'Read More'}
        </button>
      </div>
    </motion.div>
  );
};

export default MedicineCard;