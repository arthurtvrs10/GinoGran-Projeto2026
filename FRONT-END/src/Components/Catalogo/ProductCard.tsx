import Image from "next/image";

interface ProductProps {
  data: {
    id: number;
    title: string;
    image: string;
    price: string;
    category?: string;
    finish?: string;
    color?: string;
  };
}

export function ProductCard({ data }: ProductProps) {
  return (
    <div className="group relative flex flex-col bg-white rounded-md border border-stone-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden h-full">
      {/* Container da Imagem - Altura reduzida (Aspect Ratio 3/2) */}
      <div className="relative w-full aspect-3/2 overflow-hidden bg-stone-100">
        <Image
          src={data.image}
          alt={data.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Badge de preço flutuante (economiza espaço embaixo) */}
        <div className="absolute bottom-0 right-0 bg-stone-900 text-white px-3 py-1 text-xs font-semibold rounded-tl-md">
          {data.price}
        </div>
      </div>

      {/* Container do Texto - Mais compacto */}
      <div className="p-3 flex flex-col justify-between flex-grow bg-white">
        <div>
          {/* Categoria pequena para dar contexto */}
          <span className="text-[10px] uppercase tracking-wider text-stone-500 font-bold mb-1 block">
            {data.category || "Pedra Natural"}
          </span>
          <h3 className="text-sm font-medium text-stone-800 line-clamp-2 leading-tight group-hover:text-stone-600 transition-colors">
            {data.title}
          </h3>
        </div>

        {/* Botão sutil ou CTA */}
        <div className="mt-3 pt-2 border-t border-stone-100 flex items-center justify-between">
          <span className="text-xs text-stone-400">Ver detalhes</span>
          <svg
            className="w-4 h-4 text-stone-400 group-hover:translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  );
}
