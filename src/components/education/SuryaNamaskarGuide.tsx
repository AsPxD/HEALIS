import React from 'react';
import { motion } from 'framer-motion';
import { Sun, ArrowRight } from 'lucide-react';
import Button from '../shared/Button';

const poses = [
  {
    name: "Pranamasana (Prayer Pose)",
    description: "Stand at the edge of your mat, keep your feet together and balance your weight equally on both feet.",
    benefits: "Improves focus and concentration",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1000"
  },
  {
    name: "Hasta Uttanasana (Raised Arms Pose)",
    description: "Lift your arms up and back, keeping your biceps close to your ears.",
    benefits: "Stretches the whole body, improves digestion",
    image: "https://images.unsplash.com/photo-1573590330099-d6c7355ec595?auto=format&fit=crop&q=80&w=1000"
  },
  {
    name: "Padahastasana (Hand to Foot Pose)",
    description: "Bend forward from the waist, keeping your spine straight.",
    benefits: "Reduces stress and anxiety, improves blood circulation",
    image: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?auto=format&fit=crop&q=80&w=1000"
  }
];

const SuryaNamaskarGuide = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
          <Sun className="w-6 h-6 text-orange-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Surya Namaskar Guide</h2>
          <p className="text-gray-600">Master the ancient practice of Sun Salutation</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {poses.map((pose, index) => (
          <motion.div
            key={pose.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200"
          >
            <div className="relative h-48">
              <img
                src={pose.image}
                alt={pose.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-lg font-semibold text-white">{pose.name}</h3>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-600 mb-4">{pose.description}</p>
              <div className="bg-orange-50 rounded-xl p-4">
                <p className="text-sm font-medium text-orange-800">
                  Benefits: {pose.benefits}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="text-center">
        <Button icon={ArrowRight}>
          View Complete Sequence
        </Button>
      </div>
    </div>
  );
};

export default SuryaNamaskarGuide;