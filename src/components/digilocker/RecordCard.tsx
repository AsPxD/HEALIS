import React from 'react';
import { Download, Trash2, Calendar, User } from 'lucide-react';
import { FileText, Activity, Film, Pill } from 'lucide-react';

export const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'lab-reports': return Activity;
    case 'imaging': return Film;
    case 'medications': return Pill;
    default: return FileText;
  }
};

export interface Record {
  id: number;
  title: string;
  date: string;
  category: string;
  doctor: string;
  hospital: string;
  status: 'Verified' | 'Pending';
}

interface RecordCardProps {
  record: Record;
}

export function RecordCard({ record }: RecordCardProps) {
  const Icon = getCategoryIcon(record.category);

  return (
    <div className="card-hover flex items-center justify-between p-5 bg-white/50 backdrop-blur-sm border border-white/20 rounded-xl transition-all duration-300">
      <div className="flex items-start gap-4">
        <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-md">
          <Icon className="text-white" size={24} />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
            {record.title}
          </h3>
          <div className="mt-2 text-sm text-gray-500 space-y-1">
            <p className="flex items-center gap-2">
              <User size={14} />
              {record.doctor} • {record.hospital}
            </p>
            <div className="flex items-center gap-2">
              <Calendar size={14} />
              <span>{new Date(record.date).toLocaleDateString()}</span>
              <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                record.status === 'Verified' 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-yellow-100 text-yellow-700'
              }`}>
                {record.status}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <button className="p-2 text-gray-400 hover:text-blue-600 rounded-xl hover:bg-blue-50 transition-all duration-300">
          <Download size={20} />
        </button>
        <button className="p-2 text-gray-400 hover:text-red-600 rounded-xl hover:bg-red-50 transition-all duration-300">
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
}