import React from 'react';
import { motion } from 'framer-motion';
import { Bell, Settings, Search } from 'lucide-react';
import Input from '../shared/Input';

const DashboardHeader = () => {
  const notifications = [
    { id: 1, text: "Upcoming appointment with Dr. Sharma", time: "2 hours ago" },
    { id: 2, text: "Medicine reminder: Vitamin D", time: "1 hour ago" },
    { id: 3, text: "New health report available", time: "30 minutes ago" }
  ];

  const [showNotifications, setShowNotifications] = React.useState(false);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, User!</h1>
          <p className="text-gray-600">Here's your health overview</p>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <Bell className="w-6 h-6 text-gray-600" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
            </motion.button>

            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 z-50"
              >
                <div className="p-4 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-900">Notifications</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map(notification => (
                    <div
                      key={notification.id}
                      className="p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <p className="text-gray-800 text-sm">{notification.text}</p>
                      <span className="text-xs text-gray-500">{notification.time}</span>
                    </div>
                  ))}
                </div>
                <div className="p-4">
                  <button className="text-blue-600 text-sm hover:text-blue-700 transition-colors">
                    View all notifications
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <Settings className="w-6 h-6 text-gray-600" />
          </motion.button>

          <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;