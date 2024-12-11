import React, { useState } from 'react';
import { Trash2, RotateCcw } from 'lucide-react';
import { useChat } from '../../context/ChatContext';
import Button from '../shared/Button';

const ChatControls = () => {
  const { clearMessages } = useChat();
  const [isResetting, setIsResetting] = useState(false);

  const handleReset = async () => {
    setIsResetting(true);
    clearMessages();
    await new Promise(resolve => setTimeout(resolve, 500));
    setIsResetting(false);
  };

  return (
    <div className="px-4 py-2 border-b border-gray-200 flex justify-end space-x-2">
      <Button
        variant="outline"
        size="sm"
        onClick={handleReset}
        icon={isResetting ? RotateCcw : Trash2}
        isLoading={isResetting}
      >
        Clear Chat
      </Button>
    </div>
  );
};

export default ChatControls;