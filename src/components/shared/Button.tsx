import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  icon?: LucideIcon;
  isLoading?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const Button = ({ 
  children, 
  variant = 'primary', 
  icon: Icon,
  isLoading,
  size = 'md',
  className = '',
  disabled,
  ...props 
}: ButtonProps) => {
  const baseStyles = "rounded-xl font-medium flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const sizeStyles = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3",
    lg: "px-8 py-4 text-lg"
  };
  
  const variants = {
    primary: "bg-gradient-to-r from-rose-500 to-pink-500 text-white hover:shadow-lg hover:shadow-rose-500/25 disabled:hover:shadow-none",
    secondary: "bg-gray-900 text-white hover:bg-gray-800 hover:shadow-lg disabled:hover:shadow-none",
    outline: "border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white disabled:hover:bg-transparent disabled:hover:text-gray-900"
  };

  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.02 } : undefined}
      whileTap={!disabled ? { scale: 0.98 } : undefined}
      className={`${baseStyles} ${sizeStyles[size]} ${variants[variant]} ${className}`}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading ? (
        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
      ) : (
        <>
          {Icon && <Icon className="w-5 h-5" />}
          {children}
        </>
      )}
    </motion.button>
  );
};

export default Button;