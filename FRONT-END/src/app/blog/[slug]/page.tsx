import { notFound } from "next/navigation";
import Image from "next/image";
import { posts } from "@/data/posts";
// 2. Interface atualizada para Promise
interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

// 3. A função agora é 'async'
export default async function BlogPost({ params }: PageProps) {
  
  // 4. "Esperamos" o parâmetro chegar
  const { slug } = await params;

  // 5. Buscamos o post usando a variável 'slug' já resolvida
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="max-w-4xl mx-auto px-[22px] py-16">
      <div className="mb-8 text-center">
        <p className="text-sm text-gray-500 mb-2">
          {post.date} • Por {post.author}
        </p>
        <h1 className="text-4xl md:text-5xl font-bold text-black-90 mb-6">
          {post.title}
        </h1>
        <div className="relative w-full h-[400px] rounded-2xl overflow-hidden shadow-lg">
            <Image
                src={post.image} 
                alt={post.title}
                fill
                className="object-cover"
            />
        </div>
      </div>

      <article className="prose prose-lg max-w-none text-black-60">
        <p>{post.content}</p>
      </article>

      <div className="mt-12 pt-8 border-t border-gray-200">
        <a href="/blog" className="text-orange-500 font-bold hover:underline">
          ← Voltar para o Blog
        </a>
      </div>
    </main>
  );
}