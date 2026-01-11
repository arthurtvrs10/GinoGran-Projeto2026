import { Tag, CreditCard, ArrowRightLeft, ShieldCheck } from "lucide-react";

interface BenefitItem {
  title: string;
  subtitle: string;
  icon: React.ElementType;
}

export default function Benefits() {
  const items: BenefitItem[] = [
    {
      icon: Tag,
      title: "3% OFF",
      subtitle: "À vista no Pix",
    },
    {
      icon: CreditCard,
      title: "Parcelamento",
      subtitle: "Parcele em até 12x",
    },
    {
      icon: ArrowRightLeft,
      title: "Troca Facilitada",
      subtitle: "7 dias para trocar",
    },
    {
      icon: ShieldCheck,
      title: "Compra Segura",
      subtitle: "Site 100% Confiável",
    },
  ];
  return (
    <section className="hidden w-full py-8 sm:block">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 max-w-full mx-auto px-22 ">
        {items.map((item, index) => (
          <div
            key={index}
            // Estilização do cartão: Fundo cinza claro, bordas arredondadas, flex para alinhar ícone e texto
            className="flex items-center gap-4 rounded-lg bg-gray-100 p-4"
          >
            {/* O Ícone */}
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-blue-600 shadow-sm">
              <item.icon size={24} strokeWidth={2.5} />
            </div>

            {/* Os Textos */}
            <div>
              <h3 className="font-bold text-gray-900">{item.title}</h3>
              <p className="text-sm text-gray-500">{item.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
