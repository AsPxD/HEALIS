import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Wind, Flame } from 'lucide-react';

const doshas = [
  {
    name: "Vata",
    element: "Air & Space",
    icon: Wind,
    characteristics: [
      "Creative and quick-thinking",
      "Light and energetic movement",
      "Variable appetite and digestion",
      "Light and interrupted sleep"
    ],
    balancingTips: [
      "Follow a regular daily routine",
      "Stay warm and grounded",
      "Practice gentle yoga",
      "Eat warm, nourishing foods"
    ]
  },
  {
    name: "Pitta",
    element: "Fire & Water",
    icon: Flame,
    characteristics: [
      "Sharp intellect and focus",
      "Strong digestion and metabolism",
      "Natural leaders and organizers",
      "Moderate and sound sleep"
    ],
    balancingTips: [
      "Stay cool and relaxed",
      "Avoid excessive heat",
      "Practice moderate exercise",
      "Eat cooling, fresh foods"
    ]
  },
  {
    name: "Kapha",
    element: "Earth & Water",
    icon: Leaf,
    characteristics: [
      "Calm and grounded nature",
      "Strong and steady energy",
      "Regular appetite and digestion",
      "Deep and prolonged sleep"
    ],
    balancingTips: [
      "Stay active and motivated",
      "Embrace variety and change",
      "Practice energetic exercise",
      "Eat light, warm foods"
    ]
  }
];

const AyurvedaBasics = () => {
  return (
    <section className="space-y-8">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
          <Leaf className="w-6 h-6 text-emerald-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Ayurveda Fundamentals</h2>
          <p className="text-gray-600">Understanding the science of life and well-being</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {doshas.map((dosha, index) => (
          <motion.div
            key={dosha.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
                <dosha.icon className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{dosha.name}</h3>
                <p className="text-emerald-600">{dosha.element}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Characteristics</h4>
                <ul className="space-y-2">
                  {dosha.characteristics.map((trait, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5" />
                      {trait}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">Balancing Tips</h4>
                <ul className="space-y-2">
                  {dosha.balancingTips.map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="p-6 bg-emerald-50 rounded-2xl">
        <p className="text-sm text-emerald-800 leading-relaxed">
          Ayurveda teaches that each person has a unique combination of the three doshas, 
          which influences their physical, mental, and emotional characteristics. Understanding 
          your dominant dosha can help you make lifestyle choices that promote balance and well-being.
        </p>
      </div>
    </section>
  );
};

export default AyurvedaBasics;