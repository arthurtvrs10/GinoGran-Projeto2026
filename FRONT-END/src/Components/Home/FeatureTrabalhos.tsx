"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";

// Interfaces de Tipagem
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

// --- COMPONENTE DE SKELETON PARA O MASONRY ---
const MasonrySkeleton = () => (
  <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
    {[1.2, 0.8, 1.5, 0.9, 1.1, 1.3].map((ratio, i) => (
      <div 
        key={i} 
        className="break-inside-avoid mb-6 rounded-2xl overflow-hidden bg-gray-100 dark:bg-black-80 animate-pulse"
        style={{ aspectRatio: `${ratio}` }}
      >
        <div className="w-full h-full bg-gray-200 dark:bg-black-20" />
      </div>
    ))}
  </div>
);

export default function FeaturedWorks() {
  const [projects, setProjects] = useState<GalleryProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchFeaturedProjects() {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('id', { ascending: false })
        .limit(6);

      if (!error && data) {
        const formattedData: GalleryProject[] = data.map((item: SupabaseProject) => ({
          id: item.id,
          category: item.category,
          title: item.title,
          src: item.image_url,
          width: item.width || 1000,
          height: item.height || 1200
        }));
        setProjects(formattedData);
      }
      setIsLoading(false);
    }
    fetchFeaturedProjects();
  }, []);

  return (
    <section className="w-full py-20 bg-white dark:bg-transparent">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* CABEÇALHO (Sempre visível para evitar pulo de layout) */}
        <div className="text-center mb-12">
          <span className="block text-[#F9A825] font-bold tracking-widest uppercase text-sm mb-2">
            Nosso Portfólio
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Projetos em Destaque
          </h2>
          <p className="text-gray-500 dark:text-black-40 max-w-2xl mx-auto">
            Confira algumas das nossas execuções recentes em mármores e granitos de alto padrão.
          </p>
        </div>

        {/* ÁREA DE CONTEÚDO */}
        <div className="min-h-[600px]">
          {isLoading ? (
            <MasonrySkeleton />
          ) : (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ duration: 0.6 }}
            >
              <Gallery>
                <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
                  {projects.map((project) => {
                    const aspectRatio = project.width / project.height;
                    return (
                      <div
                        key={project.id}
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
                              className="cursor-zoom-in relative w-full overflow-hidden"
                              onClick={open}
                              style={{ aspectRatio: `${aspectRatio}` }}
                            >
                              <Image
                                ref={ref as React.Ref<HTMLImageElement>}
                                src={project.src}
                                alt={project.title}
                                fill
                                className="object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
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
                    );
                  })}
                </div>
              </Gallery>
            </motion.div>
          )}
        </div>

        {/* BOTÃO VER TODOS */}
        <div className="mt-10 text-center">
          <Link
            href="/trabalhos"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gray-900 text-white font-bold rounded-full hover:bg-[#F9A825] transition-all duration-300 shadow-lg hover:shadow-[#F9A825]/30 group"
          >
            Ver Galeria Completa
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}