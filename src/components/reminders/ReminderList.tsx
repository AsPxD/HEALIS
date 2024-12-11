import React from 'react';
import { motion } from 'framer-motion';
import { Bell, Calendar, Clock } from 'lucide-react';
import { format, isToday, isTomorrow, isThisWeek } from 'date-fns';
import { useReminders } from './ReminderContext';
import ReminderCard from './ReminderCard';
import Button from '../shared/Button';

const ReminderList = () => {
  const { reminders, medications, appointments, clearCompletedReminders } = useReminders();

  // Group reminders by time period
  const groupedReminders = reminders.reduce((acc, reminder) => {
    const date = new Date(reminder.datetime);
    let group = 'later';

    if (isToday(date)) group = 'today';
    else if (isTomorrow(date)) group = 'tomorrow';
    else if (isThisWeek(date)) group = 'thisWeek';

    if (!acc[group]) acc[group] = [];
    acc[group].push(reminder);
    return acc;
  }, {} as Record<string, typeof reminders>);

  // Sort reminders within each group by datetime
  Object.keys(groupedReminders).forEach(group => {
    groupedReminders[group].sort((a, b) => 
      new Date(a.datetime).getTime() - new Date(b.datetime).getTime()
    );
  });

  const getItemForReminder = (reminder: typeof reminders[0]) => {
    return reminder.type === 'medication'
      ? medications.find(m => m.id === reminder.referenceId)
      : appointments.find(a => a.id === reminder.referenceId);
  };

  const groupTitles = {
    today: 'Today',
    tomorrow: 'Tomorrow',
    thisWeek: 'This Week',
    later: 'Later'
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center">
            <Bell className="w-5 h-5 text-indigo-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">Upcoming Reminders</h2>
        </div>
        <Button
          variant="outline"
          onClick={clearCompletedReminders}
          className="text-sm"
        >
          Clear Completed
        </Button>
      </div>

      <div className="space-y-6">
        {Object.entries(groupedReminders).map(([group, groupReminders]) => (
          <motion.div
            key={group}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-medium text-gray-900">
              {groupTitles[group as keyof typeof groupTitles]}
            </h3>
            <div className="space-y-3">
              {groupReminders.map(reminder => {
                const item = getItemForReminder(reminder);
                if (!item) return null;
                return (
                  <ReminderCard
                    key={reminder.id}
                    reminder={reminder}
                    item={item}
                  />
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>

      {Object.keys(groupedReminders).length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No reminders scheduled</p>
        </motion.div>
      )}
    </div>
  );
};

export default ReminderList;