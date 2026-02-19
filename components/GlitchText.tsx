/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React from 'react';
import { motion } from 'framer-motion';

interface GradientTextProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  className?: string;
}

const GradientText: React.FC<GradientTextProps> = ({ text, as: Component = 'span', className = '' }) => {
  return (
    <Component className={`relative inline-block font-light tracking-wide ${className}`}>
      {/* Main Soft Gradient Text */}
      <motion.span
        className="relative z-10 block bg-gradient-to-r from-[#e29578] via-[#edf6f9] to-[#83c5be] bg-[length:200%_auto] bg-clip-text text-transparent"
        animate={{
          backgroundPosition: ['0% center', '100% center', '0% center'],
        }}
        transition={{
          duration: 10,
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
      
      {/* Subtle Glow - Soft and diffused */}
      <motion.span
        className="absolute inset-0 -z-10 block text-white/10 blur-lg select-none"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      >
        {text}
      </motion.span>
    </Component>
  );
};

export default GradientText;