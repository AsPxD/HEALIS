import React from 'react';
import { motion } from 'framer-motion';
import { Apple, Coffee, Sun, Sunset, Moon, Info } from 'lucide-react';
import { getDietPlan } from './dietPlans';

interface DietPlanDisplayProps {
  userDetails: {
    age: string;
    gender: string;
    weight: string;
    height: string;
    activityLevel: string;
    healthCondition: string;
    foodPreference: string;
    allergies: string;
    bmi: number;
  };
}

const DietPlanDisplay = ({ userDetails }: DietPlanDisplayProps) => {
  const dietPlan = getDietPlan(userDetails);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Health Profile Summary */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Health Profile</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-green-50 rounded-xl">
            <p className="text-sm text-gray-600">BMI</p>
            <p className="text-lg font-semibold text-gray-900">{userDetails.bmi.toFixed(1)}</p>
            <p className="text-sm text-gray-500">
              {userDetails.bmi < 18.5 ? 'Underweight' :
               userDetails.bmi < 25 ? 'Normal weight' :
               userDetails.bmi < 30 ? 'Overweight' : 'Obese'}
            </p>
          </div>
          <div className="p-4 bg-blue-50 rounded-xl">
            <p className="text-sm text-gray-600">Daily Calorie Need</p>
            <p className="text-lg font-semibold text-gray-900">
              {dietPlan.dailyCalories} kcal
            </p>
            <p className="text-sm text-gray-500">Based on your activity level</p>
          </div>
        </div>
      </div>

      {/* Diet Plan */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Your Personalized Diet Plan</h2>
        
        <div className="space-y-6">
          {/* Breakfast */}
          <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
                <Coffee className="w-5 h-5 text-amber-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Breakfast</h3>
            </div>
            <ul className="space-y-2">
              {dietPlan.meals.breakfast.map((item, index) => (
                <li key={index} className="flex items-center gap-2 text-gray-700">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Lunch */}
          <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                <Sun className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Lunch</h3>
            </div>
            <ul className="space-y-2">
              {dietPlan.meals.lunch.map((item, index) => (
                <li key={index} className="flex items-center gap-2 text-gray-700">
                  <span className="w-2 h-2 rounded-full bg-green-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Snacks */}
          <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                <Apple className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Snacks</h3>
            </div>
            <ul className="space-y-2">
              {dietPlan.meals.snacks.map((item, index) => (
                <li key={index} className="flex items-center gap-2 text-gray-700">
                  <span className="w-2 h-2 rounded-full bg-purple-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Dinner */}
          <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                <Moon className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Dinner</h3>
            </div>
            <ul className="space-y-2">
              {dietPlan.meals.dinner.map((item, index) => (
                <li key={index} className="flex items-center gap-2 text-gray-700">
                  <span className="w-2 h-2 rounded-full bg-blue-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Recommendations */}
        <div className="mt-8 p-4 bg-yellow-50 rounded-xl">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-yellow-100 flex items-center justify-center flex-shrink-0">
              <Info className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Recommendations</h3>
              <ul className="space-y-2">
                {dietPlan.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-center gap-2 text-gray-700">
                    <span className="w-2 h-2 rounded-full bg-yellow-400" />
                    {rec}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DietPlanDisplay;