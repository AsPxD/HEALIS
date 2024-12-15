import { Groq } from 'groq-sdk';
import { Message } from '../types/chat';

// Initialize Groq client
const groq = new Groq({
  apiKey: process.env.REACT_APP_GROQ_API_KEY || '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',
  dangerouslyAllowBrowser: true // Use only for client-side demos
});

const nonMedicalResponse = "I'm sorry, but I can only assist with medical-related questions. Please ask a health-related query.";

export const generateResponse = async (userMessage: string): Promise<string> => {
  try {
    // First, classify the message as medical or non-medical
    const classificationCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are a classifier for medical questions. 
          Determine if the following message is medical in nature.
          Respond ONLY with "MEDICAL" or "NON-MEDICAL".
          Medical questions include:
          - Inquiries about health conditions
          - Symptoms
          - Medical treatments
          - Health advice
          - Questions about body systems
          - Medical procedures
          - Health-related concerns
          
          Non-medical questions include:
          - General knowledge queries
          - Entertainment
          - Technical questions
          - Personal advice unrelated to health
          - Hypothetical scenarios
          - Mathematical problems
          - Coding or programming questions`
        },
        {
          role: "user",
          content: userMessage
        }
      ],
      model: "llama3-8b-8192",
      max_tokens: 10
    });

    const classification = classificationCompletion.choices[0]?.message?.content?.trim();

    // If not a medical question, return non-medical response
    if (classification !== "MEDICAL") {
      return nonMedicalResponse;
    }

    // If it is a medical question, generate a response
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a helpful AI health assistant. Provide clear, concise, and medically sound advice. Always recommend consulting a healthcare professional for serious concerns."
        },
        {
          role: "user",
          content: userMessage
        }
      ],
      model: "llama3-8b-8192",
      max_tokens: 300
    });

    return chatCompletion.choices[0]?.message?.content || 
      "I apologize, but I couldn't generate a response. Please try rephrasing your medical question.";

  } catch (error) {
    console.error("Error generating AI response:", error);
    return "I'm experiencing difficulties processing your query. Please try again later.";
  }
};

export const formatTimestamp = (date: Date): string => {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

export const createMessage = (text: string, isBot: boolean): Message => ({
  id: Date.now().toString(),
  text,
  isBot,
  timestamp: formatTimestamp(new Date())
});