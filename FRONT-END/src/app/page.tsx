import BlogSection from "@/Components/Home/BlogSection";
import CtaSection from "@/Components/Home/CtaSection";
import { FeaturedCatalog } from "@/Components/Home/FeatureCatalog";
import FeaturedWorks from "@/Components/Home/FeatureTrabalhos";
import FeaturesBar from "@/Components/Home/FeaturesBar";
import Slider from "@/Components/Home/Slider";
import { BlogSkeleton, CatalogSkeleton, TestimonialSkeleton, TrabalhosSkeleton } from "@/Components/Skeletons/HomeSkeletons";
import TestimonialSection from "@/Components/ui/TestimonialSection";
import { Suspense } from "react";

// --- OPEN GRAPH ESPECÍFICO DA HOME ---
export const metadata = {
  title: "Início", // Vai ficar: Início | Ginogran
  description: "Descubra a elegância das pedras naturais. Mármores e Granitos selecionados para o seu projeto.",
  openGraph: {
    title: "Ginogran - Excelência em Pedras Naturais",
  }
};

export default function Home() {
  const minhasFotos = [
    "https://gxqcjmjfipmxvdmflabu.supabase.co/storage/v1/object/public/Background/Ginogran.png",
    "https://placehold.co/600x400/purple/white",
    "https://placehold.co/600x400/blue/white",
  ];

  return (
    <main className="w-full">
      <Slider images={minhasFotos} />
      <FeaturesBar />

      <Suspense fallback={<CatalogSkeleton />}>
        <FeaturedCatalog />
      </Suspense>

      <CtaSection />

      <Suspense fallback={<TrabalhosSkeleton />}>
        <FeaturedWorks />
      </Suspense>
      
      <Suspense fallback={<TestimonialSkeleton />}>
        <TestimonialSection />
      </Suspense>
      
      <Suspense fallback={<BlogSkeleton />}>
        <BlogSection />
      </Suspense>
    </main>
  );
}