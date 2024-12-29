import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Download, FileText, Loader } from 'lucide-react';
import type { PatientData, AnalysisResult } from '../../types';
import { FormField } from './FormField';
import { ArrayField } from './ArrayField';
import { analyzeClinicalCase } from '../../services/groqApi';
import { generateMarkdown, downloadReport } from '../../utils/reportGenerator';

const ClinicalSafetyForm: React.FC = () => {
  const [formData, setFormData] = useState<PatientData>({
    medication: '',
    dosage: '',
    age: 0,
    weight: 0,
    gender: '',
    conditions: [''],
    allergies: [''],
    current_meds: ['']
  });

  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (value: string, index: number, field: keyof PatientData) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item: string, i: number) => (i === index ? value : item))
    }));
  };

  const handleArrayAdd = (field: keyof PatientData) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const handleArrayRemove = (field: keyof PatientData, index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_: string, i: number) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const analysis = await analyzeClinicalCase(formData);
      const markdown = generateMarkdown(formData, analysis);
      setReport(markdown);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6">Clinical Safety Analysis Form</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                label="Medication"
                name="medication"
                type="text"
                value={formData.medication}
                onChange={handleInputChange}
                required
              />
              <FormField
                label="Dosage"
                name="dosage"
                type="text"
                value={formData.dosage}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                label="Age"
                name="age"
                type="number"
                value={formData.age}
                onChange={handleInputChange}
                required
              />
              <FormField
                label="Weight (kg)"
                name="weight"
                type="number"
                value={formData.weight}
                onChange={handleInputChange}
                required
              />
              <FormField
                label="Gender"
                name="gender"
                type="select"
                value={formData.gender}
                onChange={handleInputChange}
                required
                options={[
                  { value: 'M', label: 'Male' },
                  { value: 'F', label: 'Female' },
                  { value: 'O', label: 'Other' }
                ]}
              />
            </div>

            {['conditions', 'allergies', 'current_meds'].map((field) => (
              <ArrayField
                key={field}
                label={field.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                values={formData[field as keyof PatientData] as string[]}
                onChange={(value, index) => handleArrayChange(value, index, field as keyof PatientData)}
                onAdd={() => handleArrayAdd(field as keyof PatientData)}
                onRemove={(index) => handleArrayRemove(field as keyof PatientData, index)}
              />
            ))}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {loading ? (
                <>
                  <Loader className="animate-spin -ml-1 mr-2 h-4 w-4" />
                  Analyzing...
                </>
              ) : (
                <>
                  <FileText className="-ml-1 mr-2 h-4 w-4" />
                  Generate Report
                </>
              )}
            </button>
          </form>
        </div>

        {report && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Report Preview</h2>
              <button
                onClick={() => downloadReport(report)}
                className="flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Download className="-ml-1 mr-2 h-4 w-4" />
                Download
              </button>
            </div>
            <div className="prose max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{report}</ReactMarkdown>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClinicalSafetyForm;