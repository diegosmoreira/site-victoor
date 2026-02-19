/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { motion } from 'framer-motion';

interface CalmHeadingProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  className?: string;
}

const CalmHeading: React.FC<CalmHeadingProps> = ({ text, as: Component = 'span', className = '' }) => {
  return (
    <Component className={`relative inline-block font-medium tracking-tight ${className}`}>
      {/* Breathing Text */}
      <motion.span
        className="relative z-10 block bg-gradient-to-r from-sage-300 via-clay-300 to-sage-300 dark:from-sage-200 dark:via-clay-200 dark:to-sage-200 bg-[length:200%_auto] bg-clip-text text-transparent"
        animate={{
          backgroundPosition: ['0% center', '100% center', '0% center'],
          opacity: [0.8, 1, 0.8]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ 
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        {text}
      </motion.span>
    </Component>
  );
};

export default CalmHeading;