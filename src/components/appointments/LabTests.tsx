import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Search, Clock, Star, Calendar, X } from 'lucide-react';
import Input from '../shared/Input';
import Button from '../shared/Button';
import DatePicker from '../shared/DatePicker';
import { toast } from 'react-toastify';
import axios from 'axios';

// Lab Tests Data
const labTests = [
  {
    id: 1,
    name: "Complete Blood Count (CBC)",
    description: "Measures different components of blood including red cells, white cells, and platelets",
    price: 599,
    time: "24 hours",
    rating: 4.8,
    reviews: 156,
    availableSlots: ["09:00", "10:30", "14:00", "16:30"]
  },
  {
    id: 2,
    name: "Lipid Profile",
    description: "Measures cholesterol levels and other blood fats",
    price: 799,
    time: "24 hours",
    rating: 4.9,
    reviews: 203,
    availableSlots: ["11:00", "13:30", "15:00", "17:30"]
  },
  {
    id: 3,
    name: "Thyroid Profile",
    description: "Measures thyroid hormone levels",
    price: 899,
    time: "24-48 hours",
    rating: 4.7,
    reviews: 178,
    availableSlots: ["10:00", "12:30", "15:30", "18:00"]
  }
];

const LabTests: React.FC = () => {
  // State Management
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedTests, setSelectedTests] = useState<number[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string | undefined>();
  const [isBooking, setIsBooking] = useState<boolean>(false);

  // OTP States
  const [showOTPModal, setShowOTPModal] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [otp, setOtp] = useState<string>("");

  // Test Selection Handler
  const handleTestSelection = (testId: number) => {
    setSelectedTests(prev => 
      prev.includes(testId)
        ? prev.filter(id => id !== testId)
        : [...prev, testId]
    );
  };

  // Calculate Total Amount
  const totalAmount = selectedTests.reduce((sum, testId) => {
    const test = labTests.find(t => t.id === testId);
    return sum + (test?.price || 0);
  }, 0);

  // Generate OTP Handler
  const handleGenerateOTP = async () => {
    // Validation checks
    if (!selectedDate || !selectedTime || selectedTests.length === 0) {
      toast.error('Please complete all booking details');
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
      const response = await axios.post('/lab-tests/generate-otp', { email,userId });
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
      const response = await axios.post('/lab-tests/verify-otp', { email, otp });
      if (response.data.success) {
        await handleBookLabTest();
        setShowOTPModal(false);
      }
    } catch (error) {
      console.error('OTP Verification Error', error);
      toast.error('Invalid or expired OTP');
    }
  };

  // Book Lab Test Handler
  const handleBookLabTest = async () => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      toast.error('Please log in to book lab tests');
      return;
    }

    setIsBooking(true);

    try {
      const selectedTestDetails = selectedTests.map(testId => {
        const test = labTests.find(t => t.id === testId);
        return {
          id: testId,
          name: test?.name,
          price: test?.price
        };
      });

      const response = await axios.post('/lab-tests/book', {
        userId,
        tests: selectedTestDetails,
        date: selectedDate?.toISOString(),
        time: selectedTime,
        totalAmount
      });

      toast.success('Lab tests booked successfully!');

      // Reset form
      setSelectedTests([]);
      setSelectedDate(undefined);
      setSelectedTime(undefined);
      setEmail("");
      setOtp("");

    } catch (error) {
      console.error('Booking error', error);
      toast.error('Failed to book lab tests. Please try again.');
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <div className="grid lg:grid-cols-3 gap-8 relative">
      {/* Main Content */}
      <div className="lg:col-span-2 space-y-6">
        {/* Search Input */}
        <Input
          label=""
          type="text"
          placeholder="Search for tests..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          icon={Search}
        />

        {/* Lab Tests List */}
        <div className="space-y-4">
          {labTests
            .filter(test => 
              test.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              test.description.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map(test => (
              <motion.div
                key={test.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-6 rounded-2xl transition-all duration-300
                  ${selectedTests.includes(test.id)
                    ? 'bg-violet-50 border-2 border-violet-500'
                    : 'bg-white/80 border border-gray-200 hover:border-violet-200'
                  }`}
              >
                {/* Test Details */}
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{test.name}</h3>
                    <p className="text-gray-600 mb-4">{test.description}</p>
                    
                    <div className="flex items-center gap-4 text-gray-600">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>Results in {test.time}</span>
                      </div>
                      <div className="flex items-center gap-1 text-amber-500">
                        <Star className="w-4 h-4 fill-current" />
                        <span>{test.rating}</span>
                        <span className="text-gray-500">({test.reviews} reviews)</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-2xl font-bold text-violet-600">₹{test.price}</p>
                    <Button
                      variant={selectedTests.includes(test.id) ? "primary" : "outline"}
                      className="mt-2"
                      onClick={() => handleTestSelection(test.id)}
                    >
                      {selectedTests.includes(test.id) ? 'Selected' : 'Select'}
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
        </div>
      </div>

      {/* Booking Sidebar */}
      <div className="space-y-6">
        {/* Date Picker */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200">
          <DatePicker
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="mx-auto"
          />
        </div>

        {/* Time Slots and Booking Summary */}
        {selectedTests.length > 0 && selectedDate && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Time Slot Selection */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Select Time Slot</h3>
              <div className="flex flex-wrap gap-2">
                {labTests.find(test => selectedTests.includes(test.id))?.availableSlots.map(time => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`px-4 py-2 rounded-lg transition-all duration-300
                      ${selectedTime === time
                        ? 'bg-violet-500 text-white'
                        : 'bg-violet-50 text-violet-700 hover:bg-violet-100'
                      }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            {/* Booking Summary */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Booking Summary</h3>
              <div className="space-y-3">
                {selectedTests.map(testId => {
                  const test = labTests.find(t => t.id === testId);
                  return (
                    <div key={testId} className="flex justify-between items-center">
                      <span className="text-gray-600">{test?.name}</span>
                      <span className="font-medium">₹{test?.price}</span>
                    </div>
                  );
                })}
                <div className="flex items-center gap-2 pt-3 border-t border-gray-200">
                  <Calendar className="w-5 h-5 text-gray-600" />
                  <span>{selectedDate ? format(selectedDate, 'PPP') : 'Select Date'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-gray-600" />
                  <span>{selectedTime || 'Select Time'}</span>
                </div>
                <div className="pt-3 border-t border-gray-200">
                  <div className="flex justify-between items-center font-bold">
                    <span>Total Amount</span>
                    <span className="text-violet-600">₹{totalAmount}</span>
                  </div>
                </div>
              </div>
              
              {/* Book Lab Test Button with Email Input */}
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
                  Proceed to Book
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </div>

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
              isLoading={isBooking}
            >
              Verify OTP
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LabTests;