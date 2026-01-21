"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { ProductCard, ProductType } from "@/Components/Catalogo/ProductCard";
import { CatalogSkeleton } from "@/Components/Skeletons/HomeSkeletons";
import Link from "next/link";

export function FeaturedCatalog() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // --- BUSCA APENAS 4 PRODUTOS PARA DESTAQUE ---
  useEffect(() => {
    async function fetchFeatured() {
      try {
        const { data } = await supabase
          .from("produtos")
          .select("*")
          .limit(4); // Pega apenas os 4 primeiros
        
        setProducts(data || []);
      } catch (error) {
        console.error("Erro ao buscar destaques:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchFeatured();
  }, []);

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Cabeçalho da Seção */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <span className="text-orange-600 font-bold tracking-widest uppercase text-sm">
              Nossa Coleção
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 mt-2">
              Pedras em Destaque
            </h2>
          </div>
          
          <Link 
            href="/Catalogo"
            className="hidden md:flex items-center gap-2 text-stone-800 font-semibold hover:text-orange-600 transition-colors"
          >
            Ver catálogo completo
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
          </Link>
        </div>

        {/* Grid de Produtos */}
        {isLoading ? (
          <CatalogSkeleton />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard 
                key={product.id} 
                data={product} 
                // Removemos o onClick aqui também
              />
            ))}
          </div>
        )}

        {/* Botão Mobile (Só aparece no celular) */}
        <div className="mt-8 md:hidden text-center">
          <Link 
            href="/Catalogo"
            className="inline-block bg-stone-900 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-orange-600 transition-all"
          >
            Ver todo o catálogo
          </Link>
        </div>
      </div>
      
      {/* Removemos o <ProductModal /> que ficava aqui */}
    </section>
  );
}