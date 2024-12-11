import React from 'react';
import { motion } from 'framer-motion';
import AppointmentTabs from '../components/appointments/AppointmentTabs';
import PageHeader from '../components/shared/PageHeader';
import { FloatingElements, GradientBlob } from '../components/shared/BackgroundElements';

const Appointments = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="pt-24 pb-16 min-h-screen relative"
    >
      <FloatingElements />
      <GradientBlob />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <PageHeader
          title="Book Your Appointment"
          subtitle="Schedule consultations with top healthcare providers"
          gradient="from-violet-500 to-purple-500"
        />
        
        <AppointmentTabs />
      </div>
    </motion.div>
  );
};

export default Appointments;