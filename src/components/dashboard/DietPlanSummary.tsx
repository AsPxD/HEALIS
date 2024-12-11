import React from 'react';
import { motion } from 'framer-motion';
import { Apple, Coffee, Sun, Moon } from 'lucide-react';
import Button from '../shared/Button';

const meals = [
  {
    time: 'Breakfast',
    icon: Coffee,
    items: ['Oatmeal with fruits', 'Greek yogurt', 'Green tea'],
    calories: 350
  },
  {
    time: 'Lunch',
    icon: Sun,
    items: ['Grilled chicken salad', 'Brown rice', 'Mixed vegetables'],
    calories: 450
  },
  {
    time: 'Dinner',
    icon: Moon,
    items: ['Baked fish', 'Quinoa', 'Steamed broccoli'],
    calories: 400
  }
];

const DietPlanSummary = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-6 shadow-lg"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
            <Apple className="w-5 h-5 text-green-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">Today's Diet Plan</h2>
        </div>
        <Button variant="outline" size="sm">View Full Plan</Button>
      </div>

      <div className="space-y-6">
        {meals.map((meal) => (
          <div key={meal.time} className="flex items-start gap-4">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center
              ${meal.time === 'Breakfast' ? 'bg-amber-100 text-amber-600' :
                meal.time === 'Lunch' ? 'bg-orange-100 text-orange-600' :
                'bg-indigo-100 text-indigo-600'}`}>
              <meal.icon className="w-5 h-5" />
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-gray-900">{meal.time}</h3>
                <span className="text-sm text-gray-500">{meal.calories} cal</span>
              </div>
              <ul className="space-y-1">
                {meal.items.map((item, index) => (
                  <li key={index} className="text-gray-600 text-sm flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-xl">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-600">Daily Progress</span>
          <span className="font-medium text-gray-900">1200/2000 cal</span>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className="w-3/5 h-full bg-green-500 rounded-full" />
        </div>
      </div>
    </motion.div>
  );
};

export default DietPlanSummary;