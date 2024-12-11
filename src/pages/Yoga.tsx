import React from 'react';
import { motion } from 'framer-motion';
import { Flower2, Wind, Sun, Brain, Heart } from 'lucide-react'; // Changed Lotus to Flower2
import PageHeader from '../components/shared/PageHeader';
import { FloatingElements, GradientBlob } from '../components/shared/BackgroundElements';
import YogaPoses from '../components/education/sections/YogaPoses';
import SuryaNamaskarGuide from '../components/education/SuryaNamaskarGuide';
import MeditationGuide from '../components/education/sections/MeditationGuide';
import YogaSection from '../components/education/YogaSection';
import PranayamaGuide from '../components/yoga/PranayamaGuide';
import YogaScheduler from '../components/yoga/YogaScheduler';
import YogaBenefits from '../components/yoga/YogaBenefits';

const Yoga = () => {
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
          title="Yoga & Meditation"
          subtitle="Ancient wisdom meets modern wellness - Transform your body, mind, and soul"
          gradient="from-purple-500 to-indigo-500"
        />

        <div className="space-y-24">
          <YogaBenefits />
          <section className="space-y-8">
            <div className="text-center">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-3xl font-bold text-gray-900 mb-4"
              >
                Surya Namaskar
              </motion.h2>
              <p className="text-xl text-gray-600">The complete mind-body workout</p>
            </div>
            <SuryaNamaskarGuide />
          </section>

          <section className="space-y-8">
            <div className="text-center">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-3xl font-bold text-gray-900 mb-4"
              >
                Essential Yoga Poses
              </motion.h2>
              <p className="text-xl text-gray-600">Master these fundamental asanas</p>
            </div>
            <YogaPoses />
          </section>

          <PranayamaGuide />

          <section className="space-y-8">
            <div className="text-center">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-3xl font-bold text-gray-900 mb-4"
              >
                Meditation Techniques
              </motion.h2>
              <p className="text-xl text-gray-600">Find your inner peace</p>
            </div>
            <MeditationGuide />
          </section>

          <YogaScheduler />
        </div>
      </div>
    </motion.div>
  );
};

export default Yoga;