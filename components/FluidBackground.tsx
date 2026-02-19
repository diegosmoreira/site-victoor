/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { motion } from 'framer-motion';

const FluidBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 bg-[#FDFCF8] dark:bg-[#1C1917] overflow-hidden transition-colors duration-1000">
      {/* Soft Organic Shapes - Nature Palette */}
      <motion.div
        className="absolute top-[-10%] right-[-10%] w-[90vw] h-[90vw] bg-[#E9EDC9]/30 dark:bg-[#3A4030]/20 rounded-full blur-[150px] transition-colors duration-1000"
        animate={{
          x: [0, -50, 0],
          y: [0, 30, 0],
          scale: [1, 1.05, 1]
        }}
        transition={{
          duration: 60,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div
        className="absolute bottom-[-10%] left-[-10%] w-[80vw] h-[80vw] bg-[#FAEDCD]/40 dark:bg-[#5C4030]/20 rounded-full blur-[150px] transition-colors duration-1000"
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 70,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute top-[40%] left-[30%] w-[60vw] h-[60vw] bg-[#E6CCB2]/20 dark:bg-[#4A3225]/10 rounded-full blur-[180px] transition-colors duration-1000"
        animate={{
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 45,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Noise Texture - extremely subtle */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
    </div>
  );
};

export default FluidBackground;