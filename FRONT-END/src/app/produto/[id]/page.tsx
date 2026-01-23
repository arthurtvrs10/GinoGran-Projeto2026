import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import ProductView from "@/Components/Product/ProductView";
import { FeatureCatalog } from "@/Components/Home/FeatureCatalog"; // Importamos o carrossel reutilizável
import { Metadata } from "next";

type Props = {
  params: Promise<{ id: string }>;
};

// Gera rotas estáticas
export async function generateStaticParams() {
  const { data: products } = await supabase.from("produtos").select("id");
  return products?.map((p) => ({ id: p.id.toString() })) || [];
}

// SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const { data: product } = await supabase.from("produtos").select("*").eq("id", id).single();

  if (!product) return { title: "Produto não encontrado" };

  return {
    title: `${product.title} | GinoGran`,
    description: `Detalhes do mármore ${product.title}.`,
    openGraph: { images: [product.image] },
  };
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;

  // Busca paralela: Produto atual + Sugestões
  const productData = supabase.from("produtos").select("*").eq("id", id).single();
  
  // Busca outros produtos para o carrossel (excluindo o atual)
  const relatedData = supabase
    .from("produtos")
    .select("*")
    .neq("id", id)
    .limit(8);

  const [{ data: product }, { data: relatedProducts }] = await Promise.all([productData, relatedData]);

  if (!product) notFound();

  return (
    <div className="bg-white">
      {/* Visual do Produto (Sem carrossel interno) */}
      <ProductView product={product} />

      {/* Carrossel Injetado Externamente */}
      <FeatureCatalog 
        title="Você também pode gostar" 
        subtitle="Curadoria Especial"
        products={relatedProducts || []}
        showViewAll={false} // Esconde o botão "Ver todos" nesta página
      />
    </div>
  );
}