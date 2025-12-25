import Button from "../ui/Button";
import Image from "next/image";

export default function CtaSection() {
  return (
    <div className="relative w-full h-[300px] py-32 flex flex-col items-center justify-center px-6 text-center">
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="https://gxqcjmjfipmxvdmflabu.supabase.co/storage/v1/object/public/imagens-sections/cta-section-bg.jpg" // <--- TROQUE pelo caminho da sua imagem na pasta public
          alt="Fundo do CTA"
          fill // Faz a imagem esticar para cobrir todo o container
          className="object-cover" // Garante que a imagem não fique distorcida (corta as bordas se precisar)
          priority
        />

        <div className="absolute inset-0 bg-black/60" />
      </div>
      <div className="relative z-10 flex flex-col items-center gap-3">
        <h2 className="text-4xl md:text-4xl font-bold text-white max-w-2xl">
          Fale Com Nossos Consultores
        </h2>
        <p className="text-white max-w-2xl">
          Transforme seu ambiente com a elegância da pedra natural
        </p>

        <Button text="Fale Conosco" href="/whatsapp" />
      </div>
    </div>
  );
}
