import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Award, Users, Heart } from 'lucide-react';

const stats = [
  { icon: TrendingUp, label: "Active Users", value: "1M+", color: "bg-blue-500" },
  { icon: Award, label: "Success Rate", value: "99.9%", color: "bg-green-500" },
  { icon: Users, label: "Healthcare Partners", value: "500+", color: "bg-purple-500" },
  { icon: Heart, label: "Lives Improved", value: "2M+", color: "bg-rose-500" }
];

const StatsSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
    >
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200"
        >
          <div className={`w-12 h-12 rounded-xl ${stat.color} bg-opacity-10 
            flex items-center justify-center mb-4`}>
            <stat.icon className={`w-6 h-6 ${stat.color} text-opacity-100`} />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
          <p className="text-gray-600">{stat.label}</p>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default StatsSection;