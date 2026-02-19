/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { motion } from 'framer-motion';

const FloatingShapes: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Circle */}
      <motion.div 
        className="absolute top-[15%] right-[10%] w-32 h-32 border border-black/5 dark:border-white/5 rounded-full transition-colors duration-500"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Square */}
      <motion.div 
        className="absolute bottom-[20%] left-[5%] w-24 h-24 bg-black/5 dark:bg-white/5 rounded-2xl rotate-12 transition-colors duration-500"
        animate={{ rotate: [12, 24, 12], y: [0, 30, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Pill */}
      <motion.div 
        className="absolute top-[40%] left-[15%] w-16 h-48 border border-black/5 dark:border-white/5 rounded-full transition-colors duration-500"
        animate={{ y: [0, 40, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      
      {/* Floating Marketing Terms */}
      <motion.div 
        className="absolute top-[25%] right-[25%] text-xs font-bold text-black/10 dark:text-white/10 uppercase tracking-widest transition-colors duration-500"
        animate={{ opacity: [0.5, 1, 0.5], y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
      >
        Strategy
      </motion.div>
      
      <motion.div 
        className="absolute bottom-[30%] left-[20%] text-xs font-bold text-black/10 dark:text-white/10 uppercase tracking-widest transition-colors duration-500"
        animate={{ opacity: [0.5, 1, 0.5], y: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity, delay: 1 }}
      >
        Insight
      </motion.div>
    </div>
  );
};

export default FloatingShapes;