import React from 'react';
import { Shield, Award, Gift, Calendar, Brain, Activity, Star, ArrowRight, Crown, Diamond } from 'lucide-react';

const LoyaltySection = () => {
  const [points, setPoints] = React.useState(2450);
  const [selectedTab, setSelectedTab] = React.useState('earn');

  const membershipTiers = [
    {
      name: 'Basic',
      icon: Shield,
      pointsNeeded: 0,
      benefits: ['Basic appointment booking', 'AI health tips', 'Email support']
    },
    {
      name: 'Gold',
      icon: Crown,
      pointsNeeded: 5000,
      benefits: ['Priority appointments', 'AI health assistant', '24/7 chat support']
    },
    {
      name: 'Platinum',
      icon: Diamond,
      pointsNeeded: 10000,
      benefits: ['VIP appointments', 'Family health tracking', 'Personal health concierge']
    }
  ];

  const earningActivities = [
    {
      icon: Calendar,
      activity: 'Book Appointments',
      points: 50,
      description: 'Per confirmed appointment'
    },
    {
      icon: Activity,
      activity: 'Health Check-ups',
      points: 100,
      description: 'Complete your scheduled check-ups'
    },
    {
      icon: Brain,
      activity: 'AI Consultations',
      points: 30,
      description: 'Use AI health assistant'
    }
  ];

  const rewardOptions = [
    {
      icon: Gift,
      reward: 'Free Health Check-up',
      points: 1000,
      description: 'Comprehensive health screening'
    },
    {
      icon: Calendar,
      reward: 'Priority Booking',
      points: 500,
      description: 'Skip the queue for 3 appointments'
    },
    {
      icon: Brain,
      reward: 'Premium AI Features',
      points: 300,
      description: 'Access advanced AI tools for 1 month'
    }
  ];

  // Function to determine current tier
  const getCurrentTier = () => {
    for (let i = membershipTiers.length - 1; i >= 0; i--) {
      if (points >= membershipTiers[i].pointsNeeded) {
        return membershipTiers[i];
      }
    }
    return membershipTiers[0];
  };

  // Function to get next tier
  const getNextTier = () => {
    const currentTierIndex = membershipTiers.findIndex(tier => tier.pointsNeeded > points);
    return currentTierIndex !== -1 ? membershipTiers[currentTierIndex] : null;
  };

  const currentTier = getCurrentTier();
  const nextTier = getNextTier();

  return (
    <section className="py-16 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 text-blue-600 font-medium">
            <Star className="w-5 h-5" />
            HealthCare Rewards
          </span>
          <h2 className="text-3xl font-bold text-gray-900 mt-2 mb-4">
            Your One-Stop Healthcare Journey
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Earn points for every interaction and unlock premium healthcare benefits
          </p>
        </div>

        {/* Membership Tiers */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {membershipTiers.map((tier, index) => (
            <div 
              key={index}
              className={`relative p-6 rounded-2xl ${
                points >= tier.pointsNeeded 
                  ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white'
                  : 'bg-white text-gray-900'
              } shadow-lg`}
            >
              {points >= tier.pointsNeeded && (
                <span className="absolute top-4 right-4 bg-white text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                  Current
                </span>
              )}
              <div className="flex items-center gap-3 mb-4">
                <tier.icon className={`w-6 h-6 ${points >= tier.pointsNeeded ? 'text-white' : 'text-blue-600'}`} />
                <h3 className="text-xl font-bold">{tier.name}</h3>
              </div>
              <p className={`text-sm mb-4 ${points >= tier.pointsNeeded ? 'text-blue-100' : 'text-gray-600'}`}>
                {tier.pointsNeeded.toLocaleString()} points needed
              </p>
              <ul className="space-y-2">
                {tier.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm">
                    <Shield className="w-4 h-4" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Points Card */}
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-blue-100">Available Points</p>
                <h3 className="text-3xl font-bold">{points}</h3>
              </div>
              <Award className="w-12 h-12 opacity-80" />
            </div>
            <div className="h-2 bg-blue-400 rounded-full mb-2">
              <div 
                className="h-full bg-white rounded-full"
                style={{ 
                  width: nextTier 
                    ? `${((points - currentTier.pointsNeeded) / (nextTier.pointsNeeded - currentTier.pointsNeeded)) * 100}%`
                    : '100%'
                }}
              />
            </div>
            <p className="text-sm text-blue-100">
              {nextTier 
                ? `${nextTier.pointsNeeded - points} points to ${nextTier.name}`
                : 'Maximum tier reached!'
              }
            </p>
          </div>

          {/* Main Content Card */}
          <div className="col-span-2 bg-white rounded-2xl shadow-lg">
            {/* Tabs */}
            <div className="border-b">
              <div className="flex gap-4 px-6">
                {['earn', 'redeem'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setSelectedTab(tab)}
                    className={`pb-2 px-4 font-medium capitalize ${
                      selectedTab === tab
                        ? 'border-b-2 border-blue-500 text-blue-600'
                        : 'text-gray-500'
                    }`}
                  >
                    {tab} Points
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              <div className="grid gap-4">
                {selectedTab === 'earn' ? (
                  earningActivities.map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                        <activity.icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">
                          {activity.activity}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {activity.description}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-lg font-bold text-gray-900">
                          +{activity.points}
                        </span>
                        <p className="text-sm text-gray-600">points</p>
                      </div>
                    </div>
                  ))
                ) : (
                  rewardOptions.map((reward, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
                        <reward.icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">
                          {reward.reward}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {reward.description}
                        </p>
                      </div>
                      <button
                        className={`px-4 py-2 rounded-lg font-medium ${
                          points >= reward.points
                            ? 'bg-purple-600 text-white hover:bg-purple-700'
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        }`}
                        disabled={points < reward.points}
                      >
                        {reward.points} points
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: 'Book & Earn',
              description: 'Schedule appointments and earn points instantly',
              icon: Calendar,
              color: 'bg-blue-100 text-blue-600'
            },
            {
              title: 'AI Health Assistant',
              description: 'Get personalized health insights powered by AI',
              icon: Brain,
              color: 'bg-purple-100 text-purple-600'
            },
            {
              title: 'Track Progress',
              description: 'Monitor your health journey and rewards',
              icon: Activity,
              color: 'bg-emerald-100 text-emerald-600'
            }
          ].map((feature, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg p-6">
              <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-4`}>
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LoyaltySection;