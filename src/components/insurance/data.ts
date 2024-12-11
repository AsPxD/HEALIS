import { InsurancePlan } from './types';

export const insurancePlans: InsurancePlan[] = [
  {
    id: 1,
    name: "Health Shield Basic",
    provider: "Star Health",
    monthlyPremium: 999,
    sumInsured: "500000",
    color: "bg-blue-500",
    keyFeatures: [
      "Cashless treatment at 5000+ hospitals",
      "No medical check-up up to 45 years",
      "Day care procedures covered",
      "Room rent capping - 1% of sum insured"
    ],
    additionalBenefits: [
      "Free annual health check-up",
      "Tax benefits under Section 80D",
      "No claim bonus - 5% yearly"
    ]
  },
  {
    id: 2,
    name: "Health Guard Premium",
    provider: "HDFC ERGO",
    monthlyPremium: 1499,
    sumInsured: "1000000",
    color: "bg-violet-500",
    keyFeatures: [
      "Cashless treatment at 7000+ hospitals",
      "No medical check-up up to 50 years",
      "All day care procedures covered",
      "No room rent capping"
    ],
    additionalBenefits: [
      "Free quarterly health check-up",
      "Alternative treatment coverage",
      "No claim bonus - 10% yearly",
      "International emergency coverage"
    ]
  },
  {
    id: 3,
    name: "Family First Gold",
    provider: "Max Bupa",
    monthlyPremium: 2499,
    sumInsured: "2000000",
    color: "bg-amber-500",
    keyFeatures: [
      "Cashless treatment at 8500+ hospitals",
      "No medical check-up up to 55 years",
      "Unlimited restoration of sum insured",
      "Premium waiver for 1 year on critical illness"
    ],
    additionalBenefits: [
      "Monthly health check-up",
      "International treatment coverage",
      "No claim bonus - 15% yearly",
      "Personal medical concierge"
    ]
  },
  {
    id: 4,
    name: "Senior Care Plus",
    provider: "Star Health",
    monthlyPremium: 1999,
    sumInsured: "1000000",
    color: "bg-emerald-500",
    keyFeatures: [
      "Specialized for 60+ age group",
      "Pre-existing disease coverage from day 1",
      "Home healthcare coverage",
      "Dedicated care manager"
    ],
    additionalBenefits: [
      "Quarterly health check-up",
      "Pharmacy discount program",
      "Teleconsultation coverage",
      "Emergency ambulance services"
    ]
  },
  {
    id: 5,
    name: "Young Shield",
    provider: "HDFC ERGO",
    monthlyPremium: 799,
    sumInsured: "500000",
    color: "bg-rose-500",
    keyFeatures: [
      "Designed for 18-35 age group",
      "Adventure sports coverage",
      "Mental health coverage",
      "Fitness reward program"
    ],
    additionalBenefits: [
      "Annual health check-up",
      "Gym membership reimbursement",
      "Wellness coach access",
      "Preventive healthcare coverage"
    ]
  }
];