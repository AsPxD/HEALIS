import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Heart, Wind, Brain, Award } from 'lucide-react';
import { YogaAsana } from './type';
import { splitIntoSteps } from '../../utils/textProcessing';

interface YogaAsanaCardProps {
  asana: YogaAsana;
  isExpanded: boolean;
  onToggle: () => void;
}

const YogaAsanaCard: React.FC<YogaAsanaCardProps> = ({ asana, isExpanded, onToggle }) => {
  // Convert benefits string to a paragraph
  const benefitsParagraph = typeof asana.benefits === 'string' 
    ? asana.benefits.trim()
    : '';

  // Convert description to steps
  const stepsList = typeof asana.description === 'string'
    ? splitIntoSteps(asana.description)
    : Array.isArray(asana.description)
      ? asana.description
      : [];

  // Generate a relevant placeholder image URL based on the pose name
  const imageUrl = `https://source.unsplash.com/800x600/?yoga,${encodeURIComponent(asana.name.toLowerCase())}`;

  // Round the score to 2 digits
  const roundedScore = asana.score ? asana.score.toFixed(2) : null;

  return (
    <motion.div
      layout
      className="bg-white rounded-lg shadow-md overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div 
        className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={onToggle}
      >
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <h3 className="text-xl font-semibold text-gray-900">{asana.name}</h3>
            <div className="flex items-center space-x-4">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                asana.level === 'Beginner' ? 'bg-green-100 text-green-800' :
                asana.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                <Award className="w-3 h-3 mr-1" />
                {asana.level}
              </span>
              {roundedScore && (
                <span className="text-sm text-gray-500">
                  Score: {roundedScore}
                </span>
              )}
            </div>
          </div>
          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            className="overflow-hidden"
          >
            <div className="p-6 pt-0 border-t border-gray-100 space-y-6">
              {/* Image Section */}
              <div className="relative aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                <img
                  src={imageUrl}
                  alt={asana.name}
                  className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Steps Section */}
              <div className="space-y-3">
                <h4 className="font-medium text-gray-900 flex items-center">
                  <Brain className="w-4 h-4 mr-2" />
                  How to Perform
                </h4>
                <ol className="list-decimal list-inside space-y-2">
                  {stepsList.map((step, index) => (
                    <li key={index} className="text-gray-600 leading-relaxed pl-2">
                      <span className="ml-2">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Benefits Section */}
              <div className="space-y-3">
                <h4 className="font-medium text-gray-900 flex items-center">
                  <Heart className="w-4 h-4 mr-2" />
                  Benefits
                </h4>
                <p className="text-gray-600 leading-relaxed">{benefitsParagraph}</p>
              </div>

              {/* Breathing Section */}
              {asana.breathing && (
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900 flex items-center">
                    <Wind className="w-4 h-4 mr-2" />
                    Breathing Technique
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    {asana.breathing}
                  </p>
                </div>
              )}

              {/* Keywords Section */}
              {asana.keywords && asana.keywords.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-4">
                  {asana.keywords.map((keyword, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default YogaAsanaCard;
