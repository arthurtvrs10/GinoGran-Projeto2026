"use client";

import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"; // Importei as setas
import { ProductCard, ProductType } from "@/Components/Catalogo/ProductCard";
import { useRef, useState } from "react";

interface FeatureCatalogProps {
  title: string;
  subtitle?: string;
  products: ProductType[];
  showViewAll?: boolean;
}

export function FeatureCatalog({ 
  title, 
  subtitle, 
  products, 
  showViewAll = true 
}: FeatureCatalogProps) {
  
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  if (!products || products.length === 0) return null;

  // --- Funções das Setas (Scroll por Clique) ---
  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -320, behavior: "smooth" }); // Rola 1 card aprox
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 320, behavior: "smooth" });
    }
  };

  // --- Lógica de Drag and Drop (Mouse Arrastar) ---
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
    <section className="py-5 md:pt-5 bg-stone-50 border-t border-stone-100">
      
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

          {showViewAll && (
            <Link 
              href="/Catalogo" 
              className="hidden md:flex items-center gap-2 text-stone-500 hover:text-stone-900 transition-colors text-sm font-medium group"
            >
              Ver catálogo completo 
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          )}
        </div>

        {/* WRAPPER DO SLIDER + SETAS (Relative para posicionar as setas) */}
        <div className="relative group">
          
          {/* --- SETA ESQUERDA (Só Desktop) --- */}
          <button
            onClick={scrollLeft}
            className="hidden md:flex absolute top-1/2 -left-12 -translate-y-1/2 z-10 bg-white p-3 rounded-full shadow-lg hover:bg-stone-50 border border-stone-100 text-stone-800 transition-all hover:scale-110 active:scale-95"
            aria-label="Rolar para esquerda"
          >
            <ChevronLeft size={24} />
          </button>

          {/* --- CARROSSEL --- */}
          <div 
            ref={sliderRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            className={`
              relative -mx-4 px-4 md:mx-0 md:px-0 
              overflow-x-auto pb-2 hide-scrollbar 
              flex gap-4 md:gap-6 
              cursor-grab active:cursor-grabbing select-none
            `}
            style={{ scrollSnapType: isDown ? 'none' : 'x mandatory' }}
          >
            {products.map((product) => (
              <div 
                key={product.id} 
                className={`
                  w-[280px] md:w-[320px] snap-center shrink-0
                  ${isDragging ? 'pointer-events-none' : ''}
                `}
              >
                <ProductCard data={product} />
              </div>
            ))}
          </div>

          {/* --- SETA DIREITA (Só Desktop) --- */}
          <button
            onClick={scrollRight}
            className="hidden md:flex absolute top-1/2 -right-12 -translate-y-1/2 z-10 bg-white p-3 rounded-full shadow-lg hover:bg-stone-50 border border-stone-100 text-stone-800 transition-all hover:scale-110 active:scale-95"
            aria-label="Rolar para direita"
          >
            <ChevronRight size={24} />
          </button>

        </div>

        {/* Link Mobile */}
        {showViewAll && (
          <div className="mt-4 md:hidden text-center">
            <Link 
              href="/Catalogo" 
              className="inline-flex items-center gap-2 text-stone-800 font-bold border-b border-stone-800 pb-1"
            >
              Ver todos os mármores
            </Link>
          </div>
        )}
        
      </div>
    </section>
  );
}