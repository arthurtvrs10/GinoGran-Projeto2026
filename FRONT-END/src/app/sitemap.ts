import { MetadataRoute } from 'next';
import { supabase } from "@/lib/supabase"; // Importando sua instância do Supabase

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.ginogran.com.br";

  // 1. Busca IDs de todos os produtos do catálogo
  const { data: produtos } = await supabase
    .from("produtos")
    .select("id");

  // 2. Busca Slugs de todos os posts do blog
  const { data: posts } = await supabase
    .from("posts")
    .select("slug");

  // --- Rotas Estáticas Principais ---
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${baseUrl}/SobreNos`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/Catalogo`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contato`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/trabalhos`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    }
  ];

  // --- Rotas Dinâmicas de Produtos ---
  // Transforma os IDs (como 200, 300, etc) em URLs completas
  const productRoutes: MetadataRoute.Sitemap = (produtos || []).map((p) => ({
    url: `${baseUrl}/produto/${p.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  // --- Rotas Dinâmicas do Blog ---
  // Transforma os slugs em URLs completas
  const blogRoutes: MetadataRoute.Sitemap = (posts || []).map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  // Retorna a combinação de todas as rotas
  return [...staticRoutes, ...productRoutes, ...blogRoutes];
}