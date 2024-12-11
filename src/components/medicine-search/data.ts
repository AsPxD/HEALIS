import { Medicine, Symptom, Pharmacy } from './types';

export const medicines: Medicine[] = [
  {
    id: 1,
    name: "Paracetamol",
    genericName: "Acetaminophen",
    description: "A common pain reliever and fever reducer used to treat mild to moderate pain and fever.",
    dosageForm: "Tablet",
    dosage: "500mg-1000mg every 4-6 hours as needed. Do not exceed 4000mg in 24 hours.",
    prescriptionRequired: false,
    uses: ["Headache", "Fever", "Body Pain"],
    sideEffects: [
      "Nausea",
      "Stomach pain",
      "Loss of appetite",
      "Allergic reactions (rare)"
    ]
  },
  {
    id: 2,
    name: "Amoxicillin",
    genericName: "Amoxicillin",
    description: "An antibiotic used to treat various bacterial infections.",
    dosageForm: "Capsule",
    dosage: "250mg-500mg every 8 hours, or as prescribed by your doctor.",
    prescriptionRequired: true,
    uses: ["Bacterial Infections", "Chest Infection", "Ear Infection"],
    sideEffects: [
      "Diarrhea",
      "Nausea",
      "Rash",
      "Allergic reactions"
    ]
  },
  {
    id: 3,
    name: "Omeprazole",
    genericName: "Omeprazole",
    description: "A proton pump inhibitor that reduces stomach acid production.",
    dosageForm: "Capsule",
    dosage: "20mg once daily, preferably before breakfast.",
    prescriptionRequired: true,
    uses: ["Acid Reflux", "Heartburn", "Stomach Ulcers"],
    sideEffects: [
      "Headache",
      "Stomach pain",
      "Nausea",
      "Diarrhea"
    ]
  }
];

export const symptoms: Symptom[] = [
  { id: 1, name: "Headache" },
  { id: 2, name: "Fever" },
  { id: 3, name: "Body Pain" },
  { id: 4, name: "Bacterial Infections" },
  { id: 5, name: "Chest Infection" },
  { id: 6, name: "Ear Infection" },
  { id: 7, name: "Acid Reflux" },
  { id: 8, name: "Heartburn" },
  { id: 9, name: "Stomach Ulcers" }
];

export const pharmacies: Pharmacy[] = [
  {
    id: 1,
    name: "LifeCare Pharmacy",
    address: "123 Healthcare Street, Mumbai",
    phone: "+91 98765 43210",
    rating: 4.8,
    hours: "24/7",
    services: ["Home Delivery", "Prescription Refills", "Health Checkups"]
  },
  {
    id: 2,
    name: "MedPlus",
    address: "456 Wellness Road, Mumbai",
    phone: "+91 98765 43211",
    rating: 4.6,
    hours: "8:00 AM - 11:00 PM",
    services: ["Online Orders", "Health Products", "Medicine Counseling"]
  },
  {
    id: 3,
    name: "Apollo Pharmacy",
    address: "789 Health Avenue, Mumbai",
    phone: "+91 98765 43212",
    rating: 4.7,
    hours: "24/7",
    services: ["Lab Tests", "Health Insurance", "Baby Care"]
  }
];