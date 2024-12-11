import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Users, Target, Calendar, Search } from 'lucide-react';
import Input from '../shared/Input';
import Button from '../shared/Button';
import DonationModal from './DonationModal';

const campaigns = [
  {
    id: 1,
    title: "Rural Healthcare Access Initiative",
    description: "Bringing medical facilities and healthcare professionals to remote villages across India.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=2070",
    goal: 5000000,
    raised: 3250000,
    donors: 1245,
    daysLeft: 45,
    ngo: "HealthCare For All Foundation"
  },
  {
    id: 2,
    title: "Children's Cancer Treatment Fund",
    description: "Supporting treatment costs for underprivileged children fighting cancer.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=2070",
    goal: 10000000,
    raised: 7500000,
    donors: 2890,
    daysLeft: 30,
    ngo: "Hope For Children"
  },
  {
    id: 3,
    title: "Mental Health Awareness Program",
    description: "Breaking stigmas and providing mental health support in communities.",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=2070",
    goal: 2000000,
    raised: 950000,
    donors: 678,
    daysLeft: 60,
    ngo: "Mind Matters India"
  }
];

const CampaignsList = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedCampaign, setSelectedCampaign] = React.useState<typeof campaigns[0] | null>(null);

  const filteredCampaigns = campaigns.filter(campaign =>
    campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    campaign.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="space-y-6">
        <Input
          label=""
          type="text"
          placeholder="Search campaigns..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          icon={Search}
        />

        <div className="space-y-6">
          {filteredCampaigns.map((campaign) => (
            <motion.div
              key={campaign.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200"
            >
              <div className="relative h-48">
                <img
                  src={campaign.image}
                  alt={campaign.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-bold text-white">{campaign.title}</h3>
                  <p className="text-white/90">{campaign.ngo}</p>
                </div>
              </div>

              <div className="p-6">
                <p className="text-gray-600 mb-4">{campaign.description}</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-rose-100 
                      text-rose-600 mx-auto mb-2">
                      <Target className="w-5 h-5" />
                    </div>
                    <p className="text-sm text-gray-600">Goal</p>
                    <p className="font-semibold">₹{(campaign.goal / 100000).toFixed(1)}L</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-100 
                      text-emerald-600 mx-auto mb-2">
                      <Heart className="w-5 h-5" />
                    </div>
                    <p className="text-sm text-gray-600">Raised</p>
                    <p className="font-semibold">₹{(campaign.raised / 100000).toFixed(1)}L</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 
                      text-blue-600 mx-auto mb-2">
                      <Users className="w-5 h-5" />
                    </div>
                    <p className="text-sm text-gray-600">Donors</p>
                    <p className="font-semibold">{campaign.donors}</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-amber-100 
                      text-amber-600 mx-auto mb-2">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <p className="text-sm text-gray-600">Days Left</p>
                    <p className="font-semibold">{campaign.daysLeft}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-rose-500 h-2 rounded-full"
                      style={{ width: `${(campaign.raised / campaign.goal) * 100}%` }}
                    />
                  </div>

                  <Button
                    onClick={() => setSelectedCampaign(campaign)}
                    className="w-full"
                    icon={Heart}
                  >
                    Donate Now
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {selectedCampaign && (
        <DonationModal
          campaign={selectedCampaign}
          onClose={() => setSelectedCampaign(null)}
        />
      )}
    </>
  );
};

export default CampaignsList;