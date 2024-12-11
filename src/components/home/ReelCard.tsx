import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Play } from 'lucide-react';
import { Reel } from './types';

interface ReelCardProps {
  reel: Reel;
  onClick: () => void;
}

const ReelCard = ({ reel, onClick }: ReelCardProps) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
      className="relative w-full h-full rounded-3xl overflow-hidden bg-gradient-to-br from-indigo-500 to-purple-600 cursor-pointer"
    >
      <img 
        src={reel.thumbnail} 
        alt={reel.title}
        className="w-full h-full object-cover"
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      <div className="absolute inset-0 p-6 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full"
          >
            <span className="text-white text-sm font-medium">{reel.category}</span>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center"
          >
            <Instagram className="h-5 w-5 text-white" />
          </motion.div>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-bold text-white mb-2">{reel.title}</h3>
            <p className="text-gray-300 text-sm">{reel.author}</p>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-white text-sm">{reel.views} views</span>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center
                border-2 border-white/50"
            >
              <Play className="h-6 w-6 text-white" fill="white" />
            </motion.button>
          </div>
        </div>
      </div>

      <motion.div
        initial={false}
        animate={{ opacity: isHovered ? 1 : 0 }}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300"
      />
    </motion.div>
  );
};

export default ReelCard;