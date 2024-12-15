import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, MoreVertical } from 'lucide-react';
import axios from 'axios';
import Button from '../shared/Button';
import { format } from 'date-fns';
import { toast } from 'react-toastify';

interface HealthCheckup {
  _id: string;
  package: {
    name: string;
    description: string;
  };
  location: string;
  bookingDate: string;
  tests: string[];
  totalPrice: number;
  status: string;
}

const HealthCheckupList = () => {
  const [healthCheckups, setHealthCheckups] = useState<HealthCheckup[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHealthCheckups = async () => {
      try {
        // Get userId from local storage
        const userId = localStorage.getItem('userId');
        
        if (!userId) {
          toast.error('Please log in to view health checkups');
          setIsLoading(false);
          return;
        }

        // Fetch health checkups
        const response = await axios.get(`/health-checkup/${userId}`);
        
        setHealthCheckups(response.data.healthCheckups);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching health checkups', error);
        toast.error('Failed to load health checkups');
        setIsLoading(false);
      }
    };

    fetchHealthCheckups();
  }, []);

  // Cancel Health Checkup Handler
  const handleCancelHealthCheckup = async (healthCheckupId: string) => {
    try {
      await axios.patch(`/health-checkup/${healthCheckupId}/cancel`);
      
      // Remove the cancelled health checkup from the list
      setHealthCheckups(prev => 
        prev.filter(checkup => checkup._id !== healthCheckupId)
      );
      
      toast.success('Health checkup cancelled successfully');
    } catch (error) {
      console.error('Error cancelling health checkup', error);
      toast.error('Failed to cancel health checkup');
    }
  };

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-6 shadow-lg"
      >
        <div className="text-center text-gray-500">Loading health checkups...</div>
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
          {healthCheckups.length > 0 ? 'Upcoming Health Checkups' : 'No Upcoming Health Checkups'}
        </h2>
        {healthCheckups.length > 0 && (
          <Button variant="outline" size="sm">View All</Button>
        )}
      </div>

      <div className="space-y-4">
        {healthCheckups.map((checkup) => (
          <motion.div
            key={checkup._id}
            whileHover={{ scale: 1.02 }}
            className="p-4 rounded-xl border border-gray-200 hover:border-blue-200 
              hover:shadow-md transition-all duration-300"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-gray-900">
                  {checkup.package.name}
                </h3>
                <p className="text-blue-600 text-sm">
                  {checkup.package.description}
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
                  {format(new Date(checkup.bookingDate), 'PPP')}
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{checkup.location}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="w-4 h-4" />
                <span className="text-sm">₹{checkup.totalPrice}</span>
              </div>
            </div>

            <div className="mt-2 text-sm text-gray-600">
              <strong>Tests:</strong> {checkup.tests.join(', ')}
            </div>

            <div className="mt-4 flex items-center justify-between">
              <span className={`px-3 py-1 rounded-full text-sm
                ${checkup.status === 'Confirmed'
                  ? 'bg-green-100 text-green-600'
                  : checkup.status === 'Cancelled'
                  ? 'bg-red-100 text-red-600'
                  : 'bg-amber-100 text-amber-600'
                }`}>
                {checkup.status}
              </span>
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleCancelHealthCheckup(checkup._id)}
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

export default HealthCheckupList;