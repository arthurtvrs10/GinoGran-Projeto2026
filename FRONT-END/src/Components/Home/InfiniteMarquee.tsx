import React from 'react';

const diferenciais = [
  "QUALIDADE PREMIUM",
  "ENTREGA RÁPIDA",
  "ATENDIMENTO PERSONALIZADO",
  "INOVAÇÃO",
  "SOB MEDIDA",
  "GARANTIA DE FÁBRICA",
  "EXCLUSIVIDADE",
  "PARCERIA SÓLIDA"
];

export default function InfiniteMarquee() {
  return (
    // 1. Alterado bg-slate-800 para bg-darkgray (Sua paleta)
    // 2. Adicionado 'select-none' para o usuário não selecionar o texto sem querer enquanto rola
    <div className="relative flex w-full overflow-hidden bg-black-80 py-4 border-y border-white/5 select-none">
      
      {/* 3. EFEITO FADE (Esquerda): Suaviza a entrada dos textos */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-darkgray to-transparent" />

      {/* Wrapper da Animação */}
      <div className="flex w-max animate-infinite-scroll items-center hover:[animation-play-state:paused]">
        
        {/* LISTA 1: Conteúdo Original */}
        <div className="flex items-center">
          {diferenciais.map((item, index) => (
            <div key={`list-1-${index}`} className="flex items-center mx-8">
              {/* O marcador agora tem uma sombra fixa baseada na sua cor primária */}
              <span className="mr-4 h-2 w-2 rounded-full bg-primary shadow-[0_0_10px_var(--color-primary)]" />
              
              <span className="text-sm font-bold tracking-[0.2em] text-white whitespace-nowrap uppercase opacity-90">
                {item}
              </span>
            </div>
          ))}
        </div>

        {/* LISTA 2: Duplicata para o Loop (Com aria-hidden para acessibilidade) */}
        <div className="flex items-center" aria-hidden="true">
          {diferenciais.map((item, index) => (
            <div key={`list-2-${index}`} className="flex items-center mx-8">
              <span className="mr-4 h-2 w-2 rounded-full bg-primary shadow-[0_0_10px_var(--color-primary)]" />
              <span className="text-sm font-bold tracking-[0.2em] text-white whitespace-nowrap uppercase opacity-90">
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. EFEITO FADE (Direita): Suaviza a saída dos textos */}
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-darkgray to-transparent" />
    </div>
  );
}