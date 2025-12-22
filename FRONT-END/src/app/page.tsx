import BlogSection from "@/Components/Home/BlogSection";
import CtaSection from "@/Components/Home/CtaSection";
import { FeaturedCatalog } from "@/Components/Home/FeatureCatalog";
import FeaturedWorks from "@/Components/Home/FeatureMarks";
import FeaturesBar from "@/Components/Home/FeaturesBar";
import Slider from "@/Components/Home/Slider";

export default function Home() {
  const minhasFotos = [
    "https://placehold.co/600x400/orange/white",
    "https://placehold.co/600x400/purple/white",
    "https://placehold.co/600x400/blue/white",
  ];

  return (
    <main className="w-full">
      <Slider images={minhasFotos} />
      <FeaturesBar />
      <FeaturedCatalog />
      <CtaSection />

      <FeaturedWorks />

      {/* --- SEÇÃO DE BLOG --- */}
      <BlogSection />
    </main>
  );
}
