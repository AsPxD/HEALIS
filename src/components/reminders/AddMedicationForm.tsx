import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, X, Clock } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Input from '../shared/Input';
import Button from '../shared/Button';
import DatePicker from '../shared/DatePicker';
import { useReminders } from './ReminderContext';

const colors = [
  'bg-rose-500',
  'bg-blue-500',
  'bg-green-500',
  'bg-purple-500',
  'bg-amber-500',
  'bg-cyan-500'
];

const AddMedicationForm = ({ onClose }: { onClose: () => void }) => {
  const { addMedication } = useReminders();
  const [name, setName] = useState('');
  const [dosage, setDosage] = useState('');
  const [frequency, setFrequency] = useState('daily');
  const [times, setTimes] = useState<string[]>(['08:00']);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [instructions, setInstructions] = useState('');
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Get userId from local storage or context
    const userId = localStorage.getItem('userId');
  
    if (!userId) {
      toast.error('Please log in to add a medication');
      return;
    }
  
    // Prepare medication data object
    const medicationData = {
      userId,
      name,
      dosage,
      frequency,
      times,
      startDate,
      endDate,
      instructions: instructions || '',
      color: selectedColor,
    };
  
    setIsSubmitting(true);
    try {
      const response = await axios.post('/medications/add', medicationData);
      
      // Call local context method to update UI
      addMedication({
        name,
        dosage,
        frequency,
        times,
        startDate,
        endDate,
        instructions,
        color: selectedColor
      });
      
      toast.success('Medication added successfully');
      resetForm();
      onClose();
    } catch (error) {
      console.error('Error adding medication:', error);
      toast.error('Failed to add medication. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setName('');
    setDosage('');
    setFrequency('daily');
    setTimes(['08:00']);
    setStartDate(new Date());
    setEndDate(undefined);
    setInstructions('');
    setSelectedColor(colors[0]);
  };

  const addTime = () => {
    setTimes(prev => [...prev, '12:00']);
  };

  const removeTime = (index: number) => {
    setTimes(prev => prev.filter((_, i) => i !== index));
  };

  const updateTime = (index: number, value: string) => {
    setTimes(prev => prev.map((time, i) => i === index ? value : time));
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <Input
        label="Medication Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <Input
        label="Dosage"
        value={dosage}
        onChange={(e) => setDosage(e.target.value)}
        placeholder="e.g., 500mg"
        required
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Frequency
        </label>
        <select
          value={frequency}
          onChange={(e) => setFrequency(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 
            focus:ring-blue-500 focus:border-transparent transition-all duration-300"
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Reminder Times
        </label>
        <div className="space-y-3">
          {times.map((time, index) => (
            <div key={index} className="flex gap-2">
              <Input
                type="time"
                value={time}
                onChange={(e) => updateTime(index, e.target.value)}
                icon={Clock}
                required
              />
              {times.length > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => removeTime(index)}
                  icon={X}
                />
              )}
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={addTime}
            icon={Plus}
            className="w-full"
          >
            Add Time
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Start Date
          </label>
          <DatePicker
            selected={startDate}
            onSelect={setStartDate}
            className="w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            End Date (Optional)
          </label>
          <DatePicker
            selected={endDate}
            onSelect={setEndDate}
            className="w-full"
            minDate={startDate}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Instructions (Optional)
        </label>
        <textarea
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 
            focus:ring-blue-500 focus:border-transparent transition-all duration-300"
          rows={3}
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
          {isSubmitting ? 'Adding...' : 'Add Medication'}
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


export default AddMedicationForm;