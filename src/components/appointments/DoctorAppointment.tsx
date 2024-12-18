import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { MapPin, Star, Clock, Search } from 'lucide-react';
import Input from '../shared/Input';
import Button from '../shared/Button';
import DatePicker from '../shared/DatePicker';
import { toast } from 'react-toastify';
import axios from 'axios';

const doctors = [
  {
    id: 1,
    name: "Dr. Priya Sharma",
    specialty: "Cardiologist",
    experience: "15 years",
    rating: 4.9,
    reviews: 245,
    location: "Mumbai Central",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300",
    availability: ["09:00", "10:00", "14:00", "16:00"]
  },
  {
    id: 2,
    name: "Dr. Rajesh Kumar",
    specialty: "Neurologist",
    experience: "12 years",
    rating: 4.8,
    reviews: 189,
    location: "Andheri West",
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=300",
    availability: ["11:00", "13:00", "15:00", "17:00"]
  },
  {
    id: 3,
    name: "Dr. Meera Patel",
    specialty: "Dermatologist",
    experience: "10 years",
    rating: 4.7,
    reviews: 156,
    location: "Bandra West",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=300",
    availability: ["09:30", "11:30", "14:30", "16:30"]
  }
];

const DoctorAppointment = () => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedDoctor, setSelectedDoctor] = useState<number>();
  const [selectedTime, setSelectedTime] = useState<string>();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [isBooking, setIsBooking] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = !selectedSpecialty || doctor.specialty === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  const handleBookAppointment = async () => {
    // Validation checks
    if (!selectedDate || !selectedDoctor || !selectedTime) {
      toast.error('Please complete all appointment details');
      return;
    }

    // Get user ID from local storage
    const userId = localStorage.getItem('userId');
    if (!userId) {
      toast.error('Please log in to book an appointment');
      return;
    }

    // Find selected doctor details
    const doctor = doctors.find(d => d.id === selectedDoctor);
    if (!doctor) {
      toast.error('Invalid doctor selection');
      return;
    }

    setIsBooking(true);

    try {
      const response = await axios.post('/appointments/book', {
        userId,
        doctorId: doctor.id,
        doctorName: doctor.name,
        doctorSpecialty: doctor.specialty,
        appointmentDate: selectedDate.toISOString(),
        appointmentTime: selectedTime
      });

      toast.success('Appointment booked successfully!');

      // Reset form
      setSelectedDate(undefined);
      setSelectedDoctor(undefined);
      setSelectedTime(undefined);
      setOtpSent(false);
      setOtp('');

    } catch (error) {
      console.error('Booking error', error);
      toast.error('Failed to book appointment. Please try again.');
    } finally {
      setIsBooking(false);
    }
  };

  const handleSendOTP = async () => {
    // Validation checks
    if (!selectedDate || !selectedDoctor || !selectedTime) {
      toast.error('Please complete all appointment details');
      return;
    }

    // Get user ID from local storage
    const userId = localStorage.getItem('userId');
    if (!userId) {
      toast.error('Please log in to book an appointment');
      return;
    }

    // Find selected doctor details
    const doctor = doctors.find(d => d.id === selectedDoctor);
    if (!doctor) {
      toast.error('Invalid doctor selection');
      return;
    }

    try {
      // Fetch user email
      const userResponse = await axios.get(`/auth/${userId}`);
      
      // Send OTP
      const otpResponse = await axios.post('/appointments/generate-otp', {
        email: userResponse.data.email
      });

      if (otpResponse.data.success) {
        setOtpSent(true);
        toast.success('OTP sent to your email');
      }
    } catch (error) {
      console.error('OTP Sending Error', error);
      toast.error('Failed to send OTP. Please try again.');
    }
  };

  const handleVerifyOTP = async () => {
    try {
      // Fetch user email
      const userId = localStorage.getItem('userId');
      const userResponse = await axios.get(`/auth/${userId}`);

      // Verify OTP
      const verifyResponse = await axios.post('/appointments/verify-otp', {
        email: userResponse.data.email,
        otp
      });

      if (verifyResponse.data.success) {
        // Proceed with booking
        await handleBookAppointment();
        setOtpSent(false);
      }
    } catch (error) {
      console.error('OTP Verification Error', error);
      toast.error('Invalid or expired OTP');
    }
  };

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <Input
            label=""
            type="text"
            placeholder="Search doctors, locations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={Search}
          />

          <select
            value={selectedSpecialty}
            onChange={(e) => setSelectedSpecialty(e.target.value)}
            className="px-4 py-3 rounded-xl border border-gray-300 bg-white/50 backdrop-blur-sm
              focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-300"
          >
            <option value="">All Specialties</option>
            {Array.from(new Set(doctors.map(d => d.specialty))).map(specialty => (
              <option key={specialty} value={specialty}>{specialty}</option>
            ))}
          </select>
        </div>

        <div className="space-y-4">
          {filteredDoctors.map((doctor) => (
            <motion.div
              key={doctor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-6 rounded-2xl transition-all duration-300 cursor-pointer
                ${selectedDoctor === doctor.id
                  ? 'bg-violet-50 border-2 border-violet-500'
                  : 'bg-white/80 border border-gray-200 hover:border-violet-200'
                }`}
              onClick={() => setSelectedDoctor(doctor.id)}
            >
              <div className="flex items-start gap-6">
                <div className="w-24 h-24 flex-shrink-0">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-full h-full rounded-xl object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{doctor.name}</h3>
                      <p className="text-violet-600">{doctor.specialty}</p>
                    </div>
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star className="w-5 h-5 flex-shrink-0 fill-current" />
                      <span className="font-medium">{doctor.rating}</span>
                      <span className="text-gray-500">({doctor.reviews})</span>
                    </div>
                  </div>

                  <div className="mt-2 flex items-center gap-6 text-gray-600">
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 flex-shrink-0" />
                      <span>{doctor.experience}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 flex-shrink-0" />
                      <span className="truncate">{doctor.location}</span>
                    </div>
                  </div>

                  {selectedDoctor === doctor.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-4 pt-4 border-t border-gray-200"
                    >
                      <p className="font-medium text-gray-900 mb-2">Available Slots</p>
                      <div className="flex flex-wrap gap-2">
                        {doctor.availability.map((time) => (
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

      <div className="space-y-6">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200">
          <DatePicker
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="mx-auto"
          />
        </div>

        {selectedDoctor && selectedDate && selectedTime && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Appointment Summary</h3>
            <div className="space-y-3 text-gray-600">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{format(selectedDate, 'PPP')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{selectedTime}</span>
              </div>
            </div>
            
            {!otpSent ? (
              <Button 
                className="w-full mt-6" 
                onClick={handleSendOTP}
              >
                Send OTP to Confirm Booking
              </Button>
            ) : (
              <div className="space-y-4">
                <Input 
                  label="Enter OTP" 
                  type="text" 
                  value={otp} 
                  onChange={(e) => setOtp(e.target.value)} 
                  placeholder="Enter 6-digit OTP" 
                />
                <Button 
                  className="w-full" 
                  onClick={handleVerifyOTP}
                >
                  Verify OTP and Book
                </Button>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default DoctorAppointment;