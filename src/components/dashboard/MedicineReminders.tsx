import React from 'react';
import { motion } from 'framer-motion';
import { Bell, Clock, Check, X } from 'lucide-react';
import Button from '../shared/Button';

const reminders = [
  {
    id: 1,
    medicine: "Vitamin D3",
    dosage: "1 tablet",
    time: "08:00 AM",
    status: "pending"
  },
  {
    id: 2,
    medicine: "Calcium",
    dosage: "1 tablet",
    time: "09:30 AM",
    status: "completed"
  },
  {
    id: 3,
    medicine: "Omega-3",
    dosage: "1 capsule",
    time: "02:00 PM",
    status: "pending"
  },
  {
    id: 4,
    medicine: "Multivitamin",
    dosage: "1 tablet",
    time: "08:00 PM",
    status: "pending"
  }
];

const MedicineReminders = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-6 shadow-lg"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-rose-100 flex items-center justify-center">
            <Bell className="w-5 h-5 text-rose-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">Medicine Reminders</h2>
        </div>
        <Button variant="outline" size="sm">Add Reminder</Button>
      </div>

      <div className="space-y-4">
        {reminders.map((reminder) => (
          <motion.div
            key={reminder.id}
            whileHover={{ scale: 1.02 }}
            className={`p-4 rounded-xl border transition-all duration-300
              ${reminder.status === 'completed'
                ? 'bg-gray-50 border-gray-200'
                : 'border-rose-200 hover:shadow-md'
              }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className={`font-semibold ${
                  reminder.status === 'completed' ? 'text-gray-500' : 'text-gray-900'
                }`}>
                  {reminder.medicine}
                </h3>
                <p className="text-gray-500 text-sm">{reminder.dosage}</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-gray-500">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">{reminder.time}</span>
                </div>

                {reminder.status === 'pending' ? (
                  <div className="flex items-center gap-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center
                        text-green-600 hover:bg-green-200 transition-colors"
                    >
                      <Check className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center
                        text-gray-600 hover:bg-gray-200 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </motion.button>
                  </div>
                ) : (
                  <span className="px-3 py-1 rounded-full bg-green-100 text-green-600 text-sm">
                    Completed
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default MedicineReminders;