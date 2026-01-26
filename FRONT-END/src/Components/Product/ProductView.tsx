"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { CheckCircle2, Diamond, MessageCircle, Share2, Home, ChevronRight, Zap } from "lucide-react";
import { ProductType } from "@/Components/Catalogo/ProductCard";

interface ProductViewProps {
  product: ProductType;
}

export default function ProductView({ product }: ProductViewProps) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const y = useTransform(scrollYProgress, [0, 1], [0, 30]);

  const whatsappMessage = `Olá! Vi a peça *${product.title}* no site da GinoGran e gostaria de saber sobre valores e disponibilidade.`;
  const whatsappLink = `https://wa.me/5561985921488?text=${encodeURIComponent(whatsappMessage)}`;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `GinoGran - ${product.title}`,
          text: `Dá uma olhada nessa pedra incrível: ${product.title}`,
          url: window.location.href,
        });
      } catch (error) { console.log('Erro ao compartilhar', error); }
    } else {
      try { await navigator.clipboard.writeText(window.location.href); alert("Link copiado!"); } 
      catch (err) { console.error('Falha ao copiar', err); }
    }
  };

  return (
    <div ref={containerRef} className="bg-white">
      
      {/* --- BREADCRUMB --- */}
      <nav className="w-full px-6 md:px-22 flex justify-between items-center bg-white border-b border-gray-100 h-16">
        <div className="text-xs md:text-sm font-medium tracking-wide uppercase flex items-center gap-2 text-gray-500">
          <Link href="/" className="hover:text-orange-600 transition-colors flex items-center gap-1">
            <Home size={14} /> <span className="hidden md:inline">Início</span>
          </Link>
          <ChevronRight size={14} className="text-gray-300" />
          <Link href="/Catalogo" className="hover:text-orange-600 transition-colors">
            Catálogo
          </Link>
          <ChevronRight size={14} className="text-gray-300" />
          <span className="text-stone-900 font-bold truncate max-w-[150px] md:max-w-none">
            {product.title}
          </span>
        </div>
        
        <button 
          onClick={handleShare}
          className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-all active:scale-95"
          title="Compartilhar"
        >
          <Share2 size={18} />
        </button>
      </nav>

      {/* --- MAIN CONTENT --- */}
      {/* Removido o padding horizontal no mobile para permitir imagem full-bleed */}
      <main className="grid grid-cols-1 lg:grid-cols-2 lg:h-[calc(100vh-64px)] md:px-22 gap-0 lg:gap-16 bg-white">
        
        {/* --- COLUNA DA IMAGEM --- */}
        {/* Mobile: h-[55vh] e w-full (preenche tudo). Desktop: h-[85%] com bordas arredondadas leves */}
        <div className="relative h-[55vh] lg:h-[75%] w-full my-10 overflow-hidden bg-gray-50 order-1 lg:order-2 flex items-center justify-center group lg:rounded-sm">
           <motion.div style={{ y }} className="relative w-full h-full">
            <Image
                src={product.image}
                alt={product.title}
                fill
                // object-cover no mobile para preencher tudo, object-contain no desktop para não esticar
                className="object-cover lg:fill lg:p-0 transition-transform duration-[0.5s] group-hover:scale-105"
                priority
                quality={100}
            />
           </motion.div>
           <div className="absolute inset-0 bg-black/5 pointer-events-none"></div>
        </div>


        {/* --- COLUNA DE INFORMAÇÕES --- */}
        {/* px-6 aplicado aqui para o texto não encostar nas bordas no mobile */}
        <div className="px-6 py-10 lg:px-0 lg:py-10 order-2 lg:order-1 flex  justify-center bg-white">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-8 lg:space-y-10"
          >
            <div>
                <span className="inline-block px-4 py-1.5 bg-stone-900 text-white text-[10px] tracking-[0.25em] uppercase font-bold mb-6">
                    {product.category || "Exotic Stone"}
                </span>

                <h1 className="text-5xl lg:text-7xl font-serif text-stone-900 leading-tight tracking-tighter">
                  {product.title}
                </h1>
                
                <div className="w-20 h-1 bg-orange-600 my-8"></div>

                <p className="text-stone-600 text-lg leading-relaxed font-light text-justify">
                {product.description || "Uma obra de arte geológica. Cada veio conta uma história de milhões de anos, trazendo sofisticação atemporal para o seu projeto."}
                </p>
            </div>

            {/* Especificações */}
            <div className="grid grid-cols-2 gap-8 py-8 border-t border-gray-100">
              <div>
                <h4 className="text-[10px] uppercase text-gray-400 tracking-[0.2em] font-bold mb-3">Acabamento</h4>
                <div className="flex items-center gap-3 text-stone-900 text-xl font-serif">
                  <Diamond size={20} className="text-orange-600 stroke-1" />
                  {product.finish || "Polido"}
                </div>
              </div>
              <div>
                <h4 className="text-[10px] uppercase text-gray-400 tracking-[0.2em] font-bold mb-3">Aplicação</h4>
                <div className="flex items-center gap-3 text-stone-900 text-xl font-serif">
                  <CheckCircle2 size={20} className="text-gray-400 stroke-1" />
                  Interiores
                </div>
              </div>
            </div>

            {/* CTA Mobile Fixo / Desktop Inline (Estratégico) */}
            <div className="pt-4 pb-24 lg:pb-0">
              <div className="fixed bottom-0 left-0 w-full p-4 bg-white/95 backdrop-blur-md border-t border-gray-100 lg:relative lg:p-0 lg:bg-transparent lg:border-none z-50">
                <div className="max-w-[75%] lg:max-w-full  mx-left flex flex-col gap-3">
                  
                  {/* Status Online (Gatilho de imediatismo) */}
                  <div className="flex items-center gap-2 mb-1 lg:hidden">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Consultores online agora</span>
                  </div>

                  <a 
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative overflow-hidden flex items-center justify-between bg-stone-900 hover:bg-orange-600 text-white px-8 py-5 transition-all duration-500 shadow-2xl lg:shadow-none rounded-sm"
                  >
                    {/* Efeito Shine animado */}
                    <div className="absolute inset-0 w-1/2 h-full bg-white/10 skew-x-[-25deg] -translate-x-[250%] group-hover:translate-x-[250%] transition-transform duration-[1.2s] ease-in-out" />
                    
                    <div className="flex flex-col items-start">
                      <span className="font-serif text-xl lg:text-2xl tracking-wide">Consultar Valor</span>
                      <span className="text-[9px] uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity">Resposta em poucos minutos</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="h-10 w-[1px] bg-white/20 hidden lg:block" />
                      <MessageCircle size={28} className="text-white group-hover:scale-110 transition-transform" />
                    </div>
                  </a>

                  <p className="hidden lg:flex items-center gap-2 text-xs text-gray-400 font-medium uppercase tracking-tighter mt-2">
                    <Zap size={12} className="text-orange-500" /> 
                    Atendimento prioritário via WhatsApp
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}