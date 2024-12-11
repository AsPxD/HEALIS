export type MetricStatus = 'normal' | 'warning' | 'alert';

export interface Metric {
  id: string;
  title: string;
  value: string;
  unit?: string;
  status: MetricStatus;
  icon: any; // Replace with proper LucideIcon type when needed
}

export interface HealthMetrics {
  heartRate: number;
  bloodPressure: {
    systolic: number;
    diastolic: number;
  };
  weight: number;
  height: number;
  bmi: number;
  stressLevel: 'Low' | 'Medium' | 'High';
}