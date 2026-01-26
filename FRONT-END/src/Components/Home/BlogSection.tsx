"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, User, ArrowRight } from "lucide-react";
import { supabase } from "@/lib/supabase";

import { BlogSkeleton } from "@/Components/Skeletons/HomeSkeletons";
import { CarouselSection } from "@/Components/ui/CarouselSection"; // Importando o padrão

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

interface SupabasePostRaw {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  image?: string;
  image_url?: string;
}

export default function BlogSection() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from("posts")
          .select("*")
          .order("id", { ascending: false })
          .limit(6); // Aumentei levemente o limite para aproveitar o carrossel

        if (error) console.error("Erro Supabase:", error);

        if (data) {
          const rawData = data as SupabasePostRaw[];
          const formattedData: BlogPost[] = rawData.map((item) => ({
            id: item.id,
            slug: item.slug || "sem-slug",
            title: item.title || "Sem título",
            excerpt: item.excerpt || "",
            date: item.date || "Data ind.",
            author: item.author || "Equipe Ginogran",
            image:
              item.image_url ||
              item.image ||
              "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
            category: item.category || "Dicas",
          }));
          setPosts(formattedData);
        }
      } catch (err) {
        console.error("Erro ao carregar blog:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchPosts();
  }, []);

  // Botão de Ação do Header (Desktop)
  const headerAction = (
    <Link
      href="/blog"
      className="hidden md:flex items-center gap-2 text-stone-500 hover:text-stone-900 transition-colors text-sm font-medium group"
    >
      Ver blog completo
      <ArrowRight
        size={16}
        className="group-hover:translate-x-1 transition-transform"
      />
    </Link>
  );

  if (isLoading) {
    return (
      <section className="w-full py-5 md:pt-5 bg-white border-t border-stone-100">
        <div className="max-w-[1440px] mx-auto px-4 md:px-22">
          {/* Skeleton Header alinhado com o padrão */}
          <div className="flex flex-col md:flex-row justify-between items-end mb-8 md:mb-12">
            <div className="space-y-2">
              <div className="h-3 w-24 bg-gray-200 animate-pulse rounded-full" />
              <div className="h-8 w-64 bg-gray-200 animate-pulse rounded-lg" />
            </div>
          </div>
          <BlogSkeleton />
        </div>
      </section>
    );
  }

  if (posts.length === 0) return null;

  return (
    <CarouselSection
      title="Dicas de especialistas"
      subtitle="Nossa Coleção"
      headerAction={headerAction}
      className="bg-white" // Mantendo fundo branco
      viewAllLink="/blog" // Link para o card mobile
      viewAllText="Ver Blog Completo" // Texto do card mobile
    >
      {posts.map((post) => (
        <article
          key={post.id}
          // Larguras fixas para o carrossel funcionar bem (substituindo o min-w-[85%] do grid antigo)
          className="
            w-[300px] md:w-[380px] snap-center shrink-0
            bg-white rounded-md overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group hover:-translate-y-1 border border-gray-100
          "
        >
          {/* Imagem */}
          <div className="relative h-48 overflow-hidden bg-gray-100">
            <div className="absolute top-4 left-4 bg-orange-50 text-white text-xs font-bold px-3 py-1 rounded-full z-10">
              {post.category}
            </div>
            <Image
              src={post.image}
              alt={post.title}
              quality={60}
              sizes="(max-width: 768px) 100vw, 33vw" // Informe ao browser que o card é pequeno
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

            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-50 transition-colors line-clamp-2">
              {post.title}
            </h3>
            <p className="text-gray-500 text-sm mb-4 line-clamp-3">
              {post.excerpt}
            </p>

            <Link
              href={`/blog/${post.slug}`}
              className="inline-flex items-center gap-2 text-orange-50 font-bold text-sm hover:gap-3 transition-all"
            >
              Ler artigo completo <ArrowRight size={16} />
            </Link>
          </div>
        </article>
      ))}
    </CarouselSection>
  );
}