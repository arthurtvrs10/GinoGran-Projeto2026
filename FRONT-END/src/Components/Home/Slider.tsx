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
    <div className="Slider">
      <button onClick={prevSlide}>Antes</button>
      {images[current] && (
        <img src={images[current]} alt="slide do slider" />
      )}
      
      <button onClick={nextSlide}>Proximo</button>
    </div>
  );
}