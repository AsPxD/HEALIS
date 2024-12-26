import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight, Activity, Heart, Brain, Shield, 
  Database, 
  FileText,FolderLock  } from 'lucide-react';
import Button from '../shared/Button';

const slides = [
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

const HeroSection = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [isTransitioning, setIsTransitioning] = React.useState(false);

  const handleNavigation = (path) => {
    navigate(path);
  };

  const nextSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      setTimeout(() => setIsTransitioning(false), 1000);
    }
  };

  const prevSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
      setTimeout(() => setIsTransitioning(false), 1000);
    }
  };

  React.useEffect(() => {
    const timer = setInterval(nextSlide, 7000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {slides.map((slide, index) => (
        <motion.div
          key={index}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out transform
            ${index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-110'}`}
        >
          {/* Background Image & Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-r ${slide.accent} z-10`} />
          <img
            src={slide.image}
            alt={slide.title}
            className="object-cover w-full h-full transform scale-105"
          />

          {/* Content */}
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-center text-white"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm mx-auto mb-6
                    flex items-center justify-center"
                >
                  <slide.icon className="w-10 h-10" />
                </motion.div>

                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-lg md:text-xl mb-4 inline-block"
                >
                  {slide.subtitle}
                </motion.span>
                
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
                >
                  {slide.title}
                </motion.h1>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-lg md:text-xl mb-8 max-w-3xl mx-auto"
                >
                  {slide.description}
                </motion.p>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-center gap-4"
                >
                  <Button
                    onClick={() => handleNavigation(slides[currentSlide].buttonLink)}
                    className="bg-white text-gray-900 hover:bg-white/90"
                    icon={ArrowRight}
                  >
                    {slides[currentSlide].buttonText}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleNavigation('/features')}
                    className="border-white text-white hover:bg-white/20"
                  >
                    View Features
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      ))}

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        disabled={isTransitioning}
        className="absolute left-8 top-1/2 -translate-y-1/2 z-30 p-4 rounded-full
          bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all duration-300
          transform hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed
          group"
      >
        <ChevronLeft className="h-8 w-8 text-white transform group-hover:-translate-x-1 transition-transform" />
      </button>
      
      <button
        onClick={nextSlide}
        disabled={isTransitioning}
        className="absolute right-8 top-1/2 -translate-y-1/2 z-30 p-4 rounded-full
          bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all duration-300
          transform hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed
          group"
      >
        <ChevronRight className="h-8 w-8 text-white transform group-hover:translate-x-1 transition-transform" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => !isTransitioning && setCurrentSlide(index)}
            className={`w-16 h-2 rounded-full transition-all duration-300 transform
              ${index === currentSlide 
                ? 'bg-white w-24' 
                : 'bg-white/50 hover:bg-white/70'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSection;