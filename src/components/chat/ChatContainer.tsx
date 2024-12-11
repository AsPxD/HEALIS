import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import ChatBubble from './ChatBubble';
import { useChat } from '../../context/ChatContext';

const ChatContainer = () => {
  const { messages } = useChat();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <motion.div
      ref={containerRef}
      className="flex-1 overflow-y-auto p-4 space-y-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {messages.map((message) => (
        <ChatBubble
          key={message.id}
          message={message.text}
          isBot={message.isBot}
          timestamp={message.timestamp}
        />
      ))}
    </motion.div>
  );
};

export default ChatContainer;