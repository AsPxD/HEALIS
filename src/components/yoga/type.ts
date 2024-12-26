export interface YogaAsana {
  id?: number;
  name: string;
  description: string;
  benefits: string | string[];
  breathing?: string;
  awareness?: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  score?: number;
  keywords?: string[];
}

export type ExperienceLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export interface FormData {
  age: string;
  experience: ExperienceLevel;
  conditions: string[];
}