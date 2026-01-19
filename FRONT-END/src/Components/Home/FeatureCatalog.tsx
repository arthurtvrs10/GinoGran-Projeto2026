"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

// 1. Importações do Supabase e Componentes
import { supabase } from "@/lib/supabase";
import { ProductCard, ProductType } from "@/Components/Catalogo/ProductCard";
import { ProductModal } from "@/Components/ui/ProductModal";

// --- COMPONENTE DE SKELETON (Animação de Loading) ---
const CatalogSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    {[...Array(4)].map((_, i) => (
      <div key={i} className="flex flex-col gap-3">
        {/* Espaço da Imagem */}
        <div className="w-full aspect-[5/5] bg-gray-200 dark:bg-black-20 animate-pulse rounded-2xl" />
        {/* Espaço do Título */}
        <div className="h-4 w-3/4 bg-gray-200 dark:bg-black-20 animate-pulse rounded-full" />
        {/* Espaço da Categoria */}
        <div className="h-3 w-1/2 bg-gray-100 dark:bg-black-30 animate-pulse rounded-full" />
      </div>
    ))}
  </div>
);

export function FeaturedCatalog() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchFeaturedProducts() {
      // Pequeno delay proposital para garantir que o skeleton apareça suavemente (opcional)
      const { data, error } = await supabase
        .from('produtos')
        .select('*')
        .limit(4);

      if (data) {
        setProducts(data);
      }
      setIsLoading(false);
    }

    fetchFeaturedProducts();
  }, []);

  const openModal = (product: ProductType) => setSelectedProduct(product);
  const closeModal = () => setSelectedProduct(null);

  return (
    <>
      <section className="w-full py-0 pb-10 md:pb-20 bg-white dark:bg-transparent">
        <div className="max-w-full mx-auto px-4 md:px-22">
          
          {/* Cabeçalho - Mantemos fixo para não "sumir" com a tela */}
          <div className="flex justify-between items-end gap-6 border-t border-gray-100  pb-6 pt-6">
            <div>
              <span className="text-orange-600 font-bold uppercase tracking-wider text-xs">
                Nossa Coleção
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-black mt-2">
                Pedras em Destaque
              </h2>
            </div>

            <Link
              href="/Catalogo"
              className="group flex items-center gap-2 font-bold transition-all mb-2 md:mb-0 bg-orange-600 text-white px-6 py-3 rounded-full shadow-md md:bg-transparent md:text-gray-600 md:px-0 md:py-0 md:rounded-none md:shadow-none md:hover:text-orange-600 md:transition-colors"
            >
              Ver catálogo completo
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </div>

          {/* Transição Suave entre Skeleton e Conteúdo Real */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {isLoading ? (
              <CatalogSkeleton />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                  <motion.div 
                    key={product.id} 
                    className="h-full"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ProductCard
                      data={product}
                      onClick={() => openModal(product)}
                    />
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </section>

      <ProductModal
        isOpen={!!selectedProduct}
        product={selectedProduct}
        onClose={closeModal}
      />
    </>
  );
}