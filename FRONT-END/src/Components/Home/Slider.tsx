"use client"; // Obrigatório para usar useState
import { useState } from "react";
  
interface sliderProps{
  images: string[];
}

export default function Slider({images}: sliderProps){

  const [current, setCurrent] = useState(0);
  const nextSlide = () =>{  setCurrent( current === images.length - 1 ? 0 : current + 1) }
  const prevSlide = () =>{ setCurrent(current === 0 ? images.length - 1 : current - 1)}

  return(
    <div className="slider relative w-full h-[400px] m-auto overflow-hidden shadow-xl">
      <button 
        onClick={prevSlide}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-colors">
        ⬅️
      </button>
      {images[current] && (
        // eslint-disable-next-line @next/next/no-img-element
        <img 
          src={images[current]}
          alt="slide do slider"
          className="w-full h-full object-cover"
         />
      )}
      <button 
        onClick={nextSlide}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-colors">
        ➡️
      </button>
    </div>
  );
}