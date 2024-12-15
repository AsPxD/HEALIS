import React from 'react';
import { motion } from 'framer-motion';
import { Search, Calendar, MapPin, Shield, Clock } from 'lucide-react';
import Input from '../shared/Input';
import Button from '../shared/Button';
import DatePicker from '../shared/DatePicker';
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import axios from 'axios';

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

const Vaccinations = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedVaccine, setSelectedVaccine] = React.useState<number | null>(null);
  const [selectedLocation, setSelectedLocation] = React.useState("");
  const [selectedDate, setSelectedDate] = React.useState<Date>();
  const [selectedTime, setSelectedTime] = React.useState<string>();
  const [isBooking, setIsBooking] = React.useState(false);

  const handleBookVaccination = async () => {
    // Validation checks
    if (!selectedDate || !selectedVaccine || !selectedLocation || !selectedTime) {
      toast.error('Please complete all vaccination details');
      return;
    }

    // Get user ID from local storage
    const userId = localStorage.getItem('userId');
    if (!userId) {
      toast.error('Please log in to book a vaccination');
      return;
    }

    // Find selected vaccine details
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
        appointmentDate: selectedDate.toISOString(),
        appointmentTime: selectedTime,
        price: vaccine.price
      });

      toast.success('Vaccination booked successfully!');

      // Reset form
      setSelectedDate(undefined);
      setSelectedVaccine(null);
      setSelectedLocation("");
      setSelectedTime(undefined);

    } catch (error) {
      console.error('Booking error', error);
      toast.error('Failed to book vaccination. Please try again.');
    } finally {
      setIsBooking(false);
    }
  };


  return (
    <div className="grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <Input
          label=""
          type="text"
          placeholder="Search vaccines..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          icon={Search}
        />

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

                        {selectedLocation && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="mt-4 pt-4 border-t border-gray-200"
                          >
                            <p className="font-medium text-gray-900 mb-2">Available Slots</p>
                            <div className="flex flex-wrap gap-2">
                              {vaccine.availability[selectedLocation].map((time) => (
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

      {selectedVaccine && selectedLocation && (
        <div className="space-y-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200">
            <DatePicker
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="mx-auto"
            />
          </div>

          {selectedVaccine && selectedLocation && selectedDate && selectedTime && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Vaccination Details</h3>
              <div className="space-y-3 text-gray-600">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  <span>{vaccines.find(v => v.id === selectedVaccine)?.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  <span>{selectedLocation}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>{format(selectedDate, 'PPP')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>{selectedTime}</span>
                </div>
              </div>
              <Button
                className="w-full mt-6"
                onClick={handleBookVaccination}
                isLoading={isBooking}
              >
                Confirm Vaccination
              </Button>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
};

export default Vaccinations;