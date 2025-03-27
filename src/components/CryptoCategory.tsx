
import React from 'react';
import { motion } from 'framer-motion';
import CryptoListItem from './CryptoListItem';

interface CryptoCategoryProps {
  title: string;
  items: Array<{
    id: string | number;
    title: string;
  }>;
  delay?: number;
}

const CryptoCategory: React.FC<CryptoCategoryProps> = ({ title, items, delay = 0 }) => {
  return (
    <motion.section 
      className="mb-12"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: delay * 0.15 }}
    >
      <motion.h2 
        className="font-semibold text-xl mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: (delay * 0.15) + 0.1 }}
      >
        {title}
      </motion.h2>
      <motion.div 
        className="bg-card rounded-xl p-6 shadow-sm border"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: (delay * 0.15) + 0.2 }}
      >
        <ul className="space-y-1">
          {items.map((item, index) => (
            <CryptoListItem 
              key={item.id} 
              number={item.id} 
              title={item.title} 
              delay={index}
            />
          ))}
        </ul>
      </motion.div>
    </motion.section>
  );
};

export default CryptoCategory;
