import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const AnimatedCard = ({ children, className = "", delay = 0 }: AnimatedCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.5,
        delay,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ 
        y: -5,
        transition: { duration: 0.2 }
      }}
      className={`relative bg-white/80 backdrop-blur-lg rounded-2xl p-6 
        shadow-xl border border-white/20 hover:shadow-2xl 
        hover:border-blue-500/20 transition-all duration-300 ${className}
        before:absolute before:inset-0 before:rounded-2xl
        before:bg-gradient-to-r before:from-blue-500/5 before:to-purple-500/5
        before:opacity-0 before:transition-opacity hover:before:opacity-100`}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedCard;