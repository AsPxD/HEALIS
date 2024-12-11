import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: "What is covered under pre-existing conditions?",
    answer: "Pre-existing conditions are covered after a waiting period of 2-4 years, depending on the condition and policy terms. Some policies may offer coverage for specific conditions immediately."
  },
  {
    question: "How does the cashless claim process work?",
    answer: "Visit a network hospital, show your health card at admission, fill out pre-authorization form, and the hospital will coordinate with the insurance provider. Approval typically takes 30-60 minutes."
  },
  {
    question: "What is the room rent limit?",
    answer: "Room rent limits vary by policy. Basic plans typically cover standard room charges, while premium plans may cover suite rooms. Check your policy document for specific limits."
  },
  {
    question: "Can I port my existing policy?",
    answer: "Yes, you can port your policy to another insurer while retaining benefits like waiting period credits. Submit a porting request at least 45 days before renewal."
  },
  {
    question: "Are alternative treatments covered?",
    answer: "Many policies cover AYUSH treatments (Ayurveda, Yoga, Unani, Siddha, Homeopathy) up to a certain limit. Premium plans often offer comprehensive alternative treatment coverage."
  }
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">Frequently Asked Questions</h3>
      
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full text-left p-4 rounded-xl bg-gray-50 hover:bg-gray-100
                transition-colors duration-300"
            >
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-gray-900">{faq.question}</h4>
                {openIndex === index ? (
                  <Minus className="w-5 h-5 text-violet-500" />
                ) : (
                  <Plus className="w-5 h-5 text-violet-500" />
                )}
              </div>
              
              {openIndex === index && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-4 text-gray-600"
                >
                  {faq.answer}
                </motion.p>
              )}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;