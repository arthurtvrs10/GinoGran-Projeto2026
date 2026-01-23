"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { CheckCircle2, Diamond, MessageCircle, Share2, Home, ChevronRight } from "lucide-react";
import { ProductType } from "@/Components/Catalogo/ProductCard";

interface ProductViewProps {
  product: ProductType;
}

export default function ProductView({ product }: ProductViewProps) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const y = useTransform(scrollYProgress, [0, 1], [0, 50]);

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
    <div ref={containerRef} className="bg-slate-50">
      
      {/* --- BREADCRUMB (Branco Padrão) --- */}
      <nav className="w-full px-6 md:px-22 flex justify-between items-center bg-slate-50 border-b border-gray-100 h-16">
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

      {/* --- MAIN CONTENT (Grid 50/50 Split) --- */}
      <main className="grid grid-cols-1 lg:grid-cols-2 min-h-[calc(100vh-64px)]">
        
        {/* --- COLUNA DA IMAGEM --- */}
        <div className="relative h-[50vh] lg:h-[calc(100vh-64px)] lg:sticky lg:top-16 overflow-hidden bg-slate-50 order-1 lg:order-2 group">
           
           <motion.div style={{ y }} className="absolute inset-0 w-full h-[120%] -top-[10%]">
            <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-cover transition-transform duration-[2s] ease-in-out group-hover:scale-110"
                priority
                quality={100}
            />
           </motion.div>

           {/* Overlay escuro bem leve para profundidade */}
           <div className="absolute inset-0 bg-black/5 pointer-events-none"></div>
        </div>


        {/* --- COLUNA DE INFORMAÇÕES (Fundo Branco) --- */}
        <div className="px-8 py-5 lg:p-20 order-2 lg:order-1 flex flex-col justify-center bg-white">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="space-y-12 max-w-xl mx-auto lg:mx-0 lg:mr-auto"
          >
            {/* Header Texto */}
            <div>
                <div className="flex items-center gap-4 mb-6">
                    <span className="px-4 py-1.5 bg-stone-900 text-white text-[11px] tracking-[0.25em] uppercase font-bold rounded-sm">
                        {product.category || "Exotic Stone"}
                    </span>
                </div>

                <h1 className="text-6xl lg:text-8xl font-serif text-stone-900 leading-[0.9] tracking-tighter">
                  {product.title}
                </h1>
                
                <div className="w-24 h-1 bg-orange-600 mt-8 mb-8"></div>

                <p className="text-stone-600 text-xl leading-relaxed font-light text-justify">
                {product.description || "Uma obra de arte geológica. Cada veio conta uma história de milhões de anos, trazendo sofisticação atemporal para o seu projeto. Ideal para quem busca exclusividade e impacto visual em grandes formatos."}
                </p>
            </div>

            {/* Especificações (Bordas mais sutis) */}
            <div className="grid grid-cols-2 gap-x-12 gap-y-6 py-8 border-t border-gray-200">
              <div>
                <h4 className="text-[11px] uppercase text-gray-400 tracking-[0.2em] font-bold mb-2">Acabamento</h4>
                <div className="flex items-center gap-3 text-stone-900 text-2xl font-serif">
                  <Diamond size={24} className="text-orange-600 stroke-1" />
                  {product.finish || "Polido"}
                </div>
              </div>
              <div>
                <h4 className="text-[11px] uppercase text-gray-400 tracking-[0.2em] font-bold mb-2">Aplicação</h4>
                <div className="flex items-center gap-3 text-stone-900 text-2xl font-serif">
                  <CheckCircle2 size={24} className="text-gray-400 stroke-1" />
                  Interiores
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-4">
              <a 
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group w-full inline-flex items-center justify-between bg-stone-900 hover:bg-orange-700 text-white px-8 py-6 transition-all duration-300 shadow-sm hover:shadow-xl"
              >
                <span className="font-serif text-2xl tracking-wide">Consultar Valor</span>
                <MessageCircle size={28} className="text-white/50 group-hover:text-white transition-colors" />
              </a>
              <p className="text-left text-sm text-gray-400 mt-4 font-medium uppercase tracking-wider">
                Disponibilidade imediata.
              </p>
            </div>

          </motion.div>
        </div>
      </main>
    </div>
  );
}