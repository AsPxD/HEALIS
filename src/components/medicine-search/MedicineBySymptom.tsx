import React from 'react';
import { Search } from 'lucide-react';
import Input from '../shared/Input';
import MedicineCard from './MedicineCard';
import { symptoms, medicines } from './data';

const MedicineBySymptom = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedSymptom, setSelectedSymptom] = React.useState('');

  const filteredSymptoms = symptoms.filter(symptom =>
    symptom.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const recommendedMedicines = medicines.filter(medicine =>
    selectedSymptom && medicine.uses.includes(selectedSymptom)
  );

  return (
    <div className="space-y-6">
      <Input
        label=""
        type="text"
        placeholder="Search symptoms..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        icon={Search}
      />

      <div className="flex flex-wrap gap-3">
        {filteredSymptoms.map((symptom) => (
          <button
            key={symptom.id}
            onClick={() => setSelectedSymptom(symptom.name)}
            className={`px-4 py-2 rounded-full transition-all duration-300
              ${selectedSymptom === symptom.name
                ? 'bg-teal-500 text-white'
                : 'bg-white text-gray-600 hover:bg-teal-50'
              }`}
          >
            {symptom.name}
          </button>
        ))}
      </div>

      {selectedSymptom && (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-900">
            Recommended Medicines for {selectedSymptom}
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedMedicines.map((medicine) => (
              <MedicineCard key={medicine.id} medicine={medicine} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MedicineBySymptom;