import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Award, Users, ArrowRight } from 'lucide-react';
import Button from '../shared/Button';

const ngos = [
  {
    id: 1,
    name: "HealthCare For All Foundation",
    description: "Providing healthcare access to underprivileged communities across India.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=2070",
    impact: "50,000+ lives impacted",
    rating: 4.9,
    verified: true
  },
  {
    id: 2,
    name: "Hope For Children",
    description: "Supporting medical treatment for children from low-income families.",
    image: "https://images.unsplash.com/photo-1542884748-2b87b36c6b90?auto=format&fit=crop&q=80&w=2070",
    impact: "25,000+ children helped",
    rating: 4.8,
    verified: true
  },
  {
    id: 3,
    name: "Mind Matters India",
    description: "Making mental healthcare accessible and breaking stigmas.",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=2070",
    impact: "30,000+ people supported",
    rating: 4.7,
    verified: true
  }
];

const FeaturedNGOs = () => {
  return (
    <section className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Featured NGOs</h2>
        <Button variant="outline" icon={ArrowRight}>View All</Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ngos.map((ngo, index) => (
          <motion.div
            key={ngo.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200"
          >
            <div className="relative h-48">
              <img
                src={ngo.image}
                alt={ngo.name}
                className="w-full h-full object-cover"
              />
              {ngo.verified && (
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full 
                  bg-white/90 backdrop-blur-sm text-emerald-600 text-sm font-medium
                  flex items-center gap-1">
                  <Award className="w-4 h-4" />
                  <span>Verified</span>
                </div>
              )}
            </div>

            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{ngo.name}</h3>
              <p className="text-gray-600 mb-4">{ngo.description}</p>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-1 text-rose-600">
                  <Heart className="w-4 h-4" />
                  <span>{ngo.impact}</span>
                </div>
                <div className="flex items-center gap-1 text-amber-600">
                  <Users className="w-4 h-4" />
                  <span>{ngo.rating} Rating</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedNGOs;