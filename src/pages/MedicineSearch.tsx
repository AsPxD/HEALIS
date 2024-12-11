import React from 'react';
import { motion } from 'framer-motion';
import { Search, AlertCircle } from 'lucide-react';
import PageHeader from '../components/shared/PageHeader';
import { FloatingElements, GradientBlob } from '../components/shared/BackgroundElements';
import MedicineSearchTabs from '../components/medicine-search/MedicineSearchTabs';
import MedicalDisclaimer from '../components/medicine-search/MedicalDisclaimer';

const MedicineSearch = () => {
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
          title="Medicine Search"
          subtitle="Find medicines, understand their purposes, and learn about treatment options"
          gradient="from-teal-500 to-emerald-500"
        />
        
        <MedicalDisclaimer />
        <MedicineSearchTabs />
      </div>
    </motion.div>
  );
};

export default MedicineSearch;