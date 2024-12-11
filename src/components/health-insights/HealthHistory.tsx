import React from 'react';
import { motion } from 'framer-motion';
import { FileText, AlertCircle, Users } from 'lucide-react';

const conditions = [
  {
    name: "Type 2 Diabetes",
    diagnosed: "2020",
    status: "Controlled",
    medications: ["Metformin", "Glipizide"],
    lastCheckup: "2024-02-15"
  },
  {
    name: "Hypertension",
    diagnosed: "2019",
    status: "Managed",
    medications: ["Lisinopril"],
    lastCheckup: "2024-02-15"
  }
];

const familyHistory = [
  {
    condition: "Heart Disease",
    relation: "Father",
    age: 55
  },
  {
    condition: "Type 2 Diabetes",
    relation: "Mother",
    age: 50
  }
];

const HealthHistory = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-6 shadow-lg"
    >
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Health History</h2>

      <div className="space-y-6">
        {/* Medical Conditions */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-5 h-5 text-indigo-500" />
            <h3 className="text-lg font-medium text-gray-900">Medical Conditions</h3>
          </div>
          
          <div className="space-y-4">
            {conditions.map((condition, index) => (
              <div
                key={index}
                className="p-4 rounded-xl bg-gray-50 border border-gray-100"
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-gray-900">{condition.name}</h4>
                  <span className="px-2 py-1 rounded-full text-sm bg-green-100 text-green-600">
                    {condition.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Diagnosed</p>
                    <p className="font-medium">{condition.diagnosed}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Last Checkup</p>
                    <p className="font-medium">{condition.lastCheckup}</p>
                  </div>
                </div>
                <div className="mt-2">
                  <p className="text-gray-500 text-sm">Medications</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {condition.medications.map((med, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 rounded-full text-sm bg-blue-50 text-blue-600"
                      >
                        {med}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Family History */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-5 h-5 text-indigo-500" />
            <h3 className="text-lg font-medium text-gray-900">Family History</h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            {familyHistory.map((item, index) => (
              <div
                key={index}
                className="p-4 rounded-xl bg-gray-50 border border-gray-100"
              >
                <h4 className="font-medium text-gray-900 mb-2">{item.condition}</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Relation</p>
                    <p className="font-medium">{item.relation}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Age of Onset</p>
                    <p className="font-medium">{item.age} years</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default HealthHistory;