"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";

// 1. Interfaces de Tipagem
interface SupabaseProject {
  id: number;
  category: string;
  title: string;
  image_url: string;
  width: number;
  height: number;
}

interface GalleryProject {
  id: number;
  category: string;
  title: string;
  src: string;
  width: number;
  height: number;
}

export default function TrabalhosPage() {
  const [projects, setProjects] = useState<GalleryProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("Todos");
  const [visibleCount, setVisibleCount] = useState(10);

  useEffect(() => {
    async function fetchProjects() {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('id', { ascending: false }); // Ordem decrescente para mostrar os mais novos primeiro

      if (error) {
        console.error("Erro ao buscar projetos:", error);
      }

      if (data) {
        const formattedData: GalleryProject[] = data.map((item: SupabaseProject) => ({
          id: item.id,
          category: item.category,
          title: item.title,
          src: item.image_url,
          width: item.width || 1000, // Fallback de segurança
          height: item.height || 1200 // Fallback de segurança
        }));

        setProjects(formattedData);
      }
      setIsLoading(false);
    }

    fetchProjects();
  }, []);

  const categories = [
    "Todos",
    ...Array.from(new Set(projects.map((p) => p.category))),
  ];

  const allFilteredProjects =
    filter === "Todos"
      ? projects
      : projects.filter((p) => p.category === filter);

  const displayedProjects = allFilteredProjects.slice(0, visibleCount);

  const handleCategoryChange = (cat: string) => {
    setFilter(cat);
    setVisibleCount(10);
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 10);
  };

  return (
    <div className="w-full bg-white min-h-screen pb-20 overflow-x-hidden">
      {/* --- HERO SECTION --- */}
      <section className="relative w-full h-[400px] flex items-center justify-center bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <Image
            src="https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop"
            alt="Textura de Mármore"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-[22px] text-center">
          <span className="block text-[#F9A825] font-semibold tracking-widest uppercase mb-4 text-sm md:text-base">
            Portfólio Exclusivo
          </span>
          <h1 className="text-4xl md:text-6xl text-white mb-6 font-bold">Nossos Trabalhos</h1>
          <p className="text-gray-200 max-w-2xl mx-auto text-lg font-light leading-relaxed mb-8">
            Transformamos a força da natureza em sofisticação para o seu ambiente.
          </p>

          {!isLoading && (
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 border backdrop-blur-sm
                    ${filter === cat
                        ? "bg-[#F9A825] text-white border-[#F9A825] shadow-lg scale-105"
                        : "bg-white/10 text-white border-white/30 hover:bg-white hover:text-gray-900"
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* --- GRID MASONRY (CORRIGIDO E RESPONSIVO) --- */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        {isLoading ? (
          <div className="text-center py-20">
            <div className="inline-block w-8 h-8 border-4 border-gray-300 border-t-[#F9A825] rounded-full animate-spin mb-4"></div>
            <p className="text-gray-500">Carregando projetos...</p>
          </div>
        ) : (
          <Gallery>
            {/* O segredo do Masonry: block e columns-1 para mobile garantem renderização correta */}
            <div className="block w-full columns-1 md:columns-2 lg:columns-3 gap-6">
              {displayedProjects.map((project) => (
                <div
                  key={project.id}
                  className="break-inside-avoid mb-6 group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 bg-gray-100 w-full"
                >
                  <Item
                    original={project.src}
                    thumbnail={project.src}
                    width={project.width}
                    height={project.height}
                    caption={project.title}
                  >
                    {({ ref, open }) => (
                      <div
                        className="cursor-zoom-in relative w-full overflow-hidden"
                        onClick={open}
                        /* aspectRatio evita 'pulos' de layout no mobile */
                        style={{ aspectRatio: `${project.width} / ${project.height}` }}
                      >
                        <Image
                          ref={ref as React.Ref<HTMLImageElement>}
                          src={project.src}
                          alt={project.title}
                          fill
                          className="object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />

                        {/* Overlay Adaptado: Visível por padrão no mobile para UX */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                          <span className="text-[#F9A825] text-xs font-bold uppercase tracking-wider mb-1">
                            {project.category}
                          </span>
                          <h3 className="text-white font-bold text-lg leading-tight">
                            {project.title}
                          </h3>
                        </div>
                      </div>
                    )}
                  </Item>
                </div>
              ))}
            </div>
          </Gallery>
        )}

        {/* --- BOTÃO CARREGAR MAIS --- */}
        {!isLoading && visibleCount < allFilteredProjects.length && (
          <div className="flex justify-center mt-16">
            <button
              onClick={handleLoadMore}
              className="group flex items-center gap-2 px-8 py-3 bg-white text-gray-900 font-bold rounded-full border-2 border-gray-200 hover:border-[#F9A825] hover:text-[#F9A825] transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <span>Carregar mais projetos</span>
              <svg className="w-4 h-4 group-hover:translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        )}
      </main>
    </div>
  );
}