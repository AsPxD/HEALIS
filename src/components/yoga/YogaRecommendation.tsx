import React from 'react';
import { motion } from 'framer-motion';
import { Flower2, Shield } from 'lucide-react';
import Input from '../shared/Input';
import Button from '../shared/Button';
import TagInput from '../shared/TagInput';
import YogaAsanaCard from './YogaAsanaCard';
import { fetchYogaRecommendations } from '../../services/api';
import { YogaAsana, ExperienceLevel, FormData } from './type';
import { EXPERIENCE_LEVELS, COMMON_CONDITIONS } from './constants';

const YogaRecommendation: React.FC = () => {
  const [formData, setFormData] = React.useState<FormData>({
    age: '',
    experience: 'Beginner',
    conditions: []
  });
  const [expandedAsana, setExpandedAsana] = React.useState<number | null>(null);
  const [showRecommendations, setShowRecommendations] = React.useState(false);
  const [filteredAsanas, setFilteredAsanas] = React.useState<YogaAsana[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [warnings, setWarnings] = React.useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchYogaRecommendations(formData);
      
      if (data.status === 'success') {
        setFilteredAsanas(data.recommendations);
        setWarnings(data.warnings || []);
        setShowRecommendations(true);
        setExpandedAsana(null);
      } else {
        setError(data.message || 'Failed to get recommendations');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddCondition = (condition: string) => {
    if (!formData.conditions.includes(condition)) {
      setFormData(prev => ({
        ...prev,
        conditions: [...prev.conditions, condition]
      }));
    }
  };

  const handleRemoveCondition = (condition: string) => {
    setFormData(prev => ({
      ...prev,
      conditions: prev.conditions.filter(c => c !== condition)
    }));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200"
      >
        <div className="flex items-center space-x-3 mb-8">
          <Flower2 className="h-8 w-8 text-purple-600" />
          <h1 className="text-2xl font-bold text-gray-900">Personalized Yoga Recommendations</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Age"
            type="number"
            value={formData.age}
            onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
            min="1"
            max="120"
            required
          />

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Experience Level
            </label>
            <div className="grid grid-cols-3 gap-3">
              {EXPERIENCE_LEVELS.map((level) => (
                <button
                  key={level}
                  type="button"
                  className={`px-4 py-2 text-sm font-medium rounded-md ${
                    formData.experience === level
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={() => setFormData(prev => ({ ...prev, experience: level }))}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          <TagInput
            label="Health Conditions"
            tags={formData.conditions}
            onAddTag={handleAddCondition}
            onRemoveTag={handleRemoveCondition}
            suggestions={COMMON_CONDITIONS}
          />

          <Button 
            type="submit" 
            className="w-full"
            isLoading={isLoading}
          >
            Get Recommendations
          </Button>
        </form>
      </motion.div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded flex items-center space-x-2">
          <Shield className="h-5 w-5" />
          <p>{error}</p>
        </div>
      )}

      {warnings.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-yellow-50 border border-yellow-200 rounded-lg p-4"
        >
          <div className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-yellow-600" />
            <h3 className="font-medium text-yellow-800">Important Notes</h3>
          </div>
          <ul className="mt-2 list-disc list-inside space-y-1">
            {warnings.map((warning, index) => (
              <li key={index} className="text-yellow-700 text-sm">{warning}</li>
            ))}
          </ul>
        </motion.div>
      )}

      {showRecommendations && !error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-8"
        >
          <h2 className="text-xl font-semibold text-gray-900">
            Recommended Asanas
          </h2>
          <div className="space-y-4">
            {filteredAsanas.map((asana) => (
              <YogaAsanaCard
                key={asana.id}
                asana={asana}
                isExpanded={expandedAsana === asana.id}
                onToggle={() => setExpandedAsana(expandedAsana === asana.id ? null : asana.id)}
              />
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default YogaRecommendation;