import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Activity, CheckCircle } from 'lucide-react';
import { toast } from 'react-toastify';
import { formatDistanceToNow } from 'date-fns';

// Interfaces for different item types
interface Reminder {
  _id: string;
  title: string;
  doctor?: string;
  status?: string;
  date: Date;
  completedAt?: Date;
}

interface Medication {
  _id: string;
  name: string;
  dosage: string;
  status?: string;
  startDate: Date;
  endDate?: Date;
  completedAt?: Date;
}

interface Appointment {
  _id: string;
  status?: string;
  appointmentDate: Date;
  completedAt?: Date;
}

const ReminderProgress = () => {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [medications, setMedications] = useState<Medication[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [completedItems, setCompletedItems] = useState<(Reminder | Medication | Appointment)[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCompletedDetails, setShowCompletedDetails] = useState(false);

  // Fetch all items
  const fetchItems = async () => {
    try {
      setIsLoading(true);
      
      const userId = localStorage.getItem('userId');
      
      if (!userId) {
        toast.error('Please log in to view progress');
        setIsLoading(false);
        return;
      }

      // Fetch reminders
      const remindersResponse = await axios.get(`/reminders/${userId}`);
      const fetchedReminders = remindersResponse.data.reminders;

      // Fetch medications
      const medicationsResponse = await axios.get(`/medications/${userId}`);
      const fetchedMedications = medicationsResponse.data.medications;

      // Fetch appointments
      const appointmentsResponse = await axios.get(`/appointments/${userId}`);
      const fetchedAppointments = appointmentsResponse.data.appointments;

      // Separate active and completed items
      const activeReminders = fetchedReminders.filter((r: Reminder) => r.status !== 'Cancelled' && r.status !== 'Completed');
      const activeMedications = fetchedMedications.filter((m: Medication) => m.status === 'Active');
      const activeAppointments = fetchedAppointments.filter((a: Appointment) => a.status !== 'Cancelled');

      // Collect completed items
      const completedItems = [
        ...fetchedReminders.filter((r: Reminder) => r.status === 'Completed'),
        ...fetchedMedications.filter((m: Medication) => m.status === 'Completed'),
        ...fetchedAppointments.filter((a: Appointment) => a.status === 'Completed')
      ];

      // Update state
      setReminders(activeReminders);
      setMedications(activeMedications);
      setAppointments(activeAppointments);
      setCompletedItems(completedItems);
    } catch (error) {
      console.error('Error fetching progress items:', error);
      toast.error('Failed to load progress data');
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch items on component mount
  useEffect(() => {
    fetchItems();
  }, []);

  // Calculate completion rates
  const completedRemindersCount = reminders.filter(r => r.status === 'Completed').length;
  const completedMedicationsCount = medications.filter(m => m.status === 'Completed').length;
  const completedAppointmentsCount = appointments.filter(a => a.status === 'Completed').length;
  
  const totalCount = reminders.length + medications.length + appointments.length;
  const completedCount = completedRemindersCount + completedMedicationsCount + completedAppointmentsCount;
  
  const progressPercentage = totalCount > 0 
    ? Math.round((completedCount / totalCount) * 100)
    : 0;

  // Render loading state
  if (isLoading) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl p-6 text-white"
      >
        <div className="text-center">Loading progress...</div>
      </motion.div>
    );
  }

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

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white/10 rounded-xl p-4">
          <p className="text-white/90 text-sm mb-1">Completed</p>
          <p className="text-2xl font-bold">{completedCount}</p>
        </div>
        <div className="bg-white/10 rounded-xl p-4">
          <p className="text-white/90 text-sm mb-1">Pending</p>
          <p className="text-2xl font-bold">{totalCount - completedCount}</p>
        </div>
        <div className="bg-white/10 rounded-xl p-4">
          <p className="text-white/90 text-sm mb-1">Total</p>
          <p className="text-2xl font-bold">{totalCount}</p>
        </div>
      </div>

      {/* Completed Items Details */}
      <div className="mt-6">
        <div 
          className="flex items-center justify-between cursor-pointer"
          onClick={() => setShowCompletedDetails(!showCompletedDetails)}
        >
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            <h4 className="text-lg font-semibold">Completed Details</h4>
          </div>
          <span>{showCompletedDetails ? '▼' : '▶'}</span>
        </div>

        {showCompletedDetails && (
          <div className="mt-4 space-y-2 max-h-64 overflow-y-auto">
            {completedItems.length === 0 ? (
              <p className="text-white/70 text-center">No completed items</p>
            ) : (
              completedItems.map((item) => (
                <div 
                  key={item._id} 
                  className="bg-white/10 rounded-xl p-3 flex justify-between items-center"
                >
                  <div>
                    <p className="font-medium">
                      {'title' in item ? item.title : 'name' in item ? item.name : 'Appointment'}
                    </p>
                    <p className="text-sm text-white/70">
                      Completed {formatDistanceToNow(new Date(item.completedAt || new Date()), { addSuffix: true })}
                    </p>
                  </div>
                  <span className="text-green-400">
                    {'doctor' in item ? 'Reminder' : 'name' in item ? 'Medication' : 'Appointment'}
                  </span>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ReminderProgress;