import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Ambulance, Shield, Stethoscope } from 'lucide-react';

const contacts = [
  {
    id: 1,
    name: "Ambulance",
    number: "102",
    icon: Ambulance,
    color: "bg-red-100 text-red-600"
  },
  {
    id: 2,
    name: "Police",
    number: "100",
    icon: Shield,
    color: "bg-blue-100 text-blue-600"
  },
  {
    id: 3,
    name: "Emergency Helpline",
    number: "112",
    icon: Phone,
    color: "bg-green-100 text-green-600"
  },
  {
    id: 4,
    name: "Medical Helpline",
    number: "108",
    icon: Stethoscope,
    color: "bg-purple-100 text-purple-600"
  }
];

const EmergencyContacts = () => {
  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="p-4 bg-gradient-to-r from-red-500 to-rose-500">
        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
          <Phone className="w-6 h-6" />
          Emergency Contacts
        </h2>
      </div>
      
      <div className="p-4 space-y-4">
        {contacts.map((contact, index) => (
          <motion.a
            key={contact.id}
            href={`tel:${contact.number}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="block"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="p-4 rounded-xl border border-gray-200 hover:border-red-200 
                hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl ${contact.color} 
                  flex items-center justify-center`}>
                  <contact.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{contact.name}</h3>
                  <p className="text-red-500 font-medium">{contact.number}</p>
                </div>
              </div>
            </motion.div>
          </motion.a>
        ))}
      </div>
    </div>
  );
};

export default EmergencyContacts;