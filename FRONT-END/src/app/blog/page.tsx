"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import Link from "next/link";
import CtaSection from "@/Components/Home/CtaSection";

// Tipo igual ao do banco de dados
interface Post {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  image_url: string; // No banco chamamos de image_url
  date: string;
  author?: string; // Opcional, caso não tenha no banco ainda
}

export default function BlogListingPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      // Busca todos os posts ordenados pelo ID (os mais novos por último ou primeiro, você decide)
      // Aqui pus .order('id', { ascending: false }) para o mais novo ser o primeiro (Destaque)
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .order("id", { ascending: false });

      if (!error && data) {
        setPosts(data);
      }
      setIsLoading(false);
    }

    fetchPosts();
  }, []);

  // LÓGICA MANTIDA:
  // 1. O primeiro post da lista vira o "Destaque"
  // 2. O resto vai para o grid normal
  const featuredPost = posts[0];
  const regularPosts = posts.slice(1);

  // Loading state simples para não piscar a tela
  if (isLoading) return <div className="py-20 text-center">Carregando novidades...</div>;

  return (
    <div className="w-full bg-white min-h-screen pb-20">
      {/* --- 1. HERO SECTION (SEU DESIGN ORIGINAL) --- */}
      <section className="relative w-full h-[400px] flex items-center justify-center bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <Image
            src="/marmore-blog-hero.jpg" // Certifique-se que essa imagem existe na pasta public
            alt="Blog Ginogran"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-[22px] text-center">
          <span className="block text-[#F9A825] font-semibold tracking-widest uppercase mb-4 text-sm md:text-base">
            Notícias & Tendências
          </span>
          <h1 className="text-4xl md:text-6xl text-white mb-6 font-bold">
            Blog Ginogran
          </h1>
          <p className="text-gray-200 max-w-2xl mx-auto text-lg font-light leading-relaxed">
            Dicas de arquitetura, manutenção de pedras e inspirações para o seu projeto.
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        
        {/* --- 2. POST EM DESTAQUE (Lógica conectada ao Supabase) --- */}
        {featuredPost && (
          <section className="mb-20">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 border-l-4 border-[#F9A825] pl-4">
              Destaque da Semana
            </h2>

            <Link
              href={`/blog/${featuredPost.slug}`}
              className="group grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-gray-50 rounded-3xl p-6 md:p-8 hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className="relative h-64 md:h-96 w-full rounded-2xl overflow-hidden shadow-md">
                <Image
                  src={featuredPost.image_url} // Note: image_url do Supabase
                  alt={featuredPost.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              <div className="flex flex-col justify-center space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  <span className="bg-[#F9A825] text-white px-3 py-1 rounded-full font-bold text-xs uppercase tracking-wide">
                    Novo
                  </span>
                  <span className="text-gray-500">{featuredPost.date}</span>
                </div>

                <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight group-hover:text-[#F9A825] transition-colors">
                  {featuredPost.title}
                </h3>

                <p className="text-gray-600 text-lg line-clamp-3 leading-relaxed">
                  {featuredPost.excerpt}
                </p>

                <div className="pt-4">
                  <span className="text-sm font-bold text-gray-900 border-b-2 border-[#F9A825] pb-1">
                    Ler artigo completo
                  </span>
                </div>
              </div>
            </Link>
          </section>
        )}

        {/* --- 3. GRID DE POSTS RECENTES --- */}
        <section>
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl font-bold text-gray-900 border-l-4 border-[#F9A825] pl-4">
              Últimas Postagens
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {regularPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-gray-100"
              >
                <div className="relative h-60 w-full overflow-hidden">
                  <Image
                    src={post.image_url}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg text-xs font-bold text-gray-900 uppercase">
                    Artigo
                  </div>
                </div>

                <div className="flex flex-col flex-grow p-6">
                  <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
                    <span>{post.date}</span>
                    {post.author && (
                      <>
                        <span>•</span>
                        <span>{post.author}</span>
                      </>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3 leading-snug group-hover:text-[#F9A825] transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-gray-600 text-sm line-clamp-3 mb-6 flex-grow">
                    {post.excerpt}
                  </p>

                  <div className="mt-auto flex items-center text-[#F9A825] text-sm font-bold gap-2">
                    Ler mais
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Empty State */}
          {posts.length === 0 && (
            <div className="text-center py-20 bg-gray-50 rounded-3xl">
              <p className="text-gray-500 text-lg">
                Em breve novidades por aqui.
              </p>
            </div>
          )}
        </section>
        <CtaSection />
        
      </main>
    </div>
  );
}