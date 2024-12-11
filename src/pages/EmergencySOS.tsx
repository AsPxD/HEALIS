import React from 'react';
import { motion } from 'framer-motion';
import { Phone, MapPin, FileText, AlertTriangle, Heart } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import PageHeader from '../components/shared/PageHeader';
import Button from '../components/shared/Button';
import { FloatingElements, GradientBlob } from '../components/shared/BackgroundElements';
import 'leaflet/dist/leaflet.css';

const EmergencySOS = () => {
  const [location, setLocation] = React.useState<[number, number] | null>(null);
  const [isSharing, setIsSharing] = React.useState(false);

  const handleEmergency = () => {
    // Simulate emergency call
    window.location.href = 'tel:102';
  };

  const shareLocation = () => {
    if (navigator.geolocation) {
      setIsSharing(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation([position.coords.latitude, position.coords.longitude]);
          setIsSharing(false);
        },
        (error) => {
          console.error(error);
          setIsSharing(false);
        }
      );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pt-24 pb-16 min-h-screen relative"
    >
      <FloatingElements />
      <GradientBlob />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <PageHeader
          title="Emergency SOS"
          subtitle="Quick access to emergency services with location sharing"
          gradient="from-red-500 to-rose-500"
        />

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Emergency Actions */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-red-500 to-rose-500 rounded-2xl p-6 text-white"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Emergency Contact</h2>
                  <p className="opacity-90">Get immediate medical assistance</p>
                </div>
              </div>

              <Button
                onClick={handleEmergency}
                className="w-full bg-white/20 hover:bg-white/30 mb-4"
              >
                Call Emergency Services (102)
              </Button>

              <Button
                onClick={shareLocation}
                variant="outline"
                className="w-full border-white/20 hover:bg-white/10"
                isLoading={isSharing}
              >
                Share Location
              </Button>
            </motion.div>

            {/* Medical Profile */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-6 shadow-lg"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Medical Profile</h2>
                  <p className="text-gray-600">Quick access to vital information</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-xl">
                  <h3 className="font-medium text-gray-900 mb-2">Blood Type</h3>
                  <p className="text-gray-600">O Positive</p>
                </div>

                <div className="p-4 bg-gray-50 rounded-xl">
                  <h3 className="font-medium text-gray-900 mb-2">Allergies</h3>
                  <p className="text-gray-600">Penicillin, Peanuts</p>
                </div>

                <div className="p-4 bg-gray-50 rounded-xl">
                  <h3 className="font-medium text-gray-900 mb-2">Medical Conditions</h3>
                  <p className="text-gray-600">Asthma, Hypertension</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Map Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl overflow-hidden shadow-lg"
          >
            <div className="p-6 bg-gradient-to-r from-red-500 to-rose-500">
              <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                <MapPin className="w-6 h-6" />
                Your Location
              </h2>
            </div>
            
            <div className="h-[600px] relative">
              {location ? (
                <MapContainer
                  center={location}
                  zoom={15}
                  className="h-full w-full"
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={location}>
                    <Popup>You are here</Popup>
                  </Marker>
                </MapContainer>
              ) : (
                <div className="h-full flex items-center justify-center bg-gray-50">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Share your location to view the map</p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Emergency Guidelines */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 bg-amber-50 border border-amber-200 rounded-xl p-6"
        >
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-semibold text-amber-800 mb-2">Emergency Guidelines</h3>
              <ul className="space-y-2 text-amber-700">
                <li>Stay calm and assess the situation</li>
                <li>If unconscious, check breathing and pulse</li>
                <li>Call emergency services immediately for serious conditions</li>
                <li>Keep your medical profile updated</li>
                <li>Share your location with emergency services when requested</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default EmergencySOS;