import React from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Search, Star, Clock, MapPin } from 'lucide-react';
import Input from '../shared/Input';
import Button from '../shared/Button';
import DatePicker from '../shared/DatePicker';

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

const MentalHealth = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedTherapist, setSelectedTherapist] = React.useState<number | null>(null);
  const [selectedDate, setSelectedDate] = React.useState<Date>();
  const [selectedTime, setSelectedTime] = React.useState<string>();

  const filteredTherapists = therapists.filter(therapist =>
    therapist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    therapist.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
    therapist.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <Input
          label=""
          type="text"
          placeholder="Search therapists, specialties..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          icon={Search}
        />

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

      <div className="space-y-6">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200">
          <DatePicker
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="mx-auto"
          />
        </div>

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

export default MentalHealth;