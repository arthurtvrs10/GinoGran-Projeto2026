"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, User, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";

import { BlogSkeleton } from "@/Components/Skeletons/HomeSkeletons";

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
          .from('posts')
          .select('*')
          .order('id', { ascending: false })
          .limit(4);

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
            image: item.image_url || item.image || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c", 
            category: item.category || "Dicas"
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

  if (isLoading) {
    return (
      <section className="w-full py-8 bg-white px-5 md:px-22">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-8 border-t border-gray-100 pt-6">
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
    <section className="w-full py-8 bg-white px-5 md:px-22 transition-colors duration-500 overflow-hidden">
      <div className="max-w-full mx-auto">
        
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
            className="hidden md:flex group items-center gap-2 text-gray-600 font-bold hover:text-orange-600 transition-colors mt-4 md:mt-0"
          >
            Ver blog completo
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* AQUI ESTÁ A MÁGICA DO SCROLL HORIZONTAL */}
          <div className="
            flex gap-4 overflow-x-auto snap-x snap-mandatory pb-6 -mx-5 px-5 scrollbar-hide
            md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-8 md:pb-0 md:mx-0 md:px-0
          ">
            {posts.map((post) => (
              <article
                key={post.id}
                // No Mobile: min-w-[85%] para carrossel. 
                // No Desktop: min-w-0 para grid normal.
                className="
                  min-w-[85%] sm:min-w-[45%] snap-center
                  md:min-w-0
                  bg-white rounded-md overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group hover:-translate-y-1 border border-gray-100
                "
              >
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

                <div className="p-6">
                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                    <div className="flex items-center gap-1"><Calendar size={14} />{post.date}</div>
                    <div className="flex items-center gap-1"><User size={14} />{post.author}</div>
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

            {/* CARD 'VER BLOG COMPLETO' (Apenas Mobile - Final do Scroll) */}
            <div className="flex md:hidden min-w-[40%] snap-center items-center justify-center bg-gray-50 rounded-md border border-gray-100">
                <Link 
                  href="/blog" 
                  className="flex flex-col items-center gap-3 group p-6 text-center"
                >
                  <div className="w-14 h-14 rounded-full bg-orange-100 border border-orange-200 flex items-center justify-center text-orange-600 group-active:scale-95 transition-all shadow-sm">
                      <ArrowRight size={24} />
                  </div>
                  <span className="font-bold text-sm text-gray-700">Ver Blog Completo</span>
                </Link>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}