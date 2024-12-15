import React from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Search, Clock, Star, Calendar } from 'lucide-react';
import Input from '../shared/Input';
import Button from '../shared/Button';
import DatePicker from '../shared/DatePicker';
import { toast } from 'react-toastify';
import axios from 'axios';
const labTests = [
  {
    id: 1,
    name: "Complete Blood Count (CBC)",
    description: "Measures different components of blood including red cells, white cells, and platelets",
    price: 599,
    time: "24 hours",
    rating: 4.8,
    reviews: 156,
    availableSlots: ["09:00", "10:30", "14:00", "16:30"]
  },
  {
    id: 2,
    name: "Lipid Profile",
    description: "Measures cholesterol levels and other blood fats",
    price: 799,
    time: "24 hours",
    rating: 4.9,
    reviews: 203,
    availableSlots: ["11:00", "13:30", "15:00", "17:30"]
  },
  {
    id: 3,
    name: "Thyroid Profile",
    description: "Measures thyroid hormone levels",
    price: 899,
    time: "24-48 hours",
    rating: 4.7,
    reviews: 178,
    availableSlots: ["10:00", "12:30", "15:30", "18:00"]
  }
];

const LabTests = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedTests, setSelectedTests] = React.useState<number[]>([]);
  const [selectedDate, setSelectedDate] = React.useState<Date>();
  const [selectedTime, setSelectedTime] = React.useState<string>();
  const [isBooking, setIsBooking] = React.useState(false);

  const handleTestSelection = (testId: number) => {
    setSelectedTests(prev => 
      prev.includes(testId)
        ? prev.filter(id => id !== testId)
        : [...prev, testId]
    );
  };

  const totalAmount = selectedTests.reduce((sum, testId) => {
    const test = labTests.find(t => t.id === testId);
    return sum + (test?.price || 0);
  }, 0);

  const handleBookLabTest = async () => {
    // Validation checks
    if (!selectedDate || !selectedTime || selectedTests.length === 0) {
      toast.error('Please complete all booking details');
      return;
    }

    // Get user ID from local storage
    const userId = localStorage.getItem('userId');
    if (!userId) {
      toast.error('Please log in to book lab tests');
      return;
    }

    setIsBooking(true);

    try {
      const selectedTestDetails = selectedTests.map(testId => {
        const test = labTests.find(t => t.id === testId);
        return {
          id: testId,
          name: test?.name,
          price: test?.price
        };
      });

      // Actual API call to book lab tests
      const response = await axios.post('/lab-tests/book', {
        userId,
        tests: selectedTestDetails,
        date: selectedDate.toISOString(),
        time: selectedTime,
        totalAmount
      });

      toast.success('Lab tests booked successfully!');

      // Reset form
      setSelectedTests([]);
      setSelectedDate(undefined);
      setSelectedTime(undefined);

    } catch (error) {
      console.error('Booking error', error);
      toast.error('Failed to book lab tests. Please try again.');
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
          placeholder="Search for tests..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          icon={Search}
        />

        <div className="space-y-4">
          {labTests
            .filter(test => 
              test.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              test.description.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map(test => (
              <motion.div
                key={test.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-6 rounded-2xl transition-all duration-300
                  ${selectedTests.includes(test.id)
                    ? 'bg-violet-50 border-2 border-violet-500'
                    : 'bg-white/80 border border-gray-200 hover:border-violet-200'
                  }`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{test.name}</h3>
                    <p className="text-gray-600 mb-4">{test.description}</p>
                    
                    <div className="flex items-center gap-4 text-gray-600">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>Results in {test.time}</span>
                      </div>
                      <div className="flex items-center gap-1 text-amber-500">
                        <Star className="w-4 h-4 fill-current" />
                        <span>{test.rating}</span>
                        <span className="text-gray-500">({test.reviews} reviews)</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-2xl font-bold text-violet-600">₹{test.price}</p>
                    <Button
                      variant={selectedTests.includes(test.id) ? "primary" : "outline"}
                      className="mt-2"
                      onClick={() => handleTestSelection(test.id)}
                    >
                      {selectedTests.includes(test.id) ? 'Selected' : 'Select'}
                    </Button>
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

        {selectedTests.length > 0 && selectedDate && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Select Time Slot</h3>
              <div className="flex flex-wrap gap-2">
                {/* Use the first test's available slots if multiple tests are selected */}
                {labTests.find(test => selectedTests.includes(test.id))?.availableSlots.map(time => (
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
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Booking Summary</h3>
              <div className="space-y-3">
                {selectedTests.map(testId => {
                  const test = labTests.find(t => t.id === testId);
                  return (
                    <div key={testId} className="flex justify-between items-center">
                      <span className="text-gray-600">{test?.name}</span>
                      <span className="font-medium">₹{test?.price}</span>
                    </div>
                  );
                })}
                <div className="flex items-center gap-2 pt-3 border-t border-gray-200">
                  <Calendar className="w-5 h-5 text-gray-600" />
                  <span>{selectedDate ? format(selectedDate, 'PPP') : 'Select Date'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-gray-600" />
                  <span>{selectedTime || 'Select Time'}</span>
                </div>
                <div className="pt-3 border-t border-gray-200">
                  <div className="flex justify-between items-center font-bold">
                    <span>Total Amount</span>
                    <span className="text-violet-600">₹{totalAmount}</span>
                  </div>
                </div>
              </div>
              <Button 
                className="w-full mt-6" 
                onClick={handleBookLabTest}
                isLoading={isBooking}
              >
                Book Lab Tests
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default LabTests;