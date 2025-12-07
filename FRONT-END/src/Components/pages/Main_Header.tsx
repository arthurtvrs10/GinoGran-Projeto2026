"use client"
import { ChevronDown } from 'lucide-react';

export default function Header() {
    return (
        <>
        <header className="w-full h-[71px] bg-slate-50 border-b border-gray-200 flex items-center justify-center px-4 md:px-8">
      
            <div className="w-full max-w-[1440px] flex items-center justify-between px-[40px]">
            
                <div className="flex items-center gap-3">
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
                </div>

                <nav className="hidden md:flex items-center gap-8">
                <a 
                    href="#" 
                    className="text-gray-700 hover:text-black font-medium text-sm transition-colors"
                >
                    Sobre Nós
                </a>

                <div className="flex items-center gap-1 cursor-pointer group text-gray-700 hover:text-black transition-colors">
                    <span className="font-medium text-sm">Catálogo</span>
                    <ChevronDown className="w-4 h-4 text-gray-500 group-hover:text-black transition-colors" />
                </div>

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
    )
}