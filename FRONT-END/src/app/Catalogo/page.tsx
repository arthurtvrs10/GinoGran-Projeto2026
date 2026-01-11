"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase"; 
import { ProductCard, ProductType } from "@/Components/Catalogo/ProductCard";
import { SidebarFilter } from "@/Components/Catalogo/SidebarFilter";
import { LuSlidersHorizontal } from "react-icons/lu"; 
import { IoMdClose } from "react-icons/io";
import Cta from "@/Components/pages/CTA";
import { ProductModal } from "@/Components/ui/ProductModal";

export default function Home() {
  // --- ESTADO DO FILTRO MOBILE ---
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // --- ESTADO DOS PRODUTOS (Vindo do Banco) ---
  const [products, setProducts] = useState<ProductType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // --- ESTADOS DE FILTRO ---
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [selectedFinish, setSelectedFinish] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");

  // --- ESTADOS DO MODAL ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(null);

  // --- 2. BUSCAR DADOS DO SUPABASE (Sua lógica original) ---
  useEffect(() => {
    async function fetchProducts() {
      console.log("1. Iniciando busca...");
      const { data, error } = await supabase
        .from('produtos') 
        .select('*');

      if (error) {
        console.error("3. DEU ERRO:", error.message);
        alert("Erro no Supabase: " + error.message);
      } else {
        setProducts(data || []);
      }
      setIsLoading(false);
    }
    fetchProducts();
  }, []);

  // --- LÓGICA DE FILTROS (Eventos) ---
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
  };

  // --- LÓGICA DO MODAL ---
  const handleOpenModal = (product: ProductType) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProduct(null), 300);
  };

  // --- 3. FILTRAGEM (Sua lógica original) ---
  const filteredProducts = products.filter((product) => {
    const matchesMaterial =
      selectedMaterials.length === 0 ||
      (product.category && selectedMaterials.includes(product.category));


    const matchesFinish =
      selectedFinish === "" || product.finish === selectedFinish;

    const matchesColor =
      selectedColor === "" || product.color === selectedColor;

    return matchesMaterial && matchesFinish && matchesColor;
  });

  return (
    <div>
      <main className="min-h-screen bg-gray-50 flex flex-col md:flex-row gap-8 px-4 md:px-22 py-8 relative">
        
        {/* BOTÃO MOBILE - Só aparece quando isFilterOpen é falso */}
        {!isFilterOpen && (
          <div className="md:hidden flex justify-between items-center bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-4 sticky top-20 z-30">
            <div className="flex flex-col">
              <span className="font-bold text-gray-700">Filtros</span>
              <span className="text-xs text-gray-500">{filteredProducts.length} itens</span>
            </div>
            <button 
              onClick={() => setIsFilterOpen(true)}
              className="flex items-center gap-2 bg-stone-800 text-white px-5 py-2.5 rounded-full font-medium active:scale-95 transition-all shadow-md"
            >
              <LuSlidersHorizontal size={18} /> Ajustar
            </button>
          </div>
        )}

        {/* SIDEBAR / DRAWER LOGIC */}
        <aside className={`
          fixed inset-0 z-[100] md:relative md:inset-auto md:z-auto
          ${isFilterOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 transition-transform duration-300 ease-in-out
          w-full md:w-64 shrink-0
        `}>
          {/* Backdrop Escuro (Mobile) */}
          <div 
            className={`absolute inset-0 bg-black/50 md:hidden transition-opacity ${isFilterOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`} 
            onClick={() => setIsFilterOpen(false)}
          />

          {/* Conteúdo Branco da Sidebar */}
          <div className="relative bg-white h-full w-[85%] max-w-[320px] md:w-full p-6 md:p-0 overflow-y-auto shadow-2xl md:shadow-none">
            <div className="flex justify-between items-center mb-6 md:hidden">
              <h2 className="text-xl font-bold text-gray-900">Filtrar Pedras</h2>
              <button onClick={() => setIsFilterOpen(false)} className="p-2 text-gray-500 hover:text-black">
                <IoMdClose size={28} />
              </button>
            </div>

            <SidebarFilter
              selectedMaterials={selectedMaterials}
              setMaterial={toggleMaterial}
              selectedFinish={selectedFinish}
              setFinish={setSelectedFinish}
              selectedColor={selectedColor}
              setColor={toggleColor}
              onClear={clearFilters}
            />

            {/* Botão para fechar e ver resultados no Mobile */}
            <button 
              onClick={() => setIsFilterOpen(false)}
              className="w-full mt-8 bg-stone-800 text-white py-4 rounded-xl font-bold md:hidden shadow-lg active:scale-95 transition-transform"
            >
              Ver {filteredProducts.length} resultados
            </button>
          </div>
        </aside>

        {/* CONTEÚDO (Grid de Produtos) */}
        <div className="flex-1">
          <header className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 font-serif">
              Catálogo de Mármores
            </h1>
            <p className="text-gray-500 mt-1">
              {isLoading ? "Carregando..." : `${filteredProducts.length} produtos encontrados`}
            </p>
          </header>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-stone-800"></div>
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  data={product}
                  onClick={() => handleOpenModal(product)}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-lg border border-gray-200">
              <p className="text-gray-500 mb-4">Nenhum produto encontrado com esses filtros.</p>
              <button onClick={clearFilters} className="text-stone-800 font-semibold underline">
                Limpar filtros
              </button>
            </div>
          )}
        </div>
      </main>

      <Cta />

      <ProductModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        product={selectedProduct}
      />
    </div>
  );
}