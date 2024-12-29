import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Activity, CheckCircle } from 'lucide-react';
import { toast } from 'react-toastify';
import { formatDistanceToNow, isAfter, isFuture } from 'date-fns';

// Updated interfaces to match the form data structures
interface Appointment {
  _id: string;
  title: string;
  doctor: string;
  date: string;
  time: string;
  location: string;
  notes?: string;
  color: string;
  status?: 'Active' | 'Cancelled' | 'Completed';
  completedAt?: string;
}

interface Medication {
  _id: string;
  name: string;
  dosage: string;
  frequency: string;
  times: string[];
  startDate: string;
  endDate?: string;
  instructions?: string;
  color: string;
  status?: 'Active' | 'Discontinued' | 'Completed';
  completedAt?: string;
}

interface CompletedItem {
  _id: string;
  type: 'appointment' | 'medication';
  title: string;
  completedAt: string;
  color: string;
}

const ReminderProgress = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [medications, setMedications] = useState<Medication[]>([]);
  const [completedItems, setCompletedItems] = useState<CompletedItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCompletedDetails, setShowCompletedDetails] = useState(false);

  const fetchItems = async () => {
    try {
      setIsLoading(true);
      
      const userId = localStorage.getItem('userId');
      
      if (!userId) {
        toast.error('Please log in to view progress');
        setIsLoading(false);
        return;
      }

      // Fetch appointments and medications
      const [appointmentsRes, medicationsRes] = await Promise.all([
        axios.get(`/reminders/${userId}`),
        axios.get(`/medications/${userId}`)
      ]);

      // Process appointments
      const activeAppointments = appointmentsRes.data.reminders
        .filter((app: Appointment) => 
          app.status !== 'Cancelled' && 
          isFuture(new Date(`${app.date}T${app.time}`))
        );

      // Process medications
      const activeMedications = medicationsRes.data.medications
        .filter((med: Medication) => 
          med.status === 'Active' && 
          (!med.endDate || isFuture(new Date(med.endDate)))
        );

      // Collect completed items
      const completedAppointments = appointmentsRes.data.reminders
        .filter((app: Appointment) => app.status === 'Completed')
        .map((app: Appointment) => ({
          _id: app._id,
          type: 'appointment' as const,
          title: app.title,
          completedAt: app.completedAt || app.date,
          color: app.color
        }));

      const completedMedications = medicationsRes.data.medications
        .filter((med: Medication) => med.status === 'Completed')
        .map((med: Medication) => ({
          _id: med._id,
          type: 'medication' as const,
          title: med.name,
          completedAt: med.completedAt || med.startDate,
          color: med.color
        }));

      setAppointments(activeAppointments);
      setMedications(activeMedications);
      setCompletedItems([...completedAppointments, ...completedMedications]
        .sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()));

    } catch (error) {
      console.error('Error fetching progress items:', error);
      toast.error('Failed to load progress data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // Calculate statistics
  const totalAppointments = appointments.length;
  const totalMedications = medications.length;
  const totalCompleted = completedItems.length;
  const totalItems = totalAppointments + totalMedications + totalCompleted;
  
  const progressPercentage = totalItems > 0 
    ? Math.round((totalCompleted / totalItems) * 100)
    : 0;

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
        <h3 className="text-xl font-semibold">Health Progress</h3>
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
          <p className="text-white/90 text-sm mb-1">Active</p>
          <p className="text-2xl font-bold">{totalAppointments + totalMedications}</p>
        </div>
        <div className="bg-white/10 rounded-xl p-4">
          <p className="text-white/90 text-sm mb-1">Completed</p>
          <p className="text-2xl font-bold">{totalCompleted}</p>
        </div>
        <div className="bg-white/10 rounded-xl p-4">
          <p className="text-white/90 text-sm mb-1">Total</p>
          <p className="text-2xl font-bold">{totalItems}</p>
        </div>
      </div>

      <div className="mt-6">
        <div 
          className="flex items-center justify-between cursor-pointer"
          onClick={() => setShowCompletedDetails(!showCompletedDetails)}
        >
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            <h4 className="text-lg font-semibold">Completed Items</h4>
          </div>
          <span>{showCompletedDetails ? '▼' : '▶'}</span>
        </div>

        {showCompletedDetails && (
          <div className="mt-4 space-y-2 max-h-64 overflow-y-auto">
            {completedItems.length === 0 ? (
              <p className="text-white/70 text-center">No completed items yet</p>
            ) : (
              completedItems.map((item) => (
                <motion.div 
                  key={item._id} 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/10 rounded-xl p-3 flex justify-between items-center"
                >
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-white/70">
                      Completed {formatDistanceToNow(new Date(item.completedAt), { addSuffix: true })}
                    </p>
                  </div>
                  <div className={`px-3 py-1 rounded-full ${item.color} bg-opacity-20`}>
                    {item.type === 'appointment' ? 'Appointment' : 'Medication'}
                  </div>
                </motion.div>
              ))
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ReminderProgress;