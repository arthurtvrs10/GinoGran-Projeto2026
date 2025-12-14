import BlogSection from '@/Components/Blog/BlogSection';
import FeaturesBar from "@/Components/Home/FeaturesBar";
import Slider from "@/Components/Home/Slider";


export default function Home(){
  const minhasFotos = [
    "https://placehold.co/600x400/orange/white",
    "https://placehold.co/600x400/purple/white",
    "https://placehold.co/600x400/blue/white"
  ]

  return(
    <main className="w-full">
      <Slider images={minhasFotos}/>
      <FeaturesBar/>

      {/* --- SEÇÃO DE BLOG --- */}
      <BlogSection />
    </main>
  );
}