import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, ArrowRight, Clock, User } from 'lucide-react';

const articles = [
  {
    title: "The Science Behind Meditation",
    excerpt: "Discover how meditation affects your brain and overall well-being...",
    author: "Dr. Sarah Johnson",
    readTime: "5 min read",
    category: "Mental Health",
    image: "https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?auto=format&fit=crop&q=80&w=1000"
  },
  {
    title: "Understanding Ayurvedic Principles",
    excerpt: "Learn about the ancient wisdom of Ayurveda and its modern applications...",
    author: "Dr. Rajesh Kumar",
    readTime: "7 min read",
    category: "Traditional Medicine",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=1000"
  },
  {
    title: "Holistic Approach to Wellness",
    excerpt: "Explore how different aspects of health interconnect for overall well-being...",
    author: "Dr. Priya Sharma",
    readTime: "6 min read",
    category: "Wellness",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1000"
  }
];

const WellnessArticles = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-amber-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Wellness Articles</h2>
            <p className="text-gray-600">Latest insights from health experts</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {articles.map((article, index) => (
          <motion.div
            key={article.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group cursor-pointer"
          >
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200
              transition-all duration-300 hover:shadow-xl">
              <div className="relative h-48">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-300
                    group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90
                  backdrop-blur-sm text-amber-600 text-sm font-medium">
                  {article.category}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-amber-600
                  transition-colors duration-300">
                  {article.title}
                </h3>
                <p className="text-gray-600 mb-4">{article.excerpt}</p>
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{article.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{article.readTime}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default WellnessArticles;