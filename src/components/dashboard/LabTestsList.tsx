import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MoreVertical } from 'lucide-react';
import axios from 'axios';
import Button from '../shared/Button';
import { format } from 'date-fns';
import { toast } from 'react-toastify';

interface LabTest {
  _id: string;
  tests: Array<{
    name: string;
    price: number;
  }>;
  bookingDate: string;
  bookingTime: string;
  status: string;
  totalAmount: number;
}

const LabTestsList = () => {
  const [labTests, setLabTests] = useState<LabTest[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLabTests = async () => {
      try {
        // Get userId from local storage
        const userId = localStorage.getItem('userId');
        
        if (!userId) {
          toast.error('Please log in to view lab tests');
          setIsLoading(false);
          return;
        }

        // Fetch lab tests
        const response = await axios.get(`/lab-tests/${userId}`);
        
        setLabTests(response.data.labTests);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching lab tests', error);
        toast.error('Failed to load lab tests');
        setIsLoading(false);
      }
    };

    fetchLabTests();
  }, []);

  // Cancel Lab Test Handler
  const handleCancelLabTest = async (labTestId: string) => {
    try {
      await axios.patch(`/lab-tests/${labTestId}/cancel`);
      
      // Remove the cancelled lab test from the list
      setLabTests(prev => 
        prev.filter(labTest => labTest._id !== labTestId)
      );
      
      toast.success('Lab test booking cancelled successfully');
    } catch (error) {
      console.error('Error cancelling lab test', error);
      toast.error('Failed to cancel lab test booking');
    }
  };

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-6 shadow-lg"
      >
        <div className="text-center text-gray-500">Loading lab tests...</div>
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
          {labTests.length > 0 ? 'Upcoming Lab Tests' : 'No Upcoming Lab Tests'}
        </h2>
        {labTests.length > 0 && (
          <Button variant="outline" size="sm">View All</Button>
        )}
      </div>

      <div className="space-y-4">
        {labTests.map((labTest) => (
          <motion.div
            key={labTest._id}
            whileHover={{ scale: 1.02 }}
            className="p-4 rounded-xl border border-gray-200 hover:border-blue-200 
              hover:shadow-md transition-all duration-300"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-gray-900">
                  Lab Tests
                </h3>
                <p className="text-blue-600 text-sm">
                  {labTest.tests.map(test => test.name).join(', ')}
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
                  {format(new Date(labTest.bookingDate), 'PPP')}
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="w-4 h-4" />
                <span className="text-sm">{labTest.bookingTime}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <span className="text-sm font-medium">
                  ₹{labTest.totalAmount}
                </span>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <span className={`px-3 py-1 rounded-full text-sm
                ${labTest.status === 'Scheduled'
                  ? 'bg-green-100 text-green-600'
                  : labTest.status === 'Cancelled'
                  ? 'bg-red-100 text-red-600'
                  : 'bg-amber-100 text-amber-600'
                }`}>
                {labTest.status}
              </span>
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleCancelLabTest(labTest._id)}
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

export default LabTestsList;