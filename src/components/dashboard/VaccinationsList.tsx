import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, MoreVertical, Shield } from 'lucide-react';
import axios from 'axios';
import Button from '../shared/Button';
import { format } from 'date-fns';
import { toast } from 'react-toastify';

interface Vaccination {
  _id: string;
  vaccine: {
    name: string;
    manufacturer: string;
  };
  location: string;
  appointmentDate: string;
  appointmentTime: string;
  status: string;
  price: number;
}

const VaccinationsList = () => {
  const [vaccinations, setVaccinations] = useState<Vaccination[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchVaccinations = async () => {
      try {
        // Get userId from local storage
        const userId = localStorage.getItem('userId');
        
        if (!userId) {
          toast.error('Please log in to view vaccinations');
          setIsLoading(false);
          return;
        }

        // Fetch vaccinations
        const response = await axios.get(`/vaccinations/${userId}`);
        
        setVaccinations(response.data.vaccinations);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching vaccinations', error);
        toast.error('Failed to load vaccinations');
        setIsLoading(false);
      }
    };

    fetchVaccinations();
  }, []);

  // Cancel Vaccination Handler
  const handleCancelVaccination = async (vaccinationId: string) => {
    try {
      await axios.patch(`/vaccinations/${vaccinationId}/cancel`);
      
      // Remove the cancelled vaccination from the list
      setVaccinations(prev => 
        prev.filter(vaccination => vaccination._id !== vaccinationId)
      );
      
      toast.success('Vaccination booking cancelled successfully');
    } catch (error) {
      console.error('Error cancelling vaccination', error);
      toast.error('Failed to cancel vaccination booking');
    }
  };

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-6 shadow-lg"
      >
        <div className="text-center text-gray-500">Loading vaccinations...</div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-6 shadow-lg"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          {vaccinations.length > 0 ? 'Upcoming Vaccinations' : 'No Upcoming Vaccinations'}
        </h2>
        {vaccinations.length > 0 && (
          <Button variant="outline" size="sm">View All</Button>
        )}
      </div>

      <div className="space-y-4">
        {vaccinations.map((vaccination) => (
          <motion.div
            key={vaccination._id}
            whileHover={{ scale: 1.02 }}
            className="p-4 rounded-xl border border-gray-200 hover:border-violet-200 
              hover:shadow-md transition-all duration-300"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-gray-900">
                  {vaccination.vaccine.name}
                </h3>
                <p className="text-violet-600 text-sm">
                  {vaccination.vaccine.manufacturer}
                </p>
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
                <span className="text-sm">
                  {format(new Date(vaccination.appointmentDate), 'PPP')}
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="w-4 h-4" />
                <span className="text-sm">{vaccination.appointmentTime}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{vaccination.location}</span>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-sm
                  ${vaccination.status === 'Confirmed'
                    ? 'bg-green-100 text-green-600'
                    : vaccination.status === 'Cancelled'
                    ? 'bg-red-100 text-red-600'
                    : 'bg-amber-100 text-amber-600'
                  }`}>
                  {vaccination.status}
                </span>
                <div className="flex items-center gap-2 text-gray-600">
                  <Shield className="w-4 h-4" />
                  <span className="text-sm">₹{vaccination.price}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleCancelVaccination(vaccination._id)}
                >
                  Cancel
                </Button>
                <Button size="sm">View Details</Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default VaccinationsList;