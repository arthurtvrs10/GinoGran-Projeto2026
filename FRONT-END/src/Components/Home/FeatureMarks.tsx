"use client";

import Image from "next/image";
import Link from "next/link";
import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";
import { projects } from "@/data/projects";

export default function FeaturedWorks() {
  // Pegamos apenas os primeiros 6 projetos para não poluir a Home
  const recentProjects = projects.slice(0, 6);

  return (
    <section className="w-full py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* --- CABEÇALHO DA SEÇÃO --- */}
        <div className="text-center mb-12">
          <span className="block text-[#F9A825] font-bold tracking-widest uppercase text-sm mb-2">
            Nosso Portfólio
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900">
            Projetos em Destaque
          </h2>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
            Confira algumas das nossas execuções recentes em mármores e granitos de alto padrão.
          </p>
        </div>

        {/* --- GRID MASONRY (Versão resumida) --- */}
        <Gallery>
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {recentProjects.map((project) => (
              <div
                key={project.id}
                className="break-inside-avoid group relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 bg-gray-100"
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
                    >
                      <Image
                        ref={ref as React.Ref<HTMLImageElement>}
                        src={project.src}
                        alt={project.title}
                        width={project.width}
                        height={project.height}
                        className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
                      />

                      {/* Overlay Clean */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                        <div>
                            <span className="text-[#F9A825] text-xs font-bold uppercase">
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
        <div className="mt-16 text-center">
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