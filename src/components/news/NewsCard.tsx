import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight, Heart, MessageCircle, Share2, BookmarkPlus } from 'lucide-react';
import Button from '../shared/Button';

interface NewsCardProps {
  article: {
    id: number;
    title: string;
    excerpt: string;
    category: string;
    date: string;
    author: string;
    image: string;
    likes: number;
    comments: number;
    readTime: string;
    tags: string[];
  };
}

const NewsCard = ({ article }: NewsCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white/80 backdrop-blur-lg rounded-2xl overflow-hidden shadow-xl 
        border border-white/20 group hover:shadow-2xl transition-all duration-500
        hover:border-blue-500/20"
    >
      <div className="relative">
        <div className="relative h-48 overflow-hidden">
          <motion.img
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          
          {/* Category Badge */}
          <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm 
            rounded-full text-sm font-medium text-blue-600">
            {article.category}
          </div>
          
          {/* Bookmark Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm
              flex items-center justify-center text-gray-600 hover:text-blue-600 transition-colors"
          >
            <BookmarkPlus size={18} />
          </motion.button>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <span className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            {article.date}
          </span>
          <span className="mx-2">•</span>
          <span>{article.readTime} read</span>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600
          transition-colors duration-300">
          {article.title}
        </h3>
        
        <p className="text-gray-600 mb-4 line-clamp-2">{article.excerpt}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {article.tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center">
            <img
              src={`https://i.pravatar.cc/32?u=${article.author}`}
              alt={article.author}
              className="w-8 h-8 rounded-full mr-2"
            />
            <span className="text-sm text-gray-600">{article.author}</span>
          </div>

          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex items-center gap-1 text-rose-500 hover:text-rose-600"
            >
              <Heart className="h-4 w-4" />
              <span className="text-sm">{article.likes}</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex items-center gap-1 text-blue-500 hover:text-blue-600"
            >
              <MessageCircle className="h-4 w-4" />
              <span className="text-sm">{article.comments}</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex items-center gap-1 text-green-500 hover:text-green-600"
            >
              <Share2 className="h-4 w-4" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default NewsCard;