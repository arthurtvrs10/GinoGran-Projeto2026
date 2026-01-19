'use client'; // Necessário no Next.js App Router para usar hooks

import React, { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';

interface WhatsAppButtonProps {
  phoneNumber: string;
  variant?: 'dark' | 'light';
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ 
  phoneNumber, 
  variant = 'dark' 
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Ciclo de 15 segundos: exibe por 5 segundos, fecha e aguarda mais 10
    const interval = setInterval(() => {
      setShowTooltip(true);
      
      // Esconde o balão após 5 segundos de exibição
      setTimeout(() => {
        setShowTooltip(false);
      }, 5000);

    }, 15000); 

    return () => clearInterval(interval);
  }, []);

  const isDark = variant === 'dark';

  return (
    <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[9999] flex flex-col items-end">
      
      {/* Modal / Tooltip Flutuante */}
      <div className={`
        mb-4 px-4 py-2 rounded-2xl shadow-2xl border transition-all duration-500 transform
        ${showTooltip ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95 pointer-events-none'}
        ${isDark ? 'bg-slate-900 text-white border-white/10' : 'bg-white text-slate-900 border-slate-200'}
      `}>
        <div className="relative flex items-center gap-2">
          <p className="text-xs md:text-sm font-medium pr-4">✨ Faça um orçamento!</p>
          <button 
            onClick={() => setShowTooltip(false)}
            className="absolute -right-1 hover:text-green-500 transition-colors"
          >
            <X size={14} />
          </button>
          
          {/* Triângulo do balão (Seta) */}
          <div className={`
            absolute -bottom-[17px] right-4 w-0 h-0 
            border-l-[8px] border-l-transparent 
            border-t-[10px] border-r-[8px] border-r-transparent
            ${isDark ? 'border-t-slate-900' : 'border-t-white'}
          `} />
        </div>
      </div>

      {/* Botão Principal */}
      <a
        href={`https://wa.me/${phoneNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative"
      >
        <div className={`
          flex items-center justify-center gap-3 
          h-14 w-14 md:h-auto md:w-auto md:px-6 md:py-3 
          rounded-full backdrop-blur-lg border transition-all duration-300
          shadow-2xl
          ${isDark 
            ? 'bg-slate-900/95 border-white/20 hover:bg-green-600' 
            : 'bg-white/80 border-slate-200 hover:bg-green-50'
          }
        `}>
          <div className="relative flex items-center justify-center shrink-0">
            <MessageCircle 
              className={`w-7 h-7 md:w-6 md:h-6 
                ${isDark ? 'text-green-400 group-hover:text-white' : 'text-green-600'}
              `} 
            />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
          </div>
          
          <span className={`hidden md:block font-semibold text-sm tracking-tight ${isDark ? 'text-white' : 'text-slate-800'}`}>
            Fale Conosco
          </span>
        </div>
      </a>
    </div>
  );
};

export default WhatsAppButton;