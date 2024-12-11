import React from 'react';
import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';
import { useReminders } from './ReminderContext';

const ReminderProgress = () => {
  const { reminders } = useReminders();
  const completedCount = reminders.filter(r => r.completed).length;
  const totalCount = reminders.length;
  const progressPercentage = totalCount > 0 
    ? Math.round((completedCount / totalCount) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl p-6 text-white"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
          <Activity className="w-5 h-5" />
        </div>
        <h3 className="text-xl font-semibold">Daily Progress</h3>
      </div>

      <div className="mb-4">
        <div className="flex justify-between mb-2">
          <span className="text-white/90">Completion Rate</span>
          <span className="font-medium">{progressPercentage}%</span>
        </div>
        <div className="h-3 bg-white/20 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full bg-white rounded-full"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/10 rounded-xl p-4">
          <p className="text-white/90 text-sm mb-1">Completed</p>
          <p className="text-2xl font-bold">{completedCount}</p>
        </div>
        <div className="bg-white/10 rounded-xl p-4">
          <p className="text-white/90 text-sm mb-1">Remaining</p>
          <p className="text-2xl font-bold">{totalCount - completedCount}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default ReminderProgress;