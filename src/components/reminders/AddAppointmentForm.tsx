import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, User } from 'lucide-react';
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

const AddAppointmentForm = ({ onClose }: { onClose: () => void }) => {
  const { addAppointment } = useReminders();
  const [title, setTitle] = React.useState('');
  const [doctor, setDoctor] = React.useState('');
  const [date, setDate] = React.useState<Date>(new Date());
  const [time, setTime] = React.useState('09:00');
  const [location, setLocation] = React.useState('');
  const [notes, setNotes] = React.useState('');
  const [selectedColor, setSelectedColor] = React.useState(colors[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addAppointment({
      title,
      doctor,
      date,
      time,
      location,
      notes,
      color: selectedColor
    });
    onClose();
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
      />

      <Input
        label="Doctor"
        value={doctor}
        onChange={(e) => setDoctor(e.target.value)}
        icon={User}
        required
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
        <Button type="submit" className="flex-1">
          Add Appointment
        </Button>
        <Button type="button" variant="outline" onClick={onClose} className="flex-1">
          Cancel
        </Button>
      </div>
    </motion.form>
  );
};

export default AddAppointmentForm;