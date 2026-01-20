import BlogSection from "@/Components/Home/BlogSection";
import CtaSection from "@/Components/Home/CtaSection";
import { FeaturedCatalog } from "@/Components/Home/FeatureCatalog";
import FeaturedWorks from "@/Components/Home/FeatureTrabalhos";
import FeaturesBar from "@/Components/Home/FeaturesBar";
import InfiniteMarquee from "@/Components/Home/InfiniteMarquee";

import Slider from "@/Components/Home/Slider";
import TestimonialSection from "@/Components/ui/TestimonialSection";
import { Suspense } from "react";

// --- OPEN GRAPH ESPECÍFICO DA HOME ---
export const metadata = {
  title: "Início", // Vai ficar: Início | Ginogran
  description:
    "Descubra a elegância das pedras naturais. Mármores e Granitos selecionados para o seu projeto.",
  openGraph: {
    title: "Ginogran - Excelência em Pedras Naturais",
  },
};

export default function Home() {
  return (
    <main className="w-full">
      <Slider />
      <InfiniteMarquee />
      <FeaturedCatalog />
      <CtaSection />
      <FeaturedWorks />
      <TestimonialSection />
      <BlogSection />
    </main>
  );
}
