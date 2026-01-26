/*"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react"; 
import Link from "next/link";

export default function StoneMatch() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  const questions = [
    {
      id: 0,
      text: "Onde vai aplicar a pedra?",
      options: ["Cozinha (Bancada)", "Banheiro / Lavabo", "Piso de Sala", "Área Externa / Piscina"],
    },
    {
      id: 1,
      text: "Qual o estilo do ambiente?",
      options: ["Moderno & Minimalista", "Clássico & Luxuoso", "Rústico & Natural", "Industrial"],
    },
    {
      id: 2,
      text: "Qual a prioridade?",
      options: ["Resistência a manchas", "Beleza dos veios (Exótico)", "Custo-benefício", "Brilho intenso"],
    },
  ];

  const handleOption = (option: string) => {
    setAnswers([...answers, option]);
    setStep(step + 1);
  };

  const resetQuiz = () => {
    setStep(0);
    setAnswers([]);
  };

  // Lógica simples de recomendação
  const getRecommendation = () => {
    if (answers[0]?.includes("Cozinha") || answers[2]?.includes("Resistência")) {
      return { 
        type: "Quartzito ou Granito", 
        desc: "Para cozinhas, a prioridade é resistência. O Quartzito oferece a beleza nobre do mármore com a dureza extrema do granito. Não risca e não mancha facilmente." 
      };
    }
    if (answers[0]?.includes("Banheiro") || answers[1]?.includes("Clássico")) {
      return { 
        type: "Mármore Branco ou Travertino", 
        desc: "Banheiros são áreas de menor impacto, permitindo o uso de pedras nobres e porosas. Um Travertino ou Carrara trará o luxo e a sofisticação que o seu projeto pede." 
      };
    }
    if (answers[0]?.includes("Externa")) {
       return { 
        type: "Granito Flameado ou Quartzito Rústico", 
        desc: "Áreas externas precisam de pedras antiderrapantes e resistentes ao sol. O acabamento flameado é essencial para a segurança na beira da piscina." 
      }; 
    }
    return { 
      type: "Granito Premium", 
      desc: "Uma escolha versátil, durável e com excelente custo-benefício. Ideal para quem quer beleza sem abrir mão da praticidade no dia a dia." 
    };
  };

  return (
    <section className="py-20 px-4 bg-stone-900 text-white relative overflow-hidden my-12 rounded-3xl mx-4 md:mx-22">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <span className="text-orange-500 tracking-widest uppercase text-sm font-bold mb-2 block">Consultoria Gratuita</span>
        <h2 className="text-3xl md:text-5xl font-serif mb-12">Descubra a Pedra Ideal</h2>

        <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 md:p-12 min-h-[350px] flex flex-col justify-center items-center border border-white/10 shadow-2xl">
          <AnimatePresence mode="wait">
            {step < questions.length ? (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                <h3 className="text-2xl font-bold mb-8">{questions[step].text}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {questions[step].options.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => handleOption(opt)}
                      className="p-4 rounded-xl border border-white/20 hover:bg-white hover:text-stone-900 hover:scale-105 transition-all duration-300 font-medium text-lg text-left md:text-center"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
                <div className="mt-8 flex justify-center gap-2">
                    {questions.map((_, i) => (
                        <div key={i} className={`h-2 w-2 rounded-full ${i === step ? 'bg-orange-500' : 'bg-white/20'}`} />
                    ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center w-full"
              >
                <p className="text-gray-300 mb-2 uppercase tracking-wider text-sm">O match perfeito para si é:</p>
                <h3 className="text-4xl md:text-5xl text-orange-400 font-serif font-bold mb-6">{getRecommendation().type}</h3>
                <p className="text-lg text-gray-200 mb-10 max-w-2xl mx-auto leading-relaxed border-l-4 border-orange-500 pl-4 text-left md:text-center md:border-none md:pl-0">
                    {getRecommendation().desc}
                </p>
                
                <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                    <Link 
                        href="/Catalogo" 
                        className="w-full md:w-auto bg-white text-stone-900 px-8 py-4 rounded-full font-bold hover:bg-orange-500 hover:text-white transition-all shadow-[0_0_20px_rgba(255,165,0,0.3)] hover:shadow-[0_0_30px_rgba(255,165,0,0.6)]"
                    >
                        Ver Opções no Catálogo
                    </Link>
                    <button onClick={resetQuiz} className="text-sm underline text-gray-400 hover:text-white mt-2 md:mt-0">
                        Refazer Quiz
                    </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      
      {/* Background Decorativo }
      <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
          <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-orange-600 rounded-full blur-[150px] mix-blend-screen" />
          <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-stone-700 rounded-full blur-[150px]" />
      </div>
    </section>
  );
}*/