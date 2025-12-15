"use client"; // Obrigatório para usar useState

import { useState } from "react";
import { ProductCard } from "@/Components/Catalogo/ProductCard";
import { SidebarFilter } from "@/Components/Catalogo/SidebarFilter";
import { products } from "@/data/products";
import Cta from "@/Components/pages/CTA";

// Função auxiliar para limpar o preço (ex: "R$ 1.200,00" -> 1200.00)
const parsePrice = (priceString: string) => {
  if (!priceString) return 0;
  return parseFloat(
    priceString
      .replace("R$", "") // Tira o R$
      .replace(/\./g, "") // Tira os pontos de milhar
      .replace(",", ".") // Troca vírgula por ponto
      .trim(),
  );
};

export default function Home() {
  // 1. ESTADOS (Onde guardamos as escolhas do usuário)
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [selectedFinish, setSelectedFinish] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });

  // 2. LÓGICA DO TOGGLE DE MATERIAIS
  const toggleMaterial = (material: string) => {
    if (selectedMaterials.includes(material)) {
      // Se já tem, remove
      setSelectedMaterials((prev) => prev.filter((item) => item !== material));
    } else {
      // Se não tem, adiciona
      setSelectedMaterials((prev) => [...prev, material]);
    }
  };

  // Lógica para Cor (clicar na mesma cor desmarca)
  const toggleColor = (color: string) => {
    setSelectedColor((prev) => (prev === color ? "" : color));
  };

  // 3. LÓGICA DO BOTÃO LIMPAR
  const clearFilters = () => {
    setSelectedMaterials([]);
    setSelectedFinish("");
    setSelectedColor("");
    setPriceRange({ min: "", max: "" });
  };

  // 4. FILTRAGEM DOS PRODUTOS (O coração da página)
  const filteredProducts = products.filter((product) => {
    // A. Verifica Material (se a lista estiver vazia, aceita todos)
    const matchesMaterial =
      selectedMaterials.length === 0 ||
      (product.category && selectedMaterials.includes(product.category));

    // B. Verifica Preço
    const productPrice = parsePrice(product.price);
    const min = priceRange.min ? parseFloat(priceRange.min) : 0;
    const max = priceRange.max ? parseFloat(priceRange.max) : Infinity;
    const matchesPrice = productPrice >= min && productPrice <= max;

    // C. Acabamento (Novo)
    const matchesFinish =
      selectedFinish === "" || product.finish === selectedFinish;

    // D. Cor (Novo)
    const matchesColor =
      selectedColor === "" || product.color === selectedColor;

    return matchesMaterial && matchesPrice && matchesFinish && matchesColor;
  });

  return (
    <div>
      <main className="min-h-screen bg-gray-50 flex flex-col md:flex-row gap-8 px-4 md:px-10 py-8">
        {/* SIDEBAR (Esquerda) */}
        <div className="w-full md:w-64 shrink-0">
          <SidebarFilter
            selectedMaterials={selectedMaterials} // Passa o estado
            setMaterial={toggleMaterial} // Passa a função de trocar
            selectedFinish={selectedFinish}
            setFinish={setSelectedFinish}
            selectedColor={selectedColor}
            setColor={toggleColor}
            priceRange={priceRange} // Passa o preço atual
            setPriceRange={setPriceRange} // Passa a função de mudar preço
            onClear={clearFilters} // Passa a função de limpar
          />
        </div>

        {/* CONTEÚDO (Direita) */}
        <div className="flex-1">
          <header className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 font-serif">
              Catálogo de Mármores
            </h1>
            <p className="text-gray-500 mt-1">
              {filteredProducts.length} produtos encontrados
            </p>
          </header>

          {/* Verifica se tem produtos para mostrar */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} data={product} />
              ))}
            </div>
          ) : (
            // Mensagem de "Não encontrado"
            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-lg border border-gray-200">
              <p className="text-gray-500 mb-4">
                Nenhum produto encontrado com esses filtros.
              </p>
              <button
                onClick={clearFilters}
                className="text-stone-800 font-semibold underline cursor-pointer"
              >
                Limpar filtros
              </button>
            </div>
          )}
        </div>
      </main>

      <Cta />
    </div>
  );
}
