"use client";

interface FilterProps {
  selectedMaterials: string[];
  setMaterial: (value: string) => void;
  priceRange: { min: string; max: string };
  setPriceRange: (range: { min: string; max: string }) => void;
  onClear: () => void; // Nova prop para o botão de limpar
}

export function SidebarFilter({ 
  selectedMaterials, 
  setMaterial, 
  priceRange, 
  setPriceRange,
  onClear 
}: FilterProps) {
  
  // Lista de materiais disponíveis
  const materials = ["Mármore", "Granito", "Quartzo", "Prime", "Lâmina"];

  return (
    <aside className="w-full md:w-64 flex flex-col gap-8 p-4 md:pr-6 border-r border-stone-100 bg-white">
      
      {/* Cabeçalho do Filtro */}
      <div className="flex items-center justify-between pb-4 border-b border-stone-100">
        <h2 className="font-serif text-lg text-stone-800 font-semibold">Filtros</h2>
        <button 
          onClick={onClear}
          className="text-xs text-stone-500 hover:text-stone-800 underline"
        >
          Limpar
        </button>
      </div>

      {/* 1. Tipo de Material */}
      <div className="flex flex-col gap-3">
        <h3 className="text-sm font-bold text-stone-700 uppercase tracking-wide">
          Material
        </h3>
        <div className="flex flex-col gap-2">
          {materials.map((item) => (
            <label key={item} className="flex items-center gap-2 cursor-pointer group">
              <input 
                type="checkbox" 
                className="w-4 h-4 rounded border-stone-300 text-stone-800 focus:ring-stone-500"
                // Lógica conectada:
                checked={selectedMaterials.includes(item)}
                onChange={() => setMaterial(item)}
              />
              <span className="text-stone-600 text-sm group-hover:text-stone-900 transition-colors">
                {item}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* 2. Cores (Visual - Ainda sem lógica conectada, mas mantendo o visual) */}
      <div className="flex flex-col gap-3">
        <h3 className="text-sm font-bold text-stone-700 uppercase tracking-wide">
          Tonalidade
        </h3>
        <div className="flex flex-wrap gap-2">
          {[
            { name: "Branco", color: "bg-white border-stone-200" },
            { name: "Preto", color: "bg-stone-900 border-stone-900" },
            { name: "Cinza", color: "bg-gray-400 border-gray-400" },
            { name: "Bege", color: "bg-[#E6DCC3] border-[#D6CCB3]" },
            { name: "Verde", color: "bg-emerald-800 border-emerald-800" },
            { name: "Marrom", color: "bg-[#5D4037] border-[#5D4037]" },
          ].map((c) => (
            <button
              key={c.name}
              className={`w-8 h-8 rounded-full border shadow-sm hover:scale-110 transition-transform focus:ring-2 focus:ring-offset-2 focus:ring-stone-400 ${c.color}`}
              title={c.name}
              aria-label={`Filtrar por ${c.name}`}
            />
          ))}
        </div>
      </div>

      {/* 3. Faixa de Preço */}
      <div className="flex flex-col gap-3">
        <h3 className="text-sm font-bold text-stone-700 uppercase tracking-wide">
          Preço / m²
        </h3>
        <div className="flex items-center gap-2">
          <div className="relative w-full">
            <span className="absolute left-2 top-2 text-stone-400 text-xs">R$</span>
            <input
              type="number"
              placeholder="Min"
              className="w-full pl-6 pr-2 py-1 text-sm border border-stone-200 rounded focus:border-stone-500 focus:outline-none"
              // Lógica conectada:
              value={priceRange.min}
              onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
            />
          </div>
          <span className="text-stone-400">-</span>
          <div className="relative w-full">
            <span className="absolute left-2 top-2 text-stone-400 text-xs">R$</span>
            <input
              type="number"
              placeholder="Max"
              className="w-full pl-6 pr-2 py-1 text-sm border border-stone-200 rounded focus:border-stone-500 focus:outline-none"
              // Lógica conectada:
              value={priceRange.max}
              onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
            />
          </div>
        </div>
      </div>

      {/* 4. Acabamento (Visual) */}
      <div className="flex flex-col gap-3">
        <h3 className="text-sm font-bold text-stone-700 uppercase tracking-wide">
          Acabamento
        </h3>
        <select className="w-full p-2 text-sm border border-stone-200 rounded bg-white text-stone-600 focus:outline-none focus:border-stone-500">
            <option value="">Qualquer</option>
            <option value="polido">Polido (Brilhante)</option>
            <option value="levigado">Levigado (Fosco)</option>
            <option value="escovado">Escovado (Rústico)</option>
        </select>
      </div>

    </aside>
  );
}