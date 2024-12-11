import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Stethoscope, Activity, AlertCircle, FileText, Heart } from 'lucide-react';
import PageHeader from '../components/shared/PageHeader';
import { FloatingElements, GradientBlob } from '../components/shared/BackgroundElements';
import Button from '../components/shared/Button';

const symptoms = [
  { id: 1, name: 'Headache', category: 'Neurological' },
  { id: 2, name: 'Chest Pain', category: 'Cardiovascular' },
  { id: 3, name: 'Shortness of Breath', category: 'Respiratory' },
  { id: 4, name: 'Fatigue', category: 'General' },
  { id: 5, name: 'Nausea', category: 'Gastrointestinal' },
  { id: 6, name: 'Joint Pain', category: 'Musculoskeletal' }
];

const AIHealthDiagnostics = () => {
  const [selectedSymptoms, setSelectedSymptoms] = React.useState<number[]>([]);
  const [showAnalysis, setShowAnalysis] = React.useState(false);
  const [isAnalyzing, setIsAnalyzing] = React.useState(false);

  const handleSymptomSelect = (id: number) => {
    setSelectedSymptoms(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsAnalyzing(false);
    setShowAnalysis(true);
  };

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
          title="AI Health Diagnostics"
          subtitle="Advanced symptom analysis powered by artificial intelligence"
          gradient="from-blue-500 to-cyan-500"
        />

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Symptom Selection */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-6 shadow-lg"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                  <Brain className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Symptom Analysis</h2>
                  <p className="text-gray-600">Select all symptoms you're experiencing</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                {symptoms.map(symptom => (
                  <button
                    key={symptom.id}
                    onClick={() => handleSymptomSelect(symptom.id)}
                    className={`p-4 rounded-xl border transition-all duration-300 text-left
                      ${selectedSymptoms.includes(symptom.id)
                        ? 'bg-blue-50 border-blue-500'
                        : 'bg-white border-gray-200 hover:border-blue-200'
                      }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">{symptom.name}</p>
                        <p className="text-sm text-gray-500">{symptom.category}</p>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 transition-colors
                        ${selectedSymptoms.includes(symptom.id)
                          ? 'bg-blue-500 border-blue-500'
                          : 'border-gray-300'
                        }`}
                      />
                    </div>
                  </button>
                ))}
              </div>

              <Button
                onClick={handleAnalyze}
                disabled={selectedSymptoms.length === 0}
                isLoading={isAnalyzing}
                className="w-full"
              >
                Analyze Symptoms
              </Button>
            </motion.div>

            {showAnalysis && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 space-y-6"
              >
                {/* Analysis Results */}
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
                      <Activity className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">Analysis Results</h2>
                      <p className="text-gray-600">Based on your symptoms</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium text-amber-800">Important Notice</p>
                          <p className="text-sm text-amber-700">
                            This is an AI-powered analysis and should not be considered as a medical
                            diagnosis. Always consult with healthcare professionals for proper medical advice.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="p-4 rounded-xl border border-gray-200">
                        <h3 className="font-medium text-gray-900 mb-3">Possible Conditions</h3>
                        <ul className="space-y-2">
                          <li className="flex items-center gap-2 text-gray-600">
                            <div className="w-2 h-2 rounded-full bg-amber-500" />
                            <span>Common Cold (65% match)</span>
                          </li>
                          <li className="flex items-center gap-2 text-gray-600">
                            <div className="w-2 h-2 rounded-full bg-amber-500" />
                            <span>Seasonal Allergies (45% match)</span>
                          </li>
                        </ul>
                      </div>

                      <div className="p-4 rounded-xl border border-gray-200">
                        <h3 className="font-medium text-gray-900 mb-3">Recommended Actions</h3>
                        <ul className="space-y-2">
                          <li className="flex items-center gap-2 text-gray-600">
                            <div className="w-2 h-2 rounded-full bg-emerald-500" />
                            <span>Schedule a doctor's appointment</span>
                          </li>
                          <li className="flex items-center gap-2 text-gray-600">
                            <div className="w-2 h-2 rounded-full bg-emerald-500" />
                            <span>Monitor symptoms for 24-48 hours</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Next Steps */}
                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-6 text-white">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                      <Stethoscope className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold">Next Steps</h2>
                      <p className="text-white/80">Recommended actions for your care</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <Button
                      variant="outline"
                      className="w-full bg-white/10 border-white/20 hover:bg-white/20"
                    >
                      Book Appointment
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full bg-white/10 border-white/20 hover:bg-white/20"
                    >
                      View Health Report
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Information Panel */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl p-6 shadow-lg"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">How It Works</h2>
                  <p className="text-gray-600">Our AI-powered analysis</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                    <span className="font-medium text-purple-600">1</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Select Symptoms</h3>
                    <p className="text-sm text-gray-600">
                      Choose all symptoms you're currently experiencing from our comprehensive list
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                    <span className="font-medium text-purple-600">2</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">AI Analysis</h3>
                    <p className="text-sm text-gray-600">
                      Our advanced AI analyzes your symptoms using a vast medical knowledge base
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                    <span className="font-medium text-purple-600">3</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Get Insights</h3>
                    <p className="text-sm text-gray-600">
                      Receive detailed analysis and recommended next steps for your health
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-rose-100 flex items-center justify-center">
                  <Heart className="w-6 h-6 text-rose-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Emergency?</h2>
                  <p className="text-gray-600">Get immediate help</p>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-gray-700">
                  If you're experiencing severe symptoms or require immediate medical attention:
                </p>
                <Button className="w-full">
                  Call Emergency Services
                </Button>
                <p className="text-sm text-gray-600 text-center">
                  Emergency helpline: 102
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AIHealthDiagnostics;