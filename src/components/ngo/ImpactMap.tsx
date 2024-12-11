import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import { motion } from 'framer-motion';
import { MapPin, Users, Heart } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

const impactLocations = [
  {
    id: 1,
    name: "Rural Healthcare Center",
    position: [19.0760, 72.8777],
    beneficiaries: 5000,
    description: "Providing essential healthcare services to rural communities",
    donations: "₹15L"
  },
  {
    id: 2,
    name: "Mobile Medical Unit",
    position: [19.0830, 72.8900],
    beneficiaries: 3000,
    description: "Mobile healthcare services reaching remote areas",
    donations: "₹12L"
  },
  {
    id: 3,
    name: "Children's Health Camp",
    position: [19.0690, 72.8677],
    beneficiaries: 2000,
    description: "Regular health checkups and treatments for children",
    donations: "₹8L"
  }
];

const customIcon = new Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const ImpactMap = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200"
    >
      <div className="p-6 bg-gradient-to-r from-rose-500 to-pink-500">
        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
          <MapPin className="w-6 h-6" />
          Impact Map
        </h2>
      </div>
      
      <div className="h-[500px] relative">
        <MapContainer
          center={[19.0760, 72.8777]}
          zoom={12}
          className="h-full w-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {impactLocations.map(location => (
            <Marker
              key={location.id}
              position={location.position as [number, number]}
              icon={customIcon}
            >
              <Popup>
                <div className="p-2">
                  <h3 className="font-semibold text-gray-900">{location.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{location.description}</p>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4 text-blue-500" />
                      <span>{location.beneficiaries.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="w-4 h-4 text-rose-500" />
                      <span>{location.donations}</span>
                    </div>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </motion.div>
  );
};

export default ImpactMap;