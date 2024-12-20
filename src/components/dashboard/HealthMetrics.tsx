import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, ArrowUp, ArrowDown } from 'lucide-react';
import axios from 'axios';

// Interface for Prescription data
interface Prescription {
  _id: string;
  date: string;
  weight?: number;
  bloodPressure?: string;
  heartRate?: string;
  patientName?: string;
}

// Interface for Metrics
interface HealthMetric {
  date: string;
  weight: number;
  bloodPressure: number;
  heartRate: number;
}

const HealthMetrics = () => {
  // State management
  const [data, setData] = useState<HealthMetric[]>([]);
  const [metrics, setMetrics] = useState([
    {
      label: 'Weight',
      value: '0 kg',
      change: '0',
      trend: 'up',
      color: 'text-gray-500'
    },
    {
      label: 'Blood Pressure',
      value: '0/0',
      change: '0',
      trend: 'up',
      color: 'text-gray-500'
    },
    {
      label: 'Heart Rate',
      value: '0 bpm',
      change: '0',
      trend: 'up',
      color: 'text-gray-500'
    }
  ]);
  const [activeMetric, setActiveMetric] = useState('weight');

  // Parse blood pressure string to get systolic value
  const parseSystolicBP = (bp: string | undefined): number => {
    if (!bp) return 0;
    const systolic = bp.split('/')[0];
    return parseInt(systolic, 10);
  };

  // Parse heart rate string to get numeric value
  const parseHeartRate = (hr: string | undefined): number => {
    if (!hr) return 0;
    return parseInt(hr.replace('bpm', ''), 10);
  };

  // Fetch health metrics data
  useEffect(() => {
    const fetchHealthMetrics = async () => {
      try {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        if (!token || !userId) {
          throw new Error('Authentication required');
        }

        const response = await axios.get(`http://localhost:8000/prescriptions/doctor/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const prescriptions: Prescription[] = response.data;

        // Transform and filter valid prescription data
        const healthMetrics: HealthMetric[] = prescriptions
          .filter(p => p.weight || p.bloodPressure || p.heartRate) // Only include prescriptions with health data
          .map(p => ({
            date: new Date(p.date).toLocaleDateString('en-US', { 
              month: 'short', 
              day: 'numeric'
            }),
            weight: p.weight || 0,
            bloodPressure: parseSystolicBP(p.bloodPressure),
            heartRate: parseHeartRate(p.heartRate)
          }))
          .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()) // Sort by date
          .slice(-7); // Take last 7 entries

        if (healthMetrics.length > 0) {
          setData(healthMetrics);

          // Calculate metrics
          const latest = healthMetrics[healthMetrics.length - 1];
          const previous = healthMetrics[healthMetrics.length - 2] || latest;

          const calculateChange = (curr: number, prev: number) => {
            return ((curr - prev) / prev * 100).toFixed(1);
          };

          setMetrics([
            {
              label: 'Weight',
              value: `${latest.weight.toFixed(1)} kg`,
              change: calculateChange(latest.weight, previous.weight),
              trend: latest.weight >= previous.weight ? 'up' : 'down',
              color: latest.weight >= previous.weight ? 'text-amber-500' : 'text-green-500'
            },
            {
              label: 'Blood Pressure',
              value: `${latest.bloodPressure}/80`,
              change: calculateChange(latest.bloodPressure, previous.bloodPressure),
              trend: latest.bloodPressure >= previous.bloodPressure ? 'up' : 'down',
              color: latest.bloodPressure >= previous.bloodPressure ? 'text-amber-500' : 'text-green-500'
            },
            {
              label: 'Heart Rate',
              value: `${latest.heartRate} bpm`,
              change: calculateChange(latest.heartRate, previous.heartRate),
              trend: latest.heartRate >= previous.heartRate ? 'up' : 'down',
              color: latest.heartRate >= previous.heartRate ? 'text-amber-500' : 'text-green-500'
            }
          ]);
        }
      } catch (error) {
        console.error('Error fetching health metrics:', error);
      }
    };

    fetchHealthMetrics();
  }, []);

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
                <span className="text-sm">{metric.change}%</span>
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
            <YAxis domain={['auto', 'auto']} />
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