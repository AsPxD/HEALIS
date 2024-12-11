import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, ArrowUp, ArrowDown } from 'lucide-react';

const data = [
  { date: '03/01', weight: 70, bloodPressure: 120, heartRate: 72 },
  { date: '03/02', weight: 69.8, bloodPressure: 118, heartRate: 74 },
  { date: '03/03', weight: 69.5, bloodPressure: 122, heartRate: 71 },
  { date: '03/04', weight: 69.7, bloodPressure: 119, heartRate: 73 },
  { date: '03/05', weight: 69.3, bloodPressure: 121, heartRate: 70 },
  { date: '03/06', weight: 69.1, bloodPressure: 120, heartRate: 72 },
  { date: '03/07', weight: 69.0, bloodPressure: 118, heartRate: 71 },
];

const metrics = [
  {
    label: 'Weight',
    value: '69.0 kg',
    change: '-1.0',
    trend: 'down',
    color: 'text-green-500'
  },
  {
    label: 'Blood Pressure',
    value: '118/78',
    change: '-2',
    trend: 'down',
    color: 'text-green-500'
  },
  {
    label: 'Heart Rate',
    value: '71 bpm',
    change: '+1',
    trend: 'up',
    color: 'text-amber-500'
  }
];

const HealthMetrics = () => {
  const [activeMetric, setActiveMetric] = React.useState('weight');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-6 shadow-lg"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
            <Activity className="w-5 h-5 text-blue-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">Health Metrics</h2>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="p-4 rounded-xl bg-gray-50 border border-gray-200"
          >
            <p className="text-sm text-gray-500 mb-1">{metric.label}</p>
            <div className="flex items-end justify-between">
              <p className="text-xl font-semibold text-gray-900">{metric.value}</p>
              <div className={`flex items-center gap-1 ${metric.color}`}>
                {metric.trend === 'up' ? (
                  <ArrowUp className="w-4 h-4" />
                ) : (
                  <ArrowDown className="w-4 h-4" />
                )}
                <span className="text-sm">{metric.change}</span>
              </div>
            </div>
          </div>
        ))}
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
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="flex justify-center gap-4 mt-6">
        {['weight', 'bloodPressure', 'heartRate'].map((metric) => (
          <button
            key={metric}
            onClick={() => setActiveMetric(metric)}
            className={`px-4 py-2 rounded-full text-sm transition-colors
              ${activeMetric === metric
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
          >
            {metric.charAt(0).toUpperCase() + metric.slice(1)}
          </button>
        ))}
      </div>
    </motion.div>
  );
};

export default HealthMetrics;