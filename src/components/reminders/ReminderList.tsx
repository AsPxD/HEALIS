import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Bell, Clock, Calendar, Trash2, XCircle, Pill, CheckCircle } from 'lucide-react';
import { format, isToday, isTomorrow, isThisWeek, formatDistanceToNow, isAfter } from 'date-fns';
import { toast } from 'react-toastify';
import Button from '../shared/Button';

// Reminder interface
interface Reminder {
  _id: string;
  title: string;
  doctor?: string;
  date: Date;
  time: string;
  location?: string;
  notes?: string;
  color?: string;
  status?: string;
  patient: {
    userId: string;
    fullName: string;
    email: string;
  };
}

// Medication interface
interface Medication {
  _id: string;
  name: string;
  dosage: string;
  frequency: string;
  times: string[];
  startDate: Date;
  endDate?: Date;
  instructions?: string;
  color: string;
  status?: string;
}

// Combined item type for rendering
type ReminderOrMedication = (Reminder | Medication) & { 
  type: 'reminder' | 'medication';
};

const ReminderList: React.FC = () => {
  const [items, setItems] = useState<ReminderOrMedication[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch reminders and medications
  const fetchItems = async () => {
    try {
      setIsLoading(true);
      
      const userId = localStorage.getItem('userId');
      
      if (!userId) {
        toast.error('Please log in to view items');
        setIsLoading(false);
        return;
      }

      // Fetch reminders
      const remindersResponse = await axios.get(`/reminders/${userId}`);
      const reminders = remindersResponse.data.reminders
        .filter((reminder: Reminder) => 
          reminder.status !== 'Cancelled' && reminder.status !== 'Completed' && 
          isAfter(new Date(reminder.date), new Date())
        )
        .map((reminder: Reminder) => ({ ...reminder, type: 'reminder' }));

      // Fetch medications
      const medicationsResponse = await axios.get(`/medications/${userId}`);
      const medications = medicationsResponse.data.medications
        .filter((medication: Medication) => 
          medication.status === 'Active' && 
          (!medication.endDate || isAfter(new Date(medication.endDate), new Date()))
        )
        .map((medication: Medication) => ({ ...medication, type: 'medication' }));

      // Combine and sort items
      const combinedItems = [...reminders, ...medications].sort((a, b) => {
        const dateA = a.type === 'reminder' ? new Date((a as Reminder).date) : new Date((a as Medication).startDate);
        const dateB = b.type === 'reminder' ? new Date((b as Reminder).date) : new Date((b as Medication).startDate);
        return dateA.getTime() - dateB.getTime();
      });

      setItems(combinedItems);
    } catch (error) {
      console.error('Error fetching items:', error);
      toast.error('Failed to load items');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // Handle reminder completion
  const handleCompleteReminder = async (reminderId: string) => {
    try {
      const response = await axios.patch(`/reminders/${reminderId}/complete`, {
        completedAt: new Date().toISOString()
      });
      
      if (response.data.success) {
        setItems(items.filter(item => item._id !== reminderId));
        toast.success('Reminder marked as completed');
      } else {
        toast.error('Failed to complete reminder');
      }
    } catch (error) {
      console.error('Error completing reminder:', error);
      toast.error('Failed to complete reminder');
    }
  };

  // Handle medication completion
  const handleCompleteMedication = async (medicationId: string) => {
    try {
      const response = await axios.patch(`/medications/${medicationId}/complete`, {
        completedAt: new Date().toISOString()
      });
      
      if (response.data.success) {
        setItems(items.filter(item => item._id !== medicationId));
        toast.success('Medication marked as completed');
      } else {
        toast.error('Failed to complete medication');
      }
    } catch (error) {
      console.error('Error completing medication:', error);
      toast.error('Failed to complete medication');
    }
  };

  // Handle reminder cancellation
  const handleCancelReminder = async (reminderId: string) => {
    try {
      const response = await axios.patch(`/reminders/${reminderId}/cancel`);
      
      if (response.data.success) {
        setItems(items.filter(item => item._id !== reminderId));
        toast.success('Reminder cancelled successfully');
      } else {
        toast.error('Failed to cancel reminder');
      }
    } catch (error) {
      console.error('Error cancelling reminder:', error);
      toast.error('Failed to cancel reminder');
    }
  };

  // Handle medication discontinuation
  const handleDiscontinueMedication = async (medicationId: string) => {
    try {
      const response = await axios.patch(`/medications/${medicationId}/discontinue`);
      
      if (response.data.success) {
        setItems(items.filter(item => item._id !== medicationId));
        toast.success('Medication discontinued successfully');
      } else {
        toast.error('Failed to discontinue medication');
      }
    } catch (error) {
      console.error('Error discontinuing medication:', error);
      toast.error('Failed to discontinue medication');
    }
  };

  // Group items by time period
  const groupedItems = items.reduce((acc, item) => {
    const date = item.type === 'reminder' 
      ? new Date((item as Reminder).date) 
      : new Date((item as Medication).startDate);
    
    let group = 'later';
    if (isToday(date)) group = 'today';
    else if (isTomorrow(date)) group = 'tomorrow';
    else if (isThisWeek(date)) group = 'thisWeek';

    if (!acc[group]) acc[group] = [];
    acc[group].push(item);
    return acc;
  }, {} as Record<string, ReminderOrMedication[]>);

  const groupTitles = {
    today: 'Today',
    tomorrow: 'Tomorrow',
    thisWeek: 'This Week',
    later: 'Later'
  };

  if (isLoading) {
    return (
      <div className="text-center py-6 text-gray-500">
        Loading items...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center">
            <Bell className="w-5 h-5 text-indigo-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">Upcoming Items</h2>
        </div>
        <Button
          variant="outline"
          onClick={() => {
            toast.info('Clear completed functionality not implemented');
          }}
          className="text-sm"
        >
          Clear Completed
        </Button>
      </div>

      <div className="space-y-6">
        {Object.entries(groupedItems).map(([group, groupItems]) => (
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
              {groupItems.map(item => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-xl border bg-white shadow-sm hover:shadow-md transition-all duration-300`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-lg ${item.color} flex items-center justify-center text-white`}>
                        {item.type === 'reminder' ? <Calendar className="w-5 h-5" /> : <Pill className="w-5 h-5" />}
                      </div>
                      
                      <div>
                        {item.type === 'reminder' ? (
                          <>
                            <h3 className="font-medium text-gray-900">{(item as Reminder).title}</h3>
                            <p className="text-sm text-gray-600">{(item as Reminder).doctor}</p>
                            <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                              <Clock className="w-4 h-4" />
                              <span>
                                {formatDistanceToNow(new Date((item as Reminder).date), { addSuffix: true })}
                              </span>
                            </div>
                            {(item as Reminder).location && (
                              <p className="text-sm text-gray-500 mt-1">
                                Location: {(item as Reminder).location}
                              </p>
                            )}
                          </>
                        ) : (
                          <>
                            <h3 className="font-medium text-gray-900">{(item as Medication).name}</h3>
                            <p className="text-sm text-gray-600">{(item as Medication).dosage}</p>
                            <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                              <Clock className="w-4 h-4" />
                              <span>
                                {(item as Medication).times.join(', ')}
                              </span>
                            </div>
                            {(item as Medication).frequency && (
                              <p className="text-sm text-gray-500 mt-1">
                                Frequency: {(item as Medication).frequency}
                              </p>
                            )}
                          </>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => item.type === 'reminder' 
                          ? handleCompleteReminder(item._id)
                          : handleCompleteMedication(item._id)
                        }
                        className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 hover:bg-green-200 transition-colors"
                      >
                        <CheckCircle className="w-5 h-5" />
                      </motion.button>

                      {item.type === 'reminder' ? (
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleCancelReminder(item._id)}
                          className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 hover:bg-yellow-200 transition-colors"
                        >
                          <XCircle className="w-5 h-5" />
                        </motion.button>
                      ) : (
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleDiscontinueMedication(item._id)}
                          className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 hover:bg-yellow-200 transition-colors"
                        >
                          <XCircle className="w-5 h-5" />
                        </motion.button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {Object.keys(groupedItems).length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No upcoming items</p>
        </motion.div>
      )}
    </div>
  );
};

export default ReminderList;