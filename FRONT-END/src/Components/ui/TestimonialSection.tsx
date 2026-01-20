"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { TestimonialSkeleton } from "@/Components/Skeletons/HomeSkeletons";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  avatar: string;
  rating?: number;
}

export default function GinogranPremiumCarousel() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // URL Direta para os Reviews
  const googleMapsUrl =
    "https://www.google.com/maps/search/?api=1&query=GinoGran+Mármore+Fabrica";

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from("depoimentos")
          .select("*")
          .order("id", { ascending: false });

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

  const renderStars = (count: number = 5, size: string = "w-3 h-3") => {
    return (
      <div className="flex text-yellow-500 gap-[1px]">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`${size} ${i < count ? "fill-current" : "text-gray-300 dark:text-gray-600"}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={i < count ? "0" : "1"}
          >
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        ))}
      </div>
    );
  };

  if (isLoading) {
    return (
      <section className="py-10 bg-darkgray dark:bg-black-100 border-y border-black-20 dark:border-black-80 select-none overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 items-center">
          <div className="md:col-span-1 border-l-4 border-primary/30 pl-4 space-y-2">
            <div className="h-5 w-24 bg-gray-200 dark:bg-zinc-800 animate-pulse rounded" />
            <div className="h-3 w-16 bg-gray-100 dark:bg-zinc-900 animate-pulse rounded" />
          </div>
          <div className="md:col-span-3">
            <TestimonialSkeleton />
          </div>
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) return null;

  return (
    <section
      className="py-15 bg-black-80 border-y border-black-20 dark:border-black-80 select-none overflow-hidden transition-colors duration-500"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 items-center">
        {/* === Título Lateral e Botão Melhorado === */}
        <div className="md:col-span-1 border-l-4 border-primary pl-4 flex flex-col gap-3 items-start">
          <div>
            <h2 className="text-black-900 dark:text-marble font-extrabold text-lg uppercase tracking-tighter leading-none">
              O que dizem
            </h2>
            <span className="text-[10px] text-primary font-bold uppercase tracking-widest">
              GinoGran
            </span>
          </div>

          {/* BOTÃO GOOGLE PREMIUM */}
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group/btn flex items-center gap-3 bg-white dark:bg-zinc-900 pr-4 pl-3 py-2 rounded-lg shadow-sm border border-black-10 dark:border-zinc-700 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 w-full md:w-auto max-w-[200px]"
          >
            {/* Ícone G Maior */}
            <div className="bg-white p-1 rounded-full shadow-inner shrink-0">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.79-.07-1.54-.19-2.27h-11.3v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z"
                />
                <path
                  fill="#34A853"
                  d="M12.255 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96h-3.98v3.09C3.515 21.3 7.565 24 12.255 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.525 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62h-3.98a11.86 11.86 0 000 10.76l3.98-3.09z"
                />
                <path
                  fill="#EA4335"
                  d="M12.255 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C18.205 1.19 15.495 0 12.255 0 7.565 0 3.515 2.7 1.545 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z"
                />
              </svg>
            </div>

            {/* Texto e Estrelas */}
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-bold text-black-60 dark:text-zinc-400 group-hover/btn:text-primary transition-colors leading-tight">
                Avaliações no Google
              </span>
              <div className="flex items-center gap-1">
                <span className="text-xs font-bold text-black-100 dark:text-white">
                  4.9
                </span>
                {renderStars(5, "w-2.5 h-2.5")}
              </div>
            </div>
          </a>
        </div>

        {/* Carousel Content */}
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
                    src={testimonials[index].avatar || "/logo.png"}
                    alt={testimonials[index].name}
                    className="w-16 h-16 rounded-full border-2 border-primary group-hover:grayscale-0 transition-all duration-700 shadow-md object-cover"
                  />
                </div>

                <div className="flex flex-col">
                  {/* Estrelas do Depoimento */}
                  {renderStars(testimonials[index].rating || 5, "w-3 h-3")}

                  <p className="text-black-85-DarkGray dark:text-black-30 text-sm md:text-base italic leading-snug line-clamp-3 mt-1">
                    "{testimonials[index].content}"
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="font-bold text-xs text-black-100 dark:text-marble uppercase tracking-tighter">
                      {testimonials[index].name}
                    </span>
                    <span className="text-[10px] text-primary font-bold uppercase">
                      — {testimonials[index].role}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navegação por Setas */}
          <div className="absolute inset-y-0 -left-4 -right-4 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            <button
              onClick={prev}
              className="pointer-events-auto p-1 text-black-30 hover:text-primary transition-colors hover:scale-110"
            >
              <svg
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={next}
              className="pointer-events-auto p-1 text-black-30 hover:text-primary transition-colors hover:scale-110"
            >
              <svg
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M9 5l7 7-7 7" />
              </svg>
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
              className={`h-1.5 transition-all duration-500 rounded-full ${i === index ? "w-8 bg-primary" : "w-2 bg-black-20 dark:bg-black-80"}`}
            />
          ))}
        </div>

        <div className="w-32 h-[1px] bg-black-10 dark:bg-black-90 overflow-hidden">
          <motion.div
            key={index + (isPaused ? "-paused" : "-running")}
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
