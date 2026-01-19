"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";
import { supabase } from "@/lib/supabase";

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

export default function FeaturedWorks() {
  const [projects, setProjects] = useState<GalleryProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchFeaturedProjects() {
      // Busca apenas os 6 últimos projetos adicionados
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('id', { ascending: false })
        .limit(6);

      if (data) {
        const formattedData: GalleryProject[] = data.map((item: SupabaseProject) => ({
          id: item.id,
          category: item.category,
          title: item.title,
          src: item.image_url,
          width: item.width,
          height: item.height
        }));
        
        setProjects(formattedData);
      }
      setIsLoading(false);
    }

    fetchFeaturedProjects();
  }, []);

  if (isLoading) return <div className="py-20 text-center text-gray-500 font-medium">Carregando destaques...</div>;

  return (
    <section className="w-full py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* --- CABEÇALHO DA SEÇÃO --- */}
        <div className="text-center mb-12">
          <span className="block text-[#F9A825] font-bold tracking-widest uppercase text-sm mb-2">
            Nosso Portfólio
          </span>
          <p className="mt-2 text-gray-500 max-w-2xl mx-auto">
            Confira algumas das nossas execuções recentes em mármores e granitos de alto padrão.
          </p>
        </div>

        {/* --- GRID MASONRY (CORRIGIDO) --- */}
        <Gallery>
          {/* O segredo do Masonry: columns e gap sem o space-y */}
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                /* break-inside-avoid e mb-6 são essenciais para o Masonry */
                className="break-inside-avoid mb-6 group relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 bg-gray-100"
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
                      className="cursor-zoom-in relative w-full"
                      onClick={open}
                      /* Define o formato da "caixa" antes da imagem carregar */
                      style={{ aspectRatio: `${project.width} / ${project.height}` }}
                    >
                      <Image
                        ref={ref as React.Ref<HTMLImageElement>}
                        src={project.src}
                        alt={project.title}
                        fill // Faz a imagem respeitar o aspectRatio definido no pai
                        className="object-cover transform group-hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />

                      {/* Overlay Clean */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                        <div>
                          <span className="text-[#F9A825] text-xs font-bold uppercase tracking-wider">
                            {project.category}
                          </span>
                          <h3 className="text-white font-bold text-lg leading-tight">
                            {project.title}
                          </h3>
                        </div>
                      </div>
                    </div>
                  )}
                </Item>
              </div>
            ))}
          </div>
        </Gallery>

        {/* --- BOTÃO VER TODOS --- */}
        <div className="mt-10 text-center">
          <Link
            href="/trabalhos"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gray-900 text-white font-bold rounded-full hover:bg-[#F9A825] transition-all duration-300 shadow-lg hover:shadow-[#F9A825]/30 group"
          >
            Ver Galeria Completa
            <svg 
              className="w-5 h-5 group-hover:translate-x-1 transition-transform" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

      </div>
    </section>
  );
}