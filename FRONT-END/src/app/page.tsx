import { supabase } from "@/lib/supabase";
import HeroSection from "@/Components/Home/Slider";
import InfiniteMarquee from "@/Components/Home/InfiniteMarquee";
import { FeatureCatalog } from "@/Components/Home/FeatureCatalog";
import FeatureTrabalhos from "@/Components/Home/FeatureTrabalhos";
import StoneMatch from "@/Components/Home/StoneMatch";
import BlogSection from "@/Components/Home/BlogSection";
import CtaSection from "@/Components/Home/CtaSection";

// Função para buscar produtos destaque
async function getFeaturedProducts() {
  const { data } = await supabase
    .from("produtos")
    .select("*")
    .limit(6); // Pega 6 produtos para o carrossel
  return data || [];
}

export default async function Home() {
  const featuredProducts = await getFeaturedProducts();

  return (
    <main>
      <HeroSection />
      <InfiniteMarquee />
      
      {/* Carrossel Reutilizável com Título da Home */}
      <FeatureCatalog 
        title="Destaques da Coleção" 
        subtitle="O melhor da natureza" 
        products={featuredProducts} 
      />
      
      <FeatureTrabalhos />
      <StoneMatch />
      <BlogSection />
      <CtaSection />
    </main>
  );
}