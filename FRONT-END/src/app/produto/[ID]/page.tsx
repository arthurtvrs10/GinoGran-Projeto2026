import { supabase } from "@/lib/supabase";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

// --- TIPAGEM NEXT.JS 16 (Params é Promise) ---
type Props = {
  params: Promise<{ id: string }>;
};

// 1. Gera as rotas estáticas para performance (opcional, mas recomendado)
export async function generateStaticParams() {
  const { data: products } = await supabase.from("produtos").select("id");
  // O retorno deve ser strings
  return products?.map((p) => ({ id: p.id.toString() })) || [];
}

// 2. Busca os dados do produto
async function getProduct(id: string) {
  // Garante que o ID seja tratado corretamente na query
  const { data } = await supabase
    .from("produtos")
    .select("*")
    .eq("id", id)
    .single();
  return data;
}

// 3. Metadados Dinâmicos (SEO)
export async function generateMetadata({ params }: Props) {
  const { id } = await params; // Next 16: Aguarda os params
  const product = await getProduct(id);

  if (!product) return { title: "Produto não encontrado" };

  return {
    title: `${product.title} | GinoGran`,
    description:
      product.description || `Confira o ${product.title} na GinoGran.`,
    openGraph: {
      images: [product.image],
    },
  };
}

// 4. Componente da Página (Default Export)
export default async function ProductPage({ params }: Props) {
  const { id } = await params; // Next 16: Aguarda os params
  const product = await getProduct(id);

  if (!product) notFound();

  return (
    <main className="min-h-screen bg-white py-12 px-4 md:px-22">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb Simples */}
        <nav className="text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-black">
            Início
          </Link>{" "}
          &gt;{" "}
          <Link href="/Catalogo" className="hover:text-black">
            Catálogo
          </Link>{" "}
          &gt; <span className="text-black font-medium">{product.title}</span>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Imagem Principal */}
          <div className="relative aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 shadow-lg">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-cover hover:scale-105 transition-transform duration-700"
              priority
            />
          </div>

          {/* Informações */}
          <div className="space-y-8">
            <div>
              <span className="text-orange-600 font-bold text-sm uppercase tracking-wider">
                {product.category || "Pedra Natural"}
              </span>
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mt-2 mb-4">
                {product.title}
              </h1>
              {/* Indicador de Preço */}
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <span>Nível de Investimento:</span>
                <span className="flex text-green-600 font-bold text-base">
                  $$$
                </span>
              </div>
            </div>

            <p className="text-gray-600 text-lg leading-relaxed">
              {product.description ||
                "Material de alta durabilidade e sofisticação única. Ideal para bancadas, pisos e revestimentos de alto padrão. Cada chapa possui veios exclusivos que tornam o seu projeto uma obra de arte."}
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                <span className="block text-gray-500 text-xs uppercase mb-1">
                  Acabamento
                </span>
                <span className="font-semibold text-gray-900">
                  {product.finish || "Polido"}
                </span>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                <span className="block text-gray-500 text-xs uppercase mb-1">
                  Cor Predominante
                </span>
                <span className="font-semibold text-gray-900">
                  {product.color || "Variada"}
                </span>
              </div>
            </div>

            {/* Botão WhatsApp Corrigido */}
            <a
              href={`https://wa.me/5561985921488?text=Olá, vi o *${product.title}* no site e gostaria de um orçamento.`}
              target="_blank"
              className="block w-full bg-stone-900 text-white text-center py-5 rounded-xl font-bold text-lg hover:bg-orange-600 transition-all shadow-xl hover:-translate-y-1"
            >
              Solicitar Orçamento deste Material
            </a>

            <p className="text-center text-xs text-gray-400">
              Atendimento imediato via WhatsApp. Enviamos fotos da chapa real.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}