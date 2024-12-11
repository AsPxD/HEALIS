import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Zap, Target, Sparkles } from 'lucide-react';

const facts = [
  {
    icon: Zap,
    title: "Did You Know?",
    fact: "Regular meditation can reduce stress levels by up to 40% and improve sleep quality.",
    color: "bg-amber-100 text-amber-600"
  },
  {
    icon: Target,
    title: "Health Tip",
    fact: "Walking 10,000 steps daily can lower risk of cardiovascular disease by 30%.",
    color: "bg-emerald-100 text-emerald-600"
  },
  {
    icon: Sparkles,
    title: "Wellness Fact",
    fact: "Practicing gratitude daily can boost mental well-being and immune system function.",
    color: "bg-blue-100 text-blue-600"
  }
];

const QuickFactsSection = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center">
          <Lightbulb className="w-6 h-6 text-indigo-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Quick Health Facts</h2>
          <p className="text-gray-600">Interesting insights about health and wellness</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {facts.map((fact, index) => (
          <motion.div
            key={fact.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200"
          >
            <div className={`w-12 h-12 rounded-xl ${fact.color} 
              flex items-center justify-center mb-4`}>
              <fact.icon className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{fact.title}</h3>
            <p className="text-gray-600">{fact.fact}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default QuickFactsSection;