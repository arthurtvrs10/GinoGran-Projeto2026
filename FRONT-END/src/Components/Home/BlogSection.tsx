import Image from "next/image";
import { Calendar, User, ArrowRight } from "lucide-react";
import { posts } from "@/data/posts";
// 1. Definimos o "formato" do nosso post
interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string; // Um resumo curto
  date: string;
  author: string;
  image: string;
  category: string;
}

export default function BlogSection() {
  return (
    <section className="w-full py-8 bg-gray-50 px-22">
      <div className="max-w mx-auto">
        {/* Cabeçalho da Seção */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-black-90">
            Dicas de Especialista
          </h2>
        </div>

        {/* Grid de Posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {posts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group hover:-translate-y-1 border border-black-10"
            >
              {/* Imagem do Card */}
              <div className="relative h-48 overflow-hidden">
                <div className="absolute top-4 left-4 bg-(--Orange50-Primary) text-black-100 text-xs font-bold px-3 py-1 rounded-full z-10">
                  {post.category}
                </div>
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="w-full h-full object-cover ..."
                />
              </div>

              {/* Conteúdo do Card */}
              <div className="p-6">
                {/* Metadados (Data e Autor) */}
                <div className="flex items-center gap-4 text-xs text-black-50 mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    {post.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <User size={14} />
                    {post.author}
                  </div>
                </div>

                {/* Título e Resumo */}
                <h3 className="text-xl font-bold text-black-90 mb-3 group-hover:text-(--Orange50-Primary) transition-colors">
                  {post.title}
                </h3>
                <p className="text-black-60 text-sm mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Link de Ler Mais */}
                <a
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-2 text-(--Orange50-Primary) font-bold text-sm hover:gap-3 transition-all"
                >
                  Ler artigo completo <ArrowRight size={16} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
