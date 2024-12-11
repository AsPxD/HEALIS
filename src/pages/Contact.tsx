import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Send, MessageSquare, User } from 'lucide-react';
import PageHeader from '../components/shared/PageHeader';
import Card from '../components/shared/Card';
import Input from '../components/shared/Input';
import Button from '../components/shared/Button';

const contactMethods = [
  {
    icon: Phone,
    title: "Phone",
    details: "+91 1234567890",
    subtitle: "Mon-Fri from 9am to 6pm.",
    color: "bg-blue-100 text-blue-600"
  },
  {
    icon: Mail,
    title: "Email",
    details: "support@healis.com",
    subtitle: "Online support 24/7",
    color: "bg-rose-100 text-rose-600"
  },
  {
    icon: MapPin,
    title: "Office",
    details: "123 Healthcare Avenue",
    subtitle: "Mumbai, Maharashtra 400001",
    color: "bg-emerald-100 text-emerald-600"
  }
];

const Contact = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [message, setMessage] = React.useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    setMessage('');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="pt-24 pb-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeader
          title="Get in Touch"
          subtitle="We're here to help and answer any questions you might have"
          gradient="from-emerald-500 to-teal-500"
        />

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {contactMethods.map((method, index) => (
            <motion.div
              key={method.title}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 rounded-xl ${method.color} 
                    flex items-center justify-center`}>
                    <method.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{method.title}</h3>
                    <p className="text-gray-900 font-medium mb-1">{method.details}</p>
                    <p className="text-gray-600">{method.subtitle}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Card>
              <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                  label="Name"
                  type="text"
                  placeholder="Your name"
                  required
                  icon={User}
                />
                
                <Input
                  label="Email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  icon={Mail}
                />

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Message
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white/50 
                      backdrop-blur-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent 
                      transition-all duration-300"
                    placeholder="Your message"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  isLoading={isLoading}
                  icon={Send}
                >
                  Send Message
                </Button>
              </form>
            </Card>
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Card>
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Live Chat</h2>
                  <p className="text-gray-600">Connect with our support team</p>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex space-x-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="bg-gray-100 rounded-2xl p-4">
                      <p className="text-gray-600">Hi! How can we help you today?</p>
                    </div>
                    <span className="text-sm text-gray-500 mt-1 block">Support Team, 2m ago</span>
                  </div>
                </div>
              </div>

              <div className="relative">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-300 bg-white/50 
                    backdrop-blur-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent 
                    transition-all duration-300"
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-500
                  hover:text-emerald-600 transition-colors">
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Contact;