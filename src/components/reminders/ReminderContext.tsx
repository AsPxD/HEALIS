import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { format, isAfter, isBefore, addMinutes } from 'date-fns';
import { Medication, Appointment, Reminder } from './types';

interface ReminderContextType {
  medications: Medication[];
  appointments: Appointment[];
  reminders: Reminder[];
  addMedication: (medication: Omit<Medication, 'id'>) => void;
  addAppointment: (appointment: Omit<Appointment, 'id'>) => void;
  removeMedication: (id: string) => void;
  removeAppointment: (id: string) => void;
  completeReminder: (id: string) => void;
  clearCompletedReminders: () => void;
}

const ReminderContext = createContext<ReminderContextType | undefined>(undefined);

export const ReminderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [medications, setMedications] = useState<Medication[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [reminders, setReminders] = useState<Reminder[]>([]);

  // Load data from localStorage on mount
  useEffect(() => {
    const loadedMedications = localStorage.getItem('medications');
    const loadedAppointments = localStorage.getItem('appointments');
    const loadedReminders = localStorage.getItem('reminders');

    if (loadedMedications) setMedications(JSON.parse(loadedMedications));
    if (loadedAppointments) setAppointments(JSON.parse(loadedAppointments));
    if (loadedReminders) setReminders(JSON.parse(loadedReminders));
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('medications', JSON.stringify(medications));
    localStorage.setItem('appointments', JSON.stringify(appointments));
    localStorage.setItem('reminders', JSON.stringify(reminders));
  }, [medications, appointments, reminders]);

  // Check for due reminders every minute
  useEffect(() => {
    const checkReminders = () => {
      const now = new Date();
      reminders.forEach(reminder => {
        if (!reminder.completed && isBefore(new Date(reminder.datetime), now)) {
          const item = reminder.type === 'medication'
            ? medications.find(m => m.id === reminder.referenceId)
            : appointments.find(a => a.id === reminder.referenceId);

          if (item) {
            toast.info(`Time for ${reminder.type === 'medication' ? 'medication' : 'appointment'}: ${
              reminder.type === 'medication' ? (item as Medication).name : (item as Appointment).title
            }`, {
              position: "top-right",
              autoClose: false,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
          }
        }
      });
    };

    const interval = setInterval(checkReminders, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [reminders, medications, appointments]);

  const addMedication = (medication: Omit<Medication, 'id'>) => {
    const newMedication = { ...medication, id: Date.now().toString() };
    setMedications(prev => [...prev, newMedication]);

    // Create reminders for each time
    const newReminders = medication.times.map(time => ({
      id: Date.now().toString() + Math.random(),
      type: 'medication' as const,
      referenceId: newMedication.id,
      datetime: new Date(`${format(medication.startDate, 'yyyy-MM-dd')}T${time}`),
      completed: false
    }));

    setReminders(prev => [...prev, ...newReminders]);
  };

  const addAppointment = (appointment: Omit<Appointment, 'id'>) => {
    const newAppointment = { ...appointment, id: Date.now().toString() };
    setAppointments(prev => [...prev, newAppointment]);

    // Create reminder 30 minutes before appointment
    const reminderTime = addMinutes(new Date(`${format(appointment.date, 'yyyy-MM-dd')}T${appointment.time}`), -30);
    const newReminder = {
      id: Date.now().toString(),
      type: 'appointment' as const,
      referenceId: newAppointment.id,
      datetime: reminderTime,
      completed: false
    };

    setReminders(prev => [...prev, newReminder]);
  };

  const removeMedication = (id: string) => {
    setMedications(prev => prev.filter(m => m.id !== id));
    setReminders(prev => prev.filter(r => !(r.type === 'medication' && r.referenceId === id)));
  };

  const removeAppointment = (id: string) => {
    setAppointments(prev => prev.filter(a => a.id !== id));
    setReminders(prev => prev.filter(r => !(r.type === 'appointment' && r.referenceId === id)));
  };

  const completeReminder = (id: string) => {
    setReminders(prev => prev.map(r => 
      r.id === id ? { ...r, completed: true } : r
    ));
  };

  const clearCompletedReminders = () => {
    setReminders(prev => prev.filter(r => !r.completed));
  };

  return (
    <ReminderContext.Provider value={{
      medications,
      appointments,
      reminders,
      addMedication,
      addAppointment,
      removeMedication,
      removeAppointment,
      completeReminder,
      clearCompletedReminders
    }}>
      {children}
    </ReminderContext.Provider>
  );
};

export const useReminders = () => {
  const context = useContext(ReminderContext);
  if (context === undefined) {
    throw new Error('useReminders must be used within a ReminderProvider');
  }
  return context;
};