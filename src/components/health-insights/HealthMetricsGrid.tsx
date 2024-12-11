import React from 'react';
import { Heart, Activity, Weight, Ruler, Brain, LineChart } from 'lucide-react';
import { calculateBMI, calculateBMR } from '../../utils/calculations';
import MetricCard from './metrics/MetricCard';

const metrics = [
  {
    id: 'heart-rate',
    title: 'Heart Rate',
    value: '72',
    unit: 'bpm',
    status: 'normal' as const,
    icon: Heart
  },
  {
    id: 'blood-pressure',
    title: 'Blood Pressure',
    value: '120/80',
    unit: 'mmHg',
    status: 'normal' as const,
    icon: Activity
  },
  {
    id: 'weight',
    title: 'Weight',
    value: '70',
    unit: 'kg',
    status: 'normal' as const,
    icon: Weight
  },
  {
    id: 'height',
    title: 'Height',
    value: '175',
    unit: 'cm',
    status: 'normal' as const,
    icon: Ruler
  },
  {
    id: 'bmi',
    title: 'BMI',
    value: '22.9',
    status: 'normal' as const,
    icon: LineChart
  },
  {
    id: 'stress',
    title: 'Stress Level',
    value: 'Low',
    status: 'normal' as const,
    icon: Brain
  }
];

const HealthMetricsGrid = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
      {metrics.map((metric, index) => (
        <MetricCard
          key={metric.id}
          icon={metric.icon}
          title={metric.title}
          value={metric.value}
          unit={metric.unit}
          status={metric.status}
          delay={index * 0.1}
        />
      ))}
    </div>
  );
};

export default HealthMetricsGrid;