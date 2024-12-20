import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import Input from '../shared/Input';
import MedicineCard from './MedicineCard';

// API Response Type
interface MedicineFromAPI {
  Name: string;
  Composition: string[];
  Uses: string[];
  Manufacturer: string;
  Score: number;
  img_url: string;
}

// MedicineByName Component
const MedicineByName: React.FC = () => {
  // State management
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [medicines, setMedicines] = useState<MedicineFromAPI[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch medicines when search term changes
  useEffect(() => {
    // Abort controller to cancel ongoing fetch requests
    const controller = new AbortController();
    const signal = controller.signal;

    // Function to fetch medicines
    const fetchMedicines = async () => {
      // Skip fetching if search term is too short
      if (searchTerm.trim().length < 2) {
        setMedicines([]);
        return;
      }

      // Set loading state
      setIsLoading(true);
      setError(null);

      try {
        // Fetch medicines from API
        const response = await fetch(`http://localhost:5000/api/search/name/${encodeURIComponent(searchTerm)}`, {
          signal,
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        // Handle response errors
        if (!response.ok) {
          throw new Error('Failed to fetch medicines');
        }

        // Parse response data
        const data: MedicineFromAPI[] = await response.json();
        setMedicines(data);
      } catch (err) {
        // Handle fetch errors
        if (err instanceof Error && err.name !== 'AbortError') {
          setError(err.message);
          setMedicines([]);
        }
      } finally {
        // Reset loading state
        setIsLoading(false);
      }
    };

    // Debounce search to reduce API calls
    const timerId = setTimeout(fetchMedicines, 300);

    // Cleanup function
    return () => {
      clearTimeout(timerId);
      controller.abort(); // Cancel ongoing fetch
    };
  }, [searchTerm]);

  // Convert API medicine to local medicine type
  const convertToLocalMedicineType = (apiMedicine: MedicineFromAPI) => ({
    id: apiMedicine.Name,
    name: apiMedicine.Name,
    genericName: apiMedicine.Composition.join(', '),
    description: `Manufactured by ${apiMedicine.Manufacturer}`,
    uses: apiMedicine.Uses,
    prescriptionRequired: apiMedicine.Score > 3,
    dosageForm: 'Tablet',
    dosage: 'Consult your healthcare provider',
    sideEffects: ['Consult package insert for complete information'],
    img_url: apiMedicine.img_url
  });

  return (
    <div className="space-y-6">
      {/* Search Input */}
      <Input
        label=""
        type="text"
        placeholder="Search medicines by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        icon={Search}
      />

      {/* Loading State */}
      {isLoading && (
        <div className="text-center py-12">
          <p className="text-gray-600">Loading medicines...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="text-center py-12">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {/* Medicines Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {medicines.map((medicine) => (
          <MedicineCard 
            key={medicine.Name} 
            medicine={convertToLocalMedicineType(medicine)} 
          />
        ))}
      </div>

      {/* No Results State */}
      {!isLoading && medicines.length === 0 && searchTerm && (
        <div className="text-center py-12">
          <p className="text-gray-600">No medicines found matching your search.</p>
        </div>
      )}
    </div>
  );
};

export default MedicineByName;