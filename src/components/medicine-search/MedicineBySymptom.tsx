import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import Input from '../shared/Input';
import MedicineCard from './MedicineCard';
import { Medicine } from './types';

const MedicineBySymptom: React.FC = () => {
  // State Management
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedSymptom, setSelectedSymptom] = useState<string>('');
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Comprehensive Search Method
  const searchMedicines = async (searchQuery: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // Determine if the search query looks like a composition or a use
      const isComposition = searchQuery.includes('+') || /[a-zA-Z]\s*[a-zA-Z]/.test(searchQuery);

      let usesResponse, compositionResponse;

      if (isComposition) {
        // If it looks like a composition, prioritize composition search
        compositionResponse = await fetch(
          `http://localhost:5000/api/search/composition?q=${encodeURIComponent(searchQuery)}`, 
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );

        // Fallback to uses search if composition search yields no results
        usesResponse = await fetch(
          `http://localhost:5000/api/search/uses?q=${encodeURIComponent(searchQuery)}`, 
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );
      } else {
        // If it doesn't look like a composition, prioritize uses search
        usesResponse = await fetch(
          `http://localhost:5000/api/search/uses?q=${encodeURIComponent(searchQuery)}`, 
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );

        // Fallback to composition search if uses search yields no results
        compositionResponse = await fetch(
          `http://localhost:5000/api/search/composition?q=${encodeURIComponent(searchQuery)}`, 
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );
      }

      // Handle response errors
      const usesResults = usesResponse 
        ? await usesResponse.json() 
        : [];
      const compositionResults = compositionResponse 
        ? await compositionResponse.json() 
        : [];

      // Combine and deduplicate results
      const combinedMedicines = [
        ...usesResults,
        ...compositionResults
      ];

      // Remove duplicates based on medicine name
      const uniqueMedicines = Array.from(
        new Map(combinedMedicines.map(m => [m.Name, m])).values()
      );

      // Convert to local Medicine type
      const formattedMedicines: Medicine[] = uniqueMedicines.map(medicine => ({
        id: medicine.Name,
        name: medicine.Name,
        genericName: medicine.Composition?.join(', ') || '',
        description: `Manufactured by ${medicine.Manufacturer}`,
        uses: medicine.Uses || [],
        prescriptionRequired: medicine.Score > 3,
        dosageForm: 'Tablet',
        dosage: 'Consult your healthcare provider',
        sideEffects: ['Consult package insert for complete information'],
        img_url: medicine.img_url || ''
      }));

      setMedicines(formattedMedicines);

      // Extract unique symptoms and compositions from results
      const extractedSymptoms = new Set<string>();
      formattedMedicines.forEach(medicine => {
        medicine.uses.forEach(use => extractedSymptoms.add(use));
        medicine.genericName.split(', ').forEach(comp => extractedSymptoms.add(comp));
      });
      setSymptoms(Array.from(extractedSymptoms));

    } catch (err) {
      console.error('Search Error:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      setMedicines([]);
      setSymptoms([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Debounced search for input
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchTerm.trim()) {
        searchMedicines(searchTerm);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  // Search when symptom is selected
  useEffect(() => {
    if (selectedSymptom) {
      searchMedicines(selectedSymptom);
    }
  }, [selectedSymptom]);

  return (
    <div className="space-y-6">
      {/* Symptom Search Input */}
      <Input
        label=""
        type="text"
        placeholder="Search medicines by symptoms, compositions..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        icon={Search}
      />

      {/* Symptom/Composition Buttons */}
      <div className="flex flex-wrap gap-3">
        {symptoms
          .filter(symptom => 
            symptom.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .slice(0, 20) // Limit to 20 symptoms to prevent overwhelming UI
          .map((symptom) => (
            <button
              key={symptom}
              onClick={() => setSelectedSymptom(symptom)}
              className={`px-4 py-2 rounded-full transition-all duration-300
                ${selectedSymptom === symptom
                  ? 'bg-teal-500 text-white'
                  : 'bg-white text-gray-600 hover:bg-teal-50'
                }`}
            >
              {symptom}
            </button>
          ))}
      </div>

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

      {/* Search Results */}
      {(selectedSymptom || searchTerm) && (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-900">
            {selectedSymptom 
              ? `Recommended Medicines for ${selectedSymptom}`
              : `Search Results for "${searchTerm}"`
            }
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {medicines.map((medicine) => (
              <MedicineCard 
                key={medicine.id} 
                medicine={medicine} 
              />
            ))}
          </div>
        </div>
      )}

      {/* No Results State */}
      {!isLoading && (selectedSymptom || searchTerm) && medicines.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">No medicines found for this search.</p>
        </div>
      )}
    </div>
  );
};

export default MedicineBySymptom;