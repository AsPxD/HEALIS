import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Calendar,
  Search,
  LineChart,
  Phone,
  MessageSquare,
  Apple,
  Bell,
  BookOpen,
  Shield,
  Heart,
  Flower2,
  Cpu,
  Activity
} from 'lucide-react';
import { FloatingElements, GradientBlob } from '../components/shared/BackgroundElements';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import QuickStats from '../components/dashboard/QuickStats';
import AppointmentsList from '../components/dashboard/AppointmentsList';
import HealthMetrics from '../components/dashboard/HealthMetrics';
import MedicineReminders from '../components/dashboard/MedicineReminders';
import DietPlanSummary from '../components/dashboard/DietPlanSummary';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Calendar, label: 'Appointments', path: '/appointments' },
  { icon: Search, label: 'Medicine Search', path: '/medicine-search' },
  { icon: LineChart, label: 'Health Insights', path: '/health-insights' },
  { icon: Phone, label: 'Emergency Support', path: '/emergency' },
  { icon: MessageSquare, label: 'AI Chat Support', path: '/ai-chat' },
  { icon: Apple, label: 'Diet Plan', path: '/diet-plan' },
  { icon: Bell, label: 'Medicine Reminders', path: '/reminders' },
  { icon: BookOpen, label: 'Health Education', path: '/health-education' },
  { icon: Shield, label: 'Insurance Guide', path: '/insurance' },
  { icon: Heart, label: 'NGO Campaigns', path: '/ngo-campaigns' },
  { icon: Flower2, label: 'Yoga', path: '/yoga' },
  { icon: Cpu, label: 'AI Forecasting', path: '/ai-forecasting' }
];

const Dashboard = () => {
  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      <FloatingElements />
      <GradientBlob />
      
      <div className="flex">
        {/* Sidebar */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="w-64 bg-white shadow-lg fixed h-[calc(100vh-4rem)] overflow-y-auto"
        >
          <div className="p-6">
            <div className="flex items-center gap-3 mb-8">
              <Activity className="w-8 h-8 text-blue-500" />
              <h1 className="text-xl font-bold">Healis</h1>
            </div>
            
            <nav className="space-y-2">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 
                    hover:bg-blue-50 hover:text-blue-600 transition-colors"
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="flex-1 ml-64 p-8">
          <div className="max-w-7xl mx-auto space-y-8">
            <DashboardHeader />
            <QuickStats />
            
            <div className="grid lg:grid-cols-2 gap-8">
              <AppointmentsList />
              <HealthMetrics />
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <MedicineReminders />
              <DietPlanSummary />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;