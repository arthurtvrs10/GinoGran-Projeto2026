"use client";
import Link from "next/link";
import {
  FaInstagram,
  FaFacebookF,
  FaPinterest,
  FaYoutube,
} from "react-icons/fa6";

export default function Header() {
  return (
    <>
      {/* 1. TOP HEADER */}
      <header className="hidden lg:block bg-gray-100 border-b border-gray-200 py-2 text-xs text-gray-600">
        <div className="max-w-full mx-auto flex justify-between items-center px-22 sm:px-22">
          <nav>
            <ul className="flex items-center space-x-6">
              <li><Link href="#" className="uppercase tracking-wider hover:text-black transition-colors">Sobre</Link></li>
              <li><Link href="#" className="uppercase tracking-wider hover:text-black transition-colors">Blog</Link></li>
              <li><Link href="#" className="uppercase tracking-wider hover:text-black transition-colors">Contato</Link></li>
              <li><Link href="#" className="uppercase tracking-wider hover:text-black transition-colors">Imprensa</Link></li>
            </ul>
          </nav>
          
          <div className="flex items-center gap-4">
            
            <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-[#E1306C] transition-colors">
               <FaInstagram className="w-4 h-4" /> 
            </Link>

            <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-[#1877F2] transition-colors">
               <FaFacebookF className="w-4 h-4" />
            </Link>

            <Link href="https://pinterest.com" target="_blank" rel="noopener noreferrer" aria-label="Pinterest" className="hover:text-[#BD081C] transition-colors">
               <FaPinterest className="w-4 h-4" /> 
            </Link>

            <Link href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="hover:text-[#FF0000] transition-colors">
               <FaYoutube className="w-4 h-4" />
            </Link>

          </div>
        </div>
      </header>

      {/* 2. HEADER */}
      <header className="w-full h-[71px] bg-slate-50 border-b border-gray-200 flex items-center justify-center px-22 md:px-22">
        <div className="w-full max-w-[1440px] flex items-center justify-between ">
          <a href="/ " className="flex items-center gap-3">
            <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center shadow-sm">
              <span className="text-[#F9A825] font-bold text-lg tracking-tighter">
                GG
              </span>
            </div>

            <div className="flex flex-col justify-center">
              <h1 className="text-gray-900 font-bold text-sm leading-tight tracking-wide">
                GINOGRAN
              </h1>
              <span className="text-gray-500 text-[10px] uppercase tracking-wider leading-none">
                Slogan Aqui
              </span>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            <a
              href="/SobreNos"
              className="text-gray-700 hover:text-black font-medium text-sm transition-colors"
            >
              Sobre Nós
            </a>

            <a
              href="/Catalogo"
              className="flex items-center gap-1 cursor-pointer group text-gray-700 hover:text-black transition-colors"
            >
              <span className="font-medium text-sm">Catálogo</span>
            </a>

            <a
              href="#"
              className="text-gray-700 hover:text-black font-medium text-sm transition-colors"
            >
              Trabalhos
            </a>

            <a
              href="#"
              className="text-gray-700 hover:text-black font-medium text-sm transition-colors"
            >
              Contato
            </a>
          </nav>

          <button className="md:hidden text-gray-700">
            <span className="block w-6 h-0.5 bg-current mb-1"></span>
            <span className="block w-6 h-0.5 bg-current mb-1"></span>
            <span className="block w-6 h-0.5 bg-current"></span>
          </button>
        </div>
      </header>
    </>
  );
}
