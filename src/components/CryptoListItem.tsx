
import React from 'react';
import { motion } from 'framer-motion';

interface CryptoListItemProps {
  number: string | number;
  title: string;
  delay?: number;
}

const CryptoListItem: React.FC<CryptoListItemProps> = ({ number, title, delay = 0 }) => {
  return (
    <motion.li 
      className="crypto-list-item group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
    >
      <div className="flex items-start">
        <span className="text-primary font-mono mr-3 pt-0.5 text-sm">{number}.</span>
        <span className="font-medium group-hover:text-primary transition-colors">{title}</span>
      </div>
    </motion.li>
  );
};

export default CryptoListItem;
