import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, User } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Input from '../shared/Input';
import Button from '../shared/Button';
import DatePicker from '../shared/DatePicker';

const colors = [
  'bg-rose-500',
  'bg-blue-500',
  'bg-green-500',
  'bg-purple-500',
  'bg-amber-500',
  'bg-cyan-500'
];

const AddAppointmentForm = ({ onClose }: { onClose: () => void }) => {
  const [title, setTitle] = useState('');
  const [doctor, setDoctor] = useState('');
  const [date, setDate] = useState<Date>(new Date());
  const [time, setTime] = useState('09:00');
  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Get userId from local storage or context
    const userId = localStorage.getItem('userId'); // Or however you're storing the user ID
  
    if (!userId) {
      toast.error('Please log in to create a reminder');
      return;
    }
  
    // Prepare reminder object
    const reminderData = {
      userId, // Add this
      title,
      doctor,
      date,
      time,
      location,
      notes: notes || '',
      color: selectedColor,
    };
  
    try {
      const response = await axios.post('/reminders/add', reminderData);
      toast.success('Appointment reminder added successfully');
      resetForm();
      onClose();
    } catch (error) {
      console.error('Error adding appointment reminder:', error);
      toast.error('Failed to add appointment reminder. Please try again.');
    }
  };

  const resetForm = () => {
    setTitle('');
    setDoctor('');
    setDate(new Date());
    setTime('09:00');
    setLocation('');
    setNotes('');
    setSelectedColor(colors[0]);
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <Input
        label="Appointment Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        placeholder="Enter appointment title"
      />

      <Input
        label="Doctor"
        value={doctor}
        onChange={(e) => setDoctor(e.target.value)}
        icon={User}
        required
        placeholder="Enter doctor's name"
      />

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date
          </label>
          <DatePicker
            selected={date}
            onSelect={setDate}
            className="w-full"
            minDate={new Date()}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Time
          </label>
          <Input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            icon={Clock}
            required
          />
        </div>
      </div>

      <Input
        label="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        icon={MapPin}
        required
        placeholder="Enter appointment location"
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Notes (Optional)
        </label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 
            focus:ring-blue-500 focus:border-transparent transition-all duration-300"
          rows={3}
          placeholder="Add any additional notes"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Color
        </label>
        <div className="flex gap-2">
          {colors.map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => setSelectedColor(color)}
              className={`w-8 h-8 rounded-full ${color} transition-transform duration-200
                ${selectedColor === color ? 'scale-125 ring-2 ring-offset-2 ring-blue-500' : ''}`}
            />
          ))}
        </div>
      </div>

      <div className="flex gap-4">
        <Button 
          type="submit" 
          className="flex-1"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Adding...' : 'Add Appointment'}
        </Button>
        <Button 
          type="button" 
          variant="outline" 
          onClick={onClose} 
          className="flex-1"
          disabled={isSubmitting}
        >
          Cancel
        </Button>
      </div>
    </motion.form>
  );
};

export default AddAppointmentForm;