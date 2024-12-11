import React from 'react';
import { motion } from 'framer-motion';
import { Bot, Sparkles, Brain, Shield } from 'lucide-react';
import PageHeader from '../components/shared/PageHeader';
import ChatContainer from '../components/chat/ChatContainer';
import ChatInput from '../components/chat/ChatInput';
import ChatControls from '../components/chat/ChatControls';
import SuggestedQuestions from '../components/chat/SuggestedQuestions';
import { FloatingElements, GradientBlob } from '../components/shared/BackgroundElements';
import { ChatProvider, useChat } from '../context/ChatContext';
import { generateResponse } from '../utils/chatUtils';

const suggestedQuestions = [
  "What are the symptoms of COVID-19?",
  "How can I improve my sleep quality?",
  "What's a balanced diet?",
  "How to manage stress?",
  "Common cold remedies",
  "Benefits of meditation"
];

const ChatInterface = () => {
  const { addMessage } = useChat();
  const [inputValue, setInputValue] = React.useState('');
  const [isListening, setIsListening] = React.useState(false);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    // Add user message
    addMessage(inputValue, false);
    const userMessage = inputValue;
    setInputValue('');

    // Generate and add AI response
    setTimeout(() => {
      const response = generateResponse(userMessage);
      addMessage(response, true);
    }, 600);
  };

  const handleVoice = () => {
    setIsListening(prev => !prev);
    // Voice recognition logic would go here
  };

  return (
    <div className="lg:col-span-3">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200"
      >
        <div className="h-[600px] flex flex-col">
          <ChatControls />
          <ChatContainer />
          <SuggestedQuestions
            questions={suggestedQuestions}
            onSelect={(question) => setInputValue(question)}
          />
          <ChatInput
            value={inputValue}
            onChange={setInputValue}
            onSend={handleSend}
            onStartVoice={handleVoice}
            isListening={isListening}
          />
        </div>
      </motion.div>
    </div>
  );
};

const AIChatSupport = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="pt-24 pb-16 min-h-screen relative"
    >
      <FloatingElements />
      <GradientBlob />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <PageHeader
          title="AI Health Assistant"
          subtitle="Get instant answers to your health-related questions"
          gradient="from-blue-500 to-indigo-500"
        />

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Features Section */}
          <div className="lg:col-span-1 space-y-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl p-6 shadow-lg"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Features</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="text-gray-700">24/7 AI Support</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-purple-600" />
                  </div>
                  <span className="text-gray-700">Smart Responses</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                    <Brain className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-gray-700">Health Insights</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
                    <Shield className="w-4 h-4 text-amber-600" />
                  </div>
                  <span className="text-gray-700">Private & Secure</span>
                </div>
              </div>
            </motion.div>
          </div>

          <ChatProvider>
            <ChatInterface />
          </ChatProvider>
        </div>
      </div>
    </motion.div>
  );
};

export default AIChatSupport;