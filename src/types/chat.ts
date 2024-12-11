export interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: string;
}

export interface ChatContextType {
  messages: Message[];
  addMessage: (text: string, isBot: boolean) => void;
  clearMessages: () => void;
}