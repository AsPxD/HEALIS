import React from 'react';
import { motion } from 'framer-motion';
import { format, isSameDay } from 'date-fns';
import { Calendar, Clock } from 'lucide-react';
import { useReminders } from './ReminderContext';

const weekDays = [
  { key: 'sun', label: 'S' },
  { key: 'mon', label: 'M' },
  { key: 'tue', label: 'T' },
  { key: 'wed', label: 'W' },
  { key: 'thu', label: 'T' },
  { key: 'fri', label: 'F' },
  { key: 'sat', label: 'S' }
];

const ReminderCalendar = () => {
  const { reminders, medications, appointments } = useReminders();
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const getDayReminders = (date: Date) => {
    return reminders.filter(reminder => 
      isSameDay(new Date(reminder.datetime), date)
    );
  };

  const selectedDayReminders = getDayReminders(selectedDate);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-violet-100 flex items-center justify-center">
          <Calendar className="w-5 h-5 text-violet-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900">Reminder Calendar</h3>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div>
          <div className="mb-4">
            <h4 className="text-lg font-medium text-gray-900">
              {format(selectedDate, 'MMMM d, yyyy')}
            </h4>
            <p className="text-gray-600">
              {selectedDayReminders.length} reminders scheduled
            </p>
          </div>

          <div className="space-y-4">
            {selectedDayReminders.map(reminder => {
              const item = reminder.type === 'medication'
                ? medications.find(m => m.id === reminder.referenceId)
                : appointments.find(a => a.id === reminder.referenceId);

              if (!item) return null;

              return (
                <div
                  key={reminder.id}
                  className={`p-4 rounded-xl border transition-colors
                    ${reminder.completed
                      ? 'bg-gray-50 border-gray-200'
                      : 'bg-white border-violet-200'
                    }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">
                        {reminder.type === 'medication'
                          ? (item as any).name
                          : (item as any).title}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>{format(new Date(reminder.datetime), 'h:mm a')}</span>
                      </div>
                    </div>
                    <div className={`w-3 h-3 rounded-full ${
                      reminder.completed ? 'bg-gray-400' : 'bg-violet-500'
                    }`} />
                  </div>
                </div>
              );
            })}

            {selectedDayReminders.length === 0 && (
              <p className="text-center text-gray-600 py-4">
                No reminders scheduled for this day
              </p>
            )}
          </div>
        </div>

        <div className="lg:border-l lg:pl-6">
          <div className="grid grid-cols-7 gap-2">
            {weekDays.map(day => (
              <div key={day.key} className="text-center text-sm font-medium text-gray-600">
                {day.label}
              </div>
            ))}
          </div>
          {/* Calendar grid would go here - simplified for example */}
        </div>
      </div>
    </motion.div>
  );
};

export default ReminderCalendar;