import React from 'react';
import { motion } from 'framer-motion';
import PageHeader from '../components/shared/PageHeader';
import { FloatingElements, GradientBlob } from '../components/shared/BackgroundElements';
import CampaignCard from '../components/ngo/CampaignCard';
import DonationStats from '../components/ngo/DonationStats';
import BlockchainDonation from '../components/ngo/BlockchainDonation';
import FeaturedNGOs from '../components/ngo/FeaturedNGOs';
import ImpactStories from '../components/ngo/ImpactStories';
import ImpactMap from '../components/ngo/ImpactMap';
import DonationModal from '../components/ngo/DonationModal';
import DonationSuccess from '../components/ngo/DonationSuccess';
import Input from '../components/shared/Input';
import { Search } from 'lucide-react';

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
    ngo: "HealthCare For All Foundation",
    locations: ["Bihar", "Uttar Pradesh", "Madhya Pradesh"]
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
    ngo: "Hope For Children",
    locations: ["Mumbai", "Delhi", "Bangalore"]
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
    ngo: "Mind Matters India",
    locations: ["Mumbai", "Pune", "Nagpur"]
  }
];

const NGOCampaigns = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedCampaign, setSelectedCampaign] = React.useState<typeof campaigns[0] | null>(null);
  const [showSuccess, setShowSuccess] = React.useState(false);
  const [donationDetails, setDonationDetails] = React.useState<{
    amount: number;
    campaign: string;
    transactionId: string;
  } | null>(null);

  const filteredCampaigns = campaigns.filter(campaign =>
    campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    campaign.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    campaign.ngo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDonationSuccess = (amount: number) => {
    setDonationDetails({
      amount,
      campaign: selectedCampaign?.title || "",
      transactionId: Math.random().toString(36).substr(2, 9).toUpperCase()
    });
    setSelectedCampaign(null);
    setShowSuccess(true);
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
          title="Support Healthcare NGOs"
          subtitle="Make a difference by contributing to healthcare initiatives"
          gradient="from-rose-500 to-pink-500"
        />

        <div className="space-y-16">
          <DonationStats />
          
          <div className="space-y-8">
            <Input
              label=""
              type="text"
              placeholder="Search campaigns, NGOs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon={Search}
            />

            <div className="grid lg:grid-cols-3 gap-8">
              {filteredCampaigns.map((campaign, index) => (
                <CampaignCard
                  key={campaign.id}
                  campaign={campaign}
                  onDonate={() => setSelectedCampaign(campaign)}
                  featured={index === 1}
                />
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <ImpactMap />
            </div>
            <BlockchainDonation />
          </div>

          <FeaturedNGOs />
          <ImpactStories />
        </div>
      </div>

      {selectedCampaign && (
        <DonationModal
          campaign={selectedCampaign}
          onClose={() => setSelectedCampaign(null)}
          onSuccess={handleDonationSuccess}
        />
      )}

      {showSuccess && donationDetails && (
        <DonationSuccess
          amount={donationDetails.amount}
          campaign={donationDetails.campaign}
          transactionId={donationDetails.transactionId}
          onClose={() => setShowSuccess(false)}
        />
      )}
    </motion.div>
  );
};

export default NGOCampaigns;