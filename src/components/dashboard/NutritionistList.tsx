import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MoreVertical } from 'lucide-react';
import axios from 'axios';
import Button from '../shared/Button';
import { format } from 'date-fns';
import { toast } from 'react-toastify';

interface NutritionistBooking {
  _id: string;
  nutritionist: {
    name: string;
    specialization: string;
  };
  bookingDate: string;
  bookingTime: string;
  status: string;
  totalPrice: number;
}

const NutritionistList = () => {
  const [nutritionistBookings, setNutritionistBookings] = useState<NutritionistBooking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNutritionistBookings = async () => {
      try {
        // Get userId from local storage
        const userId = localStorage.getItem('userId');
        
        if (!userId) {
          toast.error('Please log in to view nutritionist bookings');
          setIsLoading(false);
          return;
        }

        // Fetch nutritionist bookings
        const response = await axios.get(`/nutritionist/bookings/${userId}`);
        
        setNutritionistBookings(response.data.nutritionistBookings);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching nutritionist bookings', error);
        toast.error('Failed to load nutritionist bookings');
        setIsLoading(false);
      }
    };

    fetchNutritionistBookings();
  }, []);

  // Cancel Nutritionist Booking Handler
  const handleCancelBooking = async (bookingId: string) => {
    try {
      await axios.patch(`/nutritionist/bookings/${bookingId}/cancel`);
      
      // Remove the cancelled booking from the list
      setNutritionistBookings(prev => 
        prev.filter(booking => booking._id !== bookingId)
      );
      
      toast.success('Nutritionist booking cancelled successfully');
    } catch (error) {
      console.error('Error cancelling nutritionist booking', error);
      toast.error('Failed to cancel nutritionist booking');
    }
  };

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-6 shadow-lg"
      >
        <div className="text-center text-gray-500">Loading nutritionist bookings...</div>
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
          {nutritionistBookings.length > 0 ? 'Nutritionist Bookings' : 'No Nutritionist Bookings'}
        </h2>
        {nutritionistBookings.length > 0 && (
          <Button variant="outline" size="sm">View All</Button>
        )}
      </div>

      <div className="space-y-4">
        {nutritionistBookings.map((booking) => (
          <motion.div
            key={booking._id}
            whileHover={{ scale: 1.02 }}
            className="p-4 rounded-xl border border-gray-200 hover:border-green-200 
              hover:shadow-md transition-all duration-300"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-gray-900">
                  {booking.nutritionist.name}
                </h3>
                <p className="text-green-600 text-sm">
                  {booking.nutritionist.specialization}
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
                  {format(new Date(booking.bookingDate), 'PPP')}
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="w-4 h-4" />
                <span className="text-sm">{booking.bookingTime}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <span className="text-sm font-semibold">
                  ${booking.totalPrice.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <span className={`px-3 py-1 rounded-full text-sm
                ${booking.status === 'Confirmed'
                  ? 'bg-green-100 text-green-600'
                  : booking.status === 'Cancelled'
                  ? 'bg-red-100 text-red-600'
                  : 'bg-amber-100 text-amber-600'
                }`}>
                {booking.status}
              </span>
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleCancelBooking(booking._id)}
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

export default NutritionistList;