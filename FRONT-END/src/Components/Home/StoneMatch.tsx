"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react"; // Verifique se o import 'motion' está correto para sua versão

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

  // Lógica simples de recomendação (pode ser expandida)
  const getRecommendation = () => {
    if (answers[0]?.includes("Cozinha") || answers[2]?.includes("Resistência")) {
      return { type: "Quartzito ou Granito", desc: "Para cozinhas, evite mármores porosos. O Quartzito oferece a beleza do mármore com a dureza do granito." };
    }
    if (answers[0]?.includes("Banheiro") || answers[1]?.includes("Clássico")) {
      return { type: "Mármore Branco / Travertino", desc: "Banheiros permitem pedras mais nobres e porosas. Um Travertino ou Carrara trará o luxo que procura." };
    }
    return { type: "Granito Premium", desc: "Uma escolha versátil e durável que se adapta a quase qualquer projeto com excelente custo-benefício." };
  };

  return (
    <section className="py-20 px-4 bg-stone-900 text-white relative overflow-hidden">
      <div className="max-w-3xl mx-auto text-center relative z-10">
        <span className="text-orange-500 tracking-widest uppercase text-sm font-bold mb-2 block">Não sabe qual escolher?</span>
        <h2 className="text-3xl md:text-5xl font-serif mb-12">Descubra a Pedra Ideal</h2>

        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-12 min-h-[300px] flex flex-col justify-center items-center border border-white/10 shadow-2xl">
          <AnimatePresence mode="wait">
            {step < questions.length ? (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="w-full"
              >
                <h3 className="text-2xl font-bold mb-8">{questions[step].text}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {questions[step].options.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => handleOption(opt)}
                      className="p-4 rounded-xl border border-white/20 hover:bg-white hover:text-stone-900 transition-all font-medium text-lg"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <p className="text-gray-300 mb-2">Baseado nas suas respostas, recomendamos:</p>
                <h3 className="text-4xl text-orange-400 font-serif font-bold mb-4">{getRecommendation().type}</h3>
                <p className="text-lg text-gray-200 mb-8 max-w-lg mx-auto">{getRecommendation().desc}</p>
                <div className="flex gap-4 justify-center">
                    <button onClick={resetQuiz} className="text-sm underline text-gray-400 hover:text-white">Refazer Quiz</button>
                    <a href="/Catalogo" className="bg-white text-stone-900 px-8 py-3 rounded-full font-bold hover:bg-orange-500 hover:text-white transition-colors">Ver Opções no Catálogo</a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      
      {/* Background Decorativo */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
          <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-orange-600 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-stone-700 rounded-full blur-[120px]" />
      </div>
    </section>
  );
}