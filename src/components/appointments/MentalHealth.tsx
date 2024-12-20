import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Search, Star, Clock, MapPin, X } from 'lucide-react';
import Input from '../shared/Input';
import Button from '../shared/Button';
import DatePicker from '../shared/DatePicker';
import { toast } from 'react-toastify';
import axios from 'axios';

// Therapists Data
const therapists = [
  {
    id: 1,
    name: "Dr. Priya Sharma",
    specialty: "Clinical Psychologist",
    experience: "12 years",
    rating: 4.9,
    reviews: 156,
    location: "Bandra West",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300",
    availability: ["10:00", "11:30", "14:00", "16:30"]
  },
  {
    id: 2,
    name: "Dr. Rahul Mehta",
    specialty: "Psychiatrist",
    experience: "15 years",
    rating: 4.8,
    reviews: 203,
    location: "Andheri West",
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=300",
    availability: ["09:30", "12:00", "15:30", "17:00"]
  },
  {
    id: 3,
    name: "Dr. Sarah Khan",
    specialty: "Counseling Psychologist",
    experience: "8 years",
    rating: 4.7,
    reviews: 128,
    location: "Powai",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=300",
    availability: ["11:00", "13:30", "16:00", "18:30"]
  }
];

const MentalHealth: React.FC = () => {
  // State Management
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedTherapist, setSelectedTherapist] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string | undefined>();
  const [isBooking, setIsBooking] = useState<boolean>(false);

  // OTP States
  const [showOTPModal, setShowOTPModal] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [otp, setOtp] = useState<string>("");

  // Filtered Therapists
  const filteredTherapists = therapists.filter(therapist =>
    therapist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    therapist.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
    therapist.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Generate OTP Handler
  const handleGenerateOTP = async () => {
    // Validation checks
    if (!selectedDate || !selectedTherapist || !selectedTime) {
      toast.error('Please complete all appointment details');
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
      const response = await axios.post('/mental-health/generate-otp', { email,userId });
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
      const response = await axios.post('/mental-health/verify-otp', { email, otp });
      if (response.data.success) {
        await handleBookAppointment();
        setShowOTPModal(false);
      }
    } catch (error) {
      console.error('OTP Verification Error', error);
      toast.error('Invalid or expired OTP');
    }
  };

  // Book Appointment Handler
  const handleBookAppointment = async () => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      toast.error('Please log in to book an appointment');
      return;
    }

    const therapist = therapists.find(t => t.id === selectedTherapist);
    if (!therapist) {
      toast.error('Invalid therapist selection');
      return;
    }

    setIsBooking(true);

    try {
      const response = await axios.post('/mental-health/book', {
        userId,
        therapistId: therapist.id,
        therapistName: therapist.name,
        therapistSpecialty: therapist.specialty,
        appointmentDate: selectedDate?.toISOString(),
        appointmentTime: selectedTime
      });

      toast.success('Mental Health Appointment booked successfully!');

      // Reset form
      setSelectedDate(undefined);
      setSelectedTherapist(null);
      setSelectedTime(undefined);
      setEmail("");
      setOtp("");

    } catch (error) {
      console.error('Booking error', error);
      toast.error('Failed to book appointment. Please try again.');
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <div className="grid lg:grid-cols-3 gap-8 relative">
      {/* Therapists List */}
      <div className="lg:col-span-2 space-y-6">
        {/* Search Input */}
        <Input
          label=""
          type="text"
          placeholder="Search therapists, specialties..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          icon={Search}
        />

        {/* Therapists Grid */}
        <div className="space-y-4">
          {filteredTherapists.map(therapist => (
            <motion.div
              key={therapist.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-6 rounded-2xl transition-all duration-300 cursor-pointer
                ${selectedTherapist === therapist.id
                  ? 'bg-violet-50 border-2 border-violet-500'
                  : 'bg-white/80 border border-gray-200 hover:border-violet-200'
                }`}
              onClick={() => setSelectedTherapist(therapist.id)}
            >
              {/* Therapist Details */}
              <div className="flex items-start gap-4">
                <img
                  src={therapist.image}
                  alt={therapist.name}
                  className="w-24 h-24 rounded-xl object-cover"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{therapist.name}</h3>
                      <p className="text-violet-600">{therapist.specialty}</p>
                    </div>
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star className="w-5 h-5 fill-current" />
                      <span className="font-medium">{therapist.rating}</span>
                      <span className="text-gray-500">({therapist.reviews})</span>
                    </div>
                  </div>
                  
                  <div className="mt-2 flex items-center gap-4 text-gray-600">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{therapist.experience}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{therapist.location}</span>
                    </div>
                  </div>

                  {/* Available Slots */}
                  {selectedTherapist === therapist.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-4 pt-4 border-t border-gray-200"
                    >
                      <p className="font-medium text-gray-900 mb-2">Available Slots</p>
                      <div className="flex flex-wrap gap-2">
                        {therapist.availability.map(time => (
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

        {/* Appointment Summary */}
        {selectedTherapist && selectedDate && selectedTime && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Appointment Summary</h3>
            <div className="space-y-3 text-gray-600">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{selectedDate ? format(selectedDate, 'PPP') : 'Select Date'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{selectedTime || 'Select Time'}</span>
              </div>
            </div>

            {/* Email Input and Book Button */}
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

export default MentalHealth;