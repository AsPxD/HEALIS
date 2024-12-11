import React from 'react';
import { MapPin, Phone, Clock, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { pharmacies } from './data';

const NearbyPharmacies = () => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {pharmacies.map((pharmacy, index) => (
        <motion.div
          key={pharmacy.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
          <div className="flex items-start justify-between mb-4">
            <h3 className="text-xl font-semibold text-gray-900">{pharmacy.name}</h3>
            <div className="flex items-center gap-1 text-amber-500">
              <Star className="w-5 h-5 fill-current" />
              <span>{pharmacy.rating}</span>
            </div>
          </div>

          <div className="space-y-3 text-gray-600">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-teal-500" />
              <span>{pharmacy.address}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-teal-500" />
              <span>{pharmacy.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-teal-500" />
              <span>{pharmacy.hours}</span>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex flex-wrap gap-2">
              {pharmacy.services.map((service, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-teal-50 text-teal-600 rounded-full text-sm"
                >
                  {service}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default NearbyPharmacies;