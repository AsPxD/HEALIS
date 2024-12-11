import { Message } from '../types/chat';

const healthRelatedResponses = [
  // Common Symptoms
  {
    pattern: /\b(headache|migraine|head pain|head ache)\b/i,
    response: "If you're experiencing a headache, here are some tips:\n\n1. Immediate actions:\n- Find a quiet, dark room to rest\n- Apply a cold or warm compress\n- Stay hydrated\n- Try deep breathing exercises\n\n2. Medications:\n- Consider over-the-counter pain relievers like:\n  • Ibuprofen\n  • Acetaminophen\n  • Aspirin\n\n3. When to seek help:\n- If headache is severe or sudden\n- Accompanied by fever or stiff neck\n- Causes confusion or weakness\n\nPlease consult a healthcare provider if symptoms persist or worsen."
  },
  {
    pattern: /\b(fever|high temperature|feeling hot)\b/i,
    response: "For fever management:\n\n1. Home care:\n- Rest and stay hydrated\n- Dress in lightweight clothing\n- Keep room temperature comfortable\n- Use a light blanket\n\n2. Medications:\n- Acetaminophen (Tylenol)\n- Ibuprofen (Advil, Motrin)\n\n3. Seek immediate medical attention if:\n- Temperature exceeds 103°F (39.4°C)\n- Fever lasts more than 3 days\n- Severe headache or rash develops\n- Difficulty breathing\n\nMonitor temperature regularly and stay hydrated."
  },
  {
    pattern: /\b(cough|cold|flu|runny nose|congestion)\b/i,
    response: "For cold and flu symptoms:\n\n1. Home remedies:\n- Get plenty of rest\n- Stay hydrated with water and warm liquids\n- Use a humidifier\n- Try honey for cough (if over 1 year old)\n\n2. Over-the-counter options:\n- Decongestants\n- Cough suppressants\n- Pain relievers\n\n3. Prevention:\n- Wash hands frequently\n- Avoid close contact with sick people\n- Use tissues when sneezing/coughing\n\nSeek medical attention if symptoms are severe or persist beyond a week."
  },

  // Lifestyle & Prevention
  {
    pattern: /\b(diet|nutrition|food|eating|healthy food)\b/i,
    response: "For a healthy diet:\n\n1. Daily recommendations:\n- 5-9 servings of fruits and vegetables\n- Whole grains (50% of grain intake)\n- Lean proteins\n- Healthy fats\n\n2. Key principles:\n- Portion control\n- Regular meal timing\n- Mindful eating\n- Stay hydrated (8 glasses of water)\n\n3. Foods to limit:\n- Processed foods\n- Added sugars\n- Excessive salt\n- Saturated fats\n\nConsider consulting a nutritionist for personalized advice based on your health needs."
  },
  {
    pattern: /\b(exercise|workout|fitness|physical activity|training)\b/i,
    response: "Exercise recommendations:\n\n1. Weekly targets:\n- 150 minutes moderate activity or\n- 75 minutes vigorous activity\n- Strength training 2-3 times\n\n2. Types of exercise:\n- Cardio (walking, swimming, cycling)\n- Strength training\n- Flexibility work\n- Balance exercises\n\n3. Getting started:\n- Start slowly\n- Gradually increase intensity\n- Listen to your body\n- Stay hydrated\n\nConsult your healthcare provider before starting a new exercise program."
  },
  {
    pattern: /\b(stress|anxiety|depression|mental health|feeling down)\b/i,
    response: "For mental health support:\n\n1. Immediate coping strategies:\n- Deep breathing exercises\n- Progressive muscle relaxation\n- Mindfulness meditation\n- Regular exercise\n\n2. Lifestyle adjustments:\n- Maintain regular sleep schedule\n- Eat balanced meals\n- Limit alcohol and caffeine\n- Stay connected with others\n\n3. Professional help:\n- Consider counseling or therapy\n- Support groups\n- Mental health hotlines\n\nIf you're having severe symptoms or thoughts of self-harm, please contact emergency services or a mental health crisis hotline immediately."
  },

  // Specific Health Concerns
  {
    pattern: /\b(blood pressure|hypertension)\b/i,
    response: "Regarding blood pressure:\n\n1. Normal ranges:\n- Normal: Less than 120/80 mmHg\n- Elevated: 120-129/80 mmHg\n- High: 130/80 mmHg or higher\n\n2. Management:\n- Regular monitoring\n- Medication if prescribed\n- Lifestyle changes\n\n3. Prevention:\n- Reduce sodium intake\n- Regular exercise\n- Maintain healthy weight\n- Limit alcohol\n\nRegular check-ups with your healthcare provider are important."
  },
  {
    pattern: /\b(diabetes|blood sugar|glucose)\b/i,
    response: "For diabetes management:\n\n1. Blood sugar monitoring:\n- Regular testing as advised\n- Keep a log of readings\n- Know your target ranges\n\n2. Lifestyle factors:\n- Balanced diet\n- Regular exercise\n- Medication compliance\n- Foot care\n\n3. Warning signs:\n- Excessive thirst/hunger\n- Frequent urination\n- Fatigue\n- Blurred vision\n\nWork closely with your healthcare team for personalized management."
  },
  {
    pattern: /\b(sleep|insomnia|cant sleep|sleeping problem)\b/i,
    response: "For better sleep:\n\n1. Sleep hygiene tips:\n- Consistent sleep schedule\n- Dark, quiet, cool room\n- Limit screen time before bed\n- Comfortable bedding\n\n2. Lifestyle adjustments:\n- Regular exercise (not near bedtime)\n- Avoid late caffeine\n- Relaxing bedtime routine\n- Manage stress\n\n3. When to seek help:\n- Persistent insomnia\n- Daytime fatigue\n- Loud snoring\n- Sleep apnea symptoms\n\nConsult a sleep specialist if problems persist."
  }
];

const defaultResponses = [
  "I understand your health concern. Could you please provide more specific details about your symptoms or questions? This will help me give you more accurate information.",
  "I'd like to help you better. Could you elaborate on your health question? For example, are you experiencing any specific symptoms or looking for particular health information?",
  "To provide the most helpful information, could you be more specific about your health concern? I'm here to help with detailed guidance based on your needs.",
];

export const generateResponse = (userMessage: string): string => {
  // Convert message to lowercase for better matching
  const message = userMessage.toLowerCase();
  
  // Check for health-related patterns
  for (const { pattern, response } of healthRelatedResponses) {
    if (pattern.test(message)) {
      return response;
    }
  }

  // Return a random default response if no specific pattern matches
  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
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