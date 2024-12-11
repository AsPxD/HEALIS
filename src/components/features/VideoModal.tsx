import React from 'react';
import { motion } from 'framer-motion';
import { X, Star, Eye, ThumbsUp, Clock, Share2, Bookmark, Sparkles, Shield, Zap } from 'lucide-react';
import Button from '../shared/Button';
import { Feature } from '../../types/features';

interface VideoModalProps {
  feature: Feature;
  isBookmarked: boolean;
  onBookmark: () => void;
  onClose: () => void;
}

const VideoModal = ({ feature, isBookmarked, onBookmark, onClose }: VideoModalProps) => {
  const [comment, setComment] = React.useState('');

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: feature.title,
          text: feature.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-8"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-full h-[90vh] flex gap-6 relative"
      >
        <button
          onClick={onClose}
          className="absolute -top-2 -right-2 z-10 p-2 rounded-full bg-white/10 
            hover:bg-white/20 transition-colors backdrop-blur-sm"
        >
          <X className="w-6 h-6 text-white" />
        </button>

        <div className="w-[65%] h-full rounded-2xl overflow-hidden bg-black/50 backdrop-blur-sm">
          <iframe
            src={feature.videoUrl}
            title={feature.title}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        <div className="w-[35%] h-full overflow-y-auto">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 h-full text-white">
            <div className="flex items-center gap-4 mb-6">
              <img
                src={feature.author.avatar}
                alt={feature.author.name}
                className="w-12 h-12 rounded-full ring-2 ring-white/20"
              />
              <div>
                <h3 className="font-semibold flex items-center gap-2">
                  {feature.author.name}
                  {feature.author.verified && (
                    <Star className="w-4 h-4 text-blue-400 fill-current" />
                  )}
                </h3>
                <p className="text-white/60 text-sm">{feature.category}</p>
              </div>
            </div>

            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-white to-white/80 
              bg-clip-text text-transparent">
              {feature.title}
            </h2>
            <p className="text-white/80 mb-6 leading-relaxed">
              {feature.description}
            </p>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-white/5 rounded-xl p-3 text-center">
                <Eye className="w-5 h-5 mx-auto mb-1 text-blue-400" />
                <span className="block text-sm text-white/60">Views</span>
                <span className="font-semibold">{feature.views}</span>
              </div>
              <div className="bg-white/5 rounded-xl p-3 text-center">
                <ThumbsUp className="w-5 h-5 mx-auto mb-1 text-green-400" />
                <span className="block text-sm text-white/60">Likes</span>
                <span className="font-semibold">{feature.likes}</span>
              </div>
              <div className="bg-white/5 rounded-xl p-3 text-center">
                <Clock className="w-5 h-5 mx-auto mb-1 text-amber-400" />
                <span className="block text-sm text-white/60">Duration</span>
                <span className="font-semibold">{feature.duration}</span>
              </div>
            </div>

            <div className="flex gap-4 mb-6">
              <Button
                variant="outline"
                onClick={onBookmark}
                icon={Bookmark}
                className={`flex-1 border-white/20 hover:bg-white/10 ${
                  isBookmarked ? 'text-blue-400' : 'text-white'
                }`}
              >
                Save
              </Button>
              <Button
                variant="outline"
                onClick={handleShare}
                icon={Share2}
                className="flex-1 border-white/20 hover:bg-white/10 text-white"
              >
                Share
              </Button>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-white/90">Key Features</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl">
                  <Sparkles className="w-5 h-5 text-purple-400" />
                  <span>AI-Powered Analysis</span>
                </div>
                <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl">
                  <Shield className="w-5 h-5 text-green-400" />
                  <span>Privacy Protected</span>
                </div>
                <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl">
                  <Zap className="w-5 h-5 text-amber-400" />
                  <span>Real-time Processing</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-white/10">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-white/90">Comments</h4>
                <span className="text-sm text-white/60">256 comments</span>
              </div>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-400" />
                  <div className="flex-1">
                    <input
                      type="text"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Add a comment..."
                      className="w-full bg-white/5 rounded-xl px-4 py-2 text-white 
                        placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/20"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default VideoModal;