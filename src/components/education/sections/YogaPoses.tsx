import React from 'react';
import { motion } from 'framer-motion';
import { Flower2, Info } from 'lucide-react';

interface YogaPose {
  name: string;
  sanskrit: string;
  benefits: string[];
  image: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

const poses: YogaPose[] = [
  {
    name: "Mountain Pose",
    sanskrit: "Tadasana",
    benefits: [
      "Improves posture",
      "Strengthens thighs, knees, and ankles",
      "Increases body awareness"
    ],
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1000",
    difficulty: "Beginner"
  },
  {
    name: "Tree Pose",
    sanskrit: "Vrksasana",
    benefits: [
      "Improves balance",
      "Strengthens legs and core",
      "Increases focus"
    ],
    image: "https://images.unsplash.com/photo-1573590330099-d6c7355ec595?auto=format&fit=crop&q=80&w=1000",
    difficulty: "Intermediate"
  },
  {
    name: "Warrior I",
    sanskrit: "Virabhadrasana I",
    benefits: [
      "Strengthens legs and core",
      "Opens hips and chest",
      "Improves balance"
    ],
    image: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?auto=format&fit=crop&q=80&w=1000",
    difficulty: "Intermediate"
  }
];

const YogaPoses = () => {
  return (
    <section className="space-y-8">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
          <Flower2 className="w-6 h-6 text-purple-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Essential Yoga Poses</h2>
          <p className="text-gray-600">Master these fundamental asanas for a strong practice</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {poses.map((pose) => (
          <motion.div
            key={pose.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200"
          >
            <div className="relative h-48">
              <img
                src={pose.image}
                alt={pose.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/90 
                backdrop-blur-sm text-sm font-medium text-purple-600">
                {pose.difficulty}
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-1">{pose.name}</h3>
              <p className="text-purple-600 text-sm mb-4">{pose.sanskrit}</p>
              
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">Benefits:</p>
                <ul className="space-y-1">
                  {pose.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="p-6 bg-purple-50 rounded-2xl">
        <div className="flex items-start gap-4">
          <Info className="w-6 h-6 text-purple-600 flex-shrink-0" />
          <p className="text-sm text-purple-800">
            Always practice yoga under proper guidance. Start with beginner poses and gradually 
            progress to more advanced ones. Listen to your body and never force yourself into poses.
          </p>
        </div>
      </div>
    </section>
  );
};

export default YogaPoses;