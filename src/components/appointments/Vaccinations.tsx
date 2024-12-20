import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Search, Calendar, MapPin, Shield, Clock, X } from 'lucide-react';
import Input from '../shared/Input';
import Button from '../shared/Button';
import DatePicker from '../shared/DatePicker';
import { toast } from 'react-toastify';
import axios from 'axios';

// Vaccines Data
const vaccines = [
  {
    id: 1,
    name: "COVID-19 Vaccination",
    description: "Protection against coronavirus with approved vaccines",
    price: 1500,
    duration: "15-20 minutes",
    nextDose: "After 84 days",
    locations: ["Andheri", "Bandra", "Colaba"],
    manufacturer: "Serum Institute",
    availability: {
      "Andheri": ["09:00", "11:00", "14:00", "16:00"],
      "Bandra": ["10:00", "12:00", "15:00", "17:00"],
      "Colaba": ["09:30", "11:30", "14:30", "16:30"]
    }
  },
  {
    id: 2,
    name: "Flu Shot",
    description: "Annual influenza vaccination for seasonal protection",
    price: 800,
    duration: "10-15 minutes",
    nextDose: "Yearly",
    locations: ["Powai", "Worli", "Juhu"],
    manufacturer: "GSK",
    availability: {
      "Powai": ["10:00", "12:00", "14:00", "16:00"],
      "Worli": ["09:30", "11:30", "15:00", "17:00"],
      "Juhu": ["10:30", "12:30", "15:30", "16:30"]
    }
  },
  {
    id: 3,
    name: "Hepatitis B",
    description: "Protection against Hepatitis B virus",
    price: 1200,
    duration: "15 minutes",
    nextDose: "After 30 days",
    locations: ["Dadar", "Kurla", "Thane"],
    manufacturer: "Bharat Biotech",
    availability: {
      "Dadar": ["09:00", "11:00", "14:00", "16:00"],
      "Kurla": ["10:00", "12:00", "15:00", "17:00"],
      "Thane": ["09:30", "11:30", "14:30", "16:30"]
    }
  }
];

const Vaccinations: React.FC = () => {
  // State Management
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedVaccine, setSelectedVaccine] = useState<number | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string | undefined>();
  const [isBooking, setIsBooking] = useState<boolean>(false);

  // OTP States
  const [showOTPModal, setShowOTPModal] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [otp, setOtp] = useState<string>("");

  // Generate OTP Handler
  const handleGenerateOTP = async () => {
    // Validation checks
    if (!selectedDate || !selectedVaccine || !selectedLocation || !selectedTime) {
      toast.error('Please complete all vaccination details');
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
      const response = await axios.post('/vaccinations/generate-otp', { email,userId });
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
      const response = await axios.post('/vaccinations/verify-otp', { email, otp });
      if (response.data.success) {
        await handleBookVaccination();
        setShowOTPModal(false);
      }
    } catch (error) {
      console.error('OTP Verification Error', error);
      toast.error('Invalid or expired OTP');
    }
  };

  // Book Vaccination Handler
  const handleBookVaccination = async () => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      toast.error('Please log in to book a vaccination');
      return;
    }

    const vaccine = vaccines.find(v => v.id === selectedVaccine);
    if (!vaccine) {
      toast.error('Invalid vaccine selection');
      return;
    }

    setIsBooking(true);

    try {
      const response = await axios.post('/vaccinations/book', {
        userId,
        vaccineId: vaccine.id,
        vaccineName: vaccine.name,
        manufacturer: vaccine.manufacturer,
        location: selectedLocation,
        appointmentDate: selectedDate?.toISOString(),
        appointmentTime: selectedTime,
        price: vaccine.price
      });

      toast.success('Vaccination booked successfully!');

      // Reset form
      setSelectedDate(undefined);
      setSelectedVaccine(null);
      setSelectedLocation("");
      setSelectedTime(undefined);
      setEmail("");
      setOtp("");

    } catch (error) {
      console.error('Booking error', error);
      toast.error('Failed to book vaccination. Please try again.');
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <div className="grid lg:grid-cols-3 gap-8 relative">
      {/* Vaccines List */}
      <div className="lg:col-span-2 space-y-6">
        {/* Search Input */}
        <Input
          label=""
          type="text"
          placeholder="Search vaccines..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          icon={Search}
        />

        {/* Vaccines Grid */}
        <div className="space-y-4">
          {vaccines
            .filter(vaccine => 
              vaccine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              vaccine.description.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map(vaccine => (
              <motion.div
                key={vaccine.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-6 rounded-2xl transition-all duration-300
                  ${selectedVaccine === vaccine.id
                    ? 'bg-violet-50 border-2 border-violet-500'
                    : 'bg-white/80 border border-gray-200 hover:border-violet-200'
                  }`}
                onClick={() => setSelectedVaccine(vaccine.id)}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{vaccine.name}</h3>
                    <p className="text-gray-600 mb-4">{vaccine.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 text-gray-600">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>Duration: {vaccine.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>Next Dose: {vaccine.nextDose}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4" />
                        <span>By: {vaccine.manufacturer}</span>
                      </div>
                    </div>

                    {/* Location Selection */}
                    {selectedVaccine === vaccine.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-4 pt-4 border-t border-gray-200"
                      >
                        <p className="font-medium text-gray-900 mb-2">Select Location</p>
                        <div className="flex flex-wrap gap-2">
                          {vaccine.locations.map(location => (
                            <button
                              key={location}
                              onClick={() => setSelectedLocation(location)}
                              className={`px-4 py-2 rounded-lg transition-all duration-300
                                ${selectedLocation === location
                                  ? 'bg-violet-500 text-white'
                                  : 'bg-violet-50 text-violet-700 hover:bg-violet-100'
                                }`}
                            >
                              {location}
                            </button>
                          ))}
                        </div>

                        {/* Time Slots */}
                        {selectedLocation && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="mt-4 pt-4 border-t border-gray-200"
                          >
                            <p className="font-medium text-gray-900 mb-2">Available Slots</p>
                            <div className="flex flex-wrap gap-2">
                              {vaccine.availability[selectedLocation].map(time => (
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
                          </motion.div>
                        )}
                      </motion.div>
                    )}
                  </div>
                  
                  <div className="text-right">
                    <p className="text-2xl font-bold text-violet-600">₹{vaccine.price}</p>
                  </div>
                </div>
              </motion.div>
            ))}
        </div>
      </div>

      {/* Booking Sidebar */}
      {selectedVaccine && selectedLocation && (
        <div className="space-y-6">
          {/* Date Picker */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200">
            <DatePicker
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="mx-auto"
            />
          </div>

          {/* Booking Summary */}
          {selectedVaccine && selectedLocation && selectedDate && selectedTime && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Vaccination Details</h3>
              
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
                  Confirm Vaccination
                </Button>
              </div>
            </motion.div>
          )}
        </div>
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

export default Vaccinations;