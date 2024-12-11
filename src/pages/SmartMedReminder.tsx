import React from 'react';
import { motion } from 'framer-motion';
import { Bell, Camera, Clock, Calendar, Pill, AlertCircle } from 'lucide-react';
import PageHeader from '../components/shared/PageHeader';
import Button from '../components/shared/Button';
import Input from '../components/shared/Input';
import { FloatingElements, GradientBlob } from '../components/shared/BackgroundElements';

const SmartMedReminder = () => {
  const [image, setImage] = React.useState<string | null>(null);
  const [isScanning, setIsScanning] = React.useState(false);
  const [scanResult, setScanResult] = React.useState<any | null>(null);

  const handleScan = async () => {
    setIsScanning(true);
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    setScanResult({
      name: "Paracetamol 500mg",
      dosage: "1 tablet",
      frequency: "Every 6 hours",
      duration: "5 days"
    });
    setIsScanning(false);
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
          title="Smart Medicine Reminder"
          subtitle="AI-powered medication management with image recognition"
          gradient="from-violet-500 to-purple-500"
        />

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Scanner Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-6 shadow-lg"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-violet-100 flex items-center justify-center">
                <Camera className="w-6 h-6 text-violet-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Medicine Scanner</h2>
                <p className="text-gray-600">Scan your medicine for quick setup</p>
              </div>
            </div>

            <div className="aspect-video bg-gray-100 rounded-xl mb-6 flex items-center justify-center">
              {image ? (
                <img
                  src={image}
                  alt="Scanned medicine"
                  className="w-full h-full object-cover rounded-xl"
                />
              ) : (
                <div className="text-center">
                  <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No image captured</p>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <Button
                onClick={handleScan}
                className="w-full"
                icon={Camera}
                isLoading={isScanning}
              >
                {isScanning ? 'Scanning...' : 'Scan Medicine'}
              </Button>

              {scanResult && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-violet-50 rounded-xl"
                >
                  <h3 className="font-medium text-gray-900 mb-2">Scan Results</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Medicine:</span>
                      <span className="font-medium">{scanResult.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Dosage:</span>
                      <span className="font-medium">{scanResult.dosage}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Frequency:</span>
                      <span className="font-medium">{scanResult.frequency}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Duration:</span>
                      <span className="font-medium">{scanResult.duration}</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Reminder Setup */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gradient-to-br from-violet-500 to-purple-500 rounded-2xl p-6 text-white"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                  <Bell className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Reminder Setup</h2>
                  <p className="opacity-80">Configure your medication schedule</p>
                </div>
              </div>

              <div className="space-y-4">
                <Input
                  label="Medicine Name"
                  value={scanResult?.name || ''}
                  onChange={() => {}}
                  icon={Pill}
                  className="bg-white/10 border-white/20 text-white placeholder-white/60"
                />

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Start Date"
                    type="date"
                    icon={Calendar}
                    className="bg-white/10 border-white/20 text-white"
                  />
                  <Input
                    label="First Dose Time"
                    type="time"
                    icon={Clock}
                    className="bg-white/10 border-white/20 text-white"
                  />
                </div>

                <Button className="w-full bg-white/20 hover:bg-white/30" icon={Bell}>
                  Set Reminder
                </Button>
              </div>
            </motion.div>

            {/* Tips Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-6 shadow-lg"
            >
              <div className="flex items-center gap-3 mb-4">
                <AlertCircle className="w-5 h-5 text-amber-500" />
                <h3 className="text-lg font-semibold text-gray-900">Important Tips</h3>
              </div>

              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2" />
                  <span className="text-gray-600">Keep medicines in their original packaging</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2" />
                  <span className="text-gray-600">Ensure good lighting when scanning</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2" />
                  <span className="text-gray-600">Verify scanned information is correct</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2" />
                  <span className="text-gray-600">Set reminders for refills</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SmartMedReminder;