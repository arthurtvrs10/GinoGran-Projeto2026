import { notFound } from "next/navigation";
import Image from "next/image";
import { posts } from "@/data/posts";
import Link from "next/link";
import BlogSection from "@/Components/Home/BlogSection";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function BlogPost({ params }: PageProps) {
  const { slug } = await params;

  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  // Pega posts recentes (excluindo o atual)
  const recentPosts = posts.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <div className="w-full bg-white">
      
      {/* --- HERO SECTION (NOVO: Imagem de Fundo + Texto Centralizado) --- */}
      {/* Esta seção fica fora do container principal para ocupar a largura total */}
      <div className="relative w-full h-[400px] md:h-[400px] flex items-center justify-center overflow-hidden">
        
        {/* 1. Imagem de Background */}
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover z-0"
          priority
        />

        {/* 2. Overlay (Máscara Escura) - Essencial para leitura do texto */}
        <div className="absolute inset-0 bg-black/60 z-10" />

        {/* 3. Conteúdo Centralizado */}
        <div className="relative z-20 w-full max-w-4xl mx-auto px-4 text-center flex flex-col items-center gap-6">
          
          {/* Chapéu (Categoria e Data) */}
          <div className="flex items-center gap-3">
            <span className="bg-orange-400 text-white px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full">
              Blog Ginogran
            </span>
            <span className="text-gray-400 text-xs">•</span>
            <span className="text-gray-200 text-sm font-medium">
              {post.date}
            </span>
          </div>

          {/* Título */}
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight drop-shadow-lg">
            {post.title}
          </h1>

          {/* Autor */}
          <div className="flex items-center gap-3 mt-2">
            <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md overflow-hidden relative border border-white/20 flex items-center justify-center">
               <span className="text-white font-bold text-lg">{post.author.charAt(0)}</span>
            </div>
            <div className="text-left">
               <p className="text-[10px] text-gray-300 uppercase font-semibold tracking-wide">
                 Escrito por
               </p>
               <p className="text-sm font-bold text-white">
                 {post.author}
               </p>
            </div>
          </div>

        </div>
      </div>

      {/* --- CONTEÚDO PRINCIPAL --- */}
      <main className="w-full py-12 md:py-16">
        
        {/* Container do Grid (Conteúdo + Sidebar) */}
        <div className="max-w-7xl px-4 md:px-8 mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* COLUNA ESQUERDA: Texto do Artigo (Ocupa 8 colunas) */}
          <article className="lg:col-span-8">
            <div className="prose prose-lg md:prose-xl max-w-none text-gray-600 
              prose-headings:text-gray-900 prose-headings:font-bold 
              prose-a:text-orange-400 prose-a:no-underline hover:prose-a:underline
              prose-img:rounded-2xl prose-img:shadow-lg">
              
              {/* Excerpt (Intro) */}
              {post.excerpt && (
                <p className="lead text-xl md:text-2xl text-gray-500 mb-8 font-light italic border-l-4 border-orange-400 pl-4">
                  {post.excerpt}
                </p>
              )}
              
              {/* Corpo do Texto */}
              {/* Se o post.content for HTML puro, use dangerouslySetInnerHTML, senão mantenha o <p> */}
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
              
              <hr className="my-12 border-gray-100" />
              
              {/* Tags e Compartilhamento */}
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex gap-2">
                  <span className="px-4 py-2 bg-gray-50 rounded-lg text-sm text-gray-600 cursor-pointer hover:bg-gray-100">#Mármore</span>
                  <span className="px-4 py-2 bg-gray-50 rounded-lg text-sm text-gray-600 cursor-pointer hover:bg-gray-100">#Design</span>
                </div>
                <div className="text-sm font-bold text-gray-900 cursor-pointer hover:text-orange-400 transition-colors">
                  Compartilhar este post
                </div>
              </div>
            </div>
          </article>

          {/* COLUNA DIREITA: Sidebar (Ocupa 4 colunas) */}
          <aside className="lg:col-span-4">
            <div className="sticky top-10 space-y-12">
              
              {/* Widget: Sobre a Empresa */}
              <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
                <h3 className="text-xl font-bold mb-4 text-gray-900">Sobre a Ginogran</h3>
                <p className="text-gray-600 mb-6 leading-relaxed text-sm">
                  Especialistas em mármores e granitos de alto padrão. Transformamos pedras naturais em obras de arte para o seu lar.
                </p>
                <Link href="/SobreNos" className="text-orange-400 font-bold hover:underline text-sm">
                  Conheça nossa história →
                </Link>
              </div>

              {/* Widget: Posts Recentes */}
              <div>
                <h3 className="text-xl font-bold mb-6 text-gray-900 border-b border-gray-100 pb-2">
                  Últimas Novidades
                </h3>
                <div className="flex flex-col gap-6">
                  {recentPosts.map((item) => (
                    <Link key={item.slug} href={`/blog/${item.slug}`} className="group flex gap-4 items-start">
                      <div className="relative w-20 h-20 shrink-0 rounded-xl overflow-hidden bg-gray-200">
                        <Image 
                          src={item.image} 
                          alt={item.title} 
                          fill 
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 text-sm leading-snug group-hover:text-orange-400 transition-colors line-clamp-2">
                          {item.title}
                        </h4>
                        <p className="text-xs text-gray-400 mt-2">{item.date}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Widget: Banner Promocional */}
              <div className="relative rounded-3xl overflow-hidden h-64 shadow-lg group cursor-pointer">
                  <Image 
                    src="/marmore1.jpeg" // Certifique-se que esta imagem existe em public/
                    alt="Banner"
                    fill
                    className="object-cover brightness-50 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">Faça um Orçamento</h3>
                    <p className="text-sm opacity-90 mb-4">Descubra o mármore ideal para o seu projeto.</p>
                    <a href="https://wa.me/61985921488" className="bg-white text-black px-6 py-2 rounded-full font-bold hover:bg-orange-500 hover:text-white transition-colors text-sm">
                      Falar Agora
                    </a>
                  </div>
              </div>

            </div>
          </aside>
        </div>

        {/* --- SUGESTÕES FINAIS --- */}
        <div className="mt-16 pt-12 border-t border-gray-100">
          <BlogSection/>
        </div>

      </main>
    </div>
  );
}