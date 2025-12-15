import Image from "next/image";

export default function ValoresEDiferenciais() {
  return (
    <section className="py-20 w-full max-w-7xl mx-auto px-[22px]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Coluna Visual (Showroom ou Material) */}
        <div className="relative h-[400px] w-full rounded-xl overflow-hidden shadow-xl order-2 lg:order-1">
          <Image
            src="/Marmore1.jpeg"
            alt="Cozinha planejada com mármore Ginogran"
            fill
            className="object-cover hover:scale-105 transition-transform duration-700"
          />
        </div>

        {/* Coluna de Texto */}
        <div className="space-y-6 order-1 lg:order-2">
          <h2 className="text-3xl font-bold text-gray-900">
            Modernidade e Tradição
          </h2>
          <p className="text-gray-600 leading-relaxed text-lg">
            A Ginogran nasceu da paixão pela geologia e pelo design de
            interiores. Ao longo dos anos, modernizamos nosso parque fabril, mas
            mantivemos o olhar humano sobre cada peça.
          </p>
          <p className="text-gray-600 leading-relaxed text-lg">
            Entendemos que uma bancada não é apenas um móvel, é onde famílias se
            reúnem. Uma escadaria de mármore não é apenas funcional, é a espinha
            dorsal da elegância de uma casa.
          </p>
        </div>
      </div>
    </section>
  );
}
