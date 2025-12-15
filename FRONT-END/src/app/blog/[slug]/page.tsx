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
      <main className="w-full  py-12 md:py-10">
        <header className="max-w-full mx-auto text-center mb-12 px-22">

                {/* 1. Chapéu (Categoria e Data) - Alinhado à esquerda estilo G1 */}
        <div className="flex items-center gap-3 mb-4 border-b border-gray-100 pb-4">
          <span className="text-orange-600 font-extrabold text-xs uppercase tracking-wider">
            Blog Ginogran
          </span>
          <span className="text-gray-300 text-xs">•</span>
          <span className="text-gray-500 text-sm font-medium">
            {post.date}
          </span>
        </div>

        {/* 2. Título e Autor Lado a Lado (Flexbox Responsivo) */}
        <div className=" flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          
          {/* Título: Fonte pesada, tracking apertado (Estilo Jornal) */}
          <h1 className="text-5xl md:text-5xl lg:text-3xl font-extrabold text-gray-900 leading-[1.1] tracking-tight max-w-4xl ">
            {post.title}
          </h1>

          <div className="flex items-center gap-3 shrink-0 pt-2 lg:pt-0">
            <div className="w-8 h-8 rounded-full bg-gray-100 overflow-hidden relative border border-gray-200">
              <div className="absolute inset-0 bg-orange-500 flex items-center justify-center text-white text-lg font-bold">
                {post.author.charAt(0)}
              </div>
            </div>
            <span className="text-xs text-gray-500 uppercase font-semibold tracking-wide">
              Escrito por <span className="text-sm font-bold text-gray-900">{post.author}</span>
            </span> 
          </div>

        </div>
          
        </header>

        {/* --- IMAGEM DE DESTAQUE (Hero) --- */}
        {/* Ocupa bastante espaço, cantos levemente arredondados, sombra suave */}
        <div className="max-full mx-auto mb-16 px-22">
          <div className="relative w-full h-[400px] md:h-[400px] rounded-4xl overflow-hidden shadow-2xl">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover hover:scale-105 transition-transform duration-700 ease-out"
              priority
            />
          </div>
        </div>

        {/* --- LAYOUT DE CONTEÚDO + SIDEBAR --- */}
        <div className="max-full px-22 mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* COLUNA ESQUERDA: Texto do Artigo (Ocupa 8 colunas) */}
          <article className="lg:col-span-8">
            <div className="prose prose-lg md:prose-xl max-w-none text-gray-600 
              prose-headings:text-gray-900 prose-headings:font-bold 
              prose-a:text-orange-500 prose-a:no-underline hover:prose-a:underline
              prose-img:rounded-2xl prose-img:shadow-lg">
              
              {/* Renderização do texto */}
              <p className="lead text-xl md:text-2xl text-gray-500 mb-8">
                {/* Intro simulada se não tiver no dado, ou use o primeiro parágrafo */}
                {post.excerpt}
              </p>
              
              <p>{post.content}</p>
              
              <hr className="my-12 border-gray-100" />
              
              {/* Tags e Compartilhamento */}
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex gap-2">
                  <span className="px-4 py-2 bg-gray-50 rounded-lg text-sm text-gray-600 cursor-pointer hover:bg-gray-100">#Mármore</span>
                  <span className="px-4 py-2 bg-gray-50 rounded-lg text-sm text-gray-600 cursor-pointer hover:bg-gray-100">#Design</span>
                </div>
                <div className="text-sm font-bold text-gray-900 cursor-pointer hover:text-orange-500">
                  Compartilhar este post
                </div>
              </div>
            </div>
          </article>

          {/* COLUNA DIREITA: Sidebar (Ocupa 4 colunas) */}
          <aside className="lg:col-span-4">
            <div className="sticky top-10 space-y-12">
              
              {/* Widget: Sobre a Empresa/Autor */}
              <div className="bg-gray-50 p-8 rounded-3xl">
                <h3 className="text-xl font-bold mb-4 text-gray-900">Sobre a Ginogran</h3>
                <p className="text-gray-600 mb-6  leading-relaxed">
                  Especialistas em mármores e granitos de alto padrão. Transformamos pedras naturais em obras de arte para o seu lar.
                </p>
                <Link href="/sobre" className="text-orange-500 font-bold hover:underline">
                  Conheça nossa história →
                </Link>
              </div>

              {/* Widget: Posts Recentes (Estilo Clean) */}
              <div>
                <h3 className="text-xl font-bold mb-6 text-gray-900 border-b border-gray-100 pb-2">
                  Últimas Novidades
                </h3>
                <div className="flex flex-col gap-6">
                  {recentPosts.map((item) => (
                    <Link key={item.slug} href={`/blog/${item.slug}`} className="group flex gap-4 items-start">
                      <div className="relative w-24 h-24 shrink-0 rounded-xl overflow-hidden">
                        <Image 
                          src={item.image} 
                          alt={item.title} 
                          fill 
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 leading-snug group-hover:text-orange-500 transition-colors">
                          {item.title}
                        </h4>
                        <p className="text-xs text-gray-400 mt-2">{item.date}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Widget: Newsletter / Banner */}
              <div className="relative rounded-3xl overflow-hidden h-64 shadow-lg group cursor-pointer">
                 <Image 
                   src="/marmore1.jpeg" // Use uma imagem genérica ou de fallback aqui
                   alt="Banner"
                   fill
                   className="object-cover brightness-50 group-hover:scale-105 transition-transform duration-500"
                 />
                 <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">Faça um Orçamento</h3>
                    <p className="text-sm opacity-90 mb-4">Descubra o mármore ideal para o seu projeto.</p>
                    <button className="bg-white text-black px-6 py-2 rounded-full font-bold hover:bg-orange-500 hover:text-white transition-colors">
                      Falar Agora
                    </button>
                 </div>
              </div>

            </div>
          </aside>
        </div>

        {/* --- RODAPÉ DO POST (Grid de Sugestões) --- */}
        <BlogSection/>

      </main>
    </div>
  );
}