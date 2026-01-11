"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// 1. Importações do Supabase e Tipos Corretos
import { supabase } from "@/lib/supabase";
import { ProductCard, ProductType } from "@/Components/Catalogo/ProductCard"; // Importamos o tipo do Card, não do arquivo de dados!
import { ProductModal } from "@/Components/ui/ProductModal";

export function FeaturedCatalog() {
  // 2. Estado para guardar os produtos que vêm do Banco
  const [products, setProducts] = useState<ProductType[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 3. Buscar 4 produtos do Supabase
  useEffect(() => {
    async function fetchFeaturedProducts() {
      const { data, error } = await supabase
        .from('produtos') // Nome da sua tabela
        .select('*')
        .limit(4); // Pega apenas 4 para destaque

      if (data) {
        setProducts(data);
      }
      setIsLoading(false);
    }

    fetchFeaturedProducts();
  }, []);

  const openModal = (product: ProductType) => setSelectedProduct(product);
  const closeModal = () => setSelectedProduct(null);

  // Loading simples para não quebrar o layout
  if (isLoading) return <div className="py-20 text-center">Carregando catálogo...</div>;

  return (
    <>
      <section className="w-full py-0 pb-10 md:pb-20 bg-white">
        <div className="max-w-full mx-auto px-4 md:px-22">
          
          {/* Cabeçalho */}
          <div className="flex  md:flex-row justify-between items-end gap-6 border-t border-gray-100 pb-6 pt-6">
            <div>
              <span className="text-orange-600 font-bold uppercase tracking-wider text-xs">
                Nossa Coleção
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
                Pedras em Destaque
              </h2>
            </div>

            <Link
              href="/Catalogo"
              className="
                group flex items-center gap-2 font-bold transition-all mb-2 md:mb-0
    
                /* MOBILE: Estilo Botão */
                bg-orange-600 text-white px-6 py-3 rounded-full shadow-md
                
                /* DESKTOP (md): Volta a ser Link */
                md:bg-transparent md:text-gray-600 md:px-0 md:py-0 md:rounded-none md:shadow-none 
                md:hover:text-orange-600 md:transition-colors
                "
            >
              Ver catálogo completo
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </div>

          {/* Grid de Produtos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id} className="h-full">
                <ProductCard
                  data={product}
                  onClick={() => openModal(product)}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      <ProductModal
        isOpen={!!selectedProduct}
        product={selectedProduct}
        onClose={closeModal}
      />
    </>
  );
}