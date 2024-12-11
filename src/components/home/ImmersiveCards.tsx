import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Headphones, Activity, Brain, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const features = [
  {
    title: "AR Workout Assistant",
    description: "Experience personalized workout sessions with augmented reality guidance and real-time form correction.",
    image: "https://images.unsplash.com/photo-1576678927484-cc907957088c?auto=format&fit=crop&q=80&w=2070",
    icon: Camera,
    stats: {
      accuracy: "95%",
      exercises: "100+",
      users: "10K+"
    },
    color: "from-blue-500 to-cyan-500",
    link: "/ar-workout"
  },
  {
    title: "VR Meditation Space",
    description: "Immerse yourself in serene virtual environments for guided meditation and mindfulness practices.",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=2070",
    icon: Headphones,
    stats: {
      sessions: "50+",
      duration: "10-60min",
      rating: "4.9/5"
    },
    color: "from-purple-500 to-indigo-500",
    link: "/vr-meditation"
  }
];

const ImmersiveCards = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] 
          bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-blue-600 font-medium"
          >
            Immersive Experience
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-4"
          >
            Future of Fitness & Wellness
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Transform your health journey with cutting-edge AR and VR technology
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <Link key={feature.title} to={feature.link}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
                transition={{ delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-xl border border-gray-200 
                  hover:shadow-2xl transition-all duration-500 hover:border-blue-500/20">
                  {/* Image Section */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="w-full h-full object-cover transition-transform duration-500 
                        group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 
                      to-transparent" />
                    
                    {/* Floating Icon */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      className={`absolute top-4 right-4 w-12 h-12 rounded-xl bg-gradient-to-br 
                        ${feature.color} flex items-center justify-center`}
                    >
                      <feature.icon className="w-6 h-6 text-white" />
                    </motion.div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 
                      transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 mb-6">{feature.description}</p>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      {Object.entries(feature.stats).map(([key, value]) => (
                        <div key={key} className="text-center">
                          <div className="text-lg font-semibold text-gray-900">{value}</div>
                          <div className="text-sm text-gray-500 capitalize">{key}</div>
                        </div>
                      ))}
                    </div>

                    {/* Action Button */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {feature.title.includes('AR') ? (
                          <Activity className="w-5 h-5 text-blue-600" />
                        ) : (
                          <Brain className="w-5 h-5 text-purple-600" />
                        )}
                        <span className="font-medium text-gray-600">Try Now</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 group-hover:text-blue-600 
                        transition-colors">
                        <span>Explore</span>
                        <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImmersiveCards;