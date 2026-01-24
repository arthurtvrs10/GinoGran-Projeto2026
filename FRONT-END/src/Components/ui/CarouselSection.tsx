"use client";

import { useRef, useState, ReactNode } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

interface CarouselSectionProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  headerAction?: ReactNode;
  className?: string;
  // Novas props para padronizar o botão mobile
  viewAllLink?: string; 
  viewAllText?: string;
}

export function CarouselSection({ 
  title, 
  subtitle, 
  children, 
  headerAction,
  className = "bg-stone-50",
  viewAllLink,
  viewAllText = "Ver Todos" // Texto padrão
}: CarouselSectionProps) {
  
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  // --- Funções das Setas ---
  const scrollLeft = () => sliderRef.current?.scrollBy({ left: -340, behavior: "smooth" });
  const scrollRight = () => sliderRef.current?.scrollBy({ left: 340, behavior: "smooth" });

  // --- Lógica de Drag (Mouse) ---
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!sliderRef.current) return;
    setIsDown(true);
    setIsDragging(false);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeftState(sliderRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDown(false);
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDown(false);
    setTimeout(() => setIsDragging(false), 50); 
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown || !sliderRef.current) return;
    e.preventDefault();
    setIsDragging(true);
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    sliderRef.current.scrollLeft = scrollLeftState - walk;
  };

  return (
    <section className={`py-5 md:pt-5 border-t border-stone-100 ${className}`}>
      
      {/* Container Principal */}
      <div className="w-full max-w-full mx-auto px-4 md:px-22">
        
        {/* Cabeçalho */}
        <div className="flex items-end justify-between mb-8 md:mb-12">
          <div className="max-w-2xl">
            {subtitle && (
              <span className="block text-orange-600 font-bold uppercase tracking-widest text-xs mb-2">
                {subtitle}
              </span>
            )}
            <h2 className="text-3xl md:text-4xl font-serif text-stone-900 font-bold leading-tight">
              {title}
            </h2>
          </div>
          {headerAction && headerAction}
        </div>

        {/* Área do Slider + Setas */}
        <div className="relative group">
          
          {/* Seta Esquerda (Desktop) */}
          <button
            onClick={scrollLeft}
            className="hidden md:flex absolute top-1/2 -left-16 -translate-y-1/2 z-10 bg-white p-3 rounded-full shadow-lg hover:bg-stone-50 border border-stone-100 text-stone-800 transition-all hover:scale-110 active:scale-95"
            aria-label="Anterior"
          >
            <ChevronLeft size={24} />
          </button>

          {/* O Carrossel */}
          <div 
            ref={sliderRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            className={`
              relative -mx-4 px-4 md:mx-0 md:px-0 
              overflow-x-auto pb-4 hide-scrollbar 
              flex gap-4 md:gap-6 
              cursor-grab active:cursor-grabbing select-none
            `}
            style={{ scrollSnapType: isDown ? 'none' : 'x mandatory' }}
          >
            {/* Wrapper dos filhos com pointer-events controlado */}
            <div className={`contents ${isDragging ? "pointer-events-none" : ""}`}>
                
                {children}

                {/* --- CARD 'VER TODOS' PADRONIZADO (Apenas Mobile - Final do Scroll) --- */}
                {/* Só renderiza se tiver um link passado via props */}
                {viewAllLink && (
                  <div className="flex md:hidden min-w-[40%] snap-center items-center justify-center bg-gray-50 rounded-md border border-gray-100 shrink-0">
                    <Link
                      href={viewAllLink}
                      className="flex flex-col items-center gap-3 group p-6 text-center w-full"
                    >
                      <div className="w-14 h-14 rounded-full bg-gray-100 border border-black flex items-center justify-center text-black group-active:scale-95 transition-all shadow-sm">
                        <ArrowRight size={24} />
                      </div>
                      <span className="font-bold text-sm text-gray-700">
                        {viewAllText}
                      </span>
                    </Link>
                  </div>
                )}

            </div>
          </div>

          {/* Seta Direita (Desktop) */}
          <button
            onClick={scrollRight}
            className="hidden md:flex absolute top-1/2 -right-16 -translate-y-1/2 z-10 bg-white p-3 rounded-full shadow-lg hover:bg-stone-50 border border-stone-100 text-stone-800 transition-all hover:scale-110 active:scale-95"
            aria-label="Próximo"
          >
            <ChevronRight size={24} />
          </button>

        </div>
      </div>
    </section>
  );
}