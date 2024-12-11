import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, Utensils, Footprints } from 'lucide-react';

const lifestyleData = {
  sleep: {
    hours: 7.5,
    quality: 'Good',
    trend: 'improving'
  },
  activity: {
    steps: 8500,
    activeMinutes: 45,
    caloriesBurned: 2200
  },
  diet: {
    calories: 2100,
    protein: 80,
    carbs: 250,
    fat: 70
  }
};

const LifestyleSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-6 shadow-lg"
    >
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Lifestyle Overview</h2>

      <div className="space-y-6">
        {/* Sleep Section */}
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
            <Moon className="w-5 h-5 text-blue-500" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Sleep</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-500">Duration</p>
                <p className="text-lg font-semibold">{lifestyleData.sleep.hours}h</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Quality</p>
                <p className="text-lg font-semibold">{lifestyleData.sleep.quality}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Trend</p>
                <p className="text-lg font-semibold capitalize">{lifestyleData.sleep.trend}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Activity Section */}
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
            <Footprints className="w-5 h-5 text-green-500" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Physical Activity</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-500">Steps</p>
                <p className="text-lg font-semibold">{lifestyleData.activity.steps}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Active Minutes</p>
                <p className="text-lg font-semibold">{lifestyleData.activity.activeMinutes}m</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Calories</p>
                <p className="text-lg font-semibold">{lifestyleData.activity.caloriesBurned}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Diet Section */}
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
            <Utensils className="w-5 h-5 text-amber-500" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nutrition</h3>
            <div className="grid grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-gray-500">Calories</p>
                <p className="text-lg font-semibold">{lifestyleData.diet.calories}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Protein</p>
                <p className="text-lg font-semibold">{lifestyleData.diet.protein}g</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Carbs</p>
                <p className="text-lg font-semibold">{lifestyleData.diet.carbs}g</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Fat</p>
                <p className="text-lg font-semibold">{lifestyleData.diet.fat}g</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LifestyleSection;