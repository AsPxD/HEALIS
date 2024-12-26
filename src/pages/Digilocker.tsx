import React, { useState, useEffect } from 'react';
import { FilePlus2, FolderOpen, Search, FileText, Activity, Film, Pill } from 'lucide-react';
import { format } from 'date-fns';
import UploadModal from '../components/digilocker/UploadModal';

const DigiLocker = () => {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRecords = async () => {
    setLoading(true);
    setError(null);
    try {
      let url = '/digilocker/records';
      
      // Map UI categories to API record types
      const categoryToType = {
        'prescriptions': 'prescription',
        'lab-reports': 'lab-report',
        'imaging': 'imaging',
        'vaccination-records': 'vaccination'  // Updated this mapping
      };
      
      if (selectedCategory !== 'all') {
        url += `?recordType=${categoryToType[selectedCategory]}`;
      }
      
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch records');
      
      const data = await response.json();
      
      // For vaccination-records category, filter out prescription types
      let filteredData = data.data.records;
      if (selectedCategory === 'vaccination-records') {
        filteredData = filteredData.filter(record => record.recordType === 'vaccination');
      }
      
      setRecords(filteredData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, [selectedCategory]);

  // Filter records based on search query
  const filteredRecords = records.filter(record => 
    record.doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    record.recordType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getRecordTypeIcon = (type) => {
    switch (type) {
      case 'prescription':
        return <Pill className="text-blue-500" size={20} />;
      case 'lab-report':
        return <Activity className="text-green-500" size={20} />;
      case 'imaging':
        return <Film className="text-purple-500" size={20} />;
      case 'vaccination':
        return <FileText className="text-orange-500" size={20} />;
      default:
        return <FileText className="text-gray-500" size={20} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <header className="bg-white/80 backdrop-blur-xl border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-800">DigiLocker</h1>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg p-4 border border-white/20">
              <div className="space-y-4">
                <button
                  onClick={() => setIsUploadModalOpen(true)}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-[1.02] shadow-md hover:shadow-xl"
                >
                  <FilePlus2 size={20} />
                  Upload Record
                </button>
                
                <div className="space-y-2">
                  {[
                    { id: 'all', icon: FolderOpen, label: 'All Records' },
                    { id: 'prescriptions', icon: FileText, label: 'Prescriptions' },
                    { id: 'lab-reports', icon: Activity, label: 'Lab Reports' },
                    { id: 'imaging', icon: Film, label: 'Imaging' },
                    { id: 'vaccination-records', icon: FileText, label: 'Vaccination Records' }  // Updated this entry
                  ].map(({ id, icon: Icon, label }) => (
                    <button
                      key={id}
                      onClick={() => setSelectedCategory(id)}
                      className={`w-full flex items-center gap-2 px-4 py-3 rounded-xl transition-all duration-300 ${
                        selectedCategory === id 
                          ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-600 shadow-sm border border-blue-100' 
                          : 'text-gray-600 hover:bg-white/50'
                      }`}
                    >
                      <Icon size={18} />
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3">
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg p-6 border border-white/20">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="Search records..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  />
                  <Search className="absolute left-3 top-3.5 text-gray-400" size={20} />
                </div>
              </div>

              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                  <p className="mt-4 text-gray-600">Loading records...</p>
                </div>
              ) : error ? (
                <div className="text-center py-8">
                  <p className="text-red-500">{error}</p>
                </div>
              ) : filteredRecords.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-600">No records found</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredRecords.map((record) => (
                    <div
                      key={record._id}
                      className="flex items-center gap-4 p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-gray-200 hover:shadow-md transition-all duration-300"
                    >
                      <div className="p-3 bg-gray-50 rounded-xl">
                        {getRecordTypeIcon(record.recordType)}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-800">
                          {record.doctorName}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {format(new Date(record.dateOfRecord), 'MMM dd, yyyy')}
                        </p>
                      </div>
                      <a
                        href={record.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors duration-300"
                      >
                        View
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {isUploadModalOpen && (
        <UploadModal
          isOpen={isUploadModalOpen}
          onClose={() => setIsUploadModalOpen(false)}
          onUploadSuccess={() => fetchRecords()}
        />
      )}
    </div>
  );
};

export default DigiLocker;