// src/components/team/TeamSection.tsx (ou direto na sua page.tsx)
import { EmployeeCard } from "./EmployeeCard";

// Dados da Equipe
const team = [
  {
    name: "Mariana Souza",
    role: "Arquiteta Consultora",
    imageSrc: "/Marmore1.jpeg",
  },
  {
    name: "Carlos Mendes",
    role: "Mestre de Acabamento",
    imageSrc: "/Marmore1.jpeg",
  },
  {
    name: "Fernanda Lima",
    role: "Gerente Comercial",
    imageSrc: "/Marmore1.jpeg",
  },
  {
    name: "João Paulo",
    role: "Líder de Instalação",
    imageSrc: "/Marmore1.jpeg",
  },
];

export function TeamSection() {
  return (
    <section className="py-24 bg-white border-t border-gray-100">
      <div className="w-full max-w-7xl mx-auto px-[22px]">
        {/* Cabeçalho */}
        <div className="text-center mb-16">
          <span className="text-[#F9A825] font-semibold tracking-wider uppercase text-sm">
            Quem faz acontecer
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
            Mentes criativas e mãos habilidosas
          </h2>
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
            A união entre a experiência de décadas e a inovação da nova geração.
          </p>
        </div>

        {/* Grid da Equipe */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, index) => (
            <EmployeeCard
              key={index}
              name={member.name}
              role={member.role}
              imageSrc={member.imageSrc}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
