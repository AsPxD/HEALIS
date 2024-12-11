import React from 'react';
import { motion } from 'framer-motion';
import { Wind, Sun, Moon, Zap } from 'lucide-react';

const pranayamas = [
  {
    name: "Anulom Vilom",
    description: "Alternate nostril breathing for balance and stress relief",
    benefits: [
      "Reduces stress and anxiety",
      "Improves respiratory function",
      "Balances left and right brain",
      "Enhances concentration"
    ],
    steps: [
      "Sit in a comfortable position",
      "Close right nostril with thumb",
      "Inhale through left nostril",
      "Close left nostril, open right",
      "Exhale through right nostril",
      "Repeat the cycle"
    ],
    duration: "5-10 minutes",
    icon: Wind,
    color: "bg-blue-100 text-blue-600"
  },
  {
    name: "Kapalbhati",
    description: "Skull-shining breath for energy and cleansing",
    benefits: [
      "Increases metabolic rate",
      "Improves digestion",
      "Energizes mind and body",
      "Strengthens core muscles"
    ],
    steps: [
      "Sit in comfortable position",
      "Take deep breath in",
      "Forceful exhale through nose",
      "Allow natural inhale",
      "Maintain steady rhythm",
      "Start slow and increase pace"
    ],
    duration: "3-5 minutes",
    icon: Sun,
    color: "bg-amber-100 text-amber-600"
  },
  {
    name: "Bhramari",
    description: "Humming bee breath for calm and healing",
    benefits: [
      "Reduces stress and anxiety",
      "Helps with insomnia",
      "Calms the mind",
      "Improves concentration"
    ],
    steps: [
      "Sit comfortably, eyes closed",
      "Place fingers on ears",
      "Inhale deeply",
      "Exhale with humming sound",
      "Feel the vibration",
      "Continue for several rounds"
    ],
    duration: "5-10 minutes",
    icon: Moon,
    color: "bg-purple-100 text-purple-600"
  }
];

const PranayamaGuide = () => {
  return (
    <section className="space-y-8">
      <div className="text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-gray-900 mb-4"
        >
          Pranayama Techniques
        </motion.h2>
        <p className="text-xl text-gray-600">Master your breath, master your life</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {pranayamas.map((pranayama, index) => (
          <motion.div
            key={pranayama.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className={`w-12 h-12 rounded-xl ${pranayama.color} 
                flex items-center justify-center`}>
                <pranayama.icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{pranayama.name}</h3>
                <p className="text-sm text-gray-600">{pranayama.duration}</p>
              </div>
            </div>

            <p className="text-gray-600 mb-6">{pranayama.description}</p>

            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Benefits:</h4>
                <ul className="space-y-2">
                  {pranayama.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">Steps:</h4>
                <ol className="space-y-2">
                  {pranayama.steps.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-gray-600">
                      <span className="w-5 h-5 rounded-full bg-gray-100 flex items-center 
                        justify-center flex-shrink-0 text-sm font-medium text-gray-600">
                        {idx + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
            <Zap className="w-5 h-5 text-purple-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Pro Tips</h3>
        </div>
        <ul className="space-y-3 text-gray-700">
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2" />
            Practice on an empty stomach, preferably in the morning
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2" />
            Start with shorter durations and gradually increase
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2" />
            Maintain proper posture throughout the practice
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2" />
            Stop if you feel dizzy or uncomfortable
          </li>
        </ul>
      </motion.div>
    </section>
  );
};

export default PranayamaGuide;