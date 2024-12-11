import React from 'react';
import { motion } from 'framer-motion';
import { Wallet, ArrowRight, Shield, Zap } from 'lucide-react';
import Button from '../shared/Button';

const BlockchainDonation = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl p-6 text-white"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
          <Wallet className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-semibold">Crypto Donations</h3>
          <p className="text-white/80">Support with cryptocurrency</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/10 rounded-xl p-4">
            <Shield className="w-6 h-6 mb-2" />
            <p className="font-medium">Secure</p>
            <p className="text-sm text-white/80">Blockchain-backed</p>
          </div>
          <div className="bg-white/10 rounded-xl p-4">
            <Zap className="w-6 h-6 mb-2" />
            <p className="font-medium">Instant</p>
            <p className="text-sm text-white/80">Quick transfers</p>
          </div>
        </div>

        <div>
          <p className="text-sm text-white/80 mb-4">
            We accept donations in multiple cryptocurrencies including ETH, BTC, and more.
            All transactions are transparent and traceable on the blockchain.
          </p>

          <Button
            variant="outline"
            className="w-full bg-white/10 border-white/20 hover:bg-white/20"
            icon={ArrowRight}
          >
            Connect Wallet
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default BlockchainDonation;