import React from 'react';
import { Bell, Calendar, Heart, FileText } from 'lucide-react';

const notifications = [
  {
    id: 1,
    title: 'Appointment Reminder',
    message: 'Your appointment with Dr. Kumar is tomorrow at 10:00 AM',
    time: '1 hour ago',
    icon: Calendar,
    type: 'appointment'
  },
  {
    id: 2,
    title: 'New Test Results',
    message: 'Your blood test results are now available',
    time: '2 hours ago',
    icon: FileText,
    type: 'results'
  },
  {
    id: 3,
    title: 'Health Tip',
    message: 'Remember to take your evening medications',
    time: '3 hours ago',
    icon: Heart,
    type: 'reminder'
  }
];

interface NotificationDropdownProps {
  onClose: () => void;
}

export function NotificationDropdown({ onClose }: NotificationDropdownProps) {
  return (
    <div 
      className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden"
      onMouseLeave={onClose}
    >
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">Notifications</h3>
          <span className="px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded-full">
            {notifications.length} new
          </span>
        </div>
      </div>
      
      <div className="max-h-[400px] overflow-y-auto">
        {notifications.map(notification => {
          const Icon = notification.icon;
          return (
            <div 
              key={notification.id}
              className="p-4 hover:bg-gray-50 transition-colors duration-300 cursor-pointer border-b border-gray-100 last:border-0"
            >
              <div className="flex gap-3">
                <div className={`p-2 rounded-lg ${
                  notification.type === 'appointment' ? 'bg-blue-100 text-blue-600' :
                  notification.type === 'results' ? 'bg-green-100 text-green-600' :
                  'bg-purple-100 text-purple-600'
                }`}>
                  <Icon size={16} />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{notification.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                  <span className="text-xs text-gray-400 mt-2 block">{notification.time}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="p-4 border-t border-gray-100 bg-gray-50">
        <button className="w-full text-center text-sm text-blue-600 hover:text-blue-700 font-medium">
          View all notifications
        </button>
      </div>
    </div>
  );
}