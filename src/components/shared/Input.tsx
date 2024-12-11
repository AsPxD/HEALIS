import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  icon?: LucideIcon;
  helperText?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon: Icon, helperText, className = '', ...props }, ref) => {
    const id = React.useId();

    return (
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-2"
      >
        {label && (
          <label htmlFor={id} className="block text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        <div className="relative">
          {Icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Icon className="w-5 h-5" />
            </div>
          )}
          <input
            ref={ref}
            id={id}
            className={`w-full px-4 py-3 ${Icon ? 'pl-10' : ''} rounded-xl border bg-white/50 backdrop-blur-sm
              focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-300
              disabled:opacity-50 disabled:cursor-not-allowed
              ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'}
              ${className}`}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? `${id}-error` : helperText ? `${id}-helper` : undefined}
            {...props}
          />
        </div>
        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            id={`${id}-error`}
            className="text-sm text-red-500"
            role="alert"
          >
            {error}
          </motion.p>
        )}
        {helperText && !error && (
          <p id={`${id}-helper`} className="text-sm text-gray-500">
            {helperText}
          </p>
        )}
      </motion.div>
    );
  }
);

Input.displayName = 'Input';

export default Input;