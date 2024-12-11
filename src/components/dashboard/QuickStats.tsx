import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Bell, Activity, Target } from 'lucide-react';

const stats = [
  {
    id: 'appointments',
    label: 'Upcoming Appointments',
    value: '3',
    color: 'bg-blue-500',
    icon: Calendar,
    change: '+2 this week'
  },
  {
    id: 'reminders',
    label: 'Medicine Reminders',
    value: '5',
    color: 'bg-green-500',
    icon: Bell,
    change: '2 due today'
  },
  {
    id: 'health-score',
    label: 'Health Score',
    value: '85%',
    color: 'bg-purple-500',
    icon: Activity,
    change: '+5% this month'
  },
  {
    id: 'goals',
    label: 'Active Goals',
    value: '4',
    color: 'bg-amber-500',
    icon: Target,
    change: '2 near completion'
  }
];

const QuickStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ y: -5 }}
          className="bg-white rounded-xl p-6 shadow-lg border border-gray-200"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-xl ${stat.color} text-white 
              flex items-center justify-center`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <span className="text-sm text-gray-500">{stat.change}</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
          <p className="text-gray-600 text-sm">{stat.label}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default QuickStats;