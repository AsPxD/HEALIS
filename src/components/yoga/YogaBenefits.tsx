import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Heart, Dumbbell, Moon, Shield, Smile } from 'lucide-react';

const benefits = [
  {
    icon: Brain,
    title: "Mental Clarity",
    description: "Improves focus, reduces stress, and enhances cognitive function",
    color: "bg-purple-100 text-purple-600"
  },
  {
    icon: Heart,
    title: "Physical Health",
    description: "Enhances flexibility, strength, and cardiovascular health",
    color: "bg-rose-100 text-rose-600"
  },
  {
    icon: Dumbbell,
    title: "Strength & Balance",
    description: "Builds muscle strength and improves body balance",
    color: "bg-blue-100 text-blue-600"
  },
  {
    icon: Moon,
    title: "Better Sleep",
    description: "Improves sleep quality and helps establish better sleep patterns",
    color: "bg-indigo-100 text-indigo-600"
  },
  {
    icon: Shield,
    title: "Immunity Boost",
    description: "Strengthens immune system and increases disease resistance",
    color: "bg-emerald-100 text-emerald-600"
  },
  {
    icon: Smile,
    title: "Emotional Balance",
    description: "Reduces anxiety and promotes emotional well-being",
    color: "bg-amber-100 text-amber-600"
  }
];

const YogaBenefits = () => {
  return (
    <section className="space-y-8">
      <div className="text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-gray-900 mb-4"
        >
          Benefits of Regular Practice
        </motion.h2>
        <p className="text-xl text-gray-600">Discover how yoga transforms your life</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {benefits.map((benefit, index) => (
          <motion.div
            key={benefit.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200
              hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className={`w-12 h-12 rounded-xl ${benefit.color} 
                flex items-center justify-center`}>
                <benefit.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">{benefit.title}</h3>
            </div>
            <p className="text-gray-600">{benefit.description}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-8 text-center"
      >
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          Start Your Journey Today
        </h3>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Whether you're a beginner or an experienced practitioner, our comprehensive
          guides and practices will help you achieve your wellness goals through the
          ancient wisdom of yoga.
        </p>
      </motion.div>
    </section>
  );
};

export default YogaBenefits;