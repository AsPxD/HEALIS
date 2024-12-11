import React from 'react';
import { motion } from 'framer-motion';
import { Pill, Calendar, CheckCircle, Clock } from 'lucide-react';
import { useReminders } from './ReminderContext';

const ReminderStats = () => {
  const { medications, appointments, reminders } = useReminders();
  
  const stats = [
    {
      icon: Pill,
      label: "Active Medications",
      value: medications.length,
      color: "bg-rose-100 text-rose-600"
    },
    {
      icon: Calendar,
      label: "Upcoming Appointments",
      value: appointments.length,
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: CheckCircle,
      label: "Completed Today",
      value: reminders.filter(r => r.completed).length,
      color: "bg-green-100 text-green-600"
    },
    {
      icon: Clock,
      label: "Pending Reminders",
      value: reminders.filter(r => !r.completed).length,
      color: "bg-amber-100 text-amber-600"
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200"
        >
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-gray-600">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ReminderStats;