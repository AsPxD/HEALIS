import React, { useState } from 'react';
import { Shield, User, Bell, Settings, LogOut, Heart, Calendar, FileText } from 'lucide-react';
import { NotificationDropdown } from './NotificationDropdown';
import { ProfileDropdown } from './ProfileDropdown';

function Header() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  return (
    <header className="bg-white/80 border-b border-white/20 sticky top-0 z-10 backdrop-blur-xl">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg">
              <Shield className="text-white" size={24} />
            </div>
            <div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                DigiMed Vault
              </span>
              <span className="text-xs text-gray-500 block">Government of India Initiative</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 text-gray-600 hover:text-blue-600 rounded-xl hover:bg-blue-50 transition-all duration-300"
              >
                <Bell size={20} />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              </button>
              {showNotifications && <NotificationDropdown onClose={() => setShowNotifications(false)} />}
            </div>

            <div className="relative">
              <button 
                onClick={() => setShowProfile(!showProfile)}
                className="flex items-center gap-2 text-gray-700 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-blue-50 hover:to-indigo-50 px-4 py-2 rounded-xl transition-all duration-300 shadow-sm"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                  <User size={20} className="text-white" />
                </div>
                <span className="font-medium">John Doe</span>
              </button>
              {showProfile && <ProfileDropdown onClose={() => setShowProfile(false)} />}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;