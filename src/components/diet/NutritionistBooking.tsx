import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, CreditCard, User } from 'lucide-react';
import Button from '../shared/Button';
import DatePicker from '../shared/DatePicker';

const nutritionists = [
  {
    id: 1,
    name: "Dr. Priya Sharma",
    specialization: "Clinical Nutritionist",
    experience: "12 years",
    price: 1500,
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300"
  },
  {
    id: 2,
    name: "Dr. Rahul Mehta",
    specialization: "Sports Nutritionist",
    experience: "10 years",
    price: 1800,
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=300"
  },
  {
    id: 3,
    name: "Dr. Anjali Desai",
    specialization: "Pediatric Nutritionist",
    experience: "15 years",
    price: 2000,
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=300"
  }
];

const NutritionistBooking = () => {
  const [selectedNutritionist, setSelectedNutritionist] = React.useState<number | null>(null);
  const [selectedDate, setSelectedDate] = React.useState<Date>();
  const [selectedTime, setSelectedTime] = React.useState<string>();
  const [showPayment, setShowPayment] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const availableTimes = [
    "09:00", "10:00", "11:00", "14:00", "15:00", "16:00"
  ];

  const handleBooking = async () => {
    setIsLoading(true);
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    setShowPayment(false);
    alert("Booking confirmed! You will receive a confirmation email shortly.");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Nutritionist Selection */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Book a Nutritionist</h2>
        
        <div className="space-y-4">
          {nutritionists.map((nutritionist) => (
            <motion.div
              key={nutritionist.id}
              whileHover={{ scale: 1.02 }}
              className={`p-4 rounded-xl cursor-pointer transition-all duration-300
                ${selectedNutritionist === nutritionist.id
                  ? 'bg-green-50 border-2 border-green-500'
                  : 'bg-gray-50 border border-gray-200 hover:border-green-200'
                }`}
              onClick={() => setSelectedNutritionist(nutritionist.id)}
            >
              <div className="flex items-center gap-4">
                <img
                  src={nutritionist.image}
                  alt={nutritionist.name}
                  className="w-16 h-16 rounded-xl object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{nutritionist.name}</h3>
                  <p className="text-green-600">{nutritionist.specialization}</p>
                  <p className="text-sm text-gray-500">{nutritionist.experience} experience</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900">₹{nutritionist.price}</p>
                  <p className="text-sm text-gray-500">per session</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Date and Time Selection */}
      {selectedNutritionist && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="bg-white rounded-2xl p-6 shadow-lg"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Date & Time</h3>
          
          <DatePicker
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="mb-4"
            minDate={new Date()}
          />

          {selectedDate && (
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">Available Slots</h4>
              <div className="grid grid-cols-3 gap-2">
                {availableTimes.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`p-2 rounded-lg text-sm transition-all duration-300
                      ${selectedTime === time
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-green-50'
                      }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      )}

      {/* Payment Section */}
      {selectedNutritionist && selectedDate && selectedTime && !showPayment && (
        <Button
          className="w-full"
          onClick={() => setShowPayment(true)}
        >
          Proceed to Payment
        </Button>
      )}

      {/* Payment Form */}
      {showPayment && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-6 shadow-lg"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Payment Details</h3>
          
          <form onSubmit={(e) => { e.preventDefault(); handleBooking(); }} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Card Number
              </label>
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                className="w-full px-4 py-3 rounded-xl border border-gray-300"
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expiry Date
                </label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CVV
                </label>
                <input
                  type="text"
                  placeholder="123"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full"
              isLoading={isLoading}
            >
              Pay ₹{nutritionists.find(n => n.id === selectedNutritionist)?.price}
            </Button>
          </form>
        </motion.div>
      )}
    </motion.div>
  );
};

export default NutritionistBooking;