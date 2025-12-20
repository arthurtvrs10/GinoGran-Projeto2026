import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative w-full h-[400px] flex items-center justify-center bg-gray-900 overflow-hidden">
      {/* Imagem de Fundo (Placeholder - Substitua por uma textura de mármore de alta qualidade) */}
      <div className="absolute inset-0 opacity-40">
        {/* Dica: Use uma imagem escura ou com overlay preto para o texto sobressair */}
        <Image
          src="/Marmore1.jpeg"
          alt="Textura de Mármore Luxuoso"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-[22px] text-center">
        <span className="block text-[#F9A825] font-semibold tracking-widest uppercase mb-4 text-sm md:text-base">
          Desde a rocha bruta até a arte final
        </span>
        <h1 className="text-4xl md:text-6xl  text-white mb-6 font-bold">
          A Essência da Ginogran        </h1>
        <p className="text-gray-200 max-w-2xl mx-auto text-lg font-light leading-relaxed">
          Transformamos a força da natureza em sofisticação para o seu ambiente.
        </p>
      </div>
    </section>
  );
}
