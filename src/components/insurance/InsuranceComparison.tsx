import React from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, ArrowUpDown } from 'lucide-react';
import Input from '../shared/Input';
import Button from '../shared/Button';
import InsurancePlanCard from './InsurancePlanCard';
import { insurancePlans } from './data';

const InsuranceComparison = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedProvider, setSelectedProvider] = React.useState('all');
  const [sortBy, setSortBy] = React.useState<'premium' | 'coverage'>('premium');

  const providers = ['all', ...new Set(insurancePlans.map(plan => plan.provider))];

  const filteredPlans = insurancePlans
    .filter(plan => {
      const matchesSearch = plan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          plan.provider.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesProvider = selectedProvider === 'all' || plan.provider === selectedProvider;
      return matchesSearch && matchesProvider;
    })
    .sort((a, b) => {
      if (sortBy === 'premium') {
        return a.monthlyPremium - b.monthlyPremium;
      }
      return parseInt(b.sumInsured) - parseInt(a.sumInsured);
    });

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Input
            label=""
            type="text"
            placeholder="Search plans..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={Search}
          />
        </div>

        <div className="flex gap-4">
          <select
            value={selectedProvider}
            onChange={(e) => setSelectedProvider(e.target.value)}
            className="px-4 py-3 rounded-xl border border-gray-300 bg-white/50 
              focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-300"
          >
            {providers.map(provider => (
              <option key={provider} value={provider}>
                {provider.charAt(0).toUpperCase() + provider.slice(1)}
              </option>
            ))}
          </select>

          <Button
            variant="outline"
            onClick={() => setSortBy(prev => prev === 'premium' ? 'coverage' : 'premium')}
            icon={ArrowUpDown}
          >
            Sort by {sortBy === 'premium' ? 'Premium' : 'Coverage'}
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPlans.map((plan, index) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <InsurancePlanCard
              plan={plan}
              isPopular={index === 1}
              onSelect={() => {
                console.log('Selected plan:', plan);
              }}
            />
          </motion.div>
        ))}
      </div>

      {filteredPlans.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <p className="text-gray-600">No insurance plans found matching your criteria.</p>
        </motion.div>
      )}
    </div>
  );
};

export default InsuranceComparison;