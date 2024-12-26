import React from 'react';
import { FileText, Calendar, Download, Trash2, Activity, Film, Pill, User } from 'lucide-react';
import { RecordCard } from './RecordCard';
import { FileText, Activity, Film, Pill } from 'lucide-react';

export const mockRecords = [
  {
    id: 1,
    title: 'Annual Health Checkup Report',
    date: '2024-03-15',
    category: 'lab-reports',
    doctor: 'Dr. Sharma',
    hospital: 'AIIMS Delhi',
    status: 'Verified'
  },
  {
    id: 2,
    title: 'COVID-19 Vaccination Certificate',
    date: '2024-02-20',
    category: 'prescriptions',
    doctor: 'Dr. Patel',
    hospital: 'Vaccination Center',
    status: 'Verified'
  },
  {
    id: 3,
    title: 'Chest X-Ray',
    date: '2024-01-10',
    category: 'imaging',
    doctor: 'Dr. Kumar',
    hospital: 'Apollo Hospital',
    status: 'Pending'
  },
  {
    id: 4,
    title: 'Blood Test Results',
    date: '2024-03-01',
    category: 'lab-reports',
    doctor: 'Dr. Singh',
    hospital: 'Max Healthcare',
    status: 'Verified'
  }
];

export const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'lab-reports': return Activity;
    case 'imaging': return Film;
    case 'medications': return Pill;
    default: return FileText;
  }
};

function RecordsList({ category, searchQuery }) {
  const filteredRecords = mockRecords
    .filter(record => 
      (category === 'all' || record.category === category) &&
      (record.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
       record.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
       record.hospital.toLowerCase().includes(searchQuery.toLowerCase()))
    );

  if (filteredRecords.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4">
          <FileText size={64} className="mx-auto" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No records found</h3>
        <p className="text-gray-500">Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {filteredRecords.map(record => (
        <RecordCard key={record.id} record={record} />
      ))}
    </div>
  );
}

export default RecordsList;