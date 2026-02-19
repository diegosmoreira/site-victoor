/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React from 'react';
import { motion } from 'framer-motion';
import { Artist } from '../types';
import { ArrowUpRight } from 'lucide-react';

interface ArtistCardProps {
  artist: Artist;
  onClick: () => void;
}

const ArtistCard: React.FC<ArtistCardProps> = ({ artist, onClick }) => {
  return (
    <motion.div
      className="group relative h-[500px] w-full bg-white dark:bg-zinc-800 cursor-pointer overflow-hidden flex flex-col transition-colors duration-500"
      onClick={onClick}
      data-hover="true"
      whileHover={{ y: -10 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {/* Image Layer - Takes up most space */}
      <div className="relative h-[85%] w-full overflow-hidden">
        <img 
          src={artist.image} 
          alt={artist.name} 
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
      </div>

      {/* Content - Minimalist Footer */}
      <div className="h-[15%] flex justify-between items-center pt-4 border-t border-gray-100 dark:border-zinc-700 transition-colors duration-500">
        <div>
          <div className="flex items-center gap-2 mb-1">
             <h3 className="font-heading text-lg font-bold text-black dark:text-white uppercase tracking-tight">
               {artist.name}
             </h3>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-widest font-medium">
            {artist.genre}
          </p>
        </div>
        
        <div className="w-10 h-10 rounded-full border border-gray-200 dark:border-zinc-700 flex items-center justify-center group-hover:bg-black dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-black transition-all duration-300 text-black dark:text-white">
          <ArrowUpRight size={18} />
        </div>
      </div>
    </motion.div>
  );
};

export default ArtistCard;