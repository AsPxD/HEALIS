import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Users, Award, Globe, Activity, ArrowRight, Brain, Dna } from 'lucide-react';
import PageHeader from '../components/shared/PageHeader';
import AnimatedCard from '../components/shared/AnimatedCard';
import Button from '../components/shared/Button';
import { FloatingElements, GradientBlob, GridPattern } from '../components/shared/BackgroundElements';

const stats = [
  { icon: Users, label: "Users", value: "1M+", color: "bg-blue-100 text-blue-600" },
  { icon: Heart, label: "Consultations", value: "500K+", color: "bg-rose-100 text-rose-600" },
  { icon: Award, label: "Awards", value: "50+", color: "bg-amber-100 text-amber-600" },
  { icon: Globe, label: "Cities", value: "100+", color: "bg-emerald-100 text-emerald-600" }
];

const teamMembers = [
  {
    name: "Anup Patil",
    role: "ML & Development Lead",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=1000",
    bio: "Leading innovation in ML and development with cutting-edge solutions",
    icon: Brain
  },
  {
    name: "Dhruv Mehta",
    role: "Web Development Lead",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=1000",
    bio: "Expert in modern web technologies and scalable architectures",
    icon: Activity
  },
  {
    name: "Akshada Kale",
    role: "Design Lead",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=1000",
    bio: "Creating beautiful and intuitive user experiences",
    icon: Dna
  }
];

const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="pt-24 pb-16 relative overflow-hidden"
    >
      <FloatingElements />
      <GradientBlob />
      <GridPattern />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <PageHeader
          title="Our Journey in Healthcare"
          subtitle="Bringing modern healthcare solutions with traditional Indian wisdom"
          gradient="from-blue-500 to-cyan-500"
        />

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-24">
          <AnimatedCard delay={0.2}>
            <div className="flex items-start space-x-4">
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.8 }}
                className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 
                  flex items-center justify-center"
              >
                <Activity className="w-6 h-6 text-white" />
              </motion.div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  At Healis, we believe in combining the best of both worlds - traditional Indian healthcare
                  wisdom and cutting-edge technology. Our mission is to make quality healthcare accessible
                  to everyone, everywhere.
                </p>
                <Button variant="outline" icon={ArrowRight}>Learn More</Button>
              </div>
            </div>
          </AnimatedCard>

          <AnimatedCard delay={0.4}>
            <div className="flex items-start space-x-4">
              <motion.div
                whileHover={{ rotate: -360, scale: 1.1 }}
                transition={{ duration: 0.8 }}
                className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 
                  flex items-center justify-center"
              >
                <Brain className="w-6 h-6 text-white" />
              </motion.div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  We envision a future where healthcare is proactive, personalized, and powered by AI,
                  while staying true to the holistic principles of traditional Indian medicine.
                </p>
                <Button variant="outline" icon={ArrowRight}>Discover More</Button>
              </div>
            </div>
          </AnimatedCard>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24">
          {stats.map((stat, index) => (
            <AnimatedCard key={stat.label} delay={index * 0.1}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-center"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8 }}
                  className={`w-12 h-12 rounded-xl ${stat.color} mx-auto mb-4 
                    flex items-center justify-center`}
                >
                  <stat.icon className="w-6 h-6" />
                </motion.div>
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-3xl font-bold text-gray-900 mb-2"
                >
                  {stat.value}
                </motion.div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            </AnimatedCard>
          ))}
        </div>

        {/* Team */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 
            bg-clip-text text-transparent mb-4">
            Meet Our Team
          </h2>
          <p className="text-xl text-gray-600">The innovators shaping the future of healthcare</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <AnimatedCard key={member.name} delay={index * 0.2}>
              <div className="relative">
                <div className="relative h-48 -mx-6 -mt-6 mb-6 rounded-t-2xl overflow-hidden group">
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 bg-gradient-to-r from-blue-500/40 to-cyan-500/40 
                      flex items-center justify-center"
                  >
                    <member.icon className="w-12 h-12 text-white" />
                  </motion.div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-blue-500 font-medium mb-4">{member.role}</p>
                <p className="text-gray-600">{member.bio}</p>
              </div>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default About;