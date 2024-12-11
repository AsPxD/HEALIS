import React from 'react';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import { Heart, Share2, Download } from 'lucide-react';
import Button from '../shared/Button';

interface DonationSuccessProps {
  amount: number;
  campaign: string;
  transactionId: string;
  onClose: () => void;
}

const DonationSuccess = ({ amount, campaign, transactionId, onClose }: DonationSuccessProps) => {
  const [showConfetti, setShowConfetti] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Donation to ' + campaign,
        text: `I just donated ₹${amount} to support ${campaign}. Join me in making a difference!`,
        url: window.location.href,
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
    >
      {showConfetti && <Confetti />}
      
      <motion.div
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        className="bg-white rounded-2xl p-8 max-w-md w-full relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-rose-500 to-pink-500" />
        
        <div className="text-center mb-8">
          <div className="w-20 h-20 rounded-full bg-rose-100 flex items-center justify-center mx-auto mb-6">
            <Heart className="w-10 h-10 text-rose-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h2>
          <p className="text-gray-600">Your donation will make a real difference</p>
        </div>

        <div className="space-y-4 mb-8">
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600">Amount</span>
              <span className="text-xl font-bold text-gray-900">₹{amount}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600">Campaign</span>
              <span className="text-gray-900">{campaign}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Transaction ID</span>
              <span className="text-gray-900">{transactionId}</span>
            </div>
          </div>

          <p className="text-sm text-gray-500 text-center">
            A receipt has been sent to your email address
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button
            variant="outline"
            onClick={handleShare}
            icon={Share2}
            className="w-full"
          >
            Share
          </Button>
          <Button
            onClick={onClose}
            icon={Download}
            className="w-full"
          >
            Download Receipt
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DonationSuccess;