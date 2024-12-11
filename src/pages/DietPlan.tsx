import React from 'react';
import { motion } from 'framer-motion';
import { Apple, Calculator, Calendar, CreditCard, User, Weight, Activity } from 'lucide-react';
import PageHeader from '../components/shared/PageHeader';
import { FloatingElements, GradientBlob } from '../components/shared/BackgroundElements';
import DietPlanForm from '../components/diet/DietPlanForm';
import DietPlanDisplay from '../components/diet/DietPlanDisplay';
import NutritionistBooking from '../components/diet/NutritionistBooking';

const DietPlan = () => {
  const [showPlan, setShowPlan] = React.useState(false);
  const [userDetails, setUserDetails] = React.useState<any>(null);

  const handleFormSubmit = (data: any) => {
    setUserDetails(data);
    setShowPlan(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="pt-24 pb-16 min-h-screen relative"
    >
      <FloatingElements />
      <GradientBlob />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <PageHeader
          title="Personalized Diet Plans"
          subtitle="Get customized nutrition advice based on your health profile"
          gradient="from-green-500 to-emerald-500"
        />

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {!showPlan ? (
              <DietPlanForm onSubmit={handleFormSubmit} />
            ) : (
              <DietPlanDisplay userDetails={userDetails} />
            )}
          </div>

          <div>
            <NutritionistBooking />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DietPlan;