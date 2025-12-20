"use client";

import { useState } from "react";
import { ProductCard, ProductType } from "@/Components/Catalogo/ProductCard";
import { SidebarFilter } from "@/Components/Catalogo/SidebarFilter";
import { products } from "@/data/products";
import Cta from "@/Components/pages/CTA";
import { ProductModal } from "@/Components/ui/ProductModal";

// 1. Interface local para tipar o Estado (resolve o erro do 'any')

const parsePrice = (priceString: string) => {
  if (!priceString) return 0;
  return parseFloat(
    priceString
      .replace("R$", "")
      .replace(/\./g, "")
      .replace(",", ".")
      .trim(),
  );
};

export default function Home() {
  // --- ESTADOS DE FILTRO ---
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [selectedFinish, setSelectedFinish] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });

  // --- 2. ESTADOS DO MODAL (Agora tipados corretamente) ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(null);

  // Lógica de Filtros
  const toggleMaterial = (material: string) => {
    if (selectedMaterials.includes(material)) {
      setSelectedMaterials((prev) => prev.filter((item) => item !== material));
    } else {
      setSelectedMaterials((prev) => [...prev, material]);
    }
  };

  const toggleColor = (color: string) => {
    setSelectedColor((prev) => (prev === color ? "" : color));
  };

  const clearFilters = () => {
    setSelectedMaterials([]);
    setSelectedFinish("");
    setSelectedColor("");
    setPriceRange({ min: "", max: "" });
  };

  // --- 3. LÓGICA DE ABRIR/FECHAR MODAL ---
  const handleOpenModal = (product: ProductType) => {
    setSelectedProduct(product); // Salva o produto clicado
    setIsModalOpen(true);        // Abre o modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Limpa o produto selecionado após a animação (opcional)
    setTimeout(() => setSelectedProduct(null), 300); 
  };

  // Filtragem
  const filteredProducts = products.filter((product) => {
    const matchesMaterial =
      selectedMaterials.length === 0 ||
      (product.category && selectedMaterials.includes(product.category));

    const productPrice = parsePrice(product.price);
    const min = priceRange.min ? parseFloat(priceRange.min) : 0;
    const max = priceRange.max ? parseFloat(priceRange.max) : Infinity;
    const matchesPrice = productPrice >= min && productPrice <= max;

    const matchesFinish =
      selectedFinish === "" || product.finish === selectedFinish;

    const matchesColor =
      selectedColor === "" || product.color === selectedColor;

    return matchesMaterial && matchesPrice && matchesFinish && matchesColor;
  });

  return (
    <div>
      <main className="min-h-screen bg-gray-50 flex flex-col md:flex-row gap-8 px-4 md:px-22 py-8">
        {/* SIDEBAR */}
        <div className="w-full md:w-64 shrink-0">
          <SidebarFilter
            selectedMaterials={selectedMaterials}
            setMaterial={toggleMaterial}
            selectedFinish={selectedFinish}
            setFinish={setSelectedFinish}
            selectedColor={selectedColor}
            setColor={toggleColor}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            onClear={clearFilters}
          />
        </div>

        {/* CONTEÚDO */}
        <div className="flex-1">
          <header className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 font-serif">
              Catálogo de Mármores
            </h1>
            <p className="text-gray-500 mt-1">
              {filteredProducts.length} produtos encontrados
            </p>
          </header>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard 
                  key={product.id} 
                  data={product} 
                  // 4. PASSA A AÇÃO DE CLIQUE PARA O CARD
                  onClick={() => handleOpenModal(product)}
                />
              ))}
            </div>
          ) : (
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

      {/* 5. MODAL POSICIONADO FORA DO MAIN */}
      <ProductModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        product={selectedProduct} 
      />
    </div>
  );
}