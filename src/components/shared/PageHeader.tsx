import React from 'react';
import { motion } from 'framer-motion';

interface PageHeaderProps {
  title: string;
  subtitle: string;
  gradient?: string;
}

const PageHeader = ({ 
  title, 
  subtitle, 
  gradient = "from-rose-500 to-pink-500" 
}: PageHeaderProps) => {
  return (
    <div className="text-center mb-16 relative">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-x-0 top-0 h-64 overflow-hidden">
          <div className={`w-full h-full bg-gradient-to-br ${gradient} opacity-10 blur-3xl transform -translate-y-1/2`} />
        </div>
      </div>
      
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, type: "spring" }}
        className={`text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}
      >
        {title}
      </motion.h1>
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
        className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto"
      >
        {subtitle}
      </motion.p>
    </div>
  );
};

export default PageHeader;