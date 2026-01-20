"use client";

import { X } from "lucide-react";
import Image from "next/image";
// Importamos o tipo compartilhado (ajuste o caminho se necessário)
import { ProductType } from "@/Components/Catalogo/ProductCard";

interface ProductModalProps {
  product: ProductType | null; // Usamos o mesmo tipo do Card
  isOpen: boolean;
  onClose: () => void;
}

export function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  // ... (O resto do seu código de useEffect mantém igual, está ótimo) ...

  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Conteúdo */}
      <div className="relative bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
        >
          <X className="w-6 h-6 text-gray-500" />
        </button>

        {/* Imagem */}
        <div className="w-full md:w-1/2 relative h-64 md:h-auto bg-gray-100">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-cover"
          />
        </div>

        {/* Detalhes */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <span className="text-orange-600 font-bold text-xs uppercase tracking-wider mb-2">
            {product.category || "Coleção Exclusiva"}
          </span>

          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {product.title}
          </h2>

          <p className="text-gray-600 mb-6 leading-relaxed">
            {/* Como o ProductType não tem description obrigatória, deixamos o fallback */}
            {product.description ||
              "Uma escolha sofisticada para o seu projeto. Este material oferece durabilidade e uma estética atemporal, perfeita para ambientes internos e externos."}
          </p>

          <div className="flex flex-wrap gap-4 mb-8 text-sm text-gray-500">
            {product.color && (
              <div className="bg-gray-50 px-3 py-1 rounded-md border border-gray-100">
                Cor:{" "}
                <span className="text-gray-900 font-medium">
                  {product.color}
                </span>
              </div>
            )}
            {product.finish && (
              <div className="bg-gray-50 px-3 py-1 rounded-md border border-gray-100">
                Acabamento:{" "}
                <span className="text-gray-900 font-medium">
                  {product.finish}
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between mt-auto pt-6 border-t border-gray-100">
            <a
              href={`https://wa.me/61985921488?text=Tenho interesse no ${product.title}`}
              target="_blank"
              className="bg-black text-white px-6 py-3 rounded-xl font-bold hover:bg-orange-600 transition-colors"
            >
              Solicitar Orçamento
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
