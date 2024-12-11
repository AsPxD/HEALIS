import React from 'react';
import { motion } from 'framer-motion';
import { Search, Package, Truck, Clock, AlertCircle } from 'lucide-react';
import Input from '../shared/Input';
import Button from '../shared/Button';

const medicines = [
  {
    id: 1,
    name: "Paracetamol 500mg",
    brand: "Crocin",
    type: "Tablet",
    price: 35,
    quantity: "15 tablets",
    prescription: false,
    delivery: "2-3 hours",
    stock: true
  },
  {
    id: 2,
    name: "Azithromycin 500mg",
    brand: "Zithromax",
    type: "Tablet",
    price: 180,
    quantity: "5 tablets",
    prescription: true,
    delivery: "2-3 hours",
    stock: true
  },
  {
    id: 3,
    name: "Vitamin D3",
    brand: "HealthVit",
    type: "Capsule",
    price: 450,
    quantity: "60 capsules",
    prescription: false,
    delivery: "2-3 hours",
    stock: true
  }
];

const Pharmacy = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [cart, setCart] = React.useState<{ id: number; quantity: number }[]>([]);

  const addToCart = (medicineId: number) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === medicineId);
      if (existing) {
        return prev.map(item =>
          item.id === medicineId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { id: medicineId, quantity: 1 }];
    });
  };

  const removeFromCart = (medicineId: number) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === medicineId);
      if (existing && existing.quantity > 1) {
        return prev.map(item =>
          item.id === medicineId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }
      return prev.filter(item => item.id !== medicineId);
    });
  };

  const totalAmount = cart.reduce((sum, item) => {
    const medicine = medicines.find(m => m.id === item.id);
    return sum + (medicine?.price || 0) * item.quantity;
  }, 0);

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <Input
          label=""
          type="text"
          placeholder="Search medicines..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          icon={Search}
        />

        <div className="space-y-4">
          {medicines
            .filter(medicine =>
              medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              medicine.brand.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map(medicine => (
              <motion.div
                key={medicine.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 rounded-2xl bg-white/80 border border-gray-200 hover:border-violet-200
                  transition-all duration-300"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">{medicine.name}</h3>
                        <p className="text-violet-600">{medicine.brand}</p>
                      </div>
                      {medicine.prescription && (
                        <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm">
                          Prescription Required
                        </span>
                      )}
                    </div>
                    
                    <div className="mt-4 grid grid-cols-2 gap-4 text-gray-600">
                      <div className="flex items-center gap-2">
                        <Package className="w-4 h-4" />
                        <span>{medicine.quantity}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Truck className="w-4 h-4" />
                        <span>Delivery in {medicine.delivery}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-2xl font-bold text-violet-600">₹{medicine.price}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <Button
                        variant="outline"
                        onClick={() => removeFromCart(medicine.id)}
                        className="px-3 py-2"
                        disabled={!cart.find(item => item.id === medicine.id)}
                      >
                        -
                      </Button>
                      <span className="w-8 text-center">
                        {cart.find(item => item.id === medicine.id)?.quantity || 0}
                      </span>
                      <Button
                        onClick={() => addToCart(medicine.id)}
                        className="px-3 py-2"
                      >
                        +
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
        </div>
      </div>

      {cart.length > 0 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Your Cart</h3>
            <div className="space-y-3">
              {cart.map(item => {
                const medicine = medicines.find(m => m.id === item.id);
                return (
                  <div key={item.id} className="flex justify-between items-center">
                    <span className="text-gray-600">
                      {medicine?.name} x {item.quantity}
                    </span>
                    <span className="font-medium">₹{(medicine?.price || 0) * item.quantity}</span>
                  </div>
                );
              })}
              <div className="pt-3 border-t border-gray-200">
                <div className="flex justify-between items-center font-bold">
                  <span>Total Amount</span>
                  <span className="text-violet-600">₹{totalAmount}</span>
                </div>
              </div>
            </div>
            <Button className="w-full mt-6">
              Proceed to Checkout
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Pharmacy;