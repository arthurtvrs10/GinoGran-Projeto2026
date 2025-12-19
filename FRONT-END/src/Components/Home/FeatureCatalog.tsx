import Link from "next/link";
import { ProductCard } from "@/Components/Catalogo/ProductCard"; // Ajuste o caminho conforme sua pasta
import { products } from "@/data/products"; // Ajuste o caminho dos dados
import { ArrowRight } from "lucide-react";

export function FeaturedCatalog() {
  // Pega apenas os 4 primeiros produtos para exibir na home
  const featuredProducts = products.slice(0, 4);

  return (
    <section className="w-full py-8 bg-white px-22">
      <div className="max-w-full mx-auto ">
        
        {/* Cabeçalho da Seção (Estilo Editorial/G1 que você gosta) */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-t border-gray-100 pb-6">
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

        {/* Grid de Produtos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            // Reutilizando seu ProductCard existente
            <div key={product.id} className="h-full">
               <ProductCard data={product} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}