"use client";

interface FilterProps {
  selectedMaterials: string[];
  setMaterial: (value: string) => void;
  priceRange: { min: string; max: string };
  setPriceRange: (range: { min: string; max: string }) => void;
  onClear: () => void; // Nova prop para o botão de limpar

  selectedFinish: string;
  setFinish: (value: string) => void;
  selectedColor: string;
  setColor: (value: string) => void;
}

export function SidebarFilter({
  selectedMaterials,
  setMaterial,
  selectedFinish,
  setFinish,
  selectedColor,
  setColor,
  priceRange,
  setPriceRange,
  onClear,
}: FilterProps) {
  // Lista de materiais disponíveis
  const materials = ["Mármore", "Quartzo", "Quartzito"]; // Atualizei para bater com o mock

  return (
    <aside className="w-full md:w-64 flex flex-col gap-8 p-4 md:pr-6 border-r border-stone-100 bg-white">
      {/* Cabeçalho do Filtro */}
      <div className="flex items-center justify-between pb-4 border-b border-stone-100">
        <h2 className="font-serif text-lg text-stone-800 font-semibold">
          Filtros
        </h2>
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
            <label
              key={item}
              className="flex items-center gap-2 cursor-pointer group"
            >
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

      {/* 4. Acabamento (Visual) */}
      <div className="flex flex-col gap-3">
        <h3 className="text-sm font-bold text-stone-700 uppercase tracking-wide">
          Acabamento
        </h3>
        <select
          value={selectedFinish} // Controlado pelo estado
          onChange={(e) => setFinish(e.target.value)}
          className="w-full p-2 text-sm border border-stone-200 rounded bg-white text-stone-600 focus:outline-none focus:border-stone-500"
        >
          <option value="">Qualquer</option>
          <option value="Polido">Polido (Brilhante)</option>
          <option value="Levigado">Levigado (Fosco)</option>
          <option value="Escovado">Escovado (Rústico)</option>
        </select>
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
          ].map((c) => {
            const isSelected = selectedColor === c.name;
            return (
              <button
                key={c.name}
                onClick={() => setColor(c.name)}
                // Adicionei lógica visual para quando estiver selecionado (ring)
                className={`
                    w-8 h-8 rounded-full border shadow-sm transition-all 
                    ${c.color}
                    ${isSelected ? "ring-2 ring-offset-2 ring-stone-400 scale-110" : "hover:scale-110"}
                `}
                title={c.name}
                aria-label={`Filtrar por ${c.name}`}
              />
            );
          })}
        </div>
      </div>

      
    </aside>
  );
}
