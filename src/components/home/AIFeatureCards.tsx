import React from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  Mic, 
  LineChart, 
  Trophy, 
  Watch, 
  Users,
  ArrowRight,
  Sparkles,
  Activity,
  Stethoscope,
  Bot,
  Cpu
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../shared/Button';

const features = [
  {
    id: 1,
    title: "AI Health Diagnostics",
    description: "Advanced symptom analysis and health predictions powered by artificial intelligence",
    icon: Brain,
    color: "from-blue-500 to-cyan-500",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=2070",
    path: "/ai-diagnostics",
    stats: {
      accuracy: "95%",
      conditions: "2,000+",
      predictions: "1M+"
    }
  },
  {
    id: 2,
    title: "AI Chat Support",
    description: "24/7 intelligent healthcare assistance and personalized guidance",
    icon: Bot,
    color: "from-violet-500 to-purple-500",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=2070",
    path: "/ai-chat",
    stats: {
      languages: "10+",
      responses: "5M+",
      satisfaction: "98%"
    }
  },
  {
    id: 3,
    title: "AI Health Forecasting",
    description: "Predictive analytics for personalized health insights and risk assessment",
    icon: Cpu,
    color: "from-emerald-500 to-teal-500",
    image: "https://images.unsplash.com/photo-1542884748-2b87b36c6b90?auto=format&fit=crop&q=80&w=2070",
    path: "/ai-forecasting",
    stats: {
      metrics: "50+",
      accuracy: "93%",
      predictions: "30+"
    }
  },
  {
    id: 4,
    title: "Smart Health Monitoring",
    description: "Real-time health tracking with AI-powered insights",
    icon: Activity,
    color: "from-amber-500 to-orange-500",
    image: "https://images.unsplash.com/photo-1574269252556-89926e7c5805?auto=format&fit=crop&q=80&w=2070",
    path: "/health-insights",
    stats: {
      metrics: "100+",
      devices: "50+",
      users: "1M+"
    }
  },
  {
    id: 5,
    title: "Virtual Health Assistant",
    description: "Your personal AI health companion for daily wellness",
    icon: Stethoscope,
    color: "from-rose-500 to-pink-500",
    image: "https://images.unsplash.com/photo-1557825835-70d97c4aa567?auto=format&fit=crop&q=80&w=2070",
    path: "/ai-chat",
    stats: {
      features: "50+",
      accuracy: "97%",
      interactions: "10M+"
    }
  },
  {
    id: 6,
    title: "AI Treatment Recommendations",
    description: "Evidence-based treatment suggestions using advanced AI algorithms",
    icon: Brain,
    color: "from-indigo-500 to-blue-500",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=2070",
    path: "/ai-diagnostics",
    stats: {
      treatments: "1000+",
      accuracy: "95%",
      studies: "10K+"
    }
  }
];

const AIFeatureCards = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
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
            AI-Powered Healthcare
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-4"
          >
            Next-Gen Health Features
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Experience the future of healthcare with our AI-driven solutions
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer"
              onClick={() => navigate(feature.path)}
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-xl border border-gray-200 
                hover:shadow-2xl transition-all duration-500 hover:border-blue-500/20 h-full">
                {/* Image Section */}
                <div className="relative h-48 overflow-hidden">
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
                    <div className="flex items-center gap-2 text-blue-600">
                      <Sparkles className="w-5 h-5" />
                      <span className="font-medium">AI-Powered</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 group-hover:text-blue-600 
                      transition-colors">
                      <span>Explore</span>
                      <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent 
                  via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AIFeatureCards;