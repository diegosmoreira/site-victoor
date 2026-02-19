/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { MapPin, Navigation, Coffee } from 'lucide-react';
import CalmHeading from './CalmHeading';

const LocationSection: React.FC = () => {
  return (
    <section id="local" className="relative z-10 py-32 bg-white dark:bg-zinc-900 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="order-2 lg:order-1">
             <span className="text-xs font-bold uppercase tracking-widest text-sage-300 mb-4 block">O Local</span>
            <h2 className="text-5xl md:text-6xl font-heading font-medium mb-8 leading-tight text-sand-900 dark:text-sand-100">
              Um refúgio no <br/> 
              <span className="italic font-serif text-sage-400">centro da cidade.</span>
            </h2>
            
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-sage-50 dark:bg-zinc-800 rounded-full text-sage-900 dark:text-sage-200">
                  <MapPin className="w-6 h-6 stroke-1" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-sand-900 dark:text-sand-100 mb-1">Hotel Bourbon Joinville</h3>
                  <p className="text-gray-500 dark:text-gray-400 leading-relaxed font-light">
                    Rua Visconde de Taunay, 88 - Centro<br/>
                    Joinville - SC
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-sage-50 dark:bg-zinc-800 rounded-full text-sage-900 dark:text-sage-200">
                  <Coffee className="w-6 h-6 stroke-1" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-sand-900 dark:text-sand-100 mb-1">Áreas de Descompressão</h3>
                  <p className="text-gray-500 dark:text-gray-400 leading-relaxed font-light">
                    Espaços de silêncio e jardins internos disponíveis para todos os participantes durante o evento.
                  </p>
                </div>
              </div>
            </div>

            <a 
              href="https://www.google.com/maps/dir//Bourbon+Joinville+Convention+Hotel"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-10 px-8 py-4 bg-sage-900 dark:bg-sage-200 text-white dark:text-sage-900 font-bold uppercase tracking-widest text-xs hover:bg-sage-800 dark:hover:bg-sage-300 transition-colors rounded-full"
            >
              <Navigation className="w-4 h-4" />
              Ver no Mapa
            </a>
          </div>

          <div className="order-1 lg:order-2 h-[500px] w-full rounded-3xl overflow-hidden shadow-2xl shadow-sage-900/10 relative group bg-sage-50 dark:bg-zinc-800">
             <iframe 
               src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3576.6068297745973!2d-48.84887348496738!3d-26.30612998339257!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94deaf6655555555%3A0x6666666666666666!2sBourbon%20Joinville%20Convention%20Hotel!5e0!3m2!1sen!2sbr!4v1715000000000!5m2!1sen!2sbr&maptype=roadmap" 
               width="100%" 
               height="100%" 
               style={{ border: 0, filter: 'grayscale(100%) opacity(0.8)' }} 
               allowFullScreen 
               loading="lazy" 
               referrerPolicy="no-referrer-when-downgrade"
               className="group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 ease-in-out"
             ></iframe>
             <div className="absolute inset-0 pointer-events-none mix-blend-overlay bg-sage-100/20 dark:bg-black/20"></div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default LocationSection;