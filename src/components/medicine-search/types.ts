export interface Medicine {
  id: number;
  name: string;
  genericName: string;
  description: string;
  dosageForm: string;
  dosage: string;
  prescriptionRequired: boolean;
  uses: string[];
  sideEffects: string[];
}

export interface Symptom {
  id: number;
  name: string;
}

export interface Pharmacy {
  id: number;
  name: string;
  address: string;
  phone: string;
  rating: number;
  hours: string;
  services: string[];
}