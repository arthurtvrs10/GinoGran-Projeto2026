"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductCard, ProductType } from "@/Components/Catalogo/ProductCard";
import { CarouselSection } from "@/Components/ui/CarouselSection"; 

interface FeatureCatalogProps {
  title: string;
  subtitle?: string;
  products: ProductType[];
  showViewAll?: boolean;
  viewAllLink?: string;
  viewAllText?: string;
}

export function FeatureCatalog({ 
  title, 
  subtitle, 
  products, 
  showViewAll = true 
}: FeatureCatalogProps) {
  
  if (!products || products.length === 0) return null;

  const viewAllAction = showViewAll ? (
    <Link 
      href="/Catalogo" 
      className="hidden md:flex items-center gap-2 text-stone-500 hover:text-stone-900 transition-colors text-sm font-medium group"
    >
      Ver catálogo completo 
      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
    </Link>
  ) : null;

  return (
    <>
      <CarouselSection 
        title={title} 
        subtitle={subtitle} 
        headerAction={viewAllAction}
        className="bg-stone-50" // Mantendo fundo claro
        viewAllLink="/Catalogo"           // <--- O link para onde vai
        viewAllText="Ver Catálogo Completo"
      >
        {products.map((product) => (
          <div key={product.id} className="w-[280px] md:w-[320px] snap-center shrink-0">
            <ProductCard data={product} />
          </div>
        ))}
      </CarouselSection>

      {showViewAll && (
        <div className="md:hidden text-center pb-8 bg-stone-50">
           <Link href="/Catalogo" className="inline-flex items-center gap-2 text-stone-800 font-bold border-b border-stone-800 pb-1">
             Ver todos os mármores
           </Link>
        </div>
      )}
    </>
  );
}