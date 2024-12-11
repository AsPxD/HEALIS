import React from 'react';
import { motion } from 'framer-motion';
import { Bot, User } from 'lucide-react';

interface ChatBubbleProps {
  message: string;
  isBot?: boolean;
  timestamp: string;
}

const ChatBubble = ({ message, isBot = false, timestamp }: ChatBubbleProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-4`}
    >
      <div className={`flex max-w-[80%] ${isBot ? 'flex-row' : 'flex-row-reverse'}`}>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
          ${isBot ? 'bg-blue-100 text-blue-600 mr-2' : 'bg-violet-100 text-violet-600 ml-2'}`}>
          {isBot ? <Bot size={16} /> : <User size={16} />}
        </div>
        <div>
          <div className={`rounded-2xl px-4 py-3 ${isBot 
            ? 'bg-blue-50 text-gray-800' 
            : 'bg-violet-50 text-gray-800'}`}>
            <p className="text-sm">{message}</p>
          </div>
          <span className="text-xs text-gray-500 mt-1 block">{timestamp}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default ChatBubble;