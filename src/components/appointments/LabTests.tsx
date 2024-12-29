import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Search, Clock, MapPin, Calendar, X, Star } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';
interface Lab {
  id: string;
  LabId: string;
  labName: string;
  experience: number;
  email: string;
  phone: string;
  location: string;
  address: string;
  photo: string;
}

interface Test {
  _id: string;
  testName: string;
  price: number;
  resultTime: number;
  description: string;
  labId: string;
}
interface TestBooking {
  testId: string;  // Changed from id to testId for clarity
  name: string;
  price: number;
}
interface TimeSlotSelectProps {
  selectedDate: Date | null;
  selectedTime: string;
  onChange: (time: string) => void;
}

const TimeSlotSelect: React.FC<TimeSlotSelectProps> = ({
  selectedDate,
  selectedTime,
  onChange
}) => {
  // Hardcoded time slots from 9 AM to 5 PM
  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00'
  ];

  const formatTimeDisplay = (time: string) => {
    const [hours, minutes] = time.split(':');
    const date = new Date();
    date.setHours(parseInt(hours));
    date.setMinutes(parseInt(minutes));
    return format(date, 'hh:mm a');
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">Select Time</label>
      <select
        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-violet-500"
        value={selectedTime}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">Choose a time slot</option>
        {timeSlots.map((slot) => (
          <option key={slot} value={slot}>
            {formatTimeDisplay(slot)}
          </option>
        ))}
      </select>
    </div>
  );
};

const LabTests: React.FC = () => {
  // State for labs and tests
  const [labs, setLabs] = useState<Lab[]>([]);
  const [selectedLab, setSelectedLab] = useState<Lab | null>(null);
  const [labTests, setLabTests] = useState<Test[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Booking states
  const [selectedTests, setSelectedTests] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [email, setEmail] = useState('');
  
  // Modal states
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Fetch all verified labs
  useEffect(() => {
    const fetchLabs = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/verified-labs');
        setLabs(response.data.data);
      } catch (error) {
        console.error('Error fetching labs:', error);
      }
    };
    fetchLabs();
  }, []);

  // Fetch tests when a lab is selected
  const handleLabSelection = async (lab: Lab) => {
    try {
      setSelectedLab(lab);
      setIsLoading(true);
      
      const response = await axios.get(`http://localhost:8000/api/lab/tests/${lab.LabId}`);
      
      if (response.data && Array.isArray(response.data)) {
        setLabTests(response.data);
      } else {
        console.error('Invalid response format:', response.data);
        setLabTests([]);
      }
    } catch (error) {
      console.error('Error fetching tests:', error);
      setLabTests([]);
      alert('Unable to fetch lab tests. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate total amount
  const calculateTotal = () => {
    return selectedTests.reduce((sum, testId) => {
      const test = labTests.find(t => t._id === testId);
      return sum + (test?.price || 0);
    }, 0);
  };

  // Handle test selection
  const handleTestSelection = (testId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setSelectedTests(prev => 
      prev.includes(testId)
        ? prev.filter(id => id !== testId)
        : [...prev, testId]
    );
  };

  // Handle booking process
  // In the existing LabTests.tsx file, replace the OTP-related methods with these updated implementations
  
  const handleGenerateOTP = async () => {
    if (!selectedDate || !selectedTime || selectedTests.length === 0 || !email) {
      toast.error('Please complete all booking details');
      return;
    }
  
    const userId = localStorage.getItem('userId');
    if (!userId) {
      toast.error('Please log in to book tests');
      return;
    }
  
    setIsLoading(true);
    try {
      const response = await axios.post('/lab-tests/generate-otp', { 
        email,
        userId 
      });
      
      if (response.data.success) {
        setShowOTPModal(true);
        toast.info('OTP sent to your email');
      }
    } catch (error) {
      console.error('OTP generation error:', error);
      toast.error('Failed to generate OTP');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleVerifyOTP = async () => {
    if (!otp) {
      toast.error('Please enter OTP');
      return;
    }
  
    setIsLoading(true);
    try {
      const response = await axios.post('/lab-tests/verify-otp', { email, otp });
      
      if (response.data.success) {
        // Proceed with booking after successful OTP verification
        await handleBookLabTest();
      }
    } catch (error) {
      console.error('OTP Verification Error', error);
      toast.error('Invalid or expired OTP');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleBookLabTest = async () => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      toast.error('Please log in to book lab tests');
      return;
    }
  
    setIsLoading(true);
  
    try {
      const selectedTestDetails = selectedTests.map(testId => {
        const test = labTests.find(t => t._id === testId);
        return {
          id: test?._id, // Use _id directly as ObjectId
          name: test?.testName,
          price: test?.price
        };
      });
  
      const totalAmount = calculateTotal();
  
      const response = await axios.post('/lab-tests/book', {
        userId,
        tests: selectedTestDetails,
        date: selectedDate?.toISOString(),
        time: selectedTime,
        totalAmount,
        email
      });
  
      if (response.data.success) {
        // Show success modal or redirect
        toast.success('Lab tests booked successfully!');
        
        // Reset all states
        setSelectedTests([]);
        setSelectedDate(null);
        setSelectedTime('');
        setEmail('');
        setOtp('');
        setShowOTPModal(false);
        
        // Optional: You might want to show a booking confirmation modal
        // or redirect to a confirmation page
      }
    } catch (error) {
      console.error('Booking error', error);
      toast.error('Failed to book lab tests. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  


  return (
    <div className="grid lg:grid-cols-3 gap-8 relative">
      {/* Labs List */}
      <div className="lg:col-span-2 space-y-6">
        <input
          type="text"
          placeholder="Search labs by name or location..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-violet-500"
        />

        <div className="space-y-6">
          {labs
            .filter(lab => 
              lab.labName.toLowerCase().includes(searchTerm.toLowerCase()) ||
              lab.location.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map(lab => (
              <motion.div
                key={lab.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`bg-white rounded-2xl p-6 shadow-sm cursor-pointer transition-all
                  ${selectedLab?.id === lab.id ? 'border-2 border-violet-500' : 'border border-gray-200'}
                `}
                onClick={() => handleLabSelection(lab)}
              >
                <div className="flex items-start gap-4">
                  <img
                    src={`http://localhost:8000/uploads/${lab.photo}`}
                    alt={lab.labName}
                    className="w-24 h-24 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold">{lab.labName}</h3>
                    <div className="flex items-center gap-2 text-gray-600 mt-2">
                      <MapPin className="w-4 h-4" />
                      <span>{lab.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>9:00 AM - 5:00 PM</span>
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span>{lab.experience}+ years experience</span>
                    </div>
                  </div>
                </div>

                {/* Tests Section */}
                {selectedLab?.id === lab.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-6"
                  >
                    <h4 className="font-semibold mb-4">Available Tests</h4>
                    {isLoading ? (
                      <div className="text-center py-4">Loading tests...</div>
                    ) : (
                      <div className="space-y-4">
                        {labTests.map(test => (
                          <div
                            key={test._id}
                            className={`p-4 rounded-lg border transition-all cursor-pointer
                              ${selectedTests.includes(test._id)
                                ? 'border-violet-500 bg-violet-50'
                                : 'border-gray-200 hover:border-violet-200'
                              }`}
                            onClick={(e) => handleTestSelection(test._id, e)}
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <h5 className="font-medium">{test.testName}</h5>
                                <p className="text-sm text-gray-600 mt-1">
                                  {test.description}
                                </p>
                                <div className="text-sm text-gray-600 mt-2">
                                  Results in {test.resultTime} hours
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-lg font-semibold text-violet-600">
                                  ₹{test.price}
                                </div>
                                <button
                                  className={`mt-2 px-4 py-1 rounded-full text-sm
                                    ${selectedTests.includes(test._id)
                                      ? 'bg-violet-500 text-white'
                                      : 'border border-violet-500 text-violet-500'
                                    }`}
                                >
                                  {selectedTests.includes(test._id) ? 'Selected' : 'Select'}
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}
              </motion.div>
            ))}
        </div>
      </div>

      {/* Booking Sidebar */}
      {selectedTests.length > 0 && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-xl font-semibold mb-4">Booking Summary</h3>
            <div className="space-y-4">
              {selectedTests.map(testId => {
                const test = labTests.find(t => t._id === testId);
                return (
                  <div key={testId} className="flex justify-between">
                    <span>{test?.testName}</span>
                    <span>₹{test?.price}</span>
                  </div>
                );
              })}
              
              <div className="pt-4 border-t">
                <div className="flex justify-between font-semibold">
                  <span>Total Amount</span>
                  <span className="text-violet-600">₹{calculateTotal()}</span>
                </div>
              </div>

              <div className="space-y-4">
                <input
                  type="date"
                  className="w-full px-4 py-2 rounded-lg border"
                  onChange={(e) => setSelectedDate(new Date(e.target.value))}
                  min={new Date().toISOString().split('T')[0]}
                />
                
                <TimeSlotSelect
                  selectedDate={selectedDate}
                  selectedTime={selectedTime}
                  onChange={setSelectedTime}
                />

                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 rounded-lg border"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <button
                  className="w-full py-2 bg-violet-500 text-white rounded-lg hover:bg-violet-600 disabled:opacity-50"
                  onClick={handleGenerateOTP}
                  disabled={!selectedDate || !selectedTime || !email || selectedTests.length === 0}
                >
                  Proceed to Book
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* OTP Modal */}
{showOTPModal && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white p-8 rounded-2xl w-96 relative shadow-xl"
    >
      <button
        onClick={() => setShowOTPModal(false)}
        className="absolute top-4 right-4 hover:bg-gray-100 rounded-full p-2 transition-colors"
      >
        <X className="w-6 h-6 text-gray-500" />
      </button>
      
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-violet-600 mb-2">Verify OTP</h2>
        <p className="text-gray-600">
          Enter the 6-digit code sent to {email}
        </p>
      </div>
      
      <input
        type="text"
        className="w-full px-4 py-3 rounded-lg border border-gray-300 
          focus:outline-none focus:border-violet-500 
          text-center tracking-widest text-xl"
        placeholder="Enter 6-digit OTP"
        maxLength={6}
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      
      <button
        className={`w-full py-3 mt-6 rounded-lg text-white transition-all
          ${isLoading 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-violet-500 hover:bg-violet-600'
          }`}
        onClick={handleVerifyOTP}
        disabled={isLoading || otp.length !== 6}
      >
        {isLoading ? 'Verifying...' : 'Verify OTP'}
      </button>
      
      <div className="text-center mt-4">
        <button 
          className="text-sm text-violet-600 hover:underline"
          onClick={handleGenerateOTP}
          disabled={isLoading}
        >
          Resend OTP
        </button>
      </div>
    </motion.div>
  </div>
)}
    </div>
  );
};

export default LabTests;