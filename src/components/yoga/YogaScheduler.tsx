import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Target, Star } from 'lucide-react';

const schedules = [
  {
    level: "Beginner",
    description: "Perfect for those starting their yoga journey",
    duration: "20-30 minutes per session",
    frequency: "3-4 times per week",
    practices: [
      "Basic breathing exercises",
      "Simple standing poses",
      "Gentle stretches",
      "Short meditation"
    ],
    color: "from-green-500 to-emerald-500"
  },
  {
    level: "Intermediate",
    description: "For practitioners with some experience",
    duration: "45-60 minutes per session",
    frequency: "4-5 times per week",
    practices: [
      "Advanced breathing techniques",
      "Balance poses",
      "Flow sequences",
      "Longer meditation"
    ],
    color: "from-blue-500 to-indigo-500"
  },
  {
    level: "Advanced",
    description: "Challenging practices for experienced yogis",
    duration: "60-90 minutes per session",
    frequency: "5-6 times per week",
    practices: [
      "Complex asanas",
      "Advanced pranayama",
      "Power yoga sequences",
      "Deep meditation"
    ],
    color: "from-purple-500 to-pink-500"
  }
];

const YogaScheduler = () => {
  return (
    <section className="space-y-8">
      <div className="text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-gray-900 mb-4"
        >
          Practice Schedules
        </motion.h2>
        <p className="text-xl text-gray-600">Find the perfect routine for your level</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {schedules.map((schedule, index) => (
          <motion.div
            key={schedule.level}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200"
          >
            <div className={`bg-gradient-to-r ${schedule.color} p-6 text-white`}>
              <h3 className="text-2xl font-bold mb-2">{schedule.level}</h3>
              <p className="opacity-90">{schedule.description}</p>
            </div>

            <div className="p-6 space-y-6">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-gray-500" />
                <span className="text-gray-900">{schedule.duration}</span>
              </div>

              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-gray-500" />
                <span className="text-gray-900">{schedule.frequency}</span>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-3">Recommended Practices:</h4>
                <ul className="space-y-2">
                  {schedule.practices.map((practice, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-gray-600">
                      <Star className="w-4 h-4 text-amber-500" />
                      {practice}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
            <Target className="w-5 h-5 text-amber-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Practice Tips</h3>
        </div>
        <ul className="space-y-3 text-gray-700">
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2" />
            Practice at the same time each day to build a routine
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2" />
            Listen to your body and adjust intensity as needed
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2" />
            Stay consistent with your practice schedule
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2" />
            Progress gradually to avoid injury
          </li>
        </ul>
      </motion.div>
    </section>
  );
};

export default YogaScheduler;