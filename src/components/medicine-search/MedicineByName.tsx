import React from 'react';
import { Search } from 'lucide-react';
import Input from '../shared/Input';
import MedicineCard from './MedicineCard';
import { medicines } from './data';

const MedicineByName = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  
  const filteredMedicines = medicines.filter(medicine =>
    medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    medicine.genericName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <Input
        label=""
        type="text"
        placeholder="Search medicines by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        icon={Search}
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMedicines.map((medicine) => (
          <MedicineCard key={medicine.id} medicine={medicine} />
        ))}
      </div>

      {filteredMedicines.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">No medicines found matching your search.</p>
        </div>
      )}
    </div>
  );
};

export default MedicineByName;