"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { ArrowRight } from "lucide-react";

import { TrabalhosSkeleton } from "@/Components/Skeletons/HomeSkeletons";

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
      try {
        const { data, error } = await supabase
          .from("projects")
          .select("*")
          .order("id", { ascending: false })
          .limit(6);

        if (!error && data) {
          const formattedData: GalleryProject[] = data.map(
            (item: SupabaseProject) => ({
              id: item.id,
              category: item.category,
              title: item.title,
              src: item.image_url,
              width: item.width || 1000,
              height: item.height || 1200,
            }),
          );
          setProjects(formattedData);
        }
      } catch (err) {
        console.error("Erro ao carregar projetos:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchFeaturedProjects();
  }, []);

  if (isLoading) {
    return (
      <section className="w-full py-20 bg-white dark:bg-transparent">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <div className="h-4 w-32 bg-gray-200 animate-pulse rounded-full mx-auto mb-4" />
            <div className="h-10 w-64 bg-gray-200 animate-pulse rounded-lg mx-auto" />
          </div>
          <TrabalhosSkeleton />
        </div>
      </section>
    );
  }

  return (
    <section className="w-full py-10 md:py-8 bg-white dark:bg-transparent overflow-hidden">
      <div className="max-w-full mx-auto px-4 md:px-22">
        {/* CABEÇALHO */}
        <div className="text-center mb-8 md:mb-12">
          <span className="block text-[#F9A825] font-bold tracking-widest uppercase text-sm mb-2">
            Nosso Portfólio
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Projetos em Destaque
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-sm md:text-base">
            Confira algumas das nossas execuções recentes em mármores e granitos
            de alto padrão.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Gallery>
            {/* GRID UNIFICADO (Mobile & Desktop):
               - Mobile: Flex Row com Scroll (Carrossel)
               - Desktop: Grid convencional (NÃO MAIS Masonry)
            */}
            <div
              className="
              flex gap-4 overflow-x-auto snap-x snap-mandatory pb-6 -mx-4 px-4 scrollbar-hide
              md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6 md:pb-0 md:mx-0 md:px-0
            "
            >
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="
                    relative min-w-[85%] sm:min-w-[45%] snap-center rounded-2xl overflow-hidden shadow-md bg-gray-100 group
                    md:min-w-0 md:hover:shadow-xl transition-all duration-300
                  "
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
                        className="cursor-zoom-in relative w-full h-full aspect-[3/4] md:aspect-[4/5]" // AQUI ESTÁ A MÁGICA DO TAMANHO PADRÃO
                        onClick={open}
                      >
                        <Image
                          ref={ref as React.Ref<HTMLImageElement>}
                          src={project.src}
                          alt={project.title}
                          fill
                          className="object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out" // object-cover garante o corte bonito
                          sizes="(max-width: 768px) 85vw, (max-width: 1200px) 50vw, 33vw"
                        />

                        {/* Overlay com Informações */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
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

              {/* CARD 'VER GALERIA' (Mobile) - Mantido igual para consistência */}
              <div className="flex md:hidden min-w-[40%] snap-center items-center justify-center bg-gray-50 rounded-2xl border border-gray-100 aspect-[3/4]">
                <Link
                  href="/trabalhos"
                  className="flex flex-col items-center gap-3 group p-6 text-center"
                >
                  <div className="w-14 h-14 rounded-full bg-[#F9A825]/10 border border-[#F9A825]/20 flex items-center justify-center text-[#F9A825] group-active:scale-95 transition-all shadow-sm">
                    <ArrowRight size={24} />
                  </div>
                  <span className="font-bold text-sm text-gray-700">
                    Ver Galeria Completa
                  </span>
                </Link>
              </div>
            </div>
          </Gallery>
        </motion.div>

        {/* BOTÃO DESKTOP */}
        <div className="hidden md:block mt-12 text-center">
          <Link
            href="/trabalhos"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gray-900 text-white font-bold rounded-full hover:bg-[#F9A825] transition-all duration-300 shadow-lg group"
          >
            Ver Galeria Completa
            <ArrowRight
              size={20}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
