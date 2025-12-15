import Image from "next/image";

export default function History() {
  return (
    <section className="py-20 w-full max-w-7xl mx-auto px-10 ">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Coluna de Texto */}
        <div className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Mais do que pedras, esculpimos{" "}
            <span className="text-[#F9A825]">legados.</span>
          </h2>
          <div className="space-y-4 text-gray-600 leading-relaxed text-lg text-justify">
            <p>
              Na <strong>Ginogran</strong>, acreditamos que cada chapa de
              granito ou mármore conta uma história milenar. Nossa missão não é
              apenas cortar e polir, mas revelar a alma da pedra para que ela se
              torne o protagonista do seu projeto.
            </p>
            <p>
              Combinamos a tradição do artesanato em pedra com a tecnologia de
              corte de precisão. O resultado são acabamentos impecáveis,
              encaixes perfeitos e uma durabilidade que atravessa gerações.
            </p>
            <p>
              Seja para uma bancada de cozinha gourmet ou um revestimento de
              fachada imponente, nossa equipe entende que estamos lidando com o
              sonho dos nossos clientes.
            </p>
          </div>

          <div className="pt-4">
            <div className="h-1 w-20 bg-[#F9A825]"></div>
          </div>
        </div>

        {/* Coluna Visual (Foto Humanizada ou de Oficina) */}
        <div className="relative h-[400px] w-full rounded-xl overflow-hidden shadow-2xl">
          <Image
            src="/Marmore1.jpeg"
            alt="Artesão trabalhando na pedra"
            fill
            className="object-cover hover:scale-105 transition-transform duration-700"
          />
        </div>
      </div>
    </section>
  );
}
