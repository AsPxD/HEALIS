import { 
    Activity, 
    Heart, 
    Brain, 
    Shield, 
    Database, 
    FileText, 
    FolderLock 
  } from 'lucide-react';
  import { Slide } from './types';
  
  export const slides: Slide[] = [
    {
      title: "Health DigiLocker",
      subtitle: "Your Complete Medical History in One Secure Place",
      description: "Store, access, and analyze your entire medical journey with our advanced DigiLocker. From prescriptions to lab reports, everything is encrypted and available at your fingertips with real-time health analytics.",
      image: "diglocker.webp",
      buttonText: "Access DigiLocker",
      buttonLink: "/digilocker",
      accent: "from-indigo-600/80 to-blue-500/80",
      icon: FolderLock,
      features: [
        { icon: Database, text: "Secure Cloud Storage" },
        { icon: FileText, text: "Real-time Analytics" },
        { icon: Shield, text: "End-to-End Encryption" }
      ]
    },
    {
      title: "Your Health, Our Priority",
      subtitle: "Experience the future of healthcare with AI-powered solutions",
      description: "Connect with top healthcare professionals, track your health metrics, and access personalized care - all in one place.",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=2070",
      buttonText: "Get Started",
      buttonLink: "/auth",
      accent: "from-blue-600/80 to-cyan-500/80",
      icon: Activity
    },
    {
      title: "Smart Health Monitoring",
      subtitle: "AI-powered insights for better health decisions",
      description: "Track your vitals, get personalized recommendations, and stay on top of your health goals with advanced analytics.",
      image: "https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&q=80&w=2070",
      buttonText: "Explore Features",
      buttonLink: "/features",
      accent: "from-violet-600/80 to-purple-500/80",
      icon: Heart
    },
    {
      title: "Mental Wellness Support",
      subtitle: "Comprehensive mental health resources",
      description: "Access professional support, guided meditation, and personalized wellness plans for your mental health journey.",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=2070",
      buttonText: "Start Journey",
      buttonLink: "/health-insights",
      accent: "from-emerald-600/80 to-teal-500/80",
      icon: Brain
    },
    {
      title: "Emergency Support 24/7",
      subtitle: "Immediate assistance when you need it most",
      description: "Access emergency services, find nearby hospitals, and get instant medical guidance anytime, anywhere.",
      image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&q=80&w=2070",
      buttonText: "Learn More",
      buttonLink: "/emergency",
      accent: "from-rose-600/80 to-pink-500/80",
      icon: Shield
    }
  ];