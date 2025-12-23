"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function WhatsappRedirect() {
  const whatsappNumber = "5561985921488";
  const message = "Olá, gostaria de um orçamento para meu projeto.";
  // Link completo
  const fullLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  // Estado para controlar a barra de progresso visual
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // 1. Animação da barra de progresso (apenas visual)
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 100 : prev + 2));
    }, 20);

    // 2. Redirecionamento real após 1.5s
    const timer = setTimeout(() => {
      window.location.href = fullLink;
    }, 1500);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [fullLink]);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gray-900 text-white">
      
      {/* --- IMAGEM DE FUNDO (Padrão Marble) --- */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop" 
          alt="Background Mármore"
          fill
          className="object-cover opacity-30 scale-110 animate-[pulse_10s_ease-in-out_infinite]" 
          priority
        />
        {/* Overlay escuro para focar no centro */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-gray-900/40" />
      </div>

      {/* --- CARTÃO CENTRAL (Glassmorphism) --- */}
      <div className="relative z-10 w-full max-w-md px-6">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 text-center shadow-2xl ring-1 ring-white/5">
          
          {/* Ícone Pulsante */}
          <div className="relative w-24 h-24 mx-auto mb-8">
            {/* Círculos de "onda" animados */}
            <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-20"></div>
            <div className="absolute inset-2 bg-green-500 rounded-full animate-pulse opacity-40"></div>
            
            {/* Logo do WhatsApp (Estático no centro) */}
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-green-500 to-green-600 rounded-full shadow-lg border-4 border-gray-900/50">
               <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                 <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
               </svg>
            </div>
          </div>

          <h1 className="text-2xl font-bold text-white mb-2 tracking-tight">
            Iniciando Atendimento
          </h1>
          <p className="text-gray-400 text-sm mb-8">
            Aguarde, estamos conectando você a um de nossos especialistas na Ginogran.
          </p>

          {/* Barra de Progresso Decorativa */}
          <div className="w-full h-1.5 bg-gray-700 rounded-full overflow-hidden mb-8">
            <div 
              className="h-full bg-[#F9A825] transition-all duration-75 ease-out rounded-full shadow-[0_0_10px_#F9A825]"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Botão Manual (Fallback) */}
          <a 
            href={fullLink}
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors border-b border-transparent hover:border-white pb-0.5"
          >
            Não abriu automaticamente? 
            <span className="text-[#F9A825] font-bold">Clique aqui</span>
          </a>

        </div>
        
        {/* Marca d'água discreta no rodapé */}
        <div className="mt-8 text-center opacity-30">
          <p className="text-[10px] uppercase tracking-[0.2em]">Ginogran Mármores & Granitos</p>
        </div>
      </div>
    </div>
  );
}