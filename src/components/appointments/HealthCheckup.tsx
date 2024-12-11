import React from 'react';
import { motion } from 'framer-motion';
import { Search, Clock, Calendar as CalendarIcon, MapPin, Activity } from 'lucide-react';
import Input from '../shared/Input';
import Button from '../shared/Button';

const packages = [
  {
    id: 1,
    name: "Basic Health Checkup",
    description: "Essential health screening including blood tests, urine analysis, and basic physical examination",
    tests: ["Complete Blood Count", "Liver Function", "Kidney Function", "Blood Sugar", "Lipid Profile"],
    duration: "2-3 hours",
    price: 1999,
    locations: ["Andheri", "Bandra", "Powai"]
  },
  {
    id: 2,
    name: "Comprehensive Health Package",
    description: "Detailed health assessment with advanced screenings and specialist consultation",
    tests: [
      "All Basic Tests",
      "Thyroid Profile",
      "Vitamin Deficiency",
      "ECG",
      "Chest X-Ray",
      "Dental Checkup",
      "Eye Checkup"
    ],
    duration: "4-5 hours",
    price: 4999,
    locations: ["Andheri", "Bandra"]
  },
  {
    id: 3,
    name: "Executive Health Screening",
    description: "Premium health assessment with complete body checkup and multiple specialist consultations",
    tests: [
      "All Comprehensive Tests",
      "CT Scan",
      "Bone Density",
      "Stress Test",
      "Pulmonary Function",
      "Audiometry",
      "Diet Consultation"
    ],
    duration: "6-7 hours",
    price: 9999,
    locations: ["Bandra"]
  }
];

const HealthCheckup = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedPackage, setSelectedPackage] = React.useState<number | null>(null);
  const [selectedLocation, setSelectedLocation] = React.useState("");

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <Input
          label=""
          type="text"
          placeholder="Search health packages..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          icon={Search}
        />

        <div className="space-y-4">
          {packages
            .filter(pkg =>
              pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              pkg.description.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map(pkg => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-6 rounded-2xl transition-all duration-300 cursor-pointer
                  ${selectedPackage === pkg.id
                    ? 'bg-violet-50 border-2 border-violet-500'
                    : 'bg-white/80 border border-gray-200 hover:border-violet-200'
                  }`}
                onClick={() => setSelectedPackage(pkg.id)}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{pkg.name}</h3>
                    <p className="text-gray-600 mb-4">{pkg.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 text-gray-600 mb-4">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>Duration: {pkg.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Activity className="w-4 h-4" />
                        <span>{pkg.tests.length} Tests Included</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="font-medium text-gray-900">Tests Included:</p>
                      <div className="flex flex-wrap gap-2">
                        {pkg.tests.map((test, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-violet-50 text-violet-700 rounded-full text-sm"
                          >
                            {test}
                          </span>
                        ))}
                      </div>
                    </div>

                    {selectedPackage === pkg.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-4 pt-4 border-t border-gray-200"
                      >
                        <p className="font-medium text-gray-900 mb-2">Select Location</p>
                        <div className="flex flex-wrap gap-2">
                          {pkg.locations.map(location => (
                            <button
                              key={location}
                              onClick={() => setSelectedLocation(location)}
                              className={`px-4 py-2 rounded-lg transition-all duration-300
                                ${selectedLocation === location
                                  ? 'bg-violet-500 text-white'
                                  : 'bg-violet-50 text-violet-700 hover:bg-violet-100'
                                }`}
                            >
                              {location}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>
                  
                  <div className="text-right">
                    <p className="text-2xl font-bold text-violet-600">₹{pkg.price}</p>
                  </div>
                </div>
              </motion.div>
            ))}
        </div>
      </div>

      {selectedPackage && selectedLocation && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Package Summary</h3>
            <div className="space-y-3 text-gray-600">
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                <span>{packages.find(p => p.id === selectedPackage)?.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span>{selectedLocation}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{packages.find(p => p.id === selectedPackage)?. duration}</span>
              </div>
              <div className="pt-3 border-t border-gray-200">
                <div className="flex justify-between items-center font-bold">
                  <span>Package Fee</span>
                  <span className="text-violet-600">
                    ₹{packages.find(p => p.id === selectedPackage)?.price}
                  </span>
                </div>
              </div>
            </div>
            <Button className="w-full mt-6">
              Book Health Checkup
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default HealthCheckup;