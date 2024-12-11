import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare } from 'lucide-react';

interface SuggestedQuestionsProps {
  questions: string[];
  onSelect: (question: string) => void;
}

const SuggestedQuestions = ({ questions, onSelect }: SuggestedQuestionsProps) => {
  return (
    <div className="p-4 bg-gray-50 border-t border-gray-200">
      <div className="flex items-center gap-2 mb-3">
        <MessageSquare className="w-4 h-4 text-blue-500" />
        <span className="text-sm font-medium text-gray-700">Suggested Questions</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {questions.map((question, index) => (
          <motion.button
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => onSelect(question)}
            className="px-3 py-2 rounded-xl bg-white text-sm text-gray-700 
              border border-gray-200 hover:border-blue-300 hover:bg-blue-50 
              transition-all duration-300"
          >
            {question}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default SuggestedQuestions;