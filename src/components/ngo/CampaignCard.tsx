import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Users, Target, Calendar, MapPin, Building2 } from 'lucide-react';
import Button from '../shared/Button';
import { Campaign } from './types';

interface CampaignCardProps {
  campaign: Campaign;
  onDonate: () => void;
  featured?: boolean;
}

const CampaignCard = ({ campaign, onDonate, featured }: CampaignCardProps) => {
  const progressPercentage = (campaign.raised / campaign.goal) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200 
        transition-all duration-300 hover:shadow-xl ${featured ? 'transform lg:scale-105' : ''}`}
    >
      {featured && (
        <div className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-4 py-2 text-center">
          <span className="text-sm font-medium">Featured Campaign</span>
        </div>
      )}

      <div className="relative h-48 overflow-hidden">
        <motion.img
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          src={campaign.image}
          alt={campaign.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-xl font-bold text-white mb-1">{campaign.title}</h3>
          <div className="flex items-center gap-2 text-white/90">
            <Building2 className="w-4 h-4" />
            <span className="text-sm">{campaign.ngo}</span>
          </div>
        </div>
      </div>

      <div className="p-6">
        <p className="text-gray-600 mb-6">{campaign.description}</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Stat icon={Target} label="Goal" value={`₹${(campaign.goal / 100000).toFixed(1)}L`} />
          <Stat icon={Heart} label="Raised" value={`₹${(campaign.raised / 100000).toFixed(1)}L`} />
          <Stat icon={Users} label="Donors" value={campaign.donors.toString()} />
          <Stat icon={Calendar} label="Days Left" value={campaign.daysLeft.toString()} />
        </div>

        <div className="space-y-4">
          <div className="relative w-full h-2 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-rose-500 to-pink-500"
            />
          </div>

          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>{progressPercentage.toFixed(1)}% Funded</span>
            <span>₹{(campaign.goal - campaign.raised).toLocaleString()} to go</span>
          </div>

          {campaign.locations && (
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="w-4 h-4" />
              <span>{campaign.locations.join(', ')}</span>
            </div>
          )}

          <Button onClick={onDonate} className="w-full" icon={Heart}>
            Donate Now
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

const Stat = ({ icon: Icon, label, value }: { icon: any; label: string; value: string }) => (
  <div className="text-center">
    <div className="flex items-center justify-center w-10 h-10 rounded-full mx-auto mb-2
      bg-rose-100 text-rose-600">
      <Icon className="w-5 h-5" />
    </div>
    <p className="text-sm text-gray-600">{label}</p>
    <p className="font-semibold">{value}</p>
  </div>
);

export default CampaignCard;