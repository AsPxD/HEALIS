import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  format, 
  isSameDay, 
  parseISO, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval, 
  isSameMonth, 
  isToday 
} from 'date-fns';
import { Calendar, Clock, Trash2, Pill } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';

// Week Days Configuration
const weekDays = [
  { key: 'sun', label: 'S' },
  { key: 'mon', label: 'M' },
  { key: 'tue', label: 'T' },
  { key: 'wed', label: 'W' },
  { key: 'thu', label: 'T' },
  { key: 'fri', label: 'F' },
  { key: 'sat', label: 'S' }
];

// Reminder interface
interface Reminder {
  _id: string;
  title: string;
  doctor?: string;
  date: string;
  time: string;
  location?: string;
  notes?: string;
  color?: string;
  status?: string;
}

// Medication interface
interface Medication {
  _id: string;
  name: string;
  dosage: string;
  frequency: string;
  times: string[];
  startDate: string;
  endDate?: string;
  color: string;
  status?: string;
}

// Combined item type
type ReminderOrMedication = (Reminder | Medication) & { 
  type: 'reminder' | 'medication';
};

// Calendar Grid Props
interface CalendarGridProps {
  selectedDate: Date;
  items: ReminderOrMedication[];
  onDateSelect: (date: Date) => void;
}

// Calendar Grid Component
const CalendarGrid: React.FC<CalendarGridProps> = ({ 
  selectedDate, 
  items, 
  onDateSelect 
}) => {
  // Generate days for the current month's calendar view
  const monthStart = startOfMonth(selectedDate);
  const monthEnd = endOfMonth(monthStart);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);

  const calendarDays = eachDayOfInterval({
    start: calendarStart,
    end: calendarEnd
  });

  // Count items for each day
  const itemCounts = items.reduce((counts, item) => {
    const itemDate = new Date(item.type === 'reminder' 
      ? (item as Reminder).date 
      : (item as Medication).startDate
    );
    const dateKey = format(itemDate, 'yyyy-MM-dd');
    counts[dateKey] = (counts[dateKey] || 0) + 1;
    return counts;
  }, {} as Record<string, number>);

  return (
    <div className="grid grid-cols-7 gap-2">
      {calendarDays.map((day, index) => {
        const dateKey = format(day, 'yyyy-MM-dd');
        const itemCount = itemCounts[dateKey] || 0;
        const isCurrentMonth = isSameMonth(day, selectedDate);
        const isCurrent = isSameDay(day, selectedDate);
        const isDayToday = isToday(day);

        return (
          <div 
            key={index}
            onClick={() => onDateSelect(day)}
            className={`
              relative p-2 rounded-lg cursor-pointer 
              text-center font-medium transition-all
              ${!isCurrentMonth ? 'text-gray-300' : 'text-gray-800'}
              ${isCurrent ? 'bg-violet-100 text-violet-700' : ''}
              ${isDayToday && !isCurrent ? 'border border-violet-300' : ''}
              hover:bg-violet-50
            `}
          >
            <span>{format(day, 'd')}</span>
            {itemCount > 0 && (
              <span 
                className="
                  absolute top-0 right-0 
                  bg-violet-500 text-white 
                  rounded-full w-4 h-4 
                  text-xs flex items-center 
                  justify-center
                "
              >
                {itemCount}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
};

// Main Reminder Calendar Component
const ReminderCalendar: React.FC = () => {
  const [items, setItems] = useState<ReminderOrMedication[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Fetch items when component mounts
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) {
          toast.error('Please log in to view items');
          return;
        }

        // Fetch reminders
        const remindersResponse = await axios.get(`/reminders/${userId}`);
        const reminders = remindersResponse.data.reminders
          .filter((reminder: Reminder) => reminder.status !== 'Cancelled')
          .map((reminder: Reminder) => ({ ...reminder, type: 'reminder' }));

        // Fetch medications
        const medicationsResponse = await axios.get(`/medications/${userId}`);
        const medications = medicationsResponse.data.medications
          .filter((medication: Medication) => medication.status === 'Active')
          .map((medication: Medication) => ({ ...medication, type: 'medication' }));

        setItems([...reminders, ...medications]);
      } catch (error) {
        console.error('Error fetching items:', error);
        toast.error('Failed to fetch items');
      }
    };

    fetchItems();
  }, []);

  // Filter items for selected date
  const getDayItems = (date: Date) => {
    return items.filter(item => {
      const itemDate = new Date(item.type === 'reminder' 
        ? (item as Reminder).date 
        : (item as Medication).startDate
      );
      return isSameDay(itemDate, date);
    });
  };

  // Handle item cancellation/discontinuation
  const handleCancelItem = async (item: ReminderOrMedication) => {
    try {
      if (item.type === 'reminder') {
        await axios.patch(`/reminders/${item._id}/cancel`);
      } else {
        await axios.patch(`/medications/${item._id}/discontinue`);
      }
      
      // Remove the item from local state
      setItems(items.filter(i => i._id !== item._id));
      toast.success(`${item.type === 'reminder' ? 'Reminder' : 'Medication'} cancelled successfully`);
    } catch (error) {
      console.error('Error cancelling item:', error);
      toast.error('Failed to cancel item');
    }
  };

  const selectedDayItems = getDayItems(selectedDate);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-violet-100 flex items-center justify-center">
          <Calendar className="w-5 h-5 text-violet-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900">Calendar</h3>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div>
          <div className="mb-4">
            <h4 className="text-lg font-medium text-gray-900">
              {format(selectedDate, 'MMMM d, yyyy')}
            </h4>
            <p className="text-gray-600">
              {selectedDayItems.length} items scheduled
            </p>
          </div>

          <div className="space-y-4">
            {selectedDayItems.map(item => (
              <div
                key={item._id}
                className={`p-4 rounded-xl border transition-colors relative
                  ${item.status === 'Cancelled' || item.status === 'Discontinued'
                    ? 'bg-gray-50 border-gray-200 opacity-50'
                    : `bg-white border-violet-200 ${item.color || 'border-violet-200'}`
                  }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    {item.type === 'reminder' ? (
                      <>
                        <p className="font-medium text-gray-900">{(item as Reminder).title}</p>
                        {(item as Reminder).doctor && (
                          <p className="text-sm text-gray-600">
                            With Dr. {(item as Reminder).doctor}
                          </p>
                        )}
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span>{(item as Reminder).time}</span>
                          {(item as Reminder).location && (
                            <span className="ml-2">• {(item as Reminder).location}</span>
                          )}
                        </div>
                      </>
                    ) : (
                      <>
                        <p className="font-medium text-gray-900">{(item as Medication).name}</p>
                        <p className="text-sm text-gray-600">{(item as Medication).dosage}</p>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Pill className="w-4 h-4" />
                          <span>{(item as Medication).times.join(', ')}</span>
                          <span className="ml-2">• {(item as Medication).frequency}</span>
                        </div>
                      </>
                    )}
                  </div>
                  
                  {item.status !== 'Cancelled' && item.status !== 'Discontinued' && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleCancelItem(item)}
                        className="text-gray-500 hover:text-red-500 transition-colors"
                        title="Cancel Item"
                      >
                        <span className="sr-only">Cancel Item</span>
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {selectedDayItems.length === 0 && (
              <p className="text-center text-gray-600 py-4">
                No items scheduled for this day
              </p>
            )}
          </div>
        </div>

        <div className="lg:border-l lg:pl-6">
          <div className="mb-4 flex justify-between items-center">
            <h4 className="text-lg font-medium text-gray-900">
              {format(selectedDate, 'MMMM yyyy')}
            </h4>
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => setSelectedDate(prevDate => {
                  const newDate = new Date(prevDate);
                  newDate.setMonth(newDate.getMonth() - 1);
                  return newDate;
                })}
                className="text-gray-600 hover:text-violet-600"
              >
                {'<'}
              </button>
              <button 
                onClick={() => setSelectedDate(prevDate => {
                  const newDate = new Date(prevDate);
                  newDate.setMonth(newDate.getMonth() + 1);
                  return newDate;
                })}
                className="text-gray-600 hover:text-violet-600"
              >
                {'>'}
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-7 gap-2 mb-4">
            {weekDays.map(day => (
              <div key={day.key} className="text-center text-sm font-medium text-gray-600">
                {day.label}
              </div>
            ))}
          </div>
          
          <CalendarGrid 
            selectedDate={selectedDate}
            items={items}
            onDateSelect={setSelectedDate}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default ReminderCalendar;