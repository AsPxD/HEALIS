import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Package, Truck, Clock, X } from 'lucide-react';
import Input from '../shared/Input';
import Button from '../shared/Button';
import { toast } from 'react-toastify';
import axios from 'axios';

// Medicines Data
const medicines = [
  {
    id: 1,
    name: "Paracetamol 500mg",
    brand: "Crocin",
    type: "Tablet",
    price: 35,
    quantity: "15 tablets",
    prescription: false,
    delivery: "2-3 hours",
    stock: true
  },
  {
    id: 2,
    name: "Azithromycin 500mg",
    brand: "Zithromax",
    type: "Tablet",
    price: 180,
    quantity: "5 tablets",
    prescription: true,
    delivery: "2-3 hours",
    stock: true
  },
  {
    id: 3,
    name: "Vitamin D3",
    brand: "HealthVit",
    type: "Capsule",
    price: 450,
    quantity: "60 capsules",
    prescription: false,
    delivery: "2-3 hours",
    stock: true
  }
];

const Pharmacy: React.FC = () => {
  // State Management
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [cart, setCart] = useState<{ id: number; quantity: number }[]>([]);
  const [isOrdering, setIsOrdering] = useState<boolean>(false);

  // OTP States
  const [showOTPModal, setShowOTPModal] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [otp, setOtp] = useState<string>("");

  // Add to Cart Handler
  const addToCart = (medicineId: number) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === medicineId);
      if (existing) {
        return prev.map(item =>
          item.id === medicineId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { id: medicineId, quantity: 1 }];
    });
  };

  // Remove from Cart Handler
  const removeFromCart = (medicineId: number) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === medicineId);
      if (existing && existing.quantity > 1) {
        return prev.map(item =>
          item.id === medicineId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }
      return prev.filter(item => item.id !== medicineId);
    });
  };

  // Calculate Total Amount
  const totalAmount = cart.reduce((sum, item) => {
    const medicine = medicines.find(m => m.id === item.id);
    return sum + (medicine?.price || 0) * item.quantity;
  }, 0);

  // Generate OTP Handler
  const handleGenerateOTP = async () => {
    // Validation checks
    if (cart.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    if (!email) {
      toast.error('Please enter your email');
      return;
    }
 const userId = localStorage.getItem('userId');
  if (!userId) {
    toast.error('Please log in to book lab tests');
    return;
  }
    try {
      const response = await axios.post('/pharmacy/generate-otp', { email,userId });
      if (response.data.success) {
        setShowOTPModal(true);
        toast.success('OTP sent to your email');
      }
    } catch (error) {
      console.error('OTP Generation Error', error);
      toast.error('Failed to generate OTP');
    }
  };

  // OTP Verification Handler
  const handleVerifyOTP = async () => {
    if (!otp) {
      toast.error('Please enter OTP');
      return;
    }

    try {
      const response = await axios.post('/pharmacy/verify-otp', { email, otp });
      if (response.data.success) {
        await handlePlaceOrder();
        setShowOTPModal(false);
      }
    } catch (error) {
      console.error('OTP Verification Error', error);
      toast.error('Invalid or expired OTP');
    }
  };

  // Place Order Handler
  const handlePlaceOrder = async () => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      toast.error('Please log in to place an order');
      return;
    }

    setIsOrdering(true);

    try {
      const orderItems = cart.map(cartItem => {
        const medicine = medicines.find(m => m.id === cartItem.id);
        return {
          ...medicine,
          quantity: cartItem.quantity
        };
      });

      const response = await axios.post('/pharmacy/order', {
        userId,
        items: orderItems,
        totalAmount
      });

      toast.success('Order placed successfully!');

      // Reset cart
      setCart([]);
      setEmail("");
      setOtp("");

    } catch (error) {
      console.error('Order placement error', error);
      toast.error('Failed to place order. Please try again.');
    } finally {
      setIsOrdering(false);
    }
  };

  return (
    <div className="grid lg:grid-cols-3 gap-8 relative">
      {/* Medicines List */}
      <div className="lg:col-span-2 space-y-6">
        {/* Search Input */}
        <Input
          label=""
          type="text"
          placeholder="Search medicines..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          icon={Search}
        />

        {/* Medicines Grid */}
        <div className="space-y-4">
          {medicines
            .filter(medicine =>
              medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              medicine.brand.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map(medicine => (
              <motion.div
                key={medicine.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 rounded-2xl bg-white/80 border border-gray-200 hover:border-violet-200 
                  transition-all duration-300"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">{medicine.name}</h3>
                        <p className="text-violet-600">{medicine.brand}</p>
                      </div>
                      {medicine.prescription && (
                        <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm">
                          Prescription Required
                        </span>
                      )}
                    </div>
                    
                    <div className="mt-4 grid grid-cols-2 gap-4 text-gray-600">
                      <div className="flex items-center gap-2">
                        <Package className="w-4 h-4" />
                        <span>{medicine.quantity}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Truck className="w-4 h-4" />
                        <span>Delivery in {medicine.delivery}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-2xl font-bold text-violet-600">₹{medicine.price}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <Button
                        variant="outline"
                        onClick={() => removeFromCart(medicine.id)}
                        className="px-3 py-2"
                        disabled={!cart.find(item => item.id === medicine.id)}
                      >
                        -
                      </Button>
                      <span className="w-8 text-center">
                        {cart.find(item => item.id === medicine.id)?.quantity || 0}
                      </span>
                      <Button
                        onClick={() => addToCart(medicine.id)}
                        className="px-3 py-2"
                      >
                        +
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
        </div>
      </div>

      {/* Cart Sidebar */}
      {cart.length > 0 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Your Cart</h3>
            <div className="space-y-3">
              {cart.map(item => {
                const medicine = medicines.find(m => m.id === item.id);
                return (
                  <div key={item.id} className="flex justify-between items-center">
                    <span className="text-gray-600">
                      {medicine?.name} x {item.quantity}
                    </span>
                    <span className="font-medium">₹{(medicine?.price || 0) * item.quantity}</span>
                  </div>
                );
              })}
              <div className="pt-3 border-t border-gray-200">
                <div className="flex justify-between items-center font-bold">
                  <span>Total Amount</span>
                  <span className="text-violet-600">₹{totalAmount}</span>
                </div>
              </div>
            </div>

            {/* Email Input and Proceed Button */}
            <div className="mt-4">
              <Input
                label="Email for Confirmation"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button 
                className="w-full mt-4" 
                onClick={handleGenerateOTP}
                disabled={!email}
              >
                Proceed to Checkout
              </Button>
            </div>
          </div>
        </motion.div>
      )}

      {/* OTP Verification Modal */}
      {showOTPModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg w-96 relative">
            <button 
              onClick={() => setShowOTPModal(false)} 
              className="absolute top-4 right-4"
            >
              <X className="w-6 h-6 text-gray-500" />
            </button>
            <h2 className="text-2xl font-bold mb-4">Verify OTP</h2>
            <Input
              label="Enter OTP"
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="6-digit OTP"
            />
            <Button 
              className="w-full mt-4" 
              onClick={handleVerifyOTP}
              isLoading={isOrdering}
            >
              Verify OTP
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pharmacy;