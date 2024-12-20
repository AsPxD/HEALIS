import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight, Heart, MessageCircle, Share2, BookmarkPlus } from 'lucide-react';

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
    url?: string;
  };
}

const NewsCard = ({ article }: NewsCardProps) => {
  const handleCardClick = () => {
    if (article.url) {
      window.open(article.url, '_blank');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onClick={handleCardClick}
      className="bg-white/80 backdrop-blur-lg rounded-2xl overflow-hidden shadow-xl 
        border border-white/20 group hover:shadow-2xl transition-all duration-500
        hover:border-blue-500/20 cursor-pointer"
    >
      <div className="relative">
        <div className="relative h-48 overflow-hidden">
          <motion.img
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
            src={article.image || 'https://imgs.search.brave.com/q5xxb7mkNIHnLu_JGT_qIzjhAYAWPh6tEoGxRW1jsKU/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9iZXV0/aWZ1bC1wb3NpdGl2/ZS1pbm5vdmF0aXZl/LW1vb2QtbGFuZHNj/YXBlLTMyNTEwNDA5/Ny5qcGc'}
            alt={article.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          
          {/* Category Badge */}
          <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm 
            rounded-full text-sm font-medium text-blue-600">
            {article.category}
          </div>
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

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center">
            <User className="h-5 w-5 mr-2 text-gray-500" />
            <span className="text-sm text-gray-600">{article.author}</span>
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="flex items-center gap-2 text-blue-500 hover:text-blue-600"
          >
            <ArrowRight className="h-5 w-5" />
            <span className="text-sm">Read More</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default NewsCard;