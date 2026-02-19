/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, Play, Globe, MessageSquare, Briefcase, Zap, Calendar, Moon, Sun, Mail } from 'lucide-react';
import FluidBackground from './components/FluidBackground';
import CustomCursor from './components/CustomCursor';
import ArtistCard from './components/ArtistCard';
import AIChat from './components/AIChat';
import EventMap from './components/EventMap';
import LocationSection from './components/LocationSection';
import RegistrationForm from './components/RegistrationForm';
import Countdown from './components/Countdown';
import FloatingShapes from './components/FloatingShapes';
import { Artist } from './types';

// Data updated for "EPPA 2025 - Respire" Theme
const LINEUP: Artist[] = [
  { 
    id: '1', 
    name: 'Ana Silva', 
    genre: 'Slow Branding', 
    day: 'DIA 14', 
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop',
    description: 'Construindo marcas que respeitam o tempo do consumidor.'
  },
  { 
    id: '2', 
    name: 'Carlos Mendez', 
    genre: 'Saúde Mental', 
    day: 'DIA 14', 
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1000&auto=format&fit=crop',
    description: 'Como criar sem exaurir: o fim da cultura do burnout nas agências.'
  },
  { 
    id: '3', 
    name: 'Júlia Costa', 
    genre: 'Dados Humanos', 
    day: 'DIA 15', 
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1000&auto=format&fit=crop',
    description: 'Olhando para os números com empatia e propósito real.'
  },
  { 
    id: '4', 
    name: 'Roberto Chang', 
    genre: 'Eco Design', 
    day: 'DIA 15', 
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop',
    description: 'Criatividade sustentável: do conceito à execução.'
  },
  { 
    id: '5', 
    name: 'Marina Luz', 
    genre: 'Narrativas Longas', 
    day: 'DIA 15', 
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1000&auto=format&fit=crop',
    description: 'O retorno do storytelling profundo na era do conteúdo rápido.'
  },
  { 
    id: '6', 
    name: 'Pedro Santos', 
    genre: 'Cultura de Paz', 
    day: 'DIA 14', 
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop',
    description: 'Gestão de conflitos e comunicação não-violenta em times criativos.'
  },
];

const Marquee = ({ text }: { text: string }) => (
  <div className="relative flex overflow-hidden bg-white/50 dark:bg-zinc-900/50 py-6 border-y border-sage-100 dark:border-zinc-800 transition-colors duration-300 backdrop-blur-sm">
    <motion.div 
      className="flex whitespace-nowrap text-4xl md:text-6xl font-heading font-light tracking-tight text-sage-300 dark:text-zinc-600 uppercase"
      animate={{ x: "-50%" }}
      initial={{ x: 0 }}
      transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
    >
      {[...Array(6)].map((_, i) => (
        <span key={i} className="mx-8 flex items-center gap-6">
          {text} <span className="w-2 h-2 rounded-full bg-sage-200 dark:bg-zinc-700"></span>
        </span>
      ))}
    </motion.div>
  </div>
);

const App: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const yHero = useTransform(scrollYProgress, [0, 1], [0, 300]); // Parallax for Hero
  const opacityHero = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedArtist(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };
  
  return (
    <div className="relative min-h-screen text-sand-900 dark:text-gray-100 cursor-auto md:cursor-none overflow-x-hidden font-sans bg-[#FDFCF8] dark:bg-[#1C1917] transition-colors duration-500">
      <CustomCursor />
      <FluidBackground />
      <AIChat />
      
      {/* Navbar - Clean & Minimal */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FDFCF8]/80 dark:bg-[#1C1917]/80 backdrop-blur-md h-24 flex items-center justify-between px-6 md:px-12 transition-all border-b border-transparent dark:border-white/5">
        <div className="flex items-center gap-3">
           <div className="font-heading font-medium text-2xl tracking-tight text-sage-900 dark:text-sage-100">EPPA<span className="text-sage-400 font-light">2025</span></div>
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 lg:gap-12">
          {['Lineup', 'Experiência', 'Mapa', 'Ingressos'].map((item, i) => (
            <button 
              key={item} 
              onClick={() => scrollToSection(item.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ""))} 
              className="text-sm font-medium uppercase tracking-widest text-gray-500 dark:text-gray-400 hover:text-sage-900 dark:hover:text-sage-200 transition-colors relative group"
              data-hover="true"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-sage-400 dark:bg-sage-200 transition-all group-hover:w-full"></span>
            </button>
          ))}
          
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-sage-100 dark:hover:bg-zinc-800 transition-colors text-sage-600 dark:text-gray-300"
            data-hover="true"
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <button 
            onClick={() => scrollToSection('ingressos')}
            className="bg-sage-900 dark:bg-sage-200 text-white dark:text-sage-900 px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-sage-800 dark:hover:bg-white transition-all hover:scale-105 shadow-lg shadow-sage-900/10"
            data-hover="true"
          >
            Participar
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <button
            onClick={toggleTheme}
            className="p-2 text-sage-900 dark:text-white"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button 
            className="text-sage-900 dark:text-white z-50"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
             {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-[#FDFCF8] dark:bg-zinc-900 flex flex-col justify-center items-center gap-8 md:hidden text-sand-900 dark:text-white"
          >
            {['Lineup', 'Experiência', 'Mapa', 'Ingressos'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ""))}
                className="text-4xl font-heading font-light uppercase"
              >
                {item}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION - Parallax & Clean */}
      <header className="relative min-h-screen flex flex-col justify-center items-center pt-20 px-6 overflow-hidden">
        
        {/* Background Image - Relaxed/Calm Vibe */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden">
           <img 
              src="https://images.unsplash.com/photo-1541199249251-f713e6145474?q=80&w=2500&auto=format&fit=crop"
              alt="Person resting while working"
              className="w-full h-full object-cover grayscale opacity-10 dark:opacity-5 blur-[4px] scale-105"
           />
           {/* Gradient Overlays to fade image edges */}
           <div className="absolute inset-0 bg-gradient-to-b from-[#FDFCF8]/90 via-transparent to-[#FDFCF8] dark:from-[#1C1917]/90 dark:via-transparent dark:to-[#1C1917]"></div>
           <div className="absolute inset-0 bg-gradient-to-r from-[#FDFCF8]/50 via-transparent to-[#FDFCF8]/50 dark:from-[#1C1917]/50 dark:via-transparent dark:to-[#1C1917]/50"></div>
        </div>

        <FloatingShapes />
        
        <motion.div 
          style={{ y: yHero, opacity: opacityHero }}
          className="z-10 flex flex-col items-center text-center max-w-5xl"
        >
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-3 mb-8"
          >
             <span className="px-4 py-1.5 rounded-full border border-sage-200 dark:border-zinc-800 text-[10px] font-bold uppercase tracking-widest text-sage-600 dark:text-sage-300 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm">
               Joinville, SC
             </span>
             <span className="w-1.5 h-1.5 rounded-full bg-sage-300"></span>
             <span className="text-[10px] font-bold uppercase tracking-widest text-sage-600 dark:text-sage-300">
               Out 14-15, 2025
             </span>
          </motion.div>

          <h1 className="text-[12vw] md:text-[9vw] font-heading font-medium leading-[0.9] tracking-tight text-sand-900 dark:text-sand-100 mb-6">
            <motion.span 
              initial={{ y: 50, opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }} 
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="block"
            >
              EPPA
            </motion.span>
            <motion.span 
              initial={{ y: 50, opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }} 
              transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
              className="block font-serif italic font-light text-sage-400 dark:text-sage-300"
            >
              Respire.
            </motion.span>
          </h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1.5 }}
            className="text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-2xl font-light leading-relaxed mb-12"
          >
            Um convite para desacelerar. O encontro onde estratégia encontra saúde mental e criatividade encontra propósito.
          </motion.p>

          <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 1.2, duration: 1 }}
          >
             <Countdown />
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30 dark:opacity-50"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-[10px] uppercase tracking-widest text-sage-400">Descubra</span>
          <div className="w-px h-12 bg-sage-300 dark:bg-sage-600"></div>
        </motion.div>
      </header>

      <Marquee text="Calma • Propósito • Tempo • Conexão •" />

      {/* LINEUP SECTION - Clean Grid */}
      <section id="lineup" className="relative z-10 py-32 bg-white dark:bg-zinc-900 transition-colors duration-500">
        <div className="max-w-[1800px] mx-auto px-6">
          <div className="flex justify-between items-end mb-20">
             <h2 className="text-5xl md:text-7xl font-heading font-medium tracking-tight text-sand-900 dark:text-sand-100">
               Mentes <span className="text-sage-300 dark:text-sage-500 font-serif italic">Conscientes</span>
             </h2>
             <p className="hidden md:block text-sm text-gray-500 uppercase tracking-widest max-w-xs text-right">
               Pensadores que valorizam o<br/> longo prazo.
             </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {LINEUP.map((artist, i) => (
              <motion.div
                key={artist.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
              >
                <ArtistCard artist={artist} onClick={() => setSelectedArtist(artist)} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE SECTION - Editorial Layout */}
      <section id="experiencia" className="relative z-10 py-32 bg-[#F4F7F0] dark:bg-black transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
             <div className="space-y-12">
                <h2 className="text-5xl md:text-6xl font-heading font-medium leading-tight text-sand-900 dark:text-sand-100">
                  Não é sobre correr, <br/>
                  <span className="text-sage-400 dark:text-sage-500 font-serif italic">é sobre chegar bem.</span>
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-400 font-light leading-relaxed">
                   Em 2025, o EPPA propõe uma pausa. Vamos discutir como a publicidade pode ser relevante sem ser exaustiva. Um espaço seguro para falar sobre processos, não apenas resultados.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
                   {[
                     { title: 'Slow Talks', desc: 'Palestras com tempo para absorver.', icon: MessageSquare },
                     { title: 'Oficinas', desc: 'Prática sem pressão de performance.', icon: Briefcase },
                     { title: 'Conexão Real', desc: 'Networking sem troca de cartões frenética.', icon: Globe },
                     { title: 'Saúde Mental', desc: 'Painéis dedicados ao bem-estar.', icon: Zap }
                   ].map((item, i) => (
                     <div key={i} className="flex flex-col gap-3">
                        <div className="w-10 h-10 rounded-full bg-white dark:bg-zinc-900 flex items-center justify-center shadow-sm text-sage-600 dark:text-sage-200 transition-colors border border-sage-100 dark:border-zinc-800">
                           <item.icon size={18} strokeWidth={1.5} />
                        </div>
                        <h3 className="text-lg font-bold text-sand-900 dark:text-sand-100">{item.title}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{item.desc}</p>
                     </div>
                   ))}
                </div>
             </div>

             <div className="relative h-[600px] w-full">
                <motion.div 
                   className="absolute top-0 right-0 w-[90%] h-[90%] bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden shadow-xl shadow-sage-900/5"
                   whileInView={{ y: [30, 0], opacity: [0, 1] }}
                   transition={{ duration: 1.2 }}
                >
                   <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover grayscale opacity-80 hover:opacity-100 transition-opacity duration-700" alt="Audience" />
                </motion.div>
                <motion.div 
                   className="absolute bottom-0 left-0 w-[50%] h-[40%] bg-[#FDFCF8] dark:bg-zinc-800 text-sand-900 dark:text-white p-8 rounded-2xl shadow-lg border border-sage-100 dark:border-zinc-700 flex flex-col justify-between"
                   whileInView={{ y: [30, 0], opacity: [0, 1] }}
                   transition={{ duration: 1.2, delay: 0.2 }}
                >
                   <div className="text-xs uppercase tracking-widest text-sage-400 dark:text-sage-500">Santuário</div>
                   <div className="text-2xl font-heading">Hotel Bourbon<br/>Joinville</div>
                   <ArrowRight className="self-end text-sage-500" />
                </motion.div>
             </div>
          </div>
        </div>
      </section>

      {/* MAP SECTION */}
      <section id="mapa" className="relative z-10 py-32 bg-white dark:bg-zinc-900 transition-colors duration-500">
         <div className="max-w-7xl mx-auto px-6 text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-sage-300 mb-4 block">Seu Caminho</span>
            <h2 className="text-4xl md:text-5xl font-heading font-medium mb-16 text-sand-900 dark:text-sand-100">Espaços de Respiro</h2>
            <EventMap />
         </div>
      </section>

      {/* LOCATION SECTION */}
      <LocationSection />

      {/* TICKETS SECTION */}
      <section id="ingressos" className="relative z-10 py-32 bg-[#2C2926] dark:bg-black text-sand-50 overflow-hidden transition-colors duration-500">
        {/* Abstract Shapes BG */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-sage-900/20 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20">
             <h2 className="text-6xl md:text-8xl font-heading font-medium tracking-tighter text-[#E6CCB2]">
               Garanta seu <br/> <span className="text-white/80 italic font-serif">Momento</span>
             </h2>
             <p className="text-white/60 max-w-sm text-right mt-8 md:mt-0 font-light leading-relaxed">
               Lugares limitados para manter a intimidade e qualidade das trocas.
             </p>
          </div>
          
          <div className="flex flex-col gap-6">
            {/* Tickets List - Centered and Wide */}
              {[
                { name: 'Estudante', price: 'R$49', desc: 'Acesso às palestras + Certificado Digital' },
                { name: 'Profissional', price: 'R$149', desc: 'Acesso total + Kit de Boas-vindas' },
                { name: 'Imersão VIP', price: 'R$299', desc: 'Acesso total + Jantar com Palestrantes + Mentoria' },
              ].map((ticket, i) => (
                  <motion.div 
                    key={i} 
                    className="group flex flex-col md:flex-row items-center justify-between p-10 border border-white/10 rounded-3xl hover:bg-[#E6CCB2] hover:text-[#4A3225] transition-all duration-500 cursor-pointer bg-white/5 backdrop-blur-sm"
                    whileHover={{ scale: 1.01 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex flex-col gap-2">
                       <h3 className="text-3xl md:text-4xl font-heading font-light uppercase tracking-tight">{ticket.name}</h3>
                       <p className="text-sm md:text-base text-white/50 group-hover:text-[#4A3225]/70 font-light">{ticket.desc}</p>
                    </div>
                    <div className="flex items-center gap-8 mt-6 md:mt-0">
                       <span className="text-4xl font-heading font-medium">{ticket.price}</span>
                       <div className="w-14 h-14 rounded-full border border-white/20 group-hover:border-[#4A3225]/20 flex items-center justify-center">
                          <ArrowRight className="w-6 h-6 -rotate-45 group-hover:rotate-0 transition-transform duration-500" />
                       </div>
                    </div>
                  </motion.div>
                ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER SECTION */}
      <section className="relative z-10 py-24 bg-[#F4F7F0] dark:bg-zinc-900 transition-colors duration-500 border-t border-sage-200 dark:border-zinc-800">
        <div className="max-w-2xl mx-auto px-6 text-center">
           <div className="w-16 h-16 bg-sage-200 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-6 text-sage-900 dark:text-white">
             <Mail size={24} />
           </div>
           <h2 className="text-3xl md:text-4xl font-heading font-medium mb-4 text-sand-900 dark:text-sand-100">
             Receba doses de calma
           </h2>
           <p className="text-gray-500 dark:text-gray-400 mb-10 leading-relaxed">
             Inscreva-se para receber atualizações do evento, artigos sobre Slow Marketing e inspirações semanais. Sem spam, respeitamos sua caixa de entrada.
           </p>
           
           <div className="bg-white dark:bg-black/40 p-8 rounded-3xl shadow-xl shadow-sage-900/5 dark:shadow-black/20 border border-sage-100 dark:border-zinc-700">
             <RegistrationForm />
           </div>
        </div>
      </section>

      <footer className="bg-[#FDFCF8] dark:bg-black pt-20 pb-12 border-t border-sage-100 dark:border-zinc-800 text-sand-900 dark:text-gray-300 transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-6">
           <div className="flex flex-col md:flex-row justify-between items-start mb-16">
              <div>
                 <h2 className="text-4xl font-heading font-bold tracking-tight mb-6 text-sage-900 dark:text-sage-100">EPPA 2025</h2>
                 <p className="text-sm text-gray-500 dark:text-gray-500 max-w-xs leading-relaxed">
                   Encontro de Publicidade e Propaganda Acadêmico.<br/>
                   Criando espaço para o que importa.
                 </p>
              </div>
              <div className="flex gap-12 mt-12 md:mt-0">
                 <div className="flex flex-col gap-4">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-sage-300">Social</h4>
                    <a href="#" className="hover:text-sage-600 dark:hover:text-white transition-colors">Instagram</a>
                    <a href="#" className="hover:text-sage-600 dark:hover:text-white transition-colors">LinkedIn</a>
                 </div>
                 <div className="flex flex-col gap-4">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-sage-300">Legal</h4>
                    <a href="#" className="hover:text-sage-600 dark:hover:text-white transition-colors">Termos</a>
                    <a href="#" className="hover:text-sage-600 dark:hover:text-white transition-colors">Privacidade</a>
                 </div>
              </div>
           </div>
           <div className="flex justify-between items-center pt-8 border-t border-sage-100 dark:border-zinc-800 text-xs text-sage-300 uppercase tracking-widest font-medium">
              <span>© 2025 EPPA. Feito com calma.</span>
              <span>Joinville, SC</span>
           </div>
        </div>
      </footer>

      {/* Artist Modal Overlay */}
      <AnimatePresence>
        {selectedArtist && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-12 bg-stone-900/60 dark:bg-black/80 backdrop-blur-md"
            onClick={() => setSelectedArtist(null)}
          >
            <motion.div
               initial={{ y: 50, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               exit={{ y: 50, opacity: 0 }}
               transition={{ duration: 0.6, ease: "easeOut" }}
               className="w-full max-w-5xl bg-[#FDFCF8] dark:bg-zinc-900 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row h-[80vh] md:h-[600px]"
               onClick={(e) => e.stopPropagation()}
            >
               <div className="w-full md:w-1/2 h-[300px] md:h-full relative">
                  <img src={selectedArtist.image} className="w-full h-full object-cover" alt={selectedArtist.name} />
                  <div className="absolute inset-0 bg-sage-900/10 mix-blend-multiply"></div>
               </div>
               
               <div className="w-full md:w-1/2 p-10 md:p-16 flex flex-col justify-center relative bg-[#FDFCF8] dark:bg-zinc-900 transition-colors">
                  <button 
                    onClick={() => setSelectedArtist(null)} 
                    className="absolute top-8 right-8 p-2 hover:bg-sage-100 dark:hover:bg-zinc-800 rounded-full transition-colors text-sand-900 dark:text-white"
                  >
                    <X />
                  </button>

                  <span className="inline-block px-3 py-1 rounded-full bg-sage-100 dark:bg-zinc-800 text-xs font-bold uppercase tracking-widest text-sage-600 dark:text-sage-300 mb-6 w-fit">
                    {selectedArtist.genre}
                  </span>
                  
                  <h2 className="text-4xl md:text-5xl font-heading font-medium text-sand-900 dark:text-sand-100 mb-2 uppercase leading-none">
                    {selectedArtist.name}
                  </h2>
                  <div className="text-sm font-bold text-sage-400 uppercase tracking-widest mb-8">
                    {selectedArtist.day} • Santuário Criativo
                  </div>
                  
                  <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed font-light mb-10">
                    {selectedArtist.description}
                  </p>
                  
                  <button className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest hover:gap-4 transition-all group w-fit text-sand-900 dark:text-white">
                    Ver Perfil <ArrowRight size={16} />
                  </button>
               </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;