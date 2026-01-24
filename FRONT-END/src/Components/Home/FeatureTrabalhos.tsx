"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";
import { supabase } from "@/lib/supabase";
import { ArrowRight } from "lucide-react";

import { TrabalhosSkeleton } from "@/Components/Skeletons/HomeSkeletons";
import { CarouselSection } from "@/Components/ui/CarouselSection"; // Importando o padrão

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

  // Botão de Ação do Header (Padrão Desktop)
  const headerAction = (
    <Link 
      href="/trabalhos" 
      className="hidden md:flex items-center gap-2 text-stone-500 hover:text-stone-900 transition-colors text-sm font-medium group"
    >
      Ver galeria completa
      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
    </Link>
  );

  if (isLoading) {
    return (
      <section className="py-5 md:pt-5 bg-white">
        <div className="w-full max-w-[1440px] mx-auto px-4 md:px-22">
            {/* Skeleton alinhado com o layout padrão */}
            <div className="flex items-end justify-between mb-8 md:mb-12">
                <div>
                    <div className="h-4 w-32 bg-gray-200 animate-pulse rounded-full mb-4" />
                    <div className="h-10 w-64 bg-gray-200 animate-pulse rounded-lg" />
                </div>
            </div>
            <TrabalhosSkeleton />
        </div>
      </section>
    );
  }

  return (
    <Gallery>
      <CarouselSection
        title="Projetos em Destaque"
        subtitle="Nosso Portfólio"
        headerAction={headerAction}
        className="bg-white" // Mantendo fundo branco
        viewAllLink="/trabalhos"
        viewAllText="Ver galeria completa"
      >
        {projects.map((project) => (
          <div
            key={project.id}
            className="w-[300px] md:w-[350px] snap-center shrink-0"
          >
            <div className="relative aspect-[3/4] md:aspect-[4/5] rounded-xl overflow-hidden shadow-md bg-stone-100 group">
              <Item
                original={project.src}
                thumbnail={project.src}
                width={project.width}
                height={project.height}
                caption={project.title}
              >
                {({ ref, open }) => (
                  <div
                    className="cursor-zoom-in w-full h-full relative"
                    onClick={open}
                  >
                    <Image
                      ref={ref as React.Ref<HTMLImageElement>}
                      src={project.src}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                      sizes="(max-width: 768px) 85vw, (max-width: 1200px) 50vw, 33vw"
                    />

                    {/* Overlay com Informações (Padronizado) */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                      <span className="text-orange-400 text-xs font-bold uppercase tracking-wider mb-1">
                        {project.category}
                      </span>
                      <h3 className="text-white font-serif font-bold text-xl leading-tight">
                        {project.title}
                      </h3>
                    </div>
                  </div>
                )}
              </Item>
            </div>
          </div>
        ))}
      </CarouselSection>

      {/* Link Mobile Rodapé (Fallback padrão) */}
      <div className="md:hidden text-center pb-8 bg-white">
        <Link 
            href="/trabalhos" 
            className="inline-flex items-center gap-2 text-stone-800 font-bold border-b border-stone-800 pb-1"
        >
            Ver galeria completa
        </Link>
      </div>
    </Gallery>
  );
}