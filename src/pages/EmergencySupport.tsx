import React from 'react';
import { motion } from 'framer-motion';
import { Phone, AlertCircle, Navigation, Clock, Heart, Ambulance } from 'lucide-react';
import PageHeader from '../components/shared/PageHeader';
import EmergencyMap from '../components/emergency/EmergencyMap';
import EmergencyContacts from '../components/emergency/EmergencyContacts';
import EmergencyButton from '../components/emergency/EmergencyButton';
import FirstAidGuide from '../components/emergency/FirstAidGuide';
import { FloatingElements, GradientBlob } from '../components/shared/BackgroundElements';

const EmergencySupport = () => {
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
          title="Emergency Support"
          subtitle="Quick access to emergency services and medical assistance"
          gradient="from-red-500 to-rose-500"
        />

        <EmergencyButton />

        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <EmergencyMap />
          </div>
          <div>
            <EmergencyContacts />
          </div>
        </div>

        <FirstAidGuide />
      </div>
    </motion.div>
  );
};

export default EmergencySupport;