import React from 'react';
import { motion } from 'framer-motion';
import PageHeader from '../components/shared/PageHeader';
import { FloatingElements, GradientBlob } from '../components/shared/BackgroundElements';
import HealthMetricsGrid from '../components/health-insights/HealthMetricsGrid';
import HealthTimeline from '../components/health-insights/HealthTimeline';
import LifestyleSection from '../components/health-insights/LifestyleSection';
import HealthHistory from '../components/health-insights/HealthHistory';
import RecommendationsSection from '../components/health-insights/RecommendationsSection';

const HealthInsights = () => {
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
          title="Health Insights"
          subtitle="Track, analyze, and improve your health metrics"
          gradient="from-indigo-500 to-purple-500"
        />
        
        <div className="space-y-8">
          <HealthMetricsGrid />
          <div className="grid lg:grid-cols-2 gap-8">
            <HealthTimeline />
            <LifestyleSection />
          </div>
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <HealthHistory />
            </div>
            <RecommendationsSection />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default HealthInsights;