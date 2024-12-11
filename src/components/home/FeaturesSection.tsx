import React from 'react';
import { motion } from 'framer-motion';
import {
  Calendar,
  Search,
  LineChart,
  Pill,
  BookOpen,
  Phone,
  Apple,
  MessageSquare,
  Bell,
  Shield,
  Brain,
  Heart,
  Flower2,
  Cpu
} from 'lucide-react';
import FeatureCard from './FeatureCard';

const features = [
  {
    icon: Calendar,
    title: 'Quick Appointment Booking',
    description: 'Schedule doctor visits with ease and get instant confirmations',
    link: '/appointments'
  },
  {
    icon: Search,
    title: 'Medicine Search',
    description: 'Find detailed information about medicines and their uses',
    link: '/medicine-search'
  },
  {
    icon: LineChart,
    title: 'Health Insights',
    description: 'Get personalized health analytics and track your wellness journey',
    link: '/health-insights',
    primary: true
  },
  {
    icon: Phone,
    title: 'Emergency Support',
    description: '24/7 emergency assistance and hospital locator',
    link: '/emergency',
    primary: true
  },
  {
    icon: MessageSquare,
    title: 'AI Chat Support',
    description: 'Get instant answers to your health queries from our AI assistant',
    link: '/ai-chat',
    primary: true
  },
  {
    icon: Cpu,
    title: 'AI Health Forecasting',
    description: 'Predict potential health risks and get personalized preventive care recommendations',
    link: '/ai-forecasting',
    primary: true
  },
  {
    icon: Apple,
    title: 'Personalized Diet Plans',
    description: 'Get customized nutrition plans and expert consultation',
    link: '/diet-plan',
    primary: true
  },
  {
    icon: Flower2,
    title: 'Yoga & Meditation',
    description: 'Explore ancient wisdom with modern scientific approach',
    link: '/yoga',
    primary: true
  },
  {
    icon: BookOpen,
    title: 'Health Education',
    description: 'Access comprehensive wellness resources and expert guidance',
    link: '/health-education',
    primary: true
  },
  {
    icon: Bell,
    title: 'Medicine Reminders',
    description: 'Never miss your medications with smart alerts',
    link: '/reminders'
  },
  {
    icon: Shield,
    title: 'Insurance Guide',
    description: 'Compare health insurance plans and calculate premiums',
    link: '/insurance',
    primary: true
  },
  {
    icon: Heart,
    title: 'NGO Campaigns',
    description: 'Support healthcare initiatives and make a difference through donations',
    link: '/ngo-campaigns',
    primary: true
  }
];

export default function FeaturesSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            Comprehensive Healthcare Solutions
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Everything you need for your health journey, all in one place
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              link={feature.link}
              primary={feature.primary}
            />
          ))}
        </div>
      </div>
    </section>
  );
}