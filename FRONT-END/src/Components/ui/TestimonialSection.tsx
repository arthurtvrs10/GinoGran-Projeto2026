"use client";

import { Star } from "lucide-react";
import { CarouselSection } from "@/Components/ui/CarouselSection";

const TESTIMONIALS = [
  { id: 1, name: "Ana Silva", role: "Arquiteta", text: "O acabamento da GinoGran é impecável. Minha obra ficou perfeita.", rating: 5 },
  { id: 2, name: "Carlos Souza", role: "Cliente", text: "Entrega rápida e pedras de altíssima qualidade. Recomendo muito!", rating: 5 },
  { id: 3, name: "Mariana Costa", role: "Designer", text: "A variedade de mármores exóticos me surpreendeu. Atendimento nota 10.", rating: 5 },
  { id: 4, name: "Ricardo Oliveira", role: "Engenheiro", text: "Parceiros de confiança para grandes projetos. Cumprem os prazos.", rating: 5 },
];

export default function TestimonialSection() {
  return (
    <CarouselSection 
      title="O que dizem nossos clientes" 
      subtitle="Confiança e Qualidade"
      className="bg-stone-900 text-white border-none"
    >
      {TESTIMONIALS.map((item) => (
        <div 
          key={item.id} 
          className="w-[300px] md:w-[350px] snap-center shrink-0 bg-stone-800 p-8 rounded-2xl border border-stone-700 hover:border-orange-500/50 transition-colors"
        >
          <div className="flex gap-1 mb-4">
            {[...Array(item.rating)].map((_, i) => (
              <Star key={i} size={16} className="fill-orange-500 text-orange-500" />
            ))}
          </div>
          <p className="text-stone-300 italic mb-6 text-lg leading-relaxed">"{item.text}"</p>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-stone-600 flex items-center justify-center font-bold text-stone-400">
                {item.name[0]}
            </div>
            <div>
                <h4 className="font-bold text-white text-sm">{item.name}</h4>
                <span className="text-xs text-stone-500 uppercase tracking-wider">{item.role}</span>
            </div>
          </div>
        </div>
      ))}
    </CarouselSection>
  );
}