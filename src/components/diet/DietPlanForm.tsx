import React from 'react';
import { motion } from 'framer-motion';
import { User, Weight, Activity, Heart, Apple } from 'lucide-react';
import Input from '../shared/Input';
import Button from '../shared/Button';
import { calculateBMI } from '../../utils/calculations';

interface DietPlanFormProps {
  onSubmit: (data: any) => void;
}

const healthConditions = [
  "None",
  "Diabetes",
  "Hypertension",
  "Heart Disease",
  "Obesity",
  "PCOS",
  "Thyroid",
  "Cholesterol"
];

const activityLevels = [
  { id: 'sedentary', label: 'Sedentary (little or no exercise)' },
  { id: 'light', label: 'Lightly active (light exercise 1-3 days/week)' },
  { id: 'moderate', label: 'Moderately active (moderate exercise 3-5 days/week)' },
  { id: 'very', label: 'Very active (hard exercise 6-7 days/week)' },
  { id: 'extra', label: 'Extra active (very hard exercise & physical job)' }
];

const DietPlanForm = ({ onSubmit }: DietPlanFormProps) => {
  const [formData, setFormData] = React.useState({
    age: '',
    gender: 'male',
    weight: '',
    height: '',
    activityLevel: 'sedentary',
    healthCondition: 'None',
    foodPreference: 'non-vegetarian',
    allergies: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const bmi = calculateBMI(
      Number(formData.weight),
      Number(formData.height)
    );
    onSubmit({ ...formData, bmi });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-6 shadow-lg"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <Input
            label="Age"
            type="number"
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
            required
            min="1"
            max="120"
            icon={User}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gender
            </label>
            <div className="flex gap-4">
              {['male', 'female'].map((gender) => (
                <label key={gender} className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value={gender}
                    checked={formData.gender === gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="mr-2"
                  />
                  {gender.charAt(0).toUpperCase() + gender.slice(1)}
                </label>
              ))}
            </div>
          </div>

          <Input
            label="Weight (kg)"
            type="number"
            value={formData.weight}
            onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
            required
            min="1"
            max="300"
            icon={Weight}
          />

          <Input
            label="Height (cm)"
            type="number"
            value={formData.height}
            onChange={(e) => setFormData({ ...formData, height: e.target.value })}
            required
            min="1"
            max="300"
            icon={Activity}
          />
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Activity Level
            </label>
            <select
              value={formData.activityLevel}
              onChange={(e) => setFormData({ ...formData, activityLevel: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white/50 
                focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
            >
              {activityLevels.map((level) => (
                <option key={level.id} value={level.id}>
                  {level.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Health Condition
            </label>
            <select
              value={formData.healthCondition}
              onChange={(e) => setFormData({ ...formData, healthCondition: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white/50 
                focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
            >
              {healthConditions.map((condition) => (
                <option key={condition} value={condition}>
                  {condition}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Food Preference
            </label>
            <div className="flex gap-4">
              {['vegetarian', 'non-vegetarian', 'vegan'].map((pref) => (
                <label key={pref} className="flex items-center">
                  <input
                    type="radio"
                    name="foodPreference"
                    value={pref}
                    checked={formData.foodPreference === pref}
                    onChange={(e) => setFormData({ ...formData, foodPreference: e.target.value })}
                    className="mr-2"
                  />
                  {pref.charAt(0).toUpperCase() + pref.slice(1)}
                </label>
              ))}
            </div>
          </div>

          <Input
            label="Food Allergies (if any)"
            type="text"
            value={formData.allergies}
            onChange={(e) => setFormData({ ...formData, allergies: e.target.value })}
            placeholder="e.g., nuts, dairy, shellfish"
            icon={Apple}
          />
        </div>

        <Button type="submit" className="w-full">
          Generate Diet Plan
        </Button>
      </form>
    </motion.div>
  );
};

export default DietPlanForm;