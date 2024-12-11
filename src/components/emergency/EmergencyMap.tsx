import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Building2, Phone } from 'lucide-react';

const hospitals = [
  {
    id: 1,
    name: "City General Hospital",
    position: [19.0760, 72.8777],
    type: "General Hospital",
    emergency: "24/7",
    contact: "+91 22 1234 5678"
  },
  {
    id: 2,
    name: "LifeCare Medical Center",
    position: [19.0830, 72.8900],
    type: "Multi-Specialty",
    emergency: "24/7",
    contact: "+91 22 8765 4321"
  },
  {
    id: 3,
    name: "Apollo Hospital",
    position: [19.0690, 72.8677],
    type: "Super-Specialty",
    emergency: "24/7",
    contact: "+91 22 9876 5432"
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

const EmergencyMap = () => {
  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="p-4 bg-gradient-to-r from-red-500 to-rose-500">
        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
          <Building2 className="w-6 h-6" />
          Nearby Emergency Services
        </h2>
      </div>
      
      <div className="h-[600px] relative">
        <MapContainer
          center={[19.0760, 72.8777]}
          zoom={13}
          className="h-full w-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {hospitals.map(hospital => (
            <Marker
              key={hospital.id}
              position={hospital.position as [number, number]}
              icon={customIcon}
            >
              <Popup>
                <div className="p-2">
                  <h3 className="font-semibold text-gray-900">{hospital.name}</h3>
                  <p className="text-sm text-gray-600">{hospital.type}</p>
                  <p className="text-sm text-gray-600">Emergency: {hospital.emergency}</p>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Phone className="w-4 h-4" />
                    <span>{hospital.contact}</span>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default EmergencyMap;