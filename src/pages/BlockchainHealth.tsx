import React from 'react';
import { motion } from 'framer-motion';
import { Blocks, Shield, Lock, FileText, Activity, Wallet } from 'lucide-react';
import PageHeader from '../components/shared/PageHeader';
import Button from '../components/shared/Button';
import { FloatingElements, GradientBlob } from '../components/shared/BackgroundElements';

const BlockchainHealth = () => {
  const [isConnected, setIsConnected] = React.useState(false);

  const handleConnect = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        setIsConnected(true);
      } catch (error) {
        console.error(error);
      }
    } else {
      alert('Please install MetaMask to use this feature!');
    }
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
          title="Blockchain Health Records"
          subtitle="Secure and decentralized health record management"
          gradient="from-blue-500 to-indigo-500"
        />

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Main Panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-6 shadow-lg"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                <Blocks className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Health Records</h2>
                <p className="text-gray-600">Decentralized medical history</p>
              </div>
            </div>

            {!isConnected ? (
              <div className="text-center py-12">
                <Wallet className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-6">Connect your wallet to access your health records</p>
                <Button onClick={handleConnect} icon={Wallet}>
                  Connect Wallet
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="p-4 bg-gray-50 rounded-xl">
                  <h3 className="font-medium text-gray-900 mb-2">Recent Records</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FileText className="w-5 h-5 text-blue-500" />
                        <span>Annual Checkup Results</span>
                      </div>
                      <span className="text-sm text-gray-500">2024-03-15</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Activity className="w-5 h-5 text-blue-500" />
                        <span>Blood Test Report</span>
                      </div>
                      <span className="text-sm text-gray-500">2024-03-10</span>
                    </div>
                  </div>
                </div>

                <Button className="w-full" icon={FileText}>
                  Upload New Record
                </Button>
              </div>
            )}
          </motion.div>

          {/* Info Panel */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl p-6 text-white"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Security Features</h2>
                  <p className="opacity-80">Your data is protected</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Lock className="w-5 h-5" />
                  <span>End-to-end encryption</span>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5" />
                  <span>Decentralized storage</span>
                </div>
                <div className="flex items-center gap-3">
                  <Activity className="w-5 h-5" />
                  <span>Immutable audit trail</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-6 shadow-lg"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Benefits</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                    <Shield className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Enhanced Privacy</p>
                    <p className="text-sm text-gray-600">Your records are encrypted and secure</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <Activity className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Easy Access</p>
                    <p className="text-sm text-gray-600">Access your records anytime, anywhere</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Complete History</p>
                    <p className="text-sm text-gray-600">Comprehensive medical record tracking</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BlockchainHealth;