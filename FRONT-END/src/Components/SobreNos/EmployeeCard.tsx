// src/components/team/EmployeeCard.tsx
import Image from 'next/image';

interface EmployeeCardProps {
  name: string;
  role: string;
  imageSrc: string;
}

export function EmployeeCard({ name, role, imageSrc }: EmployeeCardProps) {
  return (
    // A classe 'group' aqui permite controlar os filhos quando passamos o mouse neste container
    <div className="flex flex-col items-center text-center group cursor-default">
      
      {/* Container da Foto */}
      <div className="relative w-40 h-40 rounded-full overflow-hidden mb-4 border-4 border-gray-100 group-hover:border-[#F9A825] transition-colors duration-300">
        <Image 
          src={imageSrc} 
          alt={`Foto de ${name}`} 
          fill
          className="object-cover"
        />
      </div>

      <h4 className="text-xl font-bold text-gray-800 mb-1">{name}</h4>
      
      {/* O TEXTO DA FUNÇÃO */}
      {/* Usamos 'group-hover:' em vez de apenas 'hover:' */}
      <p className="text-gray-500 text-sm transition-colors duration-300 group-hover:text-[#F9A825] group-hover:font-medium">
        {role}
      </p>
      
    </div>
  );
}