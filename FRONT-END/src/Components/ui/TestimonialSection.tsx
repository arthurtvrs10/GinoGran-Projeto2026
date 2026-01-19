'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from "@/lib/supabase";
import { TestimonialSkeleton } from "@/Components/Skeletons/HomeSkeletons";

// Interface para os dados vindos do banco
interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  avatar: string;
}

export default function GinogranPremiumCarousel() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // --- BUSCA DE DADOS NO SUPABASE ---
  useEffect(() => {
    async function fetchTestimonials() {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('depoimentos') 
          .select('*');

        if (!error && data) {
          setTestimonials(data);
        }
      } catch (error) {
        console.error("Erro ao carregar depoimentos:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchTestimonials();
  }, []);

  const next = useCallback(() => {
    if (testimonials.length === 0) return;
    setIndex((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const prev = () => {
    if (testimonials.length === 0) return;
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Timer de 5 segundos
  useEffect(() => {
    if (isPaused || testimonials.length === 0) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next, isPaused, testimonials.length]);

  const onDragEnd = (event: any, info: any) => {
    const threshold = 50;
    if (info.offset.x < -threshold) next();
    else if (info.offset.x > threshold) prev();
  };

  // --- ESTADO DE CARREGAMENTO (SKELETON) ---
  if (isLoading) {
    return (
      <section className="py-10 bg-marble dark:bg-black-100 border-y border-black-20 dark:border-black-80 select-none overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 items-center">
          {/* Título Lateral Skeleton */}
          <div className="md:col-span-1 border-l-4 border-primary/30 pl-4 space-y-2">
            <div className="h-5 w-24 bg-gray-200 dark:bg-zinc-800 animate-pulse rounded" />
            <div className="h-3 w-16 bg-gray-100 dark:bg-zinc-900 animate-pulse rounded" />
          </div>
          {/* Corpo do Depoimento Skeleton */}
          <div className="md:col-span-3">
            <TestimonialSkeleton />
          </div>
        </div>
      </section>
    );
  }

  // Se não houver depoimentos, não renderiza a seção
  if (testimonials.length === 0) return null;

  return (
    <section 
      className="py-10 bg-marble dark:bg-black-100 border-y border-black-20 dark:border-black-80 select-none overflow-hidden transition-colors duration-500"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 items-center">
        
        {/* Título Lateral */}
        <div className="md:col-span-1 border-l-4 border-primary pl-4">
          <h2 className="text-black-900 dark:text-marble font-extrabold text-lg uppercase tracking-tighter">
            Depoimentos
          </h2>
          <p className="text-[10px] text-primary font-bold uppercase tracking-widest">GinoGran</p>
        </div>

        <div className="md:col-span-3 relative flex items-center group">
          <div className="flex-grow cursor-grab active:cursor-grabbing">
            <AnimatePresence mode="wait">
              <motion.div
                key={testimonials[index].id}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={onDragEnd}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4 }}
                className="flex items-center gap-6"
              >
                <div className="relative flex-shrink-0">
                  <img 
                    src={testimonials[index].avatar || '/logo.png'} 
                    alt={testimonials[index].name}
                    className="w-16 h-16 rounded-full border-2 border-primary grayscale group-hover:grayscale-0 transition-all duration-700 shadow-md object-cover"
                  />
                </div>
                
                <div className="flex flex-col">
                  <p className="text-black-85-DarkGray dark:text-black-30 text-sm md:text-base italic leading-snug">
                    "{testimonials[index].content}"
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="font-bold text-xs text-black-100 dark:text-marble uppercase tracking-tighter">
                        {testimonials[index].name}
                    </span>
                    <span className="text-[10px] text-primary font-bold uppercase">— {testimonials[index].role}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navegação por Setas */}
          <div className="absolute inset-y-0 -left-4 -right-4 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            <button onClick={prev} className="pointer-events-auto p-1 text-black-30 hover:text-primary transition-colors">
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7"/></svg>
            </button>
            <button onClick={next} className="pointer-events-auto p-1 text-black-30 hover:text-primary transition-colors">
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>
            </button>
          </div>
        </div>
      </div>

      {/* Indicadores Visuais */}
      <div className="flex flex-col items-center gap-3 mt-8">
        <div className="flex gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-1.5 transition-all duration-500 rounded-full ${i === index ? 'w-8 bg-primary' : 'w-2 bg-black-20 dark:bg-black-80'}`}
            />
          ))}
        </div>
        
        {/* Barra de progresso */}
        <div className="w-32 h-[1px] bg-black-10 dark:bg-black-90 overflow-hidden">
          <motion.div 
            key={index + (isPaused ? '-paused' : '-running')}
            initial={{ x: "-100%" }}
            animate={{ x: isPaused ? "-100%" : "0%" }}
            transition={{ duration: 5, ease: "linear" }}
            className="w-full h-full bg-primary/40"
          />
        </div>
      </div>
    </section>
  );
}