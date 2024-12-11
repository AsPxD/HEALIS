import React from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { MapPin, Star, Clock, Search } from 'lucide-react';
import Input from '../shared/Input';
import Button from '../shared/Button';
import DatePicker from '../shared/DatePicker';

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
  const [selectedDate, setSelectedDate] = React.useState<Date>();
  const [selectedDoctor, setSelectedDoctor] = React.useState<number>();
  const [selectedTime, setSelectedTime] = React.useState<string>();
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedSpecialty, setSelectedSpecialty] = React.useState("");

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = !selectedSpecialty || doctor.specialty === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

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
            <Button className="w-full mt-6">
              Confirm Booking
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default DoctorAppointment;