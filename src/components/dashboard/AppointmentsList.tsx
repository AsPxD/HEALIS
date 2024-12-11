import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, MoreVertical } from 'lucide-react';
import Button from '../shared/Button';

const appointments = [
  {
    id: 1,
    doctor: "Dr. Priya Sharma",
    specialty: "Cardiologist",
    date: "2024-03-20",
    time: "10:00 AM",
    location: "City Hospital",
    status: "confirmed"
  },
  {
    id: 2,
    doctor: "Dr. Rajesh Kumar",
    specialty: "Neurologist",
    date: "2024-03-22",
    time: "2:30 PM",
    location: "NeuroLife Clinic",
    status: "pending"
  },
  {
    id: 3,
    doctor: "Dr. Meera Patel",
    specialty: "Dermatologist",
    date: "2024-03-25",
    time: "11:15 AM",
    location: "Skin Care Center",
    status: "confirmed"
  }
];

const AppointmentsList = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-6 shadow-lg"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Upcoming Appointments</h2>
        <Button variant="outline" size="sm">View All</Button>
      </div>

      <div className="space-y-4">
        {appointments.map((appointment) => (
          <motion.div
            key={appointment.id}
            whileHover={{ scale: 1.02 }}
            className="p-4 rounded-xl border border-gray-200 hover:border-blue-200 
              hover:shadow-md transition-all duration-300"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-gray-900">{appointment.doctor}</h3>
                <p className="text-blue-600 text-sm">{appointment.specialty}</p>
              </div>
              <div className="relative">
                <button className="p-1 rounded-full hover:bg-gray-100 transition-colors">
                  <MoreVertical className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-4">
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">{appointment.date}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="w-4 h-4" />
                <span className="text-sm">{appointment.time}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{appointment.location}</span>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <span className={`px-3 py-1 rounded-full text-sm
                ${appointment.status === 'confirmed'
                  ? 'bg-green-100 text-green-600'
                  : 'bg-amber-100 text-amber-600'
                }`}>
                {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
              </span>
              <Button size="sm">View Details</Button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default AppointmentsList;