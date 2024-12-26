import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { YogaAsana } from './types';
import YogaAsanaCard from './YogaAsanaCard';

interface YogaAsanaGridProps {
  asanas: YogaAsana[];
}

const YogaAsanaGrid = ({ asanas }: YogaAsanaGridProps) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 p-6"
      layout
    >
      {asanas.map((asana) => (
        <YogaAsanaCard
          key={asana.id}
          layoutId={asana.id}
          asana={asana}
          expanded={expandedId === asana.id}
          onToggle={() => setExpandedId(expandedId === asana.id ? null : asana.id)}
        />
      ))}
    </motion.div>
  );
};

export default YogaAsanaGrid