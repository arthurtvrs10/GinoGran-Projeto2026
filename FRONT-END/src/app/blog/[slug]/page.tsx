import { Metadata } from "next";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import Link from "next/link";
import BlogSection from "@/Components/Home/BlogSection";
import { notFound } from "next/navigation";

// Interface do Post
interface Post {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image_url: string;
  date: string;
  author?: string;
}

// Em Next.js 15/16, params deve ser tipado como uma Promise
interface Props {
  params: Promise<{ slug: string }>;
}

// --- 1. GERAÇÃO DE METADATA (CORRIGIDO) ---
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // Await é obrigatório aqui no Next 15+
  const { slug } = await params;

  const { data: post } = await supabase
    .from("posts")
    .select("title, excerpt, image_url")
    .eq("slug", slug)
    .single();

  if (!post) {
    return {
      title: "Post não encontrado",
    };
  }

  return {
    title: post.title,
    description: post.excerpt || "Confira este artigo no blog da Ginogran.",
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image_url],
    },
  };
}

// --- 2. COMPONENTE DA PÁGINA ---
export default async function BlogPost({ params }: Props) {
  // Await é obrigatório aqui também
  const { slug } = await params;

  // Busca o Post Atual
  const { data: post } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .single();

  // Se não achar, manda para página 404
  if (!post) {
    notFound();
  }

  // Busca posts recentes (SideBar)
  const { data: recentPosts } = await supabase
    .from("posts")
    .select("*")
    .neq("id", post.id)
    .limit(3);

  const authorName = post.author || "Equipe Ginogran";

  return (
    <div className="w-full bg-white">
      {/* --- HERO SECTION --- */}
      <div className="relative w-full h-[400px] md:h-[400px] flex items-center justify-center overflow-hidden">
        <Image
          src={post.image_url}
          alt={post.title}
          fill
          className="object-cover z-0"
          priority
        />
        <div className="absolute inset-0 bg-black/60 z-10" />

        <div className="relative z-20 w-full max-w-4xl mx-auto px-4 text-center flex flex-col items-center gap-6">
          <div className="flex items-center gap-3">
            <span className="bg-orange-400 text-white px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full">
              Blog Ginogran
            </span>
            <span className="text-gray-400 text-xs">•</span>
            <span className="text-gray-200 text-sm font-medium">
              {post.date}
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight drop-shadow-lg">
            {post.title}
          </h1>

          <div className="flex items-center gap-3 mt-2">
            <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md overflow-hidden relative border border-white/20 flex items-center justify-center">
              <span className="text-white font-bold text-lg">
                {authorName.charAt(0)}
              </span>
            </div>
            <div className="text-left">
              <p className="text-[10px] text-gray-300 uppercase font-semibold tracking-wide">
                Escrito por
              </p>
              <p className="text-sm font-bold text-white">{authorName}</p>
            </div>
          </div>
        </div>
      </div>

      {/* --- CONTEÚDO PRINCIPAL --- */}
      <main className="w-full py-12 md:py-16">
        <div className="max-w-7xl px-4 md:px-8 mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
          <article className="lg:col-span-8">
            <div className="prose prose-lg md:prose-xl max-w-none text-gray-600 prose-headings:text-gray-900 prose-headings:font-bold prose-a:text-orange-400 prose-a:no-underline hover:prose-a:underline prose-img:rounded-2xl prose-img:shadow-lg">
              {post.excerpt && (
                <p className="lead text-xl md:text-2xl text-gray-500 mb-8 font-light italic border-l-4 border-orange-400 pl-4">
                  {post.excerpt}
                </p>
              )}

              <div className="whitespace-pre-line">{post.content}</div>

              <hr className="my-12 border-gray-100" />

              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex gap-2">
                  <span className="px-4 py-2 bg-gray-50 rounded-lg text-sm text-gray-600">
                    #Mármore
                  </span>
                </div>
              </div>
            </div>
          </article>

          {/* SIDEBAR */}
          <aside className="lg:col-span-4">
            <div className="sticky top-10 space-y-12">
              <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
                <h3 className="text-xl font-bold mb-4 text-gray-900">
                  Sobre a Ginogran
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed text-sm">
                  Especialistas em mármores e granitos de alto padrão.
                </p>
                <Link
                  href="/SobreNos"
                  className="text-orange-400 font-bold hover:underline text-sm"
                >
                  Conheça nossa história →
                </Link>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-6 text-gray-900 border-b border-gray-100 pb-2">
                  Últimas Novidades
                </h3>
                <div className="flex flex-col gap-6">
                  {recentPosts &&
                    recentPosts.map((item: Post) => (
                      <Link
                        key={item.slug}
                        href={`/blog/${item.slug}`}
                        className="group flex gap-4 items-start"
                      >
                        <div className="relative w-20 h-20 shrink-0 rounded-xl overflow-hidden bg-gray-200">
                          <Image
                            src={item.image_url}
                            alt={item.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-900 text-sm leading-snug group-hover:text-orange-400 transition-colors line-clamp-2">
                            {item.title}
                          </h4>
                          <p className="text-xs text-gray-400 mt-2">
                            {item.date}
                          </p>
                        </div>
                      </Link>
                    ))}
                </div>
              </div>
            </div>
          </aside>
        </div>

        <div className="mt-16 pt-12 border-t border-gray-100">
          <BlogSection />
        </div>
      </main>
    </div>
  );
}
