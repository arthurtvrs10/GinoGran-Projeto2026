"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react"; // Usei Plus ou Arrow
import { motion } from "framer-motion";

import { supabase } from "@/lib/supabase";
import { ProductCard, ProductType } from "@/Components/Catalogo/ProductCard";
import { ProductModal } from "@/Components/ui/ProductModal";
import { CatalogSkeleton } from "@/Components/Skeletons/HomeSkeletons";

export function FeaturedCatalog() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchFeaturedProducts() {
      try {
        const { data } = await supabase.from("produtos").select("*").limit(4);
        if (data) setProducts(data);
      } catch (error) {
        console.error("Erro:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchFeaturedProducts();
  }, []);

  const openModal = (product: ProductType) => setSelectedProduct(product);
  const closeModal = () => setSelectedProduct(null);

  if (isLoading) return <CatalogSkeleton />;

  return (
    <>
      <section className="w-full py-8 bg-white overflow-hidden">
        <div className="max-w-full mx-auto px-4 md:px-22">
          {/* --- CABEÇALHO ELEGANTE --- */}
          <div className="flex flex-row justify-between items-end border-t border-gray-100/50 pt-0 md:pt-0 pb-8">
            <div>
              <span className="text-primary font-bold uppercase tracking-widest text-xs">
                Nossa Coleção
              </span>
              <h2 className="text-2xl md:text-4xl font-bold text-darkgray mt-2">
                Destaques
              </h2>
            </div>

            {/* DESKTOP: Link sutil com seta (Sem fundo pesado) */}
            <Link
              href="/Catalogo"
              className="hidden md:flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-primary transition-colors group"
            >
              Ver catálogo completo
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* CARROSSEL MOBILE / GRID DESKTOP */}
            <div
              className="
              flex gap-4 overflow-x-auto snap-x snap-mandatory pb-6 -mx-4 px-4 scrollbar-hide
              md:grid md:grid-cols-4 md:gap-6 md:overflow-visible md:pb-0 md:mx-0 md:px-0
            "
            >
              {products.map((product) => (
                <motion.div
                  key={product.id}
                  className="min-w-[85%] sm:min-w-[45%] snap-center h-full md:min-w-0"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <ProductCard
                    data={product}
                    onClick={() => openModal(product)}
                  />
                </motion.div>
              ))}

              {/* CARD 'VER TODOS' (Apenas Mobile - Final do Scroll) */}
              <div className="flex md:hidden min-w-[40%] snap-center items-center justify-center">
                <Link
                  href="/Catalogo"
                  className="flex flex-col items-center gap-3 group"
                >
                  <div className="w-14 h-14 rounded-full bg-orange-10 border border-primary/20 flex items-center justify-center text-primary group-active:scale-95 transition-all shadow-sm">
                    <ArrowRight size={24} />
                  </div>
                  <span className="font-bold text-sm text-darkgray">
                    Ver Todos
                  </span>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* MOBILE BUTTON (Opcional - Se quiser um botão fixo abaixo ao invés do card) */}
          <div className="mt-6 md:hidden flex justify-center">
            <Link
              href="/Catalogo"
              className="w-full text-center py-3 rounded-lg border border-black-10 bg-white text-darkgray font-bold text-sm shadow-sm active:bg-gray-50"
            >
              Explorar Catálogo Completo
            </Link>
          </div>
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
