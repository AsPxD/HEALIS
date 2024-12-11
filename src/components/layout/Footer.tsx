import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Activity, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Heart } from 'lucide-react';

const Footer = () => {
  const quickLinks = [
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'News', path: '/news' },
    { name: 'Health Education', path: '/health-education' }
  ];

  const services = [
    { name: 'Book Appointments', path: '/appointments' },
    { name: 'Medicine Search', path: '/medicine-search' },
    { name: 'Health Insights', path: '/health-insights' },
    { name: 'Emergency Support', path: '/emergency' }
  ];

  const resources = [
    { name: 'AI Chat Support', path: '/ai-chat' },
    { name: 'Diet Plans', path: '/diet-plan' },
    { name: 'Medicine Reminders', path: '/reminders' },
    { name: 'Health Articles', path: '/health-education' }
  ];

  return (
    <footer className="bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center">
              <Activity className="h-8 w-8 text-[#4CAFEB]" />
              <span className="ml-2 text-xl font-bold bg-gradient-to-r from-[#4CAFEB] to-cyan-500 
                text-transparent bg-clip-text">Healis</span>
            </Link>
            <p className="text-gray-600 leading-relaxed">
              Empowering healthcare through innovation and accessibility. Your trusted partner in the 
              journey towards better health.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-600">
                <Mail className="w-5 h-5 text-[#4CAFEB]" />
                <span>contact@healis.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Phone className="w-5 h-5 text-[#4CAFEB]" />
                <span>+91 1234567890</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <MapPin className="w-5 h-5 text-[#4CAFEB]" />
                <span>Mumbai, Maharashtra</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Links</h3>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path}
                    className="text-gray-600 hover:text-[#4CAFEB] transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Our Services</h3>
            <ul className="space-y-4">
              {services.map((service) => (
                <li key={service.name}>
                  <Link 
                    to={service.path}
                    className="text-gray-600 hover:text-[#4CAFEB] transition-colors duration-300"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Resources</h3>
            <ul className="space-y-4">
              {resources.map((resource) => (
                <li key={resource.name}>
                  <Link 
                    to={resource.path}
                    className="text-gray-600 hover:text-[#4CAFEB] transition-colors duration-300"
                  >
                    {resource.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Links & Newsletter */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="flex gap-6">
              <motion.a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center
                  text-gray-600 hover:bg-[#4CAFEB] hover:text-white transition-all duration-300"
              >
                <Facebook className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center
                  text-gray-600 hover:bg-[#4CAFEB] hover:text-white transition-all duration-300"
              >
                <Twitter className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center
                  text-gray-600 hover:bg-[#4CAFEB] hover:text-white transition-all duration-300"
              >
                <Instagram className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center
                  text-gray-600 hover:bg-[#4CAFEB] hover:text-white transition-all duration-300"
              >
                <Linkedin className="w-5 h-5" />
              </motion.a>
            </div>
            <div className="flex items-center justify-center md:justify-end">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Subscribe to our newsletter"
                  className="w-full md:w-80 px-4 py-3 rounded-xl border border-gray-300 
                    focus:ring-2 focus:ring-[#4CAFEB] focus:border-transparent transition-all duration-300"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 
                  bg-[#4CAFEB] text-white rounded-lg hover:bg-[#3b9ed9] transition-colors duration-300">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-200 text-center">
          <p className="text-gray-600 flex items-center justify-center gap-1">
            Made with <Heart className="w-4 h-4 text-red-500" /> by Healis Team © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;