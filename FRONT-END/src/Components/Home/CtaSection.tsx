import Image from "next/image";
import Link from "next/link";
// Removi o import do Button pois vamos usar estilos diretos para garantir consistência
// import { FaWhatsapp } from "react-icons/fa6"; // Descomente se for usar o ícone

export default function CtaSection() {
  // Classes bases para reutilização
  const baseButtonClass =
    "rounded-full py-3 px-8 font-bold transition-all duration-300 transform hover:scale-105";
  const primaryButtonClass = "bg-white text-black hover:bg-gray-200 shadow-lg";
  const outlineButtonClass =
    "border-2 border-white text-white bg-transparent hover:bg-white hover:text-black";

  return (
    <div className="relative w-full py-15 flex flex-col items-center justify-center px-6 text-center">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="https://gxqcjmjfipmxvdmflabu.supabase.co/storage/v1/object/public/imagens-sections/cta-section-bg.jpg"
          alt="Fundo do CTA"
          fill
          className="object-cover"
          priority
        />
        {/* Overlay Escuro para leitura do texto */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Conteúdo */}
      <div className="relative z-10 flex flex-col items-center gap-6">
        <div className="space-y-2">
          <h2 className="text-4xl md:text-5xl font-bold text-white max-w-3xl leading-tight">
            Fale Com Nossos Consultores
          </h2>
          <p className="text-gray-200 text-lg max-w-2xl mx-auto">
            Transforme seu ambiente com a elegância da pedra natural.
          </p>
        </div>

        {/* Área dos Botões */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-center w-full mt-4">
          {/* Botão 1: Trabalhos (Secundário) */}
          <Link
            href="/nossos-trabalhos"
            className={`${baseButtonClass} ${primaryButtonClass}`}
          >
            Nossos Trabalhos
          </Link>

          {/* Botão 2: Fale Conosco (Primário - Destaque) */}
          <Link
            href="/contato"
            className={`${baseButtonClass} ${outlineButtonClass}`}
          >
            Fale Conosco
          </Link>
        </div>
      </div>
    </div>
  );
}
