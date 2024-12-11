export interface InsurancePlan {
  id: number;
  name: string;
  provider: string;
  monthlyPremium: number;
  sumInsured: string;
  color: string;
  keyFeatures: string[];
  additionalBenefits: string[];
}