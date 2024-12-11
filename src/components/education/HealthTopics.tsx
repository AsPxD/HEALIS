import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, ArrowRight, Heart, Brain, Dumbbell, Apple } from 'lucide-react';
import Button from '../shared/Button';

const topics = [
  {
    icon: Heart,
    title: "Cardiovascular Health",
    description: "Understanding heart health, blood pressure, and circulation",
    color: "bg-rose-100 text-rose-600",
    articles: [
      "Understanding Blood Pressure",
      "Heart-Healthy Diet Tips",
      "Cardio Exercise Guide"
    ]
  },
  {
    icon: Brain,
    title: "Mental Wellness",
    description: "Tips for maintaining mental health and reducing stress",
    color: "bg-purple-100 text-purple-600",
    articles: [
      "Stress Management",
      "Meditation Basics",
      "Sleep Hygiene"
    ]
  },
  {
    icon: Dumbbell,
    title: "Physical Fitness",
    description: "Exercise routines and strength training guidelines",
    color: "bg-blue-100 text-blue-600",
    articles: [
      "Beginner's Workout Plan",
      "Proper Form Guide",
      "Recovery Tips"
    ]
  },
  {
    icon: Apple,
    title: "Nutrition",
    description: "Balanced diet and healthy eating habits",
    color: "bg-green-100 text-green-600",
    articles: [
      "Macro Nutrients Guide",
      "Meal Planning 101",
      "Healthy Recipes"
    ]
  }
];

const HealthTopics = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
          <BookOpen className="w-6 h-6 text-emerald-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Health Topics</h2>
          <p className="text-gray-600">Comprehensive guides on various health aspects</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {topics.map((topic, index) => (
          <motion.div
            key={topic.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200"
          >
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-xl ${topic.color} 
                flex items-center justify-center`}>
                <topic.icon className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{topic.title}</h3>
                <p className="text-gray-600 mb-4">{topic.description}</p>
                
                <div className="space-y-2">
                  {topic.articles.map((article, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 text-gray-700 hover:text-gray-900
                        cursor-pointer group"
                    >
                      <ArrowRight className="w-4 h-4 transition-transform duration-300
                        group-hover:translate-x-1" />
                      <span>{article}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-8">
        <Button variant="outline" icon={ArrowRight}>
          Explore All Topics
        </Button>
      </div>
    </div>
  );
};

export default HealthTopics;