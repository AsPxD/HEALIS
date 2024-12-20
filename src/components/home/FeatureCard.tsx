import React from 'react';
import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  link?: string;
}

const FeatureCard = ({ icon: Icon, title, description, link }: FeatureCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (link) {
      // Scroll to top before navigation
      window.scrollTo({ top: 0, behavior: 'smooth' });
      navigate(link);
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05, rotateY: 10 }}
      className={`relative h-[400px] perspective-1000 ${link ? 'cursor-pointer' : ''}`}
      onClick={handleClick}
    >
      <div className="w-full h-full transform-style-3d transition-transform duration-1000 group">
        <div className={`absolute w-full h-full rounded-3xl bg-gradient-to-br 
          from-white/90 to-white/50
          backdrop-blur-xl shadow-2xl border border-white/20 p-8
          transform-gpu transition-all duration-500 ease-out
          hover:shadow-[0_20px_60px_-10px_rgba(76,175,235,0.3)]`}>
          
          {/* Floating Orbs Background */}
          <div className="absolute inset-0 overflow-hidden rounded-3xl">
            <div className={`absolute w-40 h-40 -top-20 -left-20 
              bg-[#4CAFEB]/20 
              rounded-full blur-3xl 
              group-hover:translate-x-10 group-hover:translate-y-10 transition-transform duration-700`} />
            <div className={`absolute w-40 h-40 -bottom-20 -right-20 
              bg-cyan-500/20 
              rounded-full blur-3xl 
              group-hover:-translate-x-10 group-hover:-translate-y-10 transition-transform duration-700`} />
          </div>

          <div className="relative h-full flex flex-col items-center text-center z-10">
            {/* Icon Container */}
            <motion.div
              whileHover={{ rotate: 360, scale: 1.2 }}
              transition={{ duration: 0.8, type: "spring" }}
              className={`w-24 h-24 rounded-2xl 
                bg-gradient-to-br from-[#4CAFEB] to-cyan-500 p-0.5 mb-8`}
            >
              <div className={`w-full h-full rounded-2xl bg-white 
                flex items-center justify-center`}>
                <Icon className={`h-12 w-12 text-[#4CAFEB]`} />
              </div>
            </motion.div>

            {/* Content */}
            <h3 className={`text-2xl font-bold mb-4 
              text-gray-900 group-hover:text-[#4CAFEB] 
              transition-colors duration-300`}>{title}</h3>
            
            <p className={`text-gray-600 
              group-hover:text-opacity-100 transition-colors duration-300
              leading-relaxed mb-8`}>{description}</p>

            {/* Get Started Button */}
            {link && (
              <div className="mt-auto">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-6 py-3 rounded-xl 
                    bg-gradient-to-r from-[#4CAFEB] to-cyan-500 text-white
                    font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                >
                  Get Started
                </motion.button>
              </div>
            )}

            {/* Decorative Lines */}
            <div className={`absolute bottom-6 left-6 right-6 h-px bg-gradient-to-r from-transparent 
              via-[#4CAFEB]/20 
              to-transparent transform scale-x-0 group-hover:scale-x-100 
              transition-transform duration-700`} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FeatureCard;