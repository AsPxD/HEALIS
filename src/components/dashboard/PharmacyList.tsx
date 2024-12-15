import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Package, Clock, DollarSign, MoreVertical } from 'lucide-react';
import axios from 'axios';
import Button from '../shared/Button';
import { format } from 'date-fns';
import { toast } from 'react-toastify';

interface PharmacyOrder {
  _id: string;
  items: {
    name: string;
    brand: string;
    quantity: number;
    price: number;
  }[];
  totalAmount: number;
  status: string;
  createdAt: string;
}

const PharmacyList = () => {
  const [pharmacyOrders, setPharmacyOrders] = useState<PharmacyOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPharmacyOrders = async () => {
      try {
        // Get userId from local storage
        const userId = localStorage.getItem('userId');
        
        if (!userId) {
          toast.error('Please log in to view pharmacy orders');
          setIsLoading(false);
          return;
        }

        // Fetch pharmacy orders
        const response = await axios.get(`/pharmacy/orders/${userId}`);
        
        setPharmacyOrders(response.data.pharmacyOrders);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching pharmacy orders', error);
        toast.error('Failed to load pharmacy orders');
        setIsLoading(false);
      }
    };

    fetchPharmacyOrders();
  }, []);

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-6 shadow-lg"
      >
        <div className="text-center text-gray-500">Loading pharmacy orders...</div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-6 shadow-lg"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          {pharmacyOrders.length > 0 ? 'Pharmacy Orders' : 'No Pharmacy Orders'}
        </h2>
        {pharmacyOrders.length > 0 && (
          <Button variant="outline" size="sm">View All</Button>
        )}
      </div>

      <div className="space-y-4">
        {pharmacyOrders.map((order) => (
          <motion.div
            key={order._id}
            whileHover={{ scale: 1.02 }}
            className="p-4 rounded-xl border border-gray-200 hover:border-violet-200 
              hover:shadow-md transition-all duration-300"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-gray-900">
                  Pharmacy Order
                </h3>
                <p className="text-violet-600 text-sm">
                  {order.items.length} Item(s)
                </p>
              </div>
              <div className="relative">
                <button className="p-1 rounded-full hover:bg-gray-100 transition-colors">
                  <MoreVertical className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-4">
              <div className="flex items-center gap-2 text-gray-600">
                <Package className="w-4 h-4" />
                <span className="text-sm">
                  {format(new Date(order.createdAt), 'PPP')}
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="w-4 h-4" />
                <span className="text-sm">
                  {format(new Date(order.createdAt), 'p')}
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <DollarSign className="w-4 h-4" />
                <span className="text-sm">₹{order.totalAmount.toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <span className={`px-3 py-1 rounded-full text-sm
                ${order.status === 'Delivered'
                  ? 'bg-green-100 text-green-600'
                  : order.status === 'Cancelled'
                  ? 'bg-red-100 text-red-600'
                  : 'bg-amber-100 text-amber-600'
                }`}>
                {order.status}
              </span>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  View Details
                </Button>
                <Button size="sm">Reorder</Button>
              </div>
            </div>

            {/* Order Items */}
            <div className="mt-4 border-t pt-3">
              <div className="space-y-2">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm text-gray-600">
                    <span>{item.name} ({item.brand})</span>
                    <span>x{item.quantity} - ₹{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default PharmacyList;