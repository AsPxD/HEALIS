import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { withErrorBoundary } from './utils/errorBoundary';
import { ChatProvider } from './context/ChatContext';

// Layout Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Main Pages
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Features from './pages/Features';
import About from './pages/About';
import Contact from './pages/Contact';
import Auth from './pages/Auth';
import News from './pages/News';

// Healthcare Services
import Appointments from './pages/Appointments';
import MedicineSearch from './pages/MedicineSearch';
import HealthInsights from './pages/HealthInsights';
import EmergencySupport from './pages/EmergencySupport';

// AI & Technology
import AIChatSupport from './pages/AIChatSupport';
import AIHealthDiagnostics from './pages/AIHealthDiagnostics';
import Allergy from './pages/AIForecasting';
import BlockchainHealth from './pages/BlockchainHealth';

// Wellness & Lifestyle
import DietPlan from './pages/DietPlan';
import Yoga from './pages/Yoga';
import VRMeditation from './pages/VRMeditation';
import ARWorkout from './pages/ARWorkout';

// Management & Support
import MedicineReminder from './pages/MedicineReminder';
import SmartMedReminder from './pages/SmartMedReminder';
import InsuranceGuide from './pages/InsuranceGuide';
import NGOCampaigns from './pages/NGOCampaigns';
import HealthEducation from './pages/HealthEducation';
import DigiLocker from './pages/Digilocker';
// Import styles
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

function App() {
  return (
    <Router>
      <ChatProvider>
        <div className="min-h-screen flex flex-col bg-gray-50">
          <Navbar />
          <main className="flex-1">
            <Routes>
              {/* Main Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/features" element={<Features />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/news" element={<News />} />

              {/* Healthcare Services */}
              <Route path="/appointments" element={<Appointments />} />
              <Route path="/medicine-search" element={<MedicineSearch />} />
              <Route path="/health-insights" element={<HealthInsights />} />
              <Route path="/emergency" element={<EmergencySupport />} />
              
              {/* AI & Technology */}
              <Route path="/ai-chat" element={<AIChatSupport />} />
              <Route path="/ai-diagnostics" element={<AIHealthDiagnostics />} />
              <Route path="/ai-forecasting" element={<Allergy />} />
              <Route path="/blockchain-health" element={<BlockchainHealth />} />

              {/* Wellness & Lifestyle */}
              <Route path="/diet-plan" element={<DietPlan />} />
              <Route path="/yoga" element={<Yoga />} />
              <Route path="/vr-meditation" element={<VRMeditation />} />
              <Route path="/ar-workout" element={<ARWorkout />} />

              {/* Management & Support */}
              <Route path="/reminders" element={<MedicineReminder />} />
              <Route path="/smart-med-reminder" element={<SmartMedReminder />} />
              <Route path="/insurance" element={<InsuranceGuide />} />
              <Route path="/ngo-campaigns" element={<NGOCampaigns />} />
              <Route path="/health-education" element={<HealthEducation />} />
              <Route path="/digilocker" element={<DigiLocker />} />
              {/* Fallback Route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
          <ToastContainer position="top-right" />
        </div>
      </ChatProvider>
    </Router>
  );
}

export default withErrorBoundary(App);