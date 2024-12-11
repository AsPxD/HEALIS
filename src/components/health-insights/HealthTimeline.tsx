import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity } from 'lucide-react';

const data = [
  { date: '2024-03-01', weight: 70, heartRate: 72, bloodPressure: 120 },
  { date: '2024-03-02', weight: 69.8, heartRate: 74, bloodPressure: 118 },
  { date: '2024-03-03', weight: 69.5, heartRate: 71, bloodPressure: 122 },
  { date: '2024-03-04', weight: 69.7, heartRate: 73, bloodPressure: 119 },
  { date: '2024-03-05', weight: 69.3, heartRate: 70, bloodPressure: 121 },
  { date: '2024-03-06', weight: 69.1, heartRate: 72, bloodPressure: 120 },
  { date: '2024-03-07', weight: 69.0, heartRate: 71, bloodPressure: 118 },
];

const HealthTimeline = () => {
  const [activeMetric, setActiveMetric] = React.useState('weight');
  
  const metrics = [
    { id: 'weight', label: 'Weight', color: '#f59e0b' },
    { id: 'heartRate', label: 'Heart Rate', color: '#ef4444' },
    { id: 'bloodPressure', label: 'Blood Pressure', color: '#3b82f6' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-6 shadow-lg"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Activity className="w-6 h-6 text-indigo-500" />
          <h2 className="text-xl font-semibold text-gray-900">Health Trends</h2>
        </div>
        
        <div className="flex gap-2">
          {metrics.map(metric => (
            <button
              key={metric.id}
              onClick={() => setActiveMetric(metric.id)}
              className={`px-3 py-1 rounded-full text-sm transition-colors
                ${activeMetric === metric.id
                  ? 'bg-indigo-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
            >
              {metric.label}
            </button>
          ))}
        </div>
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey={activeMetric}
              stroke={metrics.find(m => m.id === activeMetric)?.color}
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default HealthTimeline;