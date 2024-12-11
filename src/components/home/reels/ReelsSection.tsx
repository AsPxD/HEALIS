import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards, Navigation, Autoplay } from 'swiper/modules';
import ReelCard from './ReelCard';
import ReelViewer from './ReelViewer';
import { FloatingElements, GradientBlob } from '../../shared/BackgroundElements';
import { Reel } from '../types';
import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/navigation';

const reels: Reel[] = [
  {
    id: '1',
    thumbnail: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=1000',
    title: 'Morning Yoga Routine',
    category: 'Fitness',
    views: '1.2M',
    author: 'Dr. Priya Sharma',
    likes: '45.2K',
    comments: '1.2K',
    description: 'Start your day with this energizing yoga routine for better health and flexibility.'
  },
  {
    id: '2',
    thumbnail: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=1000',
    title: 'Healthy Meal Prep',
    category: 'Nutrition',
    views: '890K',
    author: 'Chef Rajesh',
    likes: '32.1K',
    comments: '956',
    description: 'Quick and nutritious meal prep ideas for a healthy lifestyle.'
  },
  {
    id: '3',
    thumbnail: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1000',
    title: 'Meditation Guide',
    category: 'Mental Health',
    views: '756K',
    author: 'Yoga Guru Ram',
    likes: '28.9K',
    comments: '784',
    description: 'Simple meditation techniques for stress relief and mental clarity.'
  },
  {
    id: '4',
    thumbnail: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=1000',
    title: 'Ayurvedic Morning Routine',
    category: 'Wellness',
    views: '950K',
    author: 'Dr. Ayush Kumar',
    likes: '38.5K',
    comments: '1.1K',
    description: 'Traditional Ayurvedic practices for a balanced and healthy morning.'
  },
  {
    id: '5',
    thumbnail: 'https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?auto=format&fit=crop&q=80&w=1000',
    title: 'Natural Immunity Boosters',
    category: 'Health',
    views: '1.1M',
    author: 'Dr. Meera Patel',
    likes: '42.3K',
    comments: '1.5K',
    description: 'Natural ways to strengthen your immune system and stay healthy.'
  }
];

const ReelsSection = () => {
  const [isViewerOpen, setIsViewerOpen] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const swiperRef = React.useRef<any>(null);

  const handlePrevious = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
      swiperRef.current?.swiper?.slidePrev();
    }
  };

  const handleNext = () => {
    if (activeIndex < reels.length - 1) {
      setActiveIndex(activeIndex + 1);
      swiperRef.current?.swiper?.slideNext();
    }
  };

  return (
    <section className="py-32 bg-gradient-to-b from-gray-900 to-indigo-900 relative overflow-hidden">
      <FloatingElements />
      <GradientBlob />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Trending Health Reels
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto"
          >
            Watch and learn from top healthcare professionals
          </motion.p>
        </div>

        <div className="flex items-center justify-center gap-8">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handlePrevious}
            className="p-4 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200
              backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={activeIndex === 0}
          >
            <ChevronLeft className="h-6 w-6 text-white" />
          </motion.button>

          <div className="w-[340px] h-[600px]">
            <Swiper
              ref={swiperRef}
              effect="cards"
              grabCursor={true}
              modules={[EffectCards, Navigation, Autoplay]}
              className="h-full"
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            >
              {reels.map((reel, index) => (
                <SwiperSlide key={reel.id}>
                  <ReelCard 
                    reel={reel}
                    onClick={() => {
                      setActiveIndex(index);
                      setIsViewerOpen(true);
                    }}
                    isActive={index === activeIndex}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleNext}
            className="p-4 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200
              backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={activeIndex === reels.length - 1}
          >
            <ChevronRight className="h-6 w-6 text-white" />
          </motion.button>
        </div>

        <div className="flex justify-center mt-8 space-x-2">
          {reels.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setActiveIndex(index);
                swiperRef.current?.swiper?.slideTo(index);
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 
                ${index === activeIndex ? 'bg-white w-6' : 'bg-white/50 hover:bg-white/70'}`}
            />
          ))}
        </div>
      </div>

      {isViewerOpen && (
        <ReelViewer
          reel={reels[activeIndex]}
          onClose={() => setIsViewerOpen(false)}
          onPrevious={handlePrevious}
          onNext={handleNext}
          isFirst={activeIndex === 0}
          isLast={activeIndex === reels.length - 1}
        />
      )}
    </section>
  );
};

export default ReelsSection;