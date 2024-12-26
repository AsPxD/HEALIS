import React from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import { motion } from 'framer-motion';
import { Stethoscope, Microscope, Syringe, Pill, Brain, Activity } from 'lucide-react';
import DoctorAppointment from './DoctorAppointment';
import LabTests from './LabTests';
import MentalHealth from './MentalHealth';

const tabs = [
  { id: 'doctors', label: 'Doctors', icon: Stethoscope, component: DoctorAppointment },
  { id: 'labs', label: 'Lab Tests', icon: Microscope, component: LabTests },
  { id: 'mental-health', label: 'Mental Health', icon: Brain, component: MentalHealth }
];

const AppointmentTabs = () => {
  const [activeTab, setActiveTab] = React.useState(tabs[0].id);

  return (
    <Tabs.Root value={activeTab} onValueChange={setActiveTab}>
      <Tabs.List className="flex flex-wrap gap-2 mb-8">
        {tabs.map((tab) => (
          <Tabs.Trigger
            key={tab.id}
            value={tab.id}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-300
              ${activeTab === tab.id
                ? 'bg-violet-500 text-white shadow-lg shadow-violet-500/25'
                : 'bg-white/80 text-gray-600 hover:bg-violet-50'
              }`}
          >
            <tab.icon className="w-5 h-5" />
            <span>{tab.label}</span>
          </Tabs.Trigger>
        ))}
      </Tabs.List>

      {tabs.map((tab) => (
        <Tabs.Content key={tab.id} value={tab.id} asChild>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <tab.component />
          </motion.div>
        </Tabs.Content>
      ))}
    </Tabs.Root>
  );
};

export default AppointmentTabs;