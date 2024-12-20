import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, MapPin, Star, Mail, KeyRound } from 'lucide-react';
import Button from '../shared/Button';
import DatePicker from '../shared/DatePicker';

interface Doctor {
  _id: string;
  name: string;
  email: string;
  experience: number;
  location: string;
  photo: string;
  specialities: string[];
  qualifications: string[];
  rating?: number;
  reviews?: number;
  price?: number;
  availability?: {
    days: string[];
    startTime: string;
    endTime: string;
  };
}

const NutritionistBooking: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>();
  const [showOTPInput, setShowOTPInput] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [otp, setOTP] = useState('');
  const [otpError, setOtpError] = useState('');
  const navigate = useNavigate();

  // List of nutrition-related specialties to include
  const nutritionSpecialties = [
    'nutritionist',
    'dietitian',
    'nutrition',
    'diet',
    'sports nutrition',
    'clinical nutrition',
    'pediatric nutrition'
  ];

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/verified-doctors');
        const nutritionDoctors = response.data.filter((doctor: Doctor) => 
          doctor.specialities.some(specialty => 
            nutritionSpecialties.some(included => 
              specialty.toLowerCase().includes(included.toLowerCase())
            )
          )
        );
        
        const enhancedDoctors = nutritionDoctors.map((doctor: Doctor) => ({
          ...doctor,
          rating: doctor.rating || 4.5,
          reviews: doctor.reviews || Math.floor(Math.random() * 300),
          price: doctor.price || Math.floor(Math.random() * 1000) + 1000,
          image: doctor.photo || 'https://via.placeholder.com/300'
        }));
        
        setDoctors(enhancedDoctors);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    fetchDoctors();
  }, []);

  const availableTimes = [
    "09:00", "10:00", "11:00", "14:00", "15:00", "16:00"
  ];

  const handleGenerateOTP = async () => {
    setIsLoading(true);
    setOtpError('');
    
    try {
      const response = await axios.post('/nutritionist/generate-otp', {
        email: userEmail
      });
      
      if (response.data.success) {
        setShowOTPInput(true);
      }
    } catch (error) {
      setOtpError('Failed to send OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    setIsLoading(true);
    setOtpError('');
    
    try {
      const response = await axios.post('/nutritionist/verify-otp', {
        email: userEmail,
        otp: otp
      });
      
      if (response.data.success) {
        setShowPayment(true);
        setShowOTPInput(false);
      }
    } catch (error: any) {
      setOtpError(error.response?.data?.message || 'Failed to verify OTP');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBooking = async () => {
    setIsLoading(true);
    try {
      const userId = localStorage.getItem('userId');
      if (!userId || !selectedDoctor || !selectedDate || !selectedTime) {
        throw new Error('Missing booking details');
      }
  
      const doctor = doctors.find(d => d._id === selectedDoctor);
      if (!doctor) {
        throw new Error('Invalid doctor selection');
      }
  
      const response = await axios.post('http://localhost:3000/nutritionist/book', {
        userId,
        nutritionistId: selectedDoctor,
        nutritionistName: doctor.name,
        nutritionistSpecialty: doctor.specialities.join(', '),
        bookingDate: selectedDate.toISOString(), // Convert to ISO string
        bookingTime: selectedTime,
        totalPrice: doctor.price || 1500 // Default price if not specified
      });
  
      // Reset states after successful booking
      setIsLoading(false);
      setShowPayment(false);
      
      // Navigate to bookings page or show success message
      navigate('/bookings');
    } catch (error) {
      console.error('Nutritionist Booking Error:', error.response?.data || error.message);
      
      // Show detailed error message to user
      alert(
        error.response?.data?.message || 
        error.message || 
        'Failed to book nutritionist appointment'
      );
      
      setIsLoading(false);
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Nutritionist Selection */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Book a Nutritionist</h2>
        
        <div className="space-y-4">
          {doctors.map((doctor) => (
            <motion.div
              key={doctor._id}
              whileHover={{ scale: 1.02 }}
              className={`p-4 rounded-xl cursor-pointer transition-all duration-300
                ${selectedDoctor === doctor._id
                  ? 'bg-green-50 border-2 border-green-500'
                  : 'bg-gray-50 border border-gray-200 hover:border-green-200'
                }`}
              onClick={() => setSelectedDoctor(doctor._id)}
            >
              <div className="flex items-center gap-4">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-16 h-16 rounded-xl object-cover"
                />
                <div className="flex-1">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900">{doctor.name}</h3>
                      <p className="text-green-600">{doctor.specialities.join(', ')}</p>
                      <p className="text-sm text-gray-500">{doctor.experience} years experience</p>
                    </div>
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star className="w-5 h-5 fill-current" />
                      <span className="font-medium">{doctor.rating}</span>
                      <span className="text-gray-500">({doctor.reviews})</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{doctor.location}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900">₹{doctor.price}</p>
                  <p className="text-sm text-gray-500">per session</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Date and Time Selection */}
      {selectedDoctor && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="bg-white rounded-2xl p-6 shadow-lg"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Date & Time</h3>
          
          <DatePicker
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="mb-4"
            minDate={new Date()}
          />

          {selectedDate && (
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">Available Slots</h4>
              <div className="grid grid-cols-3 gap-2">
                {availableTimes.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`p-2 rounded-lg text-sm transition-all duration-300
                      ${selectedTime === time
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-green-50'
                      }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      )}

      {/* Email and OTP Section */}
      {selectedDoctor && selectedDate && selectedTime && !showPayment && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="bg-white rounded-2xl p-6 shadow-lg space-y-4"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Verify Email</h3>
          
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-gray-500" />
              <input
                type="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <Button
                onClick={handleGenerateOTP}
                disabled={!userEmail || showOTPInput}
                isLoading={isLoading}
                className="whitespace-nowrap"
              >
                Send OTP
              </Button>
            </div>

            {showOTPInput && (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <KeyRound className="w-5 h-5 text-gray-500" />
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOTP(e.target.value)}
                    placeholder="Enter OTP"
                    className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    maxLength={6}
                  />
                  <Button
                    onClick={handleVerifyOTP}
                    disabled={!otp}
                    isLoading={isLoading}
                  >
                    Verify OTP
                  </Button>
                </div>
                {otpError && (
                  <p className="text-red-500 text-sm">{otpError}</p>
                )}
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* Payment Section */}
      {showPayment && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-6 shadow-lg"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Details</h3>
          <Button
            onClick={handleBooking}
            className="w-full"
            isLoading={isLoading}
          >
            Pay ₹{doctors.find(d => d._id === selectedDoctor)?.price}
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default NutritionistBooking;