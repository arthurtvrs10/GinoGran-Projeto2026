"use client";

import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { ProductCard, ProductType } from "@/Components/Catalogo/ProductCard";
import { SidebarFilter } from "@/Components/Catalogo/SidebarFilter";
import { LuSlidersHorizontal } from "react-icons/lu";
import { IoMdClose } from "react-icons/io";
import Cta from "@/Components/pages/CTA";
import { ProductModal } from "@/Components/ui/ProductModal";
import { CatalogSkeleton } from "@/Components/Skeletons/HomeSkeletons"; // Importar Skeleton

export default function CatalogPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [products, setProducts] = useState<ProductType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Estados de Filtro
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [selectedFinish, setSelectedFinish] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");

  // Estados do Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(null);

  // --- LÓGICA DE BUSCA OTIMIZADA (Filtra no Supabase) ---
  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      let query = supabase.from("produtos").select("*");

      // Aplica filtros dinamicamente se houver seleção
      if (selectedMaterials.length > 0) {
        query = query.in("category", selectedMaterials);
      }
      if (selectedFinish) {
        query = query.eq("finish", selectedFinish);
      }
      if (selectedColor) {
        query = query.eq("color", selectedColor);
      }

      const { data, error } = await query;

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    } finally {
      setIsLoading(false);
    }
  }, [selectedMaterials, selectedFinish, selectedColor]);

  // Chama a busca sempre que um filtro mudar
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // --- HANDLERS ---
  const toggleMaterial = (material: string) => {
    setSelectedMaterials((prev) =>
      prev.includes(material) ? prev.filter((item) => item !== material) : [...prev, material]
    );
  };

  const toggleColor = (color: string) => setSelectedColor((prev) => (prev === color ? "" : color));
  
  const clearFilters = () => {
    setSelectedMaterials([]);
    setSelectedFinish("");
    setSelectedColor("");
  };

  const handleOpenModal = (product: ProductType) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProduct(null), 300);
  };

  return (
    <div>
      <main className="min-h-screen bg-gray-50 flex flex-col md:flex-row gap-8 px-4 md:px-22 py-8 relative">
        {/* Filtro Mobile Header */}
        {!isFilterOpen && (
          <div className="md:hidden flex justify-between items-center bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-4 sticky top-20 z-30">
            <div className="flex flex-col">
              <span className="font-bold text-gray-700">Filtros</span>
              <span className="text-xs text-gray-500">{products.length} itens</span>
            </div>
            <button
              onClick={() => setIsFilterOpen(true)}
              className="flex items-center gap-2 bg-stone-800 text-white px-5 py-2.5 rounded-full font-medium active:scale-95 transition-all shadow-md"
            >
              <LuSlidersHorizontal size={18} /> Ajustar
            </button>
          </div>
        )}

        {/* Sidebar (Drawer) */}
        <aside
          className={`fixed inset-0 z-[100] md:relative md:inset-auto md:z-auto ${
            isFilterOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 transition-transform duration-300 ease-in-out w-full md:w-64 shrink-0`}
        >
          <div
            className={`absolute inset-0 bg-black/50 md:hidden transition-opacity ${
              isFilterOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            onClick={() => setIsFilterOpen(false)}
          />
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
            
            <button
              onClick={() => setIsFilterOpen(false)}
              className="w-full mt-8 bg-stone-800 text-white py-4 rounded-xl font-bold md:hidden shadow-lg"
            >
              Ver {products.length} resultados
            </button>
          </div>
        </aside>

        {/* Grid de Produtos */}
        <div className="flex-1">
          <header className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 font-serif">Catálogo de Mármores</h1>
            <p className="text-gray-500 mt-1">
              {isLoading ? "Buscando as melhores pedras..." : `${products.length} produtos encontrados`}
            </p>
          </header>

          {isLoading ? (
             // Uso dos Skeletons que você já criou
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="h-64 bg-gray-200 animate-pulse rounded-md" /> 
                ))}
             </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
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
      <ProductModal isOpen={isModalOpen} onClose={handleCloseModal} product={selectedProduct} />
    </div>
  );
}