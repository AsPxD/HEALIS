import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ButtonProps {
  variant?: 'solid' | 'outline';
  icon?: LucideIcon;
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'solid',
  icon: Icon,
  children,
  className = '',
  ...props
}) => {
  return (
    <button
      className={`px-6 py-3 rounded-full font-medium flex items-center gap-2 
        transition-all duration-300 transform hover:scale-105 ${className}`}
      {...props}
    >
      {children}
      {Icon && <Icon className="w-5 h-5" />}
    </button>
  );
};

export default Button;