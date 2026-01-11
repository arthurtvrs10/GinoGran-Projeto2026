import Image from "next/image";

// 1. CRIAMOS E EXPORTAMOS O TIPO DO PRODUTO AQUI
export interface ProductType {
  id: number;
  title: string;
  image: string;
  category?: string;
  finish?: string;
  color?: string;
  description?: string;
}

// 2. Usamos esse tipo dentro das Props do Card
interface ProductProps {
  data: ProductType;
  onClick?: () => void;
}

export function ProductCard({ data, onClick }: ProductProps) {
  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      className={`group relative flex flex-col bg-white rounded-md border border-stone-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden h-full ${onClick ? "cursor-pointer" : ""}`}
    >
      {/* Imagem */}
      <div className="relative w-full aspect-3/2 overflow-hidden bg-stone-100">
        <Image
          src={data.image}
          alt={data.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Texto */}
      <div className="p-3 flex flex-col justify-between grow bg-white">
        <div>
          <span className="text-[10px] uppercase tracking-wider text-stone-500 font-bold mb-1 block">
            {data.category || "Pedra Natural"}
          </span>
          <h3 className="text-sm font-medium text-stone-800 line-clamp-2 leading-tight group-hover:text-stone-600 transition-colors">
            {data.title}
          </h3>
        </div>

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
