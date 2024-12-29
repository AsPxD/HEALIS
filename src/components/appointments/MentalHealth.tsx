import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Search, Star, Clock, MapPin, X } from 'lucide-react';
import Input from '../shared/Input';
import Button from '../shared/Button';
import DatePicker from '../shared/DatePicker';
import { toast } from 'react-toastify';
import axios from 'axios';

// Updated Doctor interface to match the backend model
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
  availability?: {
    days: string[];
    startTime: string;
    endTime: string;
  };
}

const MentalHealth: React.FC = () => {
  // State Management
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedDoctor, setSelectedDoctor] = useState<string>();
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>();
  const [isBooking, setIsBooking] = useState(false);
  const [showOTPModal, setShowOTPModal] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");

  // List of mental health specialties to include
  const mentalHealthSpecialties = [
    'psychiatrist',
    'psychologist',
    'mental health',
    'counselor',
    'therapist',
    'psychiatric',
    'psychological',
    'mental wellness',
    'behavioral health',
    'counseling'
  ];

  // Fetch doctors from the API
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/verified-doctors');
        const mentalHealthDoctors = response.data.filter((doctor: Doctor) => 
          doctor.specialities.some(specialty => 
            mentalHealthSpecialties.some(mentalSpecialty => 
              specialty.toLowerCase().includes(mentalSpecialty.toLowerCase())
            )
          )
        );

        const enhancedDoctors = mentalHealthDoctors.map((doctor: Doctor) => ({
          ...doctor,
          rating: 4.5, // Default rating for now
          reviews: Math.floor(Math.random() * 300), // Random reviews for demo
          availability: doctor.availability?.days.map(day => {
            return [doctor.availability.startTime, 
                   addHours(doctor.availability.startTime, 1),
                   addHours(doctor.availability.startTime, 2)];
          }).flat() || [],
          image: `http://localhost:8000/uploads/${doctor.photo}` || 'https://via.placeholder.com/300'
        }));
        setDoctors(enhancedDoctors);
      } catch (error) {
        console.error('Error fetching doctors', error);
        toast.error('Failed to load mental health professionals');
      }
    };

    fetchDoctors();
  }, []);

  // Helper function to add hours to time string
  const addHours = (time: string, hours: number): string => {
    const [h, m] = time.split(':');
    const newHour = (parseInt(h) + hours) % 24;
    return `${newHour.toString().padStart(2, '0')}:${m}`;
  };

  // Filter doctors based on search term and specialty
  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = 
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (doctor.location && doctor.location.toLowerCase().includes(searchTerm.toLowerCase())) ||
      doctor.specialities.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesSpecialty = !selectedSpecialty || 
      doctor.specialities.includes(selectedSpecialty);
    
    return matchesSearch && matchesSpecialty;
  });

  // Get unique specialties from mental health doctors
  const allSpecialties = Array.from(
    new Set(doctors.flatMap(doctor => doctor.specialities))
  ).sort();

  // Generate OTP Handler
  const handleGenerateOTP = async () => {
    if (!selectedDate || !selectedDoctor || !selectedTime) {
      toast.error('Please complete all appointment details');
      return;
    }

    if (!email) {
      toast.error('Please enter your email');
      return;
    }

    const userId = localStorage.getItem('userId');
    if (!userId) {
      toast.error('Please log in to book an appointment');
      return;
    }

    try {
      const response = await axios.post('/mental-health/generate-otp', { email, userId });
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
        setOtp('');
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
  
    const doctor = doctors.find(d => d._id === selectedDoctor);
    if (!doctor) {
      toast.error('Invalid doctor selection');
      return;
    }
  
    if (!selectedDate || !selectedTime || !email) {
      toast.error('Please complete all appointment details');
      return;
    }
  
    // Format time to HH:MM to match schema requirement
    const formattedTime = selectedTime.split(' ')[0]; // Assuming time comes as "HH:MM AM/PM"
    if (!/^([01]\d|2[0-3]):([0-5]\d)$/.test(formattedTime)) {
      toast.error('Invalid time format');
      return;
    }
  
    setIsBooking(true);
  
    try {
      const response = await axios.post('/mental-health/book', {
        userId,
        doctorId: doctor._id, // This will be converted to Number in backend
        doctorName: doctor.name,
        doctorSpecialty: doctor.specialities[0], // Take first specialty as primary
        appointmentDate: selectedDate.toISOString(),
        appointmentTime: formattedTime,
        email
      });
  
      if (response.data.success) {
        toast.success('Mental Health Appointment booked successfully!');
        
        // Reset form
        setSelectedDate(undefined);
        setSelectedDoctor(undefined);
        setSelectedTime(undefined);
        setEmail('');
        setOtp('');
        setShowOTPModal(false);
      } else {
        throw new Error(response.data.message || 'Booking failed');
      }
    } catch (error) {
      console.error('Booking error:', error);
      toast.error(
        error.response?.data?.message || 
        'Failed to book appointment. Please try again.'
      );
    } finally {
      setIsBooking(false);
    }
  };
  return (
    <div className="grid lg:grid-cols-3 gap-8 relative">
      <div className="lg:col-span-2 space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <Input
            label=""
            type="text"
            placeholder="Search mental health professionals..."
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
            <option value="">All Specialities</option>
            {allSpecialties.map(specialty => (
              <option key={specialty} value={specialty}>{specialty}</option>
            ))}
          </select>
        </div>

        <div className="space-y-4">
          {filteredDoctors.map((doctor) => (
            <motion.div
              key={doctor._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-6 rounded-2xl transition-all duration-300 cursor-pointer
                ${selectedDoctor === doctor._id
                  ? 'bg-violet-50 border-2 border-violet-500'
                  : 'bg-white/80 border border-gray-200 hover:border-violet-200'
                }`}
              onClick={() => setSelectedDoctor(doctor._id)}
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
                      <p className="text-violet-600">{doctor.specialities.join(', ')}</p>
                      <p className="text-gray-500 text-sm mt-1">{doctor.qualifications.join(', ')}</p>
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
                      <span>{doctor.experience} years</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 flex-shrink-0" />
                      <span className="truncate">{doctor.location}</span>
                    </div>
                  </div>

                  {selectedDoctor === doctor._id && doctor.availability && (
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
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedTime(time);
                            }}
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