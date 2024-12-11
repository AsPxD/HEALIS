import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Activity, Thermometer, Droplet, Brain } from 'lucide-react';

const guides = [
  {
    id: 1,
    title: "Heart Attack",
    icon: Heart,
    color: "bg-red-100 text-red-600",
    steps: [
      "Call emergency services immediately (102)",
      "Help the person sit down and stay calm",
      "Loosen any tight clothing",
      "If prescribed, assist with taking aspirin",
      "Be prepared to perform CPR if needed"
    ]
  },
  {
    id: 2,
    title: "Stroke",
    icon: Brain,
    color: "bg-purple-100 text-purple-600",
    steps: [
      "Remember FAST: Face, Arms, Speech, Time",
      "Call emergency services immediately",
      "Note the time symptoms started",
      "Keep the person still and calm",
      "Do not give food or drink"
    ]
  },
  {
    id: 3,
    title: "Severe Bleeding",
    icon: Droplet,
    color: "bg-blue-100 text-blue-600",
    steps: [
      "Apply direct pressure to the wound",
      "Use a clean cloth or sterile gauze",
      "Elevate the injured area if possible",
      "Keep pressure applied until help arrives",
      "Monitor for signs of shock"
    ]
  }
];

const FirstAidGuide = () => {
  const [expandedGuide, setExpandedGuide] = React.useState<number | null>(null);

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="p-4 bg-gradient-to-r from-red-500 to-rose-500">
        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
          <Activity className="w-6 h-6" />
          Emergency First Aid Guide
        </h2>
      </div>
      
      <div className="p-6 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {guides.map((guide) => (
          <motion.div
            key={guide.id}
            layout
            onClick={() => setExpandedGuide(expandedGuide === guide.id ? null : guide.id)}
            className="rounded-xl border border-gray-200 hover:border-red-200 
              hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden"
          >
            <div className="p-4">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-lg ${guide.color} 
                  flex items-center justify-center`}>
                  <guide.icon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-gray-900">{guide.title}</h3>
              </div>

              <motion.div
                initial={false}
                animate={{ height: expandedGuide === guide.id ? 'auto' : '0' }}
                className="overflow-hidden"
              >
                <ul className="space-y-2 text-gray-600 text-sm">
                  {guide.steps.map((step, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-red-50 text-red-500 
                        flex items-center justify-center flex-shrink-0 mt-0.5">
                        {index + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FirstAidGuide;