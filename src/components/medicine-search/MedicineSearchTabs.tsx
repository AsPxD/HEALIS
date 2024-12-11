import React from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import { motion } from 'framer-motion';
import { Pill, Stethoscope, MapPin } from 'lucide-react';
import MedicineByName from './MedicineByName';
import MedicineBySymptom from './MedicineBySymptom';
import NearbyPharmacies from './NearbyPharmacies';

const tabs = [
  { id: 'by-name', label: 'Search by Name', icon: Pill, component: MedicineByName },
  { id: 'by-symptom', label: 'Search by Symptom', icon: Stethoscope, component: MedicineBySymptom },
  { id: 'nearby', label: 'Nearby Pharmacies', icon: MapPin, component: NearbyPharmacies },
];

const MedicineSearchTabs = () => {
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
                ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/25'
                : 'bg-white/80 text-gray-600 hover:bg-teal-50'
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

export default MedicineSearchTabs;