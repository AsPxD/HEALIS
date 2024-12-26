import React from 'react';
import { User, Settings, LogOut, Heart, FileText, Bell } from 'lucide-react';

const menuItems = [
  {
    icon: User,
    label: 'My Profile',
    description: 'View and edit your information'
  },
  {
    icon: FileText,
    label: 'My Records',
    description: 'Access your medical history'
  },
  {
    icon: Heart,
    label: 'Health Overview',
    description: 'Track your health metrics'
  },
  {
    icon: Settings,
    label: 'Settings',
    description: 'Manage your preferences'
  }
];

interface ProfileDropdownProps {
  onClose: () => void;
}

export function ProfileDropdown({ onClose }: ProfileDropdownProps) {
  return (
    <div 
      className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden"
      onMouseLeave={onClose}
    >
      <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
            <User size={24} className="text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">John Doe</h3>
            <p className="text-sm text-gray-600">john.doe@example.com</p>
          </div>
        </div>
      </div>
      
      <div className="p-2">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <button
              key={index}
              className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors duration-300"
            >
              <div className="p-2 rounded-lg bg-gray-100">
                <Icon size={16} className="text-gray-600" />
              </div>
              <div className="text-left">
                <div className="font-medium text-gray-900">{item.label}</div>
                <div className="text-xs text-gray-500">{item.description}</div>
              </div>
            </button>
          );
        })}
      </div>
      
      <div className="p-2 border-t border-gray-100">
        <button className="w-full flex items-center gap-3 p-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-300">
          <div className="p-2 rounded-lg bg-red-100">
            <LogOut size={16} className="text-red-600" />
          </div>
          <div className="text-left">
            <div className="font-medium">Sign Out</div>
            <div className="text-xs text-red-500">Securely logout of your account</div>
          </div>
        </button>
      </div>
    </div>
  );
}