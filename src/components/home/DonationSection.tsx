import React from 'react';
import { motion } from 'framer-motion';
import { Wallet, Shield, Zap, Heart, ArrowRight, Globe, Users } from 'lucide-react';
import Button from '../shared/Button';

const stats = [
  {
    icon: Heart,
    value: '10K+',
    label: 'Lives Impacted',
    color: 'bg-rose-100 text-rose-600'
  },
  {
    icon: Users,
    value: '5K+',
    label: 'Monthly Donors',
    color: 'bg-blue-100 text-blue-600'
  },
  {
    icon: Globe,
    value: '100+',
    label: 'Cities Reached',
    color: 'bg-emerald-100 text-emerald-600'
  }
];

const DonationSection = () => {
  const [donationAmount, setDonationAmount] = React.useState('');
  const [isConnecting, setIsConnecting] = React.useState(false);

  const handleDonate = async () => {
    setIsConnecting(true);
    // Simulating wallet connection
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsConnecting(false);
    
    // Here we would integrate with actual blockchain payment
    if (window.ethereum) {
      try {
        // Request account access
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        
        // Create transaction
        const transactionParameters = {
          to: '0xYOUR_CONTRACT_ADDRESS', // Replace with actual contract address
          from: window.ethereum.selectedAddress,
          value: '0x' + (Number(donationAmount) * 1e18).toString(16), // Convert ETH to Wei
          gas: '0x5208', // 21000 gas
        };

        // Send transaction
        const txHash = await window.ethereum.request({
          method: 'eth_sendTransaction',
          params: [transactionParameters],
        });

        console.log('Transaction Hash:', txHash);
      } catch (error) {
        console.error(error);
      }
    } else {
      alert('Please install MetaMask to donate using cryptocurrency!');
    }
  };

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white" />
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-blue-600 font-medium"
          >
            Support Our Mission
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-bold text-gray-900 mt-2 mb-4"
          >
            Donate to Make a Difference
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Your contribution helps us provide better healthcare access to those in need.
            Now accepting secure cryptocurrency donations.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white">
                  <Wallet className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Crypto Donation</h3>
                  <p className="text-gray-600">Secure blockchain transactions</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Amount (ETH)
                  </label>
                  <input
                    type="number"
                    value={donationAmount}
                    onChange={(e) => setDonationAmount(e.target.value)}
                    placeholder="0.1"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    step="0.01"
                    min="0.01"
                  />
                </div>

                <Button
                  onClick={handleDonate}
                  isLoading={isConnecting}
                  className="w-full"
                  icon={ArrowRight}
                >
                  {isConnecting ? 'Connecting Wallet...' : 'Connect Wallet & Donate'}
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl p-6 text-white">
                <Shield className="w-8 h-8 mb-4" />
                <h4 className="text-lg font-semibold mb-2">Secure & Transparent</h4>
                <p className="text-white/80">All transactions are recorded on the blockchain for complete transparency</p>
              </div>
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-6 text-white">
                <Zap className="w-8 h-8 mb-4" />
                <h4 className="text-lg font-semibold mb-2">Instant Impact</h4>
                <p className="text-white/80">Your donation is immediately put to work helping those in need</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Our Impact</h3>
            
            <div className="grid gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-gray-600">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 p-4 bg-gray-50 rounded-xl">
              <h4 className="font-medium text-gray-900 mb-2">Recent Donations</h4>
              <div className="space-y-3">
                {[
                  { address: '0x1234...5678', amount: '0.5 ETH', timeAgo: '2 minutes ago' },
                  { address: '0x8765...4321', amount: '0.3 ETH', timeAgo: '5 minutes ago' },
                  { address: '0x9876...1234', amount: '1.0 ETH', timeAgo: '10 minutes ago' }
                ].map((donation, index) => (
                  <div key={index} className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">{donation.address}</span>
                    <span className="text-gray-900 font-medium">{donation.amount}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Testimonials */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 text-blue-600 mb-4">
            <Users className="w-5 h-5" />
            <span className="font-medium">From Our Donors</span>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "The transparency of blockchain donations gives me confidence my contribution is making a real impact.",
                author: "Alex P.",
                role: "Regular Donor"
              },
              {
                quote: "Quick, secure, and efficient. The crypto donation process couldn't be easier.",
                author: "Sarah M.",
                role: "Tech Enthusiast"
              },
              {
                quote: "Being able to track my donation on the blockchain adds a new level of trust.",
                author: "Michael R.",
                role: "Crypto Investor"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-200"
              >
                <p className="text-gray-600 mb-4">"{testimonial.quote}"</p>
                <div className="font-medium text-gray-900">{testimonial.author}</div>
                <div className="text-sm text-gray-500">{testimonial.role}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DonationSection;