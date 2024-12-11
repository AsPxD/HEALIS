export interface Campaign {
  id: number;
  title: string;
  description: string;
  image: string;
  goal: number;
  raised: number;
  donors: number;
  daysLeft: number;
  ngo: string;
  locations?: string[];
}

export interface NGO {
  id: number;
  name: string;
  description: string;
  image: string;
  impact: string;
  rating: number;
  verified: boolean;
}

export interface ImpactStory {
  id: number;
  quote: string;
  author: string;
  location: string;
  image: string;
  campaign: string;
}