import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, AlertTriangle, Activity, Brain, LineChart, Shield, Microscope, Stethoscope } from 'lucide-react';
import PageHeader from '../components/shared/PageHeader';
import { FloatingElements, GradientBlob } from '../components/shared/BackgroundElements';
import Button from '../components/shared/Button';

const riskFactors = [
  {
    category: "Lifestyle",
    factors: ["Sedentary behavior", "Poor diet", "Smoking", "Excessive alcohol", "Irregular sleep"]
  },
  {
    category: "Medical History",
    factors: ["Chronic conditions", "Family history", "Previous surgeries", "Allergies", "Medications"]
  },
  {
    category: "Environmental",
    factors: ["Air quality", "Seasonal changes", "Occupational hazards", "Living conditions"]
  }
];

const diseaseOutbreaks = [
  {
    name: "Seasonal Flu",
    risk: "High",
    timeline: "Next 2-3 months",
    prevention: ["Vaccination", "Hand hygiene", "Mask wearing"]
  },
  {
    name: "Respiratory Infections",
    risk: "Moderate",
    timeline: "Ongoing",
    prevention: ["Air purification", "Vitamin D supplementation", "Regular exercise"]
  },
  {
    name: "Gastrointestinal Issues",
    risk: "Low",
    timeline: "Seasonal",
    prevention: ["Food safety", "Water purification", "Probiotics"]
  }
];

const AIForecasting = () => {
  const [showDetails, setShowDetails] = React.useState(false);

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
          title="AI Health Forecasting"
          subtitle="Advanced predictive analytics for personalized health insights"
          gradient="from-blue-500 to-cyan-500"
        />

        {/* Risk Assessment Section */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-lg"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                <Brain className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">AI Risk Assessment</h2>
                <p className="text-gray-600">Based on your health data and patterns</p>
              </div>
            </div>

            <div className="space-y-6">
              {riskFactors.map((category) => (
                <div key={category.category}>
                  <h3 className="font-medium text-gray-900 mb-2">{category.category} Factors:</h3>
                  <div className="flex flex-wrap gap-2">
                    {category.factors.map((factor) => (
                      <span
                        key={factor}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                      >
                        {factor}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl p-6 text-white"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                <Activity className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Health Score</h2>
                <p className="opacity-80">Based on multiple factors</p>
              </div>
            </div>

            <div className="text-center mb-6">
              <div className="text-6xl font-bold mb-2">85</div>
              <p className="text-lg opacity-80">Good Health Status</p>
            </div>

            <div className="space-y-4">
              <div className="bg-white/10 rounded-lg p-4">
                <div className="flex justify-between mb-2">
                  <span>Physical Health</span>
                  <span>90%</span>
                </div>
                <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full bg-white rounded-full" style={{ width: '90%' }} />
                </div>
              </div>

              <div className="bg-white/10 rounded-lg p-4">
                <div className="flex justify-between mb-2">
                  <span>Mental Health</span>
                  <span>80%</span>
                </div>
                <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full bg-white rounded-full" style={{ width: '80%' }} />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Disease Outbreak Predictions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-6 shadow-lg mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
              <Microscope className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Disease Outbreak Predictions</h2>
              <p className="text-gray-600">Regional health trends and forecasts</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {diseaseOutbreaks.map((disease) => (
              <div
                key={disease.name}
                className="bg-gray-50 rounded-xl p-4 border border-gray-200"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-medium text-gray-900">{disease.name}</h3>
                  <span className={`px-2 py-1 rounded-full text-sm
                    ${disease.risk === 'High' ? 'bg-red-100 text-red-600' :
                      disease.risk === 'Moderate' ? 'bg-yellow-100 text-yellow-600' :
                        'bg-green-100 text-green-600'
                    }`}>
                    {disease.risk} Risk
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-4">Timeline: {disease.timeline}</p>
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Prevention:</p>
                  <ul className="space-y-1">
                    {disease.prevention.map((step, idx) => (
                      <li key={idx} className="text-sm text-gray-600 flex items-center gap-2">
                        <Shield className="w-4 h-4 text-blue-500" />
                        {step}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Personalized Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl p-6 text-white"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
              <Stethoscope className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Personalized Health Recommendations</h2>
              <p className="opacity-80">Based on AI analysis of your health data</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/10 rounded-xl p-4">
              <h3 className="font-medium mb-4">Preventive Actions</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Schedule annual health checkup
                </li>
                <li className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Increase daily physical activity
                </li>
                <li className="flex items-center gap-2">
                  <Brain className="w-5 h-5" />
                  Practice stress management
                </li>
              </ul>
            </div>

            <div className="bg-white/10 rounded-xl p-4">
              <h3 className="font-medium mb-4">Lifestyle Modifications</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <LineChart className="w-5 h-5" />
                  Monitor blood pressure regularly
                </li>
                <li className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Improve sleep hygiene
                </li>
                <li className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Maintain balanced nutrition
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-8 bg-amber-50 border border-amber-200 rounded-xl p-6"
        >
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0" />
            <p className="text-amber-800 text-sm">
              The AI health forecasting system provides predictions based on available data and patterns.
              These predictions are not medical diagnoses. Always consult healthcare professionals for
              medical advice and treatment decisions.
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AIForecasting;