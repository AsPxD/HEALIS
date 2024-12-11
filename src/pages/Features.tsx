import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, X, Star, Eye, ThumbsUp, Clock, Share2, Bookmark, 
  Search, Filter, TrendingUp, Award, Users, Heart
} from 'lucide-react';
import PageHeader from '../components/shared/PageHeader';
import Button from '../components/shared/Button';
import Input from '../components/shared/Input';
import { FloatingElements, GradientBlob } from '../components/shared/BackgroundElements';
import VideoCard from '../components/features/VideoCard';
import VideoModal from '../components/features/VideoModal';
import StatsSection from '../components/features/StatsSection';
import { Feature } from '../types/features';
import { features } from '../data/features';

const Features = () => {
  const [selectedFeature, setSelectedFeature] = React.useState<Feature | null>(null);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('All');
  const [isBookmarked, setIsBookmarked] = React.useState<Record<number, boolean>>({});

  const categories = ['All', 'Technology', 'Healthcare', 'Mental Health', 'Wellness', 'Emergency'];

  const filteredFeatures = features.filter(feature => {
    const matchesSearch = feature.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         feature.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || feature.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleBookmark = (id: number) => {
    setIsBookmarked(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="pt-24 pb-16 min-h-screen relative overflow-hidden"
    >
      <FloatingElements />
      <GradientBlob />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <PageHeader
          title="Feature Showcase"
          subtitle="Explore our innovative healthcare solutions in action"
          gradient="from-blue-500 to-cyan-500"
        />

        <StatsSection />

        {/* Search and Filter */}
        <div className="mb-12">
          <div className="grid md:grid-cols-2 gap-6">
            <Input
              label=""
              type="text"
              placeholder="Search features..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon={Search}
            />
            
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full whitespace-nowrap transition-all duration-300
                    ${selectedCategory === category
                      ? 'bg-blue-500 text-white'
                      : 'bg-white text-gray-600 hover:bg-blue-50'
                    }`}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredFeatures.map((feature, index) => (
            <VideoCard
              key={feature.id}
              feature={feature}
              isBookmarked={!!isBookmarked[feature.id]}
              onBookmark={() => toggleBookmark(feature.id)}
              onClick={() => setSelectedFeature(feature)}
              delay={index * 0.1}
            />
          ))}
        </div>

        {filteredFeatures.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <p className="text-xl text-gray-600">No features found matching your criteria.</p>
          </motion.div>
        )}

        <AnimatePresence>
          {selectedFeature && (
            <VideoModal
              feature={selectedFeature}
              isBookmarked={!!isBookmarked[selectedFeature.id]}
              onBookmark={() => toggleBookmark(selectedFeature.id)}
              onClose={() => setSelectedFeature(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Features;