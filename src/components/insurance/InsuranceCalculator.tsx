import React from 'react';
import { motion } from 'framer-motion';
import { Calculator, User, Heart, Shield } from 'lucide-react';
import Input from '../shared/Input';
import Button from '../shared/Button';

const InsuranceCalculator = () => {
  const [age, setAge] = React.useState('');
  const [members, setMembers] = React.useState('1');
  const [existingConditions, setExistingConditions] = React.useState<string[]>([]);
  const [coverage, setCoverage] = React.useState('500000');
  const [result, setResult] = React.useState<number | null>(null);

  const conditions = [
    'Diabetes',
    'Hypertension',
    'Heart Disease',
    'Asthma',
    'Thyroid'
  ];

  const calculatePremium = () => {
    // Basic premium calculation logic (simplified for example)
    let basePremium = parseInt(coverage) * 0.02; // 2% of coverage
    
    // Age factor
    const ageFactor = parseInt(age) > 45 ? 1.5 : 1;
    
    // Family members factor
    const membersFactor = parseInt(members) * 0.8;
    
    // Pre-existing conditions factor
    const conditionsFactor = 1 + (existingConditions.length * 0.2);
    
    const finalPremium = Math.round(basePremium * ageFactor * membersFactor * conditionsFactor);
    setResult(finalPremium);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-violet-100 flex items-center justify-center">
          <Calculator className="w-6 h-6 text-violet-600" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-900">Premium Calculator</h3>
          <p className="text-gray-600">Estimate your insurance premium</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <Input
            label="Age"
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            min="1"
            max="100"
            required
            icon={User}
          />

          <Input
            label="Family Members"
            type="number"
            value={members}
            onChange={(e) => setMembers(e.target.value)}
            min="1"
            max="10"
            required
            icon={Heart}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Pre-existing Conditions
          </label>
          <div className="flex flex-wrap gap-2">
            {conditions.map(condition => (
              <button
                key={condition}
                onClick={() => setExistingConditions(prev => 
                  prev.includes(condition)
                    ? prev.filter(c => c !== condition)
                    : [...prev, condition]
                )}
                className={`px-4 py-2 rounded-full transition-all duration-300
                  ${existingConditions.includes(condition)
                    ? 'bg-violet-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-violet-50'
                  }`}
              >
                {condition}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Coverage Amount
          </label>
          <select
            value={coverage}
            onChange={(e) => setCoverage(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white
              focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-300"
          >
            <option value="500000">₹5 Lakhs</option>
            <option value="1000000">₹10 Lakhs</option>
            <option value="2000000">₹20 Lakhs</option>
            <option value="5000000">₹50 Lakhs</option>
          </select>
        </div>

        <Button onClick={calculatePremium} className="w-full" icon={Shield}>
          Calculate Premium
        </Button>

        {result !== null && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-violet-50 rounded-xl"
          >
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Estimated Premium</h4>
            <div className="flex items-baseline">
              <span className="text-3xl font-bold text-violet-600">₹{result.toLocaleString()}</span>
              <span className="text-gray-600 ml-2">/year</span>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              This is an estimate. Actual premium may vary based on detailed assessment.
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default InsuranceCalculator;