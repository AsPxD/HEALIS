import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Pill, Calendar, CheckCircle, Clock } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { format, isToday, isFuture, isPast, startOfToday, endOfToday } from 'date-fns';

// Interfaces for type safety
interface Appointment {
  _id: string;
  title: string;
  doctor: string;
  date: string;
  time: string;
  location: string;
  notes?: string;
  color: string;
  status?: 'Active' | 'Cancelled';
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
  status?: 'Active' | 'Discontinued';
}

const ReminderStats = () => {
  const [stats, setStats] = useState([
    {
      icon: Calendar,
      label: "Upcoming Appointments",
      value: 0,
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: Pill,
      label: "Active Medications",
      value: 0,
      color: "bg-rose-100 text-rose-600"
    },
    {
      icon: CheckCircle,
      label: "Today's Schedule",
      value: 0,
      color: "bg-green-100 text-green-600"
    },
    {
      icon: Clock,
      label: "Total Reminders",
      value: 0,
      color: "bg-amber-100 text-amber-600"
    }
  ]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) {
          toast.error('Please log in to view your stats');
          return;
        }

        // Fetch both appointments and medications
        const [appointmentsRes, medicationsRes] = await Promise.all([
          axios.get(`/reminders/${userId}`),
          axios.get(`/medications/${userId}`)
        ]);

        const appointments: Appointment[] = appointmentsRes.data.reminders || [];
        const medications: Medication[] = medicationsRes.data.medications || [];

        const today = new Date();
        const todayStart = startOfToday();
        const todayEnd = endOfToday();

        // Calculate stats
        const activeAppointments = appointments.filter(
          app => app.status !== 'Cancelled' && 
          isFuture(new Date(`${app.date}T${app.time}`))
        ).length;

        const activeMedications = medications.filter(
          med => med.status === 'Active' && 
          (!med.endDate || isFuture(new Date(med.endDate)))
        ).length;

        const todaySchedule = appointments.filter(app => {
          const appDate = new Date(`${app.date}T${app.time}`);
          return isToday(appDate) && app.status !== 'Cancelled';
        }).length + medications.filter(med => {
          const startDate = new Date(med.startDate);
          return med.status === 'Active' && 
                 (isToday(startDate) || 
                 (isPast(startDate) && (!med.endDate || isFuture(new Date(med.endDate)))));
        }).length;

        const totalActive = activeAppointments + activeMedications;

        // Update stats
        setStats([
          {
            icon: Calendar,
            label: "Upcoming Appointments",
            value: activeAppointments,
            color: "bg-blue-100 text-blue-600"
          },
          {
            icon: Pill,
            label: "Active Medications",
            value: activeMedications,
            color: "bg-rose-100 text-rose-600"
          },
          {
            icon: CheckCircle,
            label: "Today's Schedule",
            value: todaySchedule,
            color: "bg-green-100 text-green-600"
          },
          {
            icon: Clock,
            label: "Total Reminders",
            value: totalActive,
            color: "bg-amber-100 text-amber-600"
          }
        ]);

      } catch (error) {
        console.error('Error fetching stats:', error);
        toast.error('Failed to load health stats');
      }
    };

    fetchStats();

    // Refresh stats every 5 minutes
    const intervalId = setInterval(fetchStats, 5 * 60 * 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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