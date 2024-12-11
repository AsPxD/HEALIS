import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Users, Target, Sparkles } from 'lucide-react';

const stats = [
  {
    icon: Heart,
    label: "Total Donations",
    value: "₹2.5Cr+",
    color: "bg-rose-100 text-rose-600"
  },
  {
    icon: Users,
    label: "Active Donors",
    value: "10,000+",
    color: "bg-blue-100 text-blue-600"
  },
  {
    icon: Target,
    label: "Campaigns",
    value: "50+",
    color: "bg-amber-100 text-amber-600"
  },
  {
    icon: Sparkles,
    label: "Lives Impacted",
    value: "100,000+",
    color: "bg-emerald-100 text-emerald-600"
  }
];

const DonationStats = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200"
        >
          <div className={`w-12 h-12 rounded-xl ${stat.color} 
            flex items-center justify-center mb-4`}>
            <stat.icon className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
          <p className="text-gray-600">{stat.label}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default DonationStats;