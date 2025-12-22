"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase"; // <--- 1. Importando o cliente
import { ProductCard, ProductType } from "@/Components/Catalogo/ProductCard";
import { SidebarFilter } from "@/Components/Catalogo/SidebarFilter";
// Removi: import { products } from "@/data/products"; <--- Não usamos mais
import Cta from "@/Components/pages/CTA";
import { ProductModal } from "@/Components/ui/ProductModal";

export default function Home() {
  // --- ESTADO DOS PRODUTOS (Vindo do Banco) ---
  const [products, setProducts] = useState<ProductType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // --- ESTADOS DE FILTRO ---
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [selectedFinish, setSelectedFinish] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });

  // --- ESTADOS DO MODAL ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(null);

  // --- 2. BUSCAR DADOS DO SUPABASE ---
  useEffect(() => {
    async function fetchProducts() {
      console.log("1. Iniciando busca...");
      
      const { data, error } = await supabase
        .from('produtos') // <--- VERIFIQUE SE O NOME ESTÁ IGUAL NO SUPABASE
        .select('*');

      console.log("2. Resposta do Supabase:", { data, error });

      if (error) {
        console.error("3. DEU ERRO:", error.message);
        alert("Erro no Supabase: " + error.message); // Vai pular um alerta na tela se der erro
      } else {
        console.log("3. Sucesso! Dados encontrados:", data);
        setProducts(data || []);
      }
      setIsLoading(false);
    }

    fetchProducts();
  }, []);

  // Lógica de Filtros (Eventos)
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

  // --- LÓGICA DE ABRIR/FECHAR MODAL ---
  const handleOpenModal = (product: ProductType) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProduct(null), 300);
  };

  // --- 3. FILTRAGEM (Atualizada para usar números diretos) ---
  const filteredProducts = products.filter((product) => {
    // Filtro de Categoria/Material
    const matchesMaterial =
      selectedMaterials.length === 0 ||
      (product.category && selectedMaterials.includes(product.category));

    // Filtro de Preço (MUITO MAIS SIMPLES AGORA)
    // Como no banco já é number, usamos direto
    const productPrice = product.price; 
    const min = priceRange.min ? parseFloat(priceRange.min) : 0;
    const max = priceRange.max ? parseFloat(priceRange.max) : Infinity;
    const matchesPrice = productPrice >= min && productPrice <= max;

    // Filtro de Acabamento
    const matchesFinish =
      selectedFinish === "" || product.finish === selectedFinish;

    // Filtro de Cor
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
              {isLoading ? "Carregando..." : `${filteredProducts.length} produtos encontrados`}
            </p>
          </header>

          {/* 4. LOADING STATE E GRID */}
          {isLoading ? (
             // Um Loading simples enquanto carrega
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

      <ProductModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        product={selectedProduct}
      />
    </div>
  );
}