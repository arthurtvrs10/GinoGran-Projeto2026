"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

interface Slide {
  id: string;
  wide: string;
  desktop: string;
  mobile: string;
}

export default function Slider() {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);

  const BUCKET_NAME = "Background";
  const FOLDER_NAME = "SliderHome";

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const { data, error } = await supabase.storage
          .from(BUCKET_NAME)
          .list(FOLDER_NAME, {
            limit: 100,
            sortBy: { column: "name", order: "asc" },
          });

        if (error || !data) return;

        const groups: Record<
          string,
          { wide?: string; desktop?: string; mobile?: string }
        > = {};

        data.forEach((item) => {
          if (
            item.name === ".emptyFolderPlaceholder" ||
            item.name === FOLDER_NAME
          )
            return;
          const path = FOLDER_NAME ? `${FOLDER_NAME}/${item.name}` : item.name;
          const { data: urlData } = supabase.storage
            .from(BUCKET_NAME)
            .getPublicUrl(path);
          const lowerName = item.name.toLowerCase();
          const id = item.name.split("-")[0];

          if (!groups[id]) groups[id] = {};
          if (lowerName.includes("wide")) groups[id].wide = urlData.publicUrl;
          else if (lowerName.includes("mobile"))
            groups[id].mobile = urlData.publicUrl;
          else groups[id].desktop = urlData.publicUrl;
        });

        const formattedSlides = Object.keys(groups)
          .map((id) => {
            const g = groups[id];
            const bestDesktop = g.desktop || g.wide || g.mobile || "";
            const finalWide = g.wide || bestDesktop;
            const finalMobile = g.mobile || bestDesktop;

            return {
              id,
              wide: finalWide,
              desktop: bestDesktop,
              mobile: finalMobile,
            };
          })
          .filter((s) => s.desktop !== "");

        setSlides(formattedSlides);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, []);

  const nextSlide = useCallback(
    () => setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1)),
    [slides.length],
  );
  const prevSlide = () =>
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  useEffect(() => {
    if (slides.length === 0) return;
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [current, slides.length, nextSlide]);

  if (loading)
    return (
      <div className="w-full h-[300px] flex items-center justify-center bg-gray-100">
        <Loader2 className="animate-spin text-gray-400" />
      </div>
    );
  if (slides.length === 0) return null;

  return (
    // --- CORREÇÃO APLICADA AQUI EMBAIXO ---
    // Mobile: h-[300px] fixo (como pedido)
    // Desktop (md): Altura automática + Aspect Ratio 1512/400 (Sem fundo preto)
    <div className="slider relative w-full h-[300px] md:h-auto md:aspect-[1512/400] m-auto overflow-hidden shadow-xl group bg-black">
      <button
        onClick={prevSlide}
        className="absolute z-20 top-1/2 left-4 -translate-y-1/2 bg-black/30 text-white p-3 rounded-full hover:bg-black/70 transition-colors opacity-0 group-hover:opacity-100 duration-300"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute z-20 top-1/2 right-4 -translate-y-1/2 bg-black/30 text-white p-3 rounded-full hover:bg-black/70 transition-colors opacity-0 group-hover:opacity-100 duration-300"
      >
        <ChevronRight size={24} />
      </button>

      <div className="relative w-full h-full">
        {/* MOBILE */}
        <div className="block md:hidden w-full h-full relative">
          <Image
            src={slides[current].mobile}
            alt="Mobile"
            fill
            priority={current === 0}
            className="object-cover"
            sizes="100vw"
          />
        </div>

        {/* NOTEBOOK / DESKTOP (Usando aspect ratio do container) */}
        <div className="hidden md:block 2xl:hidden w-full h-full relative">
          <Image
            src={slides[current].desktop}
            alt="Desktop"
            fill
            priority={current === 0}
            // Object-cover aqui garante que preencha pixels quebrados de arredondamento
            className="object-cover"
            sizes="100vw"
          />
        </div>

        {/* WIDE (>1536px) */}
        <div className="hidden 2xl:block w-full h-full relative">
          <Image
            src={slides[current].wide}
            alt="Wide"
            fill
            priority={current === 0}
            className="object-cover"
            sizes="100vw"
          />
        </div>

        <div className="absolute inset-0 bg-black/10 pointer-events-none" />
      </div>

      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-3 h-3 rounded-full transition-all ${current === idx ? "bg-white scale-125" : "bg-white/50 hover:bg-white/80"}`}
          />
        ))}
      </div>
    </div>
  );
}
