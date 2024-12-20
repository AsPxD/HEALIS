import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Send, 
  MessageSquare, 
  User 
} from 'lucide-react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import toast from 'react-hot-toast';

// Shared Components
import PageHeader from '../components/shared/PageHeader';
import Card from '../components/shared/Card';
import Input from '../components/shared/Input';
import Button from '../components/shared/Button';

// Gemini AI Configuration
const genAI = new GoogleGenerativeAI(
  process.env.NEXT_PUBLIC_GEMINI_API_KEY || 'AIzaSyCVJvX_GXA2N2qXjL8OFFsvafvSHOJadPY'
);
const model = genAI.getGenerativeModel({ 
  model: "gemini-1.5-flash-8b" 
});

// Contact Methods Configuration
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

// Chat Message Type
type ChatMessage = {
  text: string;
  sender: 'user' | 'support';
};

const Contact: React.FC = () => {
  // Form States
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '', // Added phone number field
    message: ''
  });
  
  // Chat States
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { 
      text: "Hi! How can we help you today?", 
      sender: 'support' 
    }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);

  // Validation Function
  const validateForm = () => {
    const { name, email, phoneNumber, message } = formData;
    
    // Basic validation
    if (!name.trim()) {
      toast.error('Name is required');
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email)) {
      toast.error('Please enter a valid email');
      return false;
    }
    
    const phoneRegex = /^[+]?(\d{10,14})$/;
    if (!phoneNumber.trim() || !phoneRegex.test(phoneNumber)) {
      toast.error('Please enter a valid phone number');
      return false;
    }
    
    if (!message.trim()) {
      toast.error('Message is required');
      return false;
    }
    
    return true;
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Contact Form Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // Send form data to backend
      const response = await axios.post('/api/contact', formData);
      
      if (response.data.success) {
        // Reset form
        setFormData({
          name: '',
          email: '',
          phoneNumber: '',
          message: ''
        });
        
        // Show success toast
        toast.success('Message sent successfully!');
      }
    } catch (error) {
      console.error('Form submission error', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // AI Chat Submit Handler
  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate input
    if (!userInput.trim()) return;

    // Prepare chat messages
    const newChatMessages: ChatMessage[] = [
      ...chatMessages, 
      { text: userInput, sender: 'user' }
    ];
    
    setChatMessages(newChatMessages);
    setUserInput('');
    setIsChatLoading(true);

    try {
      // Generate AI response
      const result = await model.generateContent(userInput);
      const aiResponse = result.response.text();

      // Update chat with AI response
      setChatMessages(prev => [
        ...prev, 
        { text: aiResponse, sender: 'support' }
      ]);
    } catch (error) {
      console.error('AI response generation error:', error);
      setChatMessages(prev => [
        ...prev, 
        { 
          text: "Sorry, I'm experiencing some difficulties. Please try again.", 
          sender: 'support' 
        }
      ]);
    } finally {
      setIsChatLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="pt-24 pb-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <PageHeader
          title="Get in Touch"
          subtitle="We're here to help and answer any questions you might have"
          gradient="from-emerald-500 to-teal-500"
        />

        {/* Contact Methods Grid */}
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
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {method.title}
                    </h3>
                    <p className="text-gray-900 font-medium mb-1">
                      {method.details}
                    </p>
                    <p className="text-gray-600">{method.subtitle}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Contact Form and Chat Section */}
        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Contact Form */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Card>
              <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                  name="name"
                  label="Name"
                  type="text"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleInputChange}
                  icon={User}
                />
                
                <Input
                  name="email"
                  label="Email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  icon={Mail}
                />

                <Input
                  name="phoneNumber"
                  label="Phone Number"
                  type="tel"
                  placeholder="+91 1234567890"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  icon={Phone}
                />

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300"
                    placeholder="Your message"
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

          {/* AI Chat Section */}
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
                  <h2 className="text-2xl font-bold text-gray-900">
                    AI Support Chat
                  </h2>
                  <p className="text-gray-600">
                    Connect with our AI assistant
                  </p>
                </div>
              </div>

              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                {chatMessages.map((msg, index) => (
                  <div 
                    key={index} 
                    className={`flex space-x-4 ${
                      msg.sender === 'user' ? 'justify-end' : ''
                    }`}
                  >
                    {msg.sender === 'support' && (
                      <div className="w-8 h-8 rounded-full bg-emerald-100 flex-shrink-0" />
                    )}
                    <div className="flex-1 max-w-[80%]">
                      <div 
                        className={`rounded-2xl p-4 ${
                          msg.sender === 'user' 
                            ? 'bg-emerald-100 text-emerald-900' 
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        <p>{msg.text}</p>
                      </div>
                    </div>
                  </div>
                ))}
                {isChatLoading && (
                  <div className="text-center text-gray-500">
                    Generating response...
                  </div>
                )}
              </div>

              <form onSubmit={handleChatSubmit} className="relative">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Type your message..."
                  className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-300"
                  disabled={isChatLoading}
                />
                <button 
                  type="submit" 
                  disabled={isChatLoading}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-500
                    hover:text-emerald-600 transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Contact;