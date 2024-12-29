import React from 'react';
import { motion } from 'framer-motion';
import HeroSection from '../components/home/HeroSection';
import FeaturesSection from '../components/home/FeaturesSection';
import AIFeatureCards from '../components/home/AIFeatureCards';
import ReelsSection from '../components/home/ReelsSection';
import LoyaltySection from '../components/home/DonationSection';
import { FloatingElements, GradientBlob } from '../components/shared/BackgroundElements';

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden"
    >
      <FloatingElements />
      <GradientBlob />
      
      {/* Hero Section */}
      <HeroSection />

      {/* Main Content */}
      <div className="relative">
        {/* Features Grid */}
        <FeaturesSection />

        {/* AI Features */}
        <AIFeatureCards />


        {/* Health Reels */}
        <ReelsSection />

        {/* Donation Section */}
        <LoyaltySection />
      </div>
    </motion.div>
  );
};

export default Home;