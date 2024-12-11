import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, ArrowRight } from 'lucide-react';
import Button from '../shared/Button';

const recommendations = [
  {
    id: 1,
    title: "Increase Daily Steps",
    description: "Try to reach 10,000 steps per day for better cardiovascular health.",
    priority: "high"
  },
  {
    id: 2,
    title: "Improve Sleep Schedule",
    description: "Aim for 8 hours of sleep by maintaining consistent sleep times.",
    priority: "medium"
  },
  {
    id: 3,
    title: "Regular Blood Pressure Monitoring",
    description: "Monitor BP twice daily due to family history of heart disease.",
    priority: "high"
  },
  {
    id: 4,
    title: "Dietary Adjustments",
    description: "Consider reducing carbohydrate intake and increasing protein.",
    priority: "medium"
  }
];

const RecommendationsSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-6 shadow-lg"
    >
      <div className="flex items-center gap-3 mb-6">
        <Lightbulb className="w-6 h-6 text-amber-500" />
        <h2 className="text-xl font-semibold text-gray-900">Recommendations</h2>
      </div>

      <div className="space-y-4">
        {recommendations.map((rec, index) => (
          <motion.div
            key={rec.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-4 rounded-xl bg-gray-50 border border-gray-100"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-medium text-gray-900 mb-1">{rec.title}</h3>
                <p className="text-sm text-gray-600">{rec.description}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs
                ${rec.priority === 'high'
                  ? 'bg-rose-100 text-rose-600'
                  : 'bg-amber-100 text-amber-600'
                }`}>
                {rec.priority.charAt(0).toUpperCase() + rec.priority.slice(1)} Priority
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      <Button className="w-full mt-6" icon={ArrowRight}>
        View Detailed Plan
      </Button>
    </motion.div>
  );
};

export default RecommendationsSection;