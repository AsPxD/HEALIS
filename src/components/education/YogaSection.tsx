import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Heart, Stethoscope, Flower } from 'lucide-react';

const benefits = [
  {
    icon: Brain,
    title: "Mental Clarity",
    description: "Improves focus, reduces stress, and enhances cognitive function through mindful practice.",
    color: "bg-purple-100 text-purple-600"
  },
  {
    icon: Heart,
    title: "Physical Health",
    description: "Enhances flexibility, strength, and cardiovascular health through regular practice.",
    color: "bg-rose-100 text-rose-600"
  },
  {
    icon: Stethoscope,
    title: "Better Breathing",
    description: "Improves respiratory function and oxygen flow through pranayama techniques.",
    color: "bg-blue-100 text-blue-600"
  },
  {
    icon: Flower,
    title: "Inner Peace",
    description: "Cultivates emotional balance and spiritual well-being through meditation.",
    color: "bg-emerald-100 text-emerald-600"
  }
];

const YogaSection = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
          <Flower className="w-6 h-6 text-purple-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Yoga Awareness</h2>
          <p className="text-gray-600">Discover the transformative power of yoga</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {benefits.map((benefit, index) => (
          <motion.div
            key={benefit.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200"
          >
            <div className={`w-12 h-12 rounded-xl ${benefit.color} 
              flex items-center justify-center mb-4`}>
              <benefit.icon className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
            <p className="text-gray-600">{benefit.description}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-8 mt-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-6"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Getting Started</h3>
          <ul className="space-y-3">
            {[
              "Start with basic poses and proper breathing",
              "Practice regularly, even if just for 10 minutes",
              "Listen to your body and don't force positions",
              "Consider joining a beginner's class",
              "Focus on alignment and form over complexity"
            ].map((tip, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2" />
                <span className="text-gray-700">{tip}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="bg-gradient-to-br from-rose-50 to-orange-50 rounded-2xl p-6"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Common Myths</h3>
          <ul className="space-y-3">
            {[
              "Yoga is only for flexible people",
              "Yoga is just stretching",
              "Yoga is not a real workout",
              "You need special equipment",
              "You must be spiritual or religious"
            ].map((myth, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2" />
                <span className="text-gray-700">{myth}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default YogaSection;