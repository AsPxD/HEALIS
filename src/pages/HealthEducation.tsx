import React from 'react';
import { motion } from 'framer-motion';
import PageHeader from '../components/shared/PageHeader';
import { FloatingElements, GradientBlob } from '../components/shared/BackgroundElements';
import YogaPoses from '../components/education/sections/YogaPoses';
import MeditationGuide from '../components/education/sections/MeditationGuide';
import AyurvedaBasics from '../components/education/sections/AyurvedaBasics';
import HealthTopics from '../components/education/HealthTopics';
import VideoLibrary from '../components/education/VideoLibrary';
import WellnessArticles from '../components/education/WellnessArticles';
import QuickFactsSection from '../components/education/QuickFactsSection';

const HealthEducation = () => {
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
          title="Health Education Hub"
          subtitle="Explore comprehensive resources for your wellness journey"
          gradient="from-orange-500 to-amber-500"
        />
        
        <div className="space-y-24">
          <QuickFactsSection />
          <YogaPoses />
          <MeditationGuide />
          <AyurvedaBasics />
          <VideoLibrary />
          <HealthTopics />
          <WellnessArticles />
        </div>
      </div>
    </motion.div>
  );
};

export default HealthEducation;