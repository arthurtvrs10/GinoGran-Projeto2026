"use client"; // Obrigatório para usar useState
import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface sliderProps {
  images: string[];
}

export default function Slider({ images }: sliderProps) {
  const [current, setCurrent] = useState(0);
  const nextSlide = () => {
    setCurrent(current === images.length - 1 ? 0 : current + 1);
  };
  const prevSlide = () => {
    setCurrent(current === 0 ? images.length - 1 : current - 1);
  };

  return (
    <div className="slider relative w-full h-[400px] m-auto overflow-hidden shadow-xl">
      <button
        onClick={prevSlide}
        className="absolute z-10 top-1/2 left-4 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-colors"
      >
        <ChevronLeft />
      </button>
      {images[current] && (
        <div className="relative w-full h-full">
          <Image
            src={images[current]}
            alt="Slider banner"
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
          />
        </div>
      )}
      <button
        onClick={nextSlide}
        className="absolute z-10 top-1/2 right-4 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-colors"
      >
        <ChevronRight />
      </button>
    </div>
  );
}
