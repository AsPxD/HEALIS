import React, { useState } from 'react';
import { X, Upload, FileText } from 'lucide-react';

function UploadModal({ isOpen, onClose }) {
  const [dragActive, setDragActive] = useState(false);
  const [formData, setFormData] = useState({
    recordType: '',
    dateOfRecord: '',
    doctorName: ''
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  if (!isOpen) return null;

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (validateFile(droppedFile)) {
      setFile(droppedFile);
      setError('');
    }
  };

  const handleFileInput = (e) => {
    const selectedFile = e.target.files[0];
    if (validateFile(selectedFile)) {
      setFile(selectedFile);
      setError('');
    }
  };

  const validateFile = (file) => {
    if (!file) return false;

    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
    if (!validTypes.includes(file.type)) {
      setError('Invalid file type. Only JPEG, PNG and PDF files are allowed.');
      return false;
    }

    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      setError('File size exceeds 5MB limit.');
      return false;
    }

    return true;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!file) {
      setError('Please select a file to upload');
      return;
    }

    if (!formData.recordType || !formData.dateOfRecord || !formData.doctorName) {
      setError('All fields are required');
      return;
    }

    setLoading(true);
    setError('');

    const formPayload = new FormData();
    formPayload.append('file', file);
    formPayload.append('recordType', formData.recordType);
    formPayload.append('dateOfRecord', formData.dateOfRecord);
    formPayload.append('doctorName', formData.doctorName);

    try {
      const response = await fetch('/digilocker/form', {
        method: 'POST',
        body: formPayload,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Upload failed');
      }

      // Reset form and close modal on success
      setFormData({
        recordType: '',
        dateOfRecord: '',
        doctorName: ''
      });
      setFile(null);
      onClose();

    } catch (err) {
      setError(err.message || 'Error uploading file');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-md flex items-center justify-center p-4 z-50">
      <div className="bg-white/90 backdrop-blur-xl rounded-2xl w-full max-w-md shadow-2xl border border-white/20">
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl">
              <FileText className="text-white" size={20} />
            </div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Upload Medical Record
            </h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-xl hover:bg-gray-50 transition-all duration-300"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="p-6">
            <div
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
                dragActive ? 'border-blue-500 bg-blue-50 scale-[0.99]' : 'border-gray-300'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => document.querySelector('input[type="file"]').click()}
            >
              <input
                type="file"
                className="hidden"
                onChange={handleFileInput}
                accept=".pdf,.jpg,.jpeg,.png"
              />
              <Upload className="mx-auto text-blue-500 mb-4" size={32} />
              {file ? (
                <p className="text-sm text-gray-600 mb-2">
                  Selected: {file.name}
                </p>
              ) : (
                <>
                  <p className="text-sm text-gray-600 mb-2">
                    Drag and drop your files here, or click to select files
                  </p>
                  <p className="text-xs text-gray-500">
                    Supports PDF, JPG, PNG (up to 5MB)
                  </p>
                </>
              )}
            </div>

            {error && (
              <p className="mt-2 text-sm text-red-600">
                {error}
              </p>
            )}

            <div className="mt-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Record Type
                </label>
                <select
                  name="recordType"
                  value={formData.recordType}
                  onChange={handleInputChange}
                  className="w-full bg-white/50 backdrop-blur-sm border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                >
                  <option value="">Select type</option>
                  <option value="prescription">Prescription</option>
                  <option value="lab-report">Lab Report</option>
                  <option value="imaging">Imaging</option>
                  <option value="vaccination">Vaccination Record</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date of Record
                </label>
                <input
                  type="date"
                  name="dateOfRecord"
                  value={formData.dateOfRecord}
                  onChange={handleInputChange}
                  className="w-full bg-white/50 backdrop-blur-sm border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Doctor/Hospital Name
                </label>
                <input
                  type="text"
                  name="doctorName"
                  value={formData.doctorName}
                  onChange={handleInputChange}
                  placeholder="Enter name"
                  className="w-full bg-white/50 backdrop-blur-sm border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 p-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-gray-600 hover:text-gray-800 transition-colors duration-300"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-[1.02] shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Uploading...' : 'Upload'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UploadModal;