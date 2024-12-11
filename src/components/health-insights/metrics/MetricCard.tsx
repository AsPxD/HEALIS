import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  icon: LucideIcon;
  title: string;
  value: string;
  unit?: string;
  status: 'normal' | 'warning' | 'alert';
  delay?: number;
}

const MetricCard = ({ icon: Icon, title, value, unit, status, delay = 0 }: MetricCardProps) => {
  const statusStyles = {
    normal: 'bg-green-100 text-green-600',
    warning: 'bg-amber-100 text-amber-600',
    alert: 'bg-rose-100 text-rose-600'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
    >
      <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-blue-500" />
      </div>
      
      <h3 className="text-gray-600 text-sm mb-2">{title}</h3>
      <div className="flex items-end gap-2">
        <span className="text-2xl font-bold text-gray-900">{value}</span>
        {unit && <span className="text-gray-500 mb-1">{unit}</span>}
      </div>
      
      <span className={`inline-block px-2 py-1 rounded-full text-xs ${statusStyles[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    </motion.div>
  );
};

export default MetricCard;