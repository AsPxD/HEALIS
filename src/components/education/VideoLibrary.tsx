import React from 'react';
import { motion } from 'framer-motion';
import { Play, Video, Clock, BookOpen } from 'lucide-react';

const videos = [
  {
    id: 1,
    title: "Beginner's Guide to Meditation",
    duration: "15 mins",
    category: "Meditation",
    thumbnail: "https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?auto=format&fit=crop&q=80&w=1000",
    views: "12K"
  },
  {
    id: 2,
    title: "Morning Yoga Routine",
    duration: "20 mins",
    category: "Yoga",
    thumbnail: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1000",
    views: "15K"
  },
  {
    id: 3,
    title: "Stress Management Techniques",
    duration: "18 mins",
    category: "Mental Health",
    thumbnail: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=1000",
    views: "10K"
  },
  {
    id: 4,
    title: "Advanced Pranayama",
    duration: "25 mins",
    category: "Breathing",
    thumbnail: "https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?auto=format&fit=crop&q=80&w=1000",
    views: "8K"
  }
];

const VideoLibrary = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
          <Video className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Video Library</h2>
          <p className="text-gray-600">Learn from expert-led video tutorials</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {videos.map((video, index) => (
          <motion.div
            key={video.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200 
              group cursor-pointer"
          >
            <div className="relative">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-48 object-cover transition-transform duration-300
                  group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100
                transition-opacity duration-300 flex items-center justify-center">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm
                    flex items-center justify-center"
                >
                  <Play className="w-6 h-6 text-white" fill="white" />
                </motion.div>
              </div>
              <div className="absolute top-4 right-4 px-2 py-1 rounded-full bg-black/50
                backdrop-blur-sm text-white text-sm">
                {video.duration}
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2 text-sm text-blue-600 mb-2">
                <BookOpen className="w-4 h-4" />
                <span>{video.category}</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{video.title}</h3>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{video.duration}</span>
                </div>
                <div>{video.views} views</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default VideoLibrary;