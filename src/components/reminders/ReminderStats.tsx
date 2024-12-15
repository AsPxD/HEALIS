import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Pill, Calendar, CheckCircle, Clock } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';

const ReminderStats = () => {
  const [stats, setStats] = useState([
    {
      icon: Pill,
      label: "Active Medications",
      value: 0,
      color: "bg-rose-100 text-rose-600"
    },
    {
      icon: Calendar,
      label: "Upcoming Appointments",
      value: 0,
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: CheckCircle,
      label: "Completed Today",
      value: 0,
      color: "bg-green-100 text-green-600"
    },
    {
      icon: Clock,
      label: "Pending Reminders",
      value: 0,
      color: "bg-amber-100 text-amber-600"
    }
  ]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Get userId from local storage
        const userId = localStorage.getItem('userId');
        if (!userId) {
          toast.error('Please log in to view your stats');
          return;
        }

        // Fetch reminders
        const remindersResponse = await axios.get(`/reminders/${userId}`);
        const reminders = remindersResponse.data.reminders || [];

        // Fetch appointments
        const appointmentsResponse = await axios.get(`/appointments/${userId}`);
        const appointments = appointmentsResponse.data.appointments || [];

        // Get today's date
        const today = new Date();
        const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());

        // Calculate stats
        const updatedStats = [
          {
            icon: Pill,
            label: "Active Medications",
            value: reminders.filter(r => r.type === 'medication' && r.status !== 'Cancelled').length,
            color: "bg-rose-100 text-rose-600"
          },
          {
            icon: Calendar,
            label: "Upcoming Appointments",
            value: appointments.filter(a => new Date(a.appointmentDate) > today && a.status !== 'Cancelled').length,
            color: "bg-blue-100 text-blue-600"
          },
          {
            icon: CheckCircle,
            label: "Completed Today",
            value: reminders.filter(r => 
              r.completedAt && 
              new Date(r.completedAt) >= todayStart && 
              new Date(r.completedAt) <= today
            ).length,
            color: "bg-green-100 text-green-600"
          },
          {
            icon: Clock,
            label: "Pending Reminders",
            value: reminders.filter(r => !r.completedAt && r.status !== 'Cancelled').length,
            color: "bg-amber-100 text-amber-600"
          }
        ];

        setStats(updatedStats);
      } catch (error) {
        console.error('Error fetching stats:', error);
        toast.error('Failed to load your health stats');
      }
    };

    // Fetch stats when component mounts
    fetchStats();

    // Optional: Set up periodic refresh (e.g., every 5 minutes)
    const intervalId = setInterval(fetchStats, 5 * 60 * 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

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