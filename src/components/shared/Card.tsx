import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card = ({ children, className = "" }: CardProps) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={`bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl 
        border border-white/20 hover:shadow-2xl transition-all duration-300 ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default Card;