import React from 'react';
import { motion } from 'framer-motion';
import { X, CreditCard, Wallet, QrCode } from 'lucide-react';
import Button from '../shared/Button';
import Input from '../shared/Input';

interface DonationModalProps {
  campaign: {
    title: string;
    ngo: string;
  };
  onClose: () => void;
}

const DonationModal = ({ campaign, onClose }: DonationModalProps) => {
  const [amount, setAmount] = React.useState('');
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [isAnonymous, setIsAnonymous] = React.useState(false);
  const [paymentMethod, setPaymentMethod] = React.useState<'card' | 'upi' | 'crypto'>('card');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle donation submission
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className="bg-white rounded-2xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold text-gray-900 mb-2">{campaign.title}</h2>
        <p className="text-gray-600 mb-6">{campaign.ngo}</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-3 gap-3">
            {[500, 1000, 2000].map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setAmount(value.toString())}
                className={`p-3 rounded-xl border text-center transition-all duration-300
                  ${amount === value.toString()
                    ? 'bg-rose-500 text-white border-rose-500'
                    : 'border-gray-300 text-gray-600 hover:border-rose-500'
                  }`}
              >
                ₹{value}
              </button>
            ))}
          </div>

          <Input
            label="Custom Amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            min="100"
          />

          {!isAnonymous && (
            <>
              <Input
                label="Full Name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <Input
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </>
          )}

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="anonymous"
              checked={isAnonymous}
              onChange={(e) => setIsAnonymous(e.target.checked)}
              className="rounded border-gray-300"
            />
            <label htmlFor="anonymous" className="text-gray-700">
              Donate anonymously
            </label>
          </div>

          <div className="space-y-3">
            <p className="font-medium text-gray-900">Payment Method</p>
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all duration-300
                  ${paymentMethod === 'card'
                    ? 'bg-rose-50 border-rose-500 text-rose-600'
                    : 'border-gray-300 text-gray-600 hover:border-rose-500'
                  }`}
              >
                <CreditCard className="w-6 h-6" />
                <span>Card</span>
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('upi')}
                className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all duration-300
                  ${paymentMethod === 'upi'
                    ? 'bg-rose-50 border-rose-500 text-rose-600'
                    : 'border-gray-300 text-gray-600 hover:border-rose-500'
                  }`}
              >
                <QrCode className="w-6 h-6" />
                <span>UPI</span>
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('crypto')}
                className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all duration-300
                  ${paymentMethod === 'crypto'
                    ? 'bg-rose-50 border-rose-500 text-rose-600'
                    : 'border-gray-300 text-gray-600 hover:border-rose-500'
                  }`}
              >
                <Wallet className="w-6 h-6" />
                <span>Crypto</span>
              </button>
            </div>
          </div>

          <Button type="submit" className="w-full">
            Proceed to Pay
          </Button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default DonationModal;