import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Calendar, Trash2, CheckCircle } from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';
import { Reminder, Medication, Appointment } from './types';
import { useReminders } from './ReminderContext';

interface ReminderCardProps {
  reminder: Reminder;
  item: Medication | Appointment;
}

const ReminderCard = ({ reminder, item }: ReminderCardProps) => {
  const { completeReminder } = useReminders();
  const isMedication = reminder.type === 'medication';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-4 rounded-xl border ${reminder.completed ? 'bg-gray-50' : 'bg-white'} 
        shadow-sm hover:shadow-md transition-all duration-300`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <div className={`w-10 h-10 rounded-lg ${(item as any).color} flex items-center 
            justify-center text-white`}>
            {isMedication ? (
              <span className="text-sm font-semibold">
                {format(new Date(reminder.datetime), 'HH:mm')}
              </span>
            ) : (
              <Calendar className="w-5 h-5" />
            )}
          </div>
          
          <div>
            <h3 className={`font-medium ${reminder.completed ? 'text-gray-500' : 'text-gray-900'}`}>
              {isMedication ? (item as Medication).name : (item as Appointment).title}
            </h3>
            <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
              <Clock className="w-4 h-4" />
              <span>
                {formatDistanceToNow(new Date(reminder.datetime), { addSuffix: true })}
              </span>
            </div>
            {isMedication && (
              <p className="text-sm text-gray-600 mt-1">
                {(item as Medication).dosage}
              </p>
            )}
          </div>
        </div>

        {!reminder.completed && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => completeReminder(reminder.id)}
            className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center
              text-green-600 hover:bg-green-200 transition-colors"
          >
            <CheckCircle className="w-5 h-5" />
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default ReminderCard;