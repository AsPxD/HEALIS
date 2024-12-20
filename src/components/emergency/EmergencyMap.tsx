import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Building2, Star, Loader2, Navigation } from 'lucide-react';
import hospitalsData from '../../data/hospitals.json';

interface Hospital {
  id: number;
  name: string;
  position: number[];
  Address: string;
  City: string;
  District: string;
  Density: number;
  Rating: number;
  "Number of Reviews": number;
}

// Fix for default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const hospitalIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const currentLocationIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Component to handle map center updates
const MapUpdater: React.FC<{ center: [number, number] }> = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center);
  }, [center, map]);
  return null;
};

const EmergencyMap: React.FC = () => {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [filteredHospitals, setFilteredHospitals] = useState<Hospital[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentLocation, setCurrentLocation] = useState<[number, number] | null>(null);
  const [selectedRadius, setSelectedRadius] = useState<number>(0); // 0 means show all
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  const radiusOptions = [
    { value: 5, label: '5km' },
    { value: 10, label: '10km' },
    { value: 20, label: '20km' },
    { value: 50, label: '50km' },
    { value: 0, label: 'All Hospitals' }
  ];

  useEffect(() => {
    try {
      setHospitals(hospitalsData as Hospital[]);
      setFilteredHospitals(hospitalsData as Hospital[]);
      setIsLoading(false);
    } catch (err) {
      console.error('Error loading hospitals:', err);
      setError('Failed to load hospitals data');
      setIsLoading(false);
    }
  }, []);

  const getCurrentLocation = () => {
    setIsLoadingLocation(true);
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      setIsLoadingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation([latitude, longitude]);
        setIsLoadingLocation(false);
        filterHospitalsByRadius([latitude, longitude], selectedRadius);
      },
      (error) => {
        console.error('Error getting location:', error);
        setError('Failed to get your location');
        setIsLoadingLocation(false);
      }
    );
  };

  const calculateDistance = (point1: [number, number], point2: [number, number]): number => {
    const R = 6371; // Earth's radius in km
    const lat1 = point1[0] * Math.PI / 180;
    const lat2 = point2[0] * Math.PI / 180;
    const deltaLat = (point2[0] - point1[0]) * Math.PI / 180;
    const deltaLon = (point2[1] - point1[1]) * Math.PI / 180;

    const a = Math.sin(deltaLat/2) * Math.sin(deltaLat/2) +
              Math.cos(lat1) * Math.cos(lat2) *
              Math.sin(deltaLon/2) * Math.sin(deltaLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const filterHospitalsByRadius = (location: [number, number], radius: number) => {
    if (radius === 0) {
      setFilteredHospitals(hospitals);
      return;
    }

    const filtered = hospitals.filter(hospital => {
      const distance = calculateDistance(location, [hospital.position[0], hospital.position[1]]);
      return distance <= radius;
    });

    setFilteredHospitals(filtered);
  };

  useEffect(() => {
    if (currentLocation) {
      filterHospitalsByRadius(currentLocation, selectedRadius);
    }
  }, [selectedRadius, currentLocation]);

  const calculateCenter = (): [number, number] => {
    if (currentLocation) return currentLocation;
    if (hospitals.length === 0) return [15.9129, 79.7400];
    
    const latitudes = hospitals.map(h => h.position[0]);
    const longitudes = hospitals.map(h => h.position[1]);
    
    const centerLat = (Math.min(...latitudes) + Math.max(...latitudes)) / 2;
    const centerLng = (Math.min(...longitudes) + Math.max(...longitudes)) / 2;
    
    return [centerLat, centerLng];
  };

  const calculateZoom = (): number => {
    if (selectedRadius > 0) {
      if (selectedRadius <= 5) return 13;
      if (selectedRadius <= 10) return 12;
      if (selectedRadius <= 20) return 11;
      if (selectedRadius <= 50) return 10;
    }
    if (hospitals.length <= 1) return 12;
    
    const latitudes = hospitals.map(h => h.position[0]);
    const longitudes = hospitals.map(h => h.position[1]);
    
    const latSpread = Math.max(...latitudes) - Math.min(...latitudes);
    const lngSpread = Math.max(...longitudes) - Math.min(...longitudes);
    
    if (latSpread > 2 || lngSpread > 2) return 7;
    if (latSpread > 1 || lngSpread > 1) return 9;
    return 11;
  };

  if (error) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="text-red-500 text-center">
          <p>Error: {error}</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="flex items-center justify-center gap-2">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span>Loading emergency services...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="p-4 bg-gradient-to-r from-red-500 to-rose-500">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            <Building2 className="w-6 h-6" />
            Emergency Services ({filteredHospitals.length})
          </h2>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <button
              onClick={getCurrentLocation}
              disabled={isLoadingLocation}
              className="flex items-center gap-2 bg-white text-red-500 px-4 py-2 rounded-lg hover:bg-red-50 transition-colors"
            >
              {isLoadingLocation ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Navigation className="w-4 h-4" />
              )}
              {isLoadingLocation ? 'Getting location...' : 'Get My Location'}
            </button>
            <select
              value={selectedRadius}
              onChange={(e) => setSelectedRadius(Number(e.target.value))}
              className="bg-white text-gray-800 px-4 py-2 rounded-lg"
            >
              {radiusOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      <div className="h-[600px] relative">
        <MapContainer
          center={calculateCenter()}
          zoom={calculateZoom()}
          className="h-full w-full"
          scrollWheelZoom={true}
        >
          <MapUpdater center={calculateCenter()} />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {currentLocation && (
            <>
              <Marker
                position={currentLocation}
                icon={currentLocationIcon}
              >
                <Popup>
                  <div className="p-2">
                    <h3 className="font-semibold text-gray-900">Your Location</h3>
                  </div>
                </Popup>
              </Marker>
              {selectedRadius > 0 && (
                <Circle
                  center={currentLocation}
                  radius={selectedRadius * 1000}
                  pathOptions={{ color: 'blue', fillColor: 'blue', fillOpacity: 0.1 }}
                />
              )}
            </>
          )}

          {filteredHospitals.map(hospital => (
            <Marker
              key={hospital.id}
              position={[hospital.position[0], hospital.position[1]] as [number, number]}
              icon={hospitalIcon}
            >
              <Popup>
                <div className="p-2">
                  <h3 className="font-semibold text-gray-900">{hospital.name}</h3>
                  <p className="text-sm text-gray-600">{hospital.Address}</p>
                  <p className="text-sm text-gray-600">{hospital.City}, {hospital.District}</p>
                  {currentLocation && (
                    <p className="text-sm text-gray-600 mt-1">
                      Distance: {calculateDistance(currentLocation, [hospital.position[0], hospital.position[1]]).toFixed(1)} km
                    </p>
                  )}
                  <div className="flex items-center gap-1 text-sm text-gray-600 mt-2">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span>
                      {hospital.Rating} ({hospital["Number of Reviews"].toLocaleString()} reviews)
                    </span>
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