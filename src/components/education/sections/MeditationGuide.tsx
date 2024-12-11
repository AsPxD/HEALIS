import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Clock, Heart, Sparkles } from 'lucide-react';

const techniques = [
  {
    name: "Mindfulness Meditation",
    duration: "10-15 minutes",
    steps: [
      "Find a quiet, comfortable place",
      "Sit in a relaxed, alert position",
      "Focus on your breath",
      "Notice thoughts without judgment",
      "Gently return focus to breath"
    ],
    benefits: ["Reduces stress", "Improves focus", "Enhances emotional well-being"]
  },
  {
    name: "Loving-Kindness Meditation",
    duration: "15-20 minutes",
    steps: [
      "Start with self-compassion",
      "Extend wishes to loved ones",
      "Include neutral people",
      "Embrace difficult relationships",
      "Extend to all beings"
    ],
    benefits: ["Increases empathy", "Reduces anxiety", "Improves relationships"]
  },
  {
    name: "Body Scan Meditation",
    duration: "20-30 minutes",
    steps: [
      "Lie down comfortably",
      "Focus on each body part",
      "Notice sensations",
      "Release tension",
      "Move systematically"
    ],
    benefits: ["Better body awareness", "Improves sleep", "Reduces physical tension"]
  }
];

const MeditationGuide = () => {
  return (
    <section className="space-y-8">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
          <Brain className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Meditation Techniques</h2>
          <p className="text-gray-600">Simple practices for mental well-being</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {techniques.map((technique, index) => (
          <motion.div
            key={technique.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                {index === 0 ? <Brain className="w-5 h-5 text-blue-600" /> :
                 index === 1 ? <Heart className="w-5 h-5 text-blue-600" /> :
                              <Sparkles className="w-5 h-5 text-blue-600" />}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{technique.name}</h3>
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <Clock className="w-4 h-4" />
                  <span>{technique.duration}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Steps:</h4>
                <ol className="space-y-2">
                  {technique.steps.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="w-5 h-5 rounded-full bg-blue-50 text-blue-600 
                        flex items-center justify-center flex-shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Benefits:</h4>
                <ul className="space-y-1">
                  {technique.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default MeditationGuide;