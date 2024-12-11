import React from 'react';
import { motion } from 'framer-motion';
import { Play, Bookmark, Star, Eye, ThumbsUp, Clock } from 'lucide-react';
import { Feature } from '../../types/features';

interface VideoCardProps {
  feature: Feature;
  isBookmarked: boolean;
  onBookmark: () => void;
  onClick: () => void;
  delay?: number;
}

const VideoCard = ({ feature, isBookmarked, onBookmark, onClick, delay = 0 }: VideoCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200 
        hover:shadow-xl transition-all duration-300 group"
    >
      <div className="relative">
        <img
          src={feature.thumbnail}
          alt={feature.title}
          className="w-full h-48 object-cover transition-transform duration-500 
            group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClick}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
            w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center
            opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <Play className="w-8 h-8 text-white" fill="white" />
        </motion.button>

        <div className="absolute top-4 right-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              onBookmark();
            }}
            className={`w-8 h-8 rounded-full backdrop-blur-sm flex items-center justify-center
              ${isBookmarked 
                ? 'bg-blue-500 text-white' 
                : 'bg-white/20 text-white hover:bg-white/30'
              }`}
          >
            <Bookmark className="w-4 h-4" />
          </motion.button>
        </div>

        <div className="absolute bottom-4 left-4">
          <span className="px-2 py-1 rounded-full bg-white/20 backdrop-blur-sm 
            text-white text-sm">
            {feature.category}
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-3 mb-3">
          <img
            src={feature.author.avatar}
            alt={feature.author.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h3 className="font-medium text-gray-900 flex items-center gap-1">
              {feature.author.name}
              {feature.author.verified && (
                <Star className="w-4 h-4 text-blue-500 fill-current" />
              )}
            </h3>
            <p className="text-sm text-gray-500">{feature.category}</p>
          </div>
        </div>

        <h2 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2 
          group-hover:text-blue-600 transition-colors">
          {feature.title}
        </h2>
        <p className="text-gray-600 mb-4 line-clamp-2">{feature.description}</p>

        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              {feature.views}
            </span>
            <span className="flex items-center gap-1">
              <ThumbsUp className="w-4 h-4" />
              {feature.likes}
            </span>
          </div>
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {feature.duration}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default VideoCard;