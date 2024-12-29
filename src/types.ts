export interface PatientData {
    medication: string;
    dosage: string;
    age: number;
    weight: number;
    gender: string;
    conditions: string[];
    allergies: string[];
    current_meds: string[];
  }
  
  export interface AnalysisResult {
    risk_level: string;
    risk_assessment: string;
    key_findings: string;
    required_actions: string;
    monitoring_plan: string;
    alternatives: string;
  }