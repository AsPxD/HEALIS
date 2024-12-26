import { LucideIcon } from 'lucide-react';

export interface Feature {
  icon: LucideIcon;
  text: string;
}

export interface Slide {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  buttonText: string;
  buttonLink: string;
  accent: string;
  icon: LucideIcon;
  features?: Feature[];
}
