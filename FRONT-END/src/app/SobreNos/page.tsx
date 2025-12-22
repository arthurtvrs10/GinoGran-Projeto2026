import Cta from "@/Components/pages/CTA";
import MapGinogran from "@/Components/pages/map";
import HeroSection from "@/Components/SobreNos/HeroSection";
import History from "@/Components/SobreNos/History";
import { TeamSection } from "@/Components/SobreNos/TeamSection";
import ValoresEDiferenciais from "@/Components/SobreNos/ValoresEDiferenciais";

export default function SobreNos() {
  return (
    <div className="w-full bg-white text-gray-800">
      {/* --- HERO SECTION --- */}
      <HeroSection />

      {/* --- A HISTÓRIA (Foco no Texto) ---       */}
      <History />

      {/* --- VALORES / DIFERENCIAIS ---  Quebra o ritmo de leitura com ícones e texto curto. */}
      <TeamSection />

      {/* --- VALORES / DIFERENCIAIS ---  Quebra o ritmo de leitura com ícones e texto curto. */}
      <ValoresEDiferenciais />

      {/* --- MAPA GINO GRAN --- */}
      <MapGinogran />

      {/* --- CALL TO ACTION (CTA) --- */}
      <Cta />

      
    </div>
  );
}
