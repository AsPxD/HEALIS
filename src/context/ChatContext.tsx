import React, { createContext, useContext, useState } from 'react';
import { Message, ChatContextType } from '../types/chat';
import { createMessage } from '../utils/chatUtils';

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([
    createMessage("Hello! I'm your AI health assistant. How can I help you today?", true),
  ]);

  const addMessage = (text: string, isBot: boolean) => {
    setMessages(prev => [...prev, createMessage(text, isBot)]);
  };

  const clearMessages = () => {
    setMessages([createMessage("Hello! I'm your AI health assistant. How can I help you today?", true)]);
  };

  return (
    <ChatContext.Provider value={{ messages, addMessage, clearMessages }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};