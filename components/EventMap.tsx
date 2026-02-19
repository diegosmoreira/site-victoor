/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Coffee, Lightbulb, PenTool, Users, Laptop, Layout, ArrowUpRight, Layers, Sun, BookOpen } from 'lucide-react';

const MAP_AREAS = [
  // Floor 1 (Térreo)
  { id: 'main', floor: 1, label: 'Santuário Criativo', icon: Sun, color: 'bg-sand-100 text-sand-900 border-sand-200', x: 15, y: 10, w: 50, h: 60, desc: 'Palestras sem pressa e conversas profundas.', z: 30 },
  { id: 'lounge', floor: 1, label: 'Oásis (No-Wifi)', icon: Coffee, color: 'bg-sage-100 text-sage-900 border-sage-200', x: 70, y: 10, w: 25, h: 40, desc: 'Área de desconexão. Respire e tome um chá.', z: 20 },
  { id: 'expo', floor: 1, label: 'Galeria da Calma', icon: Lightbulb, color: 'bg-white border border-clay-100 text-clay-900', x: 15, y: 75, w: 50, h: 20, desc: 'Exposição de arte contemplativa.', z: 15 },
  { id: 'welcome', floor: 1, label: 'Boas-vindas', icon: ArrowUpRight, color: 'bg-gray-50 text-gray-500', x: 70, y: 55, w: 25, h: 40, desc: 'Check-in humanizado.', z: 20 },

  // Floor 2 (6 Salas)
  { id: 'sala1', floor: 2, label: 'Oficina de Ar', icon: PenTool, color: 'bg-clay-100 text-clay-900', x: 10, y: 10, w: 25, h: 40, desc: 'Descompressão Criativa A', z: 20 },
  { id: 'sala2', floor: 2, label: 'Oficina de Terra', icon: PenTool, color: 'bg-clay-100 text-clay-900', x: 38, y: 10, w: 25, h: 40, desc: 'Descompressão Criativa B', z: 20 },
  { id: 'sala3', floor: 2, label: 'Sala Zen', icon: Users, color: 'bg-sage-50 text-sage-900', x: 66, y: 10, w: 25, h: 40, desc: 'Mentoria humanizada e escuta ativa.', z: 20 },
  { id: 'sala4', floor: 2, label: 'Sala Silêncio', icon: BookOpen, color: 'bg-sage-50 text-sage-900', x: 10, y: 55, w: 25, h: 40, desc: 'Leitura e meditação.', z: 20 },
  { id: 'sala5', floor: 2, label: 'Imprensa Slow', icon: Laptop, color: 'bg-white border border-gray-100 text-gray-600', x: 38, y: 55, w: 25, h: 40, desc: 'Cobertura consciente do evento.', z: 20 },
  { id: 'sala6', floor: 2, label: 'Apoio', icon: Layout, color: 'bg-white border border-gray-100 text-gray-400', x: 66, y: 55, w: 25, h: 40, desc: 'Staff e cuidado.', z: 20 },
];

const EventMap: React.FC = () => {
  const [activeArea, setActiveArea] = useState<string | null>(null);
  const [activeFloor, setActiveFloor] = useState<number>(1);

  return (
    <div className="w-full h-[700px] relative bg-[#F4F7F0] dark:bg-[#1C1917] rounded-[3rem] overflow-hidden flex items-center justify-center perspective-[1500px] border border-sage-200 dark:border-zinc-800 shadow-sm transition-colors duration-500">
      
      {/* Floor Controls */}
      <div className="absolute top-8 left-8 z-40 flex flex-col gap-2">
        <div className="text-xs font-bold uppercase tracking-widest text-sage-300 dark:text-sage-300 mb-2 flex items-center gap-2">
          <Layers size={14} /> Níveis
        </div>
        {[2, 1].map((floor) => (
          <button
            key={floor}
            onClick={() => {
              setActiveFloor(floor);
              setActiveArea(null);
            }}
            className={`px-6 py-3 rounded-xl text-sm font-bold uppercase tracking-widest transition-all duration-500 flex items-center justify-between min-w-[140px]
              ${activeFloor === floor 
                ? 'bg-sage-900 text-white dark:bg-sage-200 dark:text-sage-900 shadow-lg translate-x-1' 
                : 'bg-white text-gray-400 hover:bg-sage-50 dark:bg-zinc-800 dark:text-gray-500'}`}
          >
            {floor === 1 ? 'Térreo' : 'Superior'}
            {activeFloor === floor && <span className="w-2 h-2 rounded-full bg-white dark:bg-sage-900 animate-pulse"></span>}
          </button>
        ))}
      </div>

      {/* Floor Indicator (Visual) */}
      <div className="absolute top-8 right-8 z-10 opacity-5 font-heading font-black text-9xl text-sage-900 dark:text-white pointer-events-none select-none">
        0{activeFloor}
      </div>

      {/* Map Container - Isometric */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={activeFloor}
          className="relative w-[85%] h-[60%] md:w-[700px] md:h-[500px]"
          style={{ 
            transformStyle: 'preserve-3d' 
          }}
          initial={{ rotateX: 60, rotateZ: -20, opacity: 0, y: 50 }}
          animate={{ rotateX: 55, rotateZ: -20, opacity: 1, y: 0 }}
          exit={{ rotateX: 60, rotateZ: -20, opacity: 0, y: -50 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {/* Base Platform */}
          <div className="absolute inset-0 bg-white dark:bg-[#262321] rounded-3xl shadow-xl shadow-sage-900/5 dark:shadow-black/20 transform translate-z-[-20px] border border-sage-100 dark:border-zinc-800 transition-colors duration-500"></div>
          
          {/* Floor Label on Platform */}
          <div className="absolute -bottom-16 -right-4 text-xs font-mono uppercase text-sage-300 dark:text-zinc-600 transform rotate-[-45deg] tracking-widest">
            Nível 0{activeFloor} // {activeFloor === 1 ? 'Conexão' : 'Reflexão'}
          </div>

          {MAP_AREAS.filter(area => area.floor === activeFloor).map((area, index) => {
            const isActive = activeArea === area.id;
            return (
              <motion.button
                key={area.id}
                initial={{ opacity: 0, scale: 0.8, z: 0 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1, 
                  z: isActive ? area.z + 30 : area.z,
                  transition: { delay: index * 0.1, duration: 0.6 }
                }}
                className={`absolute rounded-2xl transition-all duration-700 shadow-sm flex flex-col items-center justify-center group
                  ${isActive ? 'z-50 ring-1 ring-sage-300 ring-offset-8 ring-offset-transparent' : 'hover:translate-z-5'}`}
                style={{
                  left: `${area.x}%`,
                  top: `${area.y}%`,
                  width: `${area.w}%`,
                  height: `${area.h}%`,
                  transform: `translateZ(${isActive ? area.z + 30 : area.z}px)`,
                }}
                onClick={() => setActiveArea(isActive ? null : area.id)}
                whileHover={{ scale: 1.01 }}
              >
                 {/* Background Layer with opacity */}
                 <div className={`absolute inset-0 rounded-2xl ${area.color} ${isActive ? 'opacity-100' : 'opacity-90 dark:opacity-80'} backdrop-blur-sm border border-transparent dark:border-white/5 shadow-sm`}></div>
                 
                 {/* Content */}
                 <div className="relative z-10 flex flex-col items-center">
                    <div 
                      className={`p-3 rounded-full mb-2 transition-colors duration-300 bg-white/40 dark:bg-black/20`}
                    >
                      <area.icon className="w-5 h-5 stroke-[1.5]" />
                    </div>

                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-70 group-hover:opacity-100 transition-opacity">
                      {area.label}
                    </span>
                 </div>
              </motion.button>
            );
          })}
        </motion.div>
      </AnimatePresence>

      {/* Info Card Overlay */}
      <AnimatePresence>
        {activeArea && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-8 right-8 w-80 bg-white/90 dark:bg-[#2C2926]/95 backdrop-blur-lg p-8 rounded-2xl shadow-xl z-50 border border-sage-100 dark:border-zinc-700"
          >
            {MAP_AREAS.map((area) => {
              if (area.id !== activeArea) return null;
              return (
                <div key={area.id}>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 rounded-full bg-sage-100 dark:bg-sage-900/40 text-[10px] font-bold uppercase tracking-widest text-sage-800 dark:text-sage-200">
                      {activeFloor === 1 ? 'Térreo' : 'Superior'}
                    </span>
                  </div>
                  <h4 className="font-heading font-medium text-2xl text-sand-900 dark:text-sand-100 mb-2">{area.label}</h4>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-6 font-light">{area.desc}</p>
                  
                  <div className="flex justify-between items-center">
                     <div className="h-px flex-1 bg-sage-200 dark:bg-zinc-700 mr-4"></div>
                    <button 
                      onClick={() => setActiveArea(null)}
                      className="text-xs uppercase tracking-widest text-sand-900 dark:text-sand-200 hover:text-sage-500 transition-colors font-bold"
                    >
                      Fechar
                    </button>
                  </div>
                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EventMap;