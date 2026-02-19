/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Loader2, ArrowRight } from 'lucide-react';

const RegistrationForm: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
    }, 2000);
  };

  if (status === 'success') {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="h-full flex flex-col items-center justify-center text-center p-8"
      >
        <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="w-8 h-8 text-green-600 dark:text-green-400" />
        </div>
        <h3 className="text-2xl font-heading font-bold mb-2 text-black dark:text-white">Inscrição Confirmada!</h3>
        <p className="text-gray-500 dark:text-gray-400 mb-6">Enviamos os detalhes para o seu e-mail.</p>
        <button 
          onClick={() => setStatus('idle')}
          className="text-sm font-bold uppercase tracking-widest text-black dark:text-white hover:underline"
        >
          Cadastrar outro e-mail
        </button>
      </motion.div>
    );
  }

  return (
    <div className="h-full flex flex-col justify-center">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Nome</label>
          <input 
            type="text" 
            required
            className="w-full bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg p-3 text-black dark:text-white focus:outline-none focus:border-black dark:focus:border-white transition-colors placeholder:text-gray-400 dark:placeholder:text-gray-600"
            placeholder="Seu nome completo"
          />
        </div>
        
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">E-mail</label>
          <input 
            type="email" 
            required
            className="w-full bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg p-3 text-black dark:text-white focus:outline-none focus:border-black dark:focus:border-white transition-colors placeholder:text-gray-400 dark:placeholder:text-gray-600"
            placeholder="seu@email.com"
          />
        </div>

        <button 
          type="submit" 
          disabled={status === 'loading'}
          className="w-full bg-black dark:bg-white text-white dark:text-black font-bold uppercase tracking-widest py-4 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-all flex items-center justify-center gap-2 mt-4"
        >
          {status === 'loading' ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              Inscrever-se <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;