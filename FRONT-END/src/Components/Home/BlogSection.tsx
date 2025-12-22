"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, User, ArrowRight } from "lucide-react";
import { supabase } from "@/lib/supabase";

// 1. Interface para o componente (o que a gente mostra na tela)
interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  image: string;
  category: string;
}

// 2. Interface para os dados do Banco (o que vem do Supabase)
// Deixamos image e image_url como opcionais (?) para o código não quebrar se faltar um
interface SupabasePostRaw {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  image?: string;      // Pode vir assim (antigo)
  image_url?: string;  // Ou assim (novo)
}

export default function BlogSection() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('id', { ascending: false })
        .limit(4);

      if (error) {
        console.error("Erro Supabase:", error);
      }

      if (data) {
        // AQUI ESTÁ A CORREÇÃO:
        // Dizemos ao TypeScript que 'data' é uma lista de 'SupabasePostRaw'
        // Assim não precisamos usar 'any'
        const rawData = data as SupabasePostRaw[];

        const formattedData: BlogPost[] = rawData.map((item) => ({
          id: item.id,
          slug: item.slug || "sem-slug",
          title: item.title || "Sem título",
          excerpt: item.excerpt || "",
          date: item.date || "Data ind.",
          author: item.author || "Equipe Ginogran",
          // Lógica de fallback segura e tipada
          image: item.image_url || item.image || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c", 
          category: item.category || "Dicas"
        }));

        setPosts(formattedData);
      }
      setIsLoading(false);
    }

    fetchPosts();
  }, []);

  if (!isLoading && posts.length === 0) return null;

  return (
    <section className="w-full py-8 bg-white px-5 md:px-22">
      <div className="max-w-7xl mx-auto">
        
        {/* Cabeçalho */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 border-t border-gray-100 pt-6">
          <div>
            <span className="text-orange-600 font-bold uppercase tracking-wider text-xs">
              Nossa Coleção
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
              Dicas de especialistas
            </h2>
          </div>

          <Link
            href="/blog"
            className="group flex items-center gap-2 text-gray-600 font-bold hover:text-orange-600 transition-colors mt-4 md:mt-0"
          >
            Ver blog completo
            <ArrowRight
              size={20}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>

        {/* Loading ou Grid */}
        {isLoading ? (
          <div className="text-center py-10 text-gray-400">Carregando...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {posts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-md overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group hover:-translate-y-1 border border-gray-100"
              >
                {/* Imagem */}
                <div className="relative h-48 overflow-hidden bg-gray-100">
                  <div className="absolute top-4 left-4 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10">
                    {post.category}
                  </div>
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Conteúdo */}
                <div className="p-6">
                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      {post.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <User size={14} />
                      {post.author}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 text-orange-600 font-bold text-sm hover:gap-3 transition-all"
                  >
                    Ler artigo completo <ArrowRight size={16} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}