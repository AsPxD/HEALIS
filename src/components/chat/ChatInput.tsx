import React from 'react';
import { Send, Mic } from 'lucide-react';
import TextareaAutosize from 'react-textarea-autosize';

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  onStartVoice: () => void;
  isListening: boolean;
}

const ChatInput = ({ value, onChange, onSend, onStartVoice, isListening }: ChatInputProps) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="border-t border-gray-200 bg-white p-4">
      <div className="flex items-end gap-2">
        <div className="flex-1 relative">
          <TextareaAutosize
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="w-full resize-none rounded-xl border border-gray-300 bg-white/50 
              backdrop-blur-sm px-4 py-3 focus:ring-2 focus:ring-blue-500 
              focus:border-transparent transition-all duration-300"
            maxRows={4}
          />
        </div>
        
        <button
          onClick={onStartVoice}
          className={`p-3 rounded-xl transition-all duration-300 ${
            isListening
              ? 'bg-red-500 text-white animate-pulse'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <Mic className="w-5 h-5" />
        </button>
        
        <button
          onClick={onSend}
          disabled={!value.trim()}
          className="p-3 rounded-xl bg-blue-500 text-white transition-all duration-300
            hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;