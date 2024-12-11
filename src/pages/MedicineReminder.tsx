import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Bell } from 'lucide-react';
import { ToastContainer } from 'react-toastify';
import PageHeader from '../components/shared/PageHeader';
import Button from '../components/shared/Button';
import { FloatingElements, GradientBlob } from '../components/shared/BackgroundElements';
import { ReminderProvider } from '../components/reminders/ReminderContext';
import AddMedicationForm from '../components/reminders/AddMedicationForm';
import AddAppointmentForm from '../components/reminders/AddAppointmentForm';
import ReminderList from '../components/reminders/ReminderList';
import ReminderStats from '../components/reminders/ReminderStats';
import ReminderProgress from '../components/reminders/ReminderProgress';
import ReminderCalendar from '../components/reminders/ReminderCalendar';
import 'react-toastify/dist/ReactToastify.css';

const MedicineReminder = () => {
  const [showMedicationForm, setShowMedicationForm] = React.useState(false);
  const [showAppointmentForm, setShowAppointmentForm] = React.useState(false);

  return (
    <ReminderProvider>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="pt-24 pb-16 min-h-screen relative"
      >
        <FloatingElements />
        <GradientBlob />
        <ToastContainer />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <PageHeader
            title="Medicine & Task Reminders"
            subtitle="Never miss your medications or appointments"
            gradient="from-violet-500 to-purple-500"
          />

          <div className="space-y-8">
            <ReminderStats />

            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <ReminderCalendar />
              </div>
              <ReminderProgress />
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <ReminderList />
              </div>

              <div className="space-y-6">
                {/* Add New Forms */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200"
                >
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Add New</h2>
                  <div className="space-y-4">
                    <Button
                      onClick={() => setShowMedicationForm(true)}
                      className="w-full"
                      icon={Plus}
                    >
                      Add Medication
                    </Button>
                    <Button
                      onClick={() => setShowAppointmentForm(true)}
                      variant="outline"
                      className="w-full"
                      icon={Plus}
                    >
                      Add Appointment
                    </Button>
                  </div>
                </motion.div>

                {/* Quick Tips */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl p-6"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-violet-100 flex items-center justify-center">
                      <Bell className="w-5 h-5 text-violet-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Quick Tips</h3>
                  </div>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-violet-500 mt-2" />
                      <span>Set specific times for each medication</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-violet-500 mt-2" />
                      <span>Keep your medication list updated</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-violet-500 mt-2" />
                      <span>Enable browser notifications for reminders</span>
                    </li>
                  </ul>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Modal for Add Medication Form */}
          {showMedicationForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="bg-white rounded-2xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto"
              >
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Add Medication</h2>
                <AddMedicationForm onClose={() => setShowMedicationForm(false)} />
              </motion.div>
            </motion.div>
          )}

          {/* Modal for Add Appointment Form */}
          {showAppointmentForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="bg-white rounded-2xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto"
              >
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Add Appointment</h2>
                <AddAppointmentForm onClose={() => setShowAppointmentForm(false)} />
              </motion.div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </ReminderProvider>
  );
};

export default MedicineReminder;