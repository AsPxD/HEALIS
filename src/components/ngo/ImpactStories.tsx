import React from 'react';
import { motion } from 'framer-motion';
import { Quote, ArrowRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import Button from '../shared/Button';
import 'swiper/css';
import 'swiper/css/pagination';

const stories = [
  {
    id: 1,
    quote: "Thanks to the medical camp organized by HealthCare For All, my village now has access to regular health checkups.",
    author: "Ramesh Kumar",
    location: "Bihar",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: 2,
    quote: "The support from Hope For Children helped my daughter receive the cancer treatment she needed. Forever grateful.",
    author: "Priya Sharma",
    location: "Mumbai",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: 3,
    quote: "Mind Matters India's counseling sessions helped me overcome depression and restart my life.",
    author: "Amit Patel",
    location: "Delhi",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=1000"
  }
];

const ImpactStories = () => {
  return (
    <section className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Impact Stories</h2>
        <Button variant="outline" icon={ArrowRight}>View All Stories</Button>
      </div>

      <Swiper
        modules={[Pagination]}
        pagination={{ clickable: true }}
        spaceBetween={24}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 }
        }}
        className="pb-12"
      >
        {stories.map((story) => (
          <SwiperSlide key={story.id}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 h-full"
            >
              <Quote className="w-8 h-8 text-rose-500 mb-4" />
              <p className="text-gray-600 mb-6">{story.quote}</p>
              
              <div className="flex items-center gap-4">
                <img
                  src={story.image}
                  alt={story.author}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium text-gray-900">{story.author}</p>
                  <p className="text-sm text-gray-500">{story.location}</p>
                </div>
              </div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default ImpactStories;