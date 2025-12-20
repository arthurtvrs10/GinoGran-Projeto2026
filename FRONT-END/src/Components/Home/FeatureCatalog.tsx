"use client"; // <--- Importante: Agora precisa ser Client Component

import { useState } from "react";
import Link from "next/link";
import { ProductCard } from "@/Components/Catalogo/ProductCard";
import { ProductModal } from "@/Components/ui/ProductModal"; // Ajuste o caminho
import { products } from "@/data/products";
import { ArrowRight } from "lucide-react";

// Precisamos tipar o estado do produto selecionado
type ProductType = typeof products[0];

export function FeaturedCatalog() {
  // 1. Estado para controlar qual produto está aberto
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(null);

  // 2. Funções para abrir e fechar
  const openModal = (product: ProductType) => setSelectedProduct(product);
  const closeModal = () => setSelectedProduct(null);

  const featuredProducts = products.slice(0, 4);

  return (
    <>
      <section className="w-full py-8 bg-white ">
        <div className="max-w-full mx-auto px-22"> {/* Ajustei max-w-full para 7xl para não esticar demais */}
          
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-t border-gray-100 pb-6 pt-6">
            <div>
              <span className="text-orange-600 font-bold uppercase tracking-wider text-xs">
                Nossa Coleção
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-black-90 mt-2">
                Pedras em Destaque
              </h2>
            </div>
            
            <Link 
              href="/Catalogo" 
              className="group flex items-center gap-2 text-gray-600 font-bold hover:text-orange-600 transition-colors mb-2 md:mb-0"
            >
              Ver catálogo completo 
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <div key={product.id} className="h-full">
                 {/* 3. Passamos a função onClick para o card */}
                 <ProductCard 
                    data={product} 
                    onClick={() => openModal(product)} 
                 />
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. O componente Modal fica aqui, fora do loop */}
      <ProductModal 
        isOpen={!!selectedProduct} // true se tiver produto, false se null
        product={selectedProduct}
        onClose={closeModal}
      />
    </>
  );
}