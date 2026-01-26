"use client";
import { useState } from "react";
import Link from "next/link";
import { FaInstagram } from "react-icons/fa6/FaInstagram";
import { FaFacebookF } from "react-icons/fa6/FaFacebook";
import { FaPinterest } from "react-icons/fa6/FaPinterest";
import { FaYoutube } from "react-icons/fa6/FaYoutube";

import { HiMenu, HiX } from "react-icons/hi"; // Ícones para o menu
import { FaArrowRight } from "react-icons/fa";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      {/* 1. TOP HEADER */}
      <header className="hidden lg:block bg-gray-100 border-b border-gray-200 py-2 text-xs text-gray-600">
        <div className="max-w-full mx-auto flex justify-between items-center px-22 sm:px-22">
          <nav>
            <ul className="flex items-center space-x-6">
              <li>
                <Link
                  href="/blog"
                  className="uppercase tracking-wider hover:text-black transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/whatsapp"
                  className="uppercase tracking-wider hover:text-black transition-colors"
                >
                  Contato
                </Link>
              </li>
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            <Link
              href="https://www.instagram.com/ginogran.marmores/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-[#E1306C] transition-colors"
            >
              <FaInstagram className="w-4 h-4" />
            </Link>

            <Link
              href="https://www.facebook.com/profile.php?id=61581233687814"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hover:text-[#1877F2] transition-colors"
            >
              <FaFacebookF className="w-4 h-4" />
            </Link>

            <Link
              href="https://pinterest.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Pinterest"
              className="hover:text-[#BD081C] transition-colors"
            >
              <FaPinterest className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* 2. HEADER */}
      <header className="w-full h-[71px] bg-slate-50 border-b border-gray-200 px-4 md:px-22 py-4">
        <div className="w-full max-w-full flex items-center justify-between ">
          <a href="/ " className="flex items-center " onClick={closeMenu}>
            <h1 className="text-darkgray font-extrabold text-2xl leading-tight tracking-wide">
              GINO<span className="text-[#F9A825]">GRAN</span>
            </h1>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            <a
              href="/SobreNos"
              className="text-gray-700 hover:text-black font-medium text-sm transition-colors"
            >
              Sobre Nós
            </a>

            <a
              href="/trabalhos"
              className="text-gray-700 hover:text-black font-medium text-sm transition-colors"
            >
              Trabalhos
            </a>

            <a
              href="/Catalogo"
              className="flex items-center gap-1 cursor-pointer group text-gray-700 hover:text-black transition-colors"
            >
              <span className="font-medium text-sm">Catálogo</span>
            </a>

            <a
              href="/contato"
              className="text-gray-700 hover:text-black font-medium text-sm transition-colors"
            >
              Contato
            </a>
          </nav>

          {/* Botão do menu mobile */}

          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Abrir menu"
          >
            <span className="block w-6 h-0.5 bg-current mb-1"></span>
            <span className="block w-6 h-0.5 bg-current mb-1"></span>
            <span className="block w-6 h-0.5 bg-current"></span>
          </button>
        </div>
      </header>

      {/* 3. MENU MOBILE OVERLAY */}
      <div
        className={`
        fixed inset-0 top-[71px] bg-white z-40 transition-transform duration-300 md:hidden
        ${isOpen ? "translate-x-0" : "translate-x-full"}
      `}
      >
        <nav className="flex flex-col p-6 gap-6">
          <Link
            href="/SobreNos"
            onClick={closeMenu}
            className="text-lg font-medium border-b border-gray-100 pb-4"
          >
            Sobre Nós
          </Link>
          <Link
            href="/trabalhos"
            onClick={closeMenu}
            className="text-lg font-medium border-b border-gray-100 pb-4"
          >
            Trabalhos
          </Link>
          <Link
            href="/contato"
            onClick={closeMenu}
            className="text-lg font-medium border-b border-gray-100 pb-4"
          >
            Contato
          </Link>

          {/* O SEU BOTÃO (Apenas Mobile) */}
          <Link
            href="/Catalogo"
            onClick={closeMenu}
            className="flex items-center justify-center gap-2 font-bold transition-all bg-orange-600 text-white px-6 py-4 rounded-full shadow-md"
          >
            Ver catálogo completo
            <FaArrowRight size={18} />
          </Link>

          {/* Redes Sociais no Mobile */}
          <div className="flex justify-center gap-8 pt-6">
            <FaInstagram
              className="w-6 h-6 text-gray-400"
              href="https://www.instagram.com/ginogran.marmores/"
            />
            <FaFacebookF className="w-6 h-6 text-gray-400" />
            <FaYoutube className="w-6 h-6 text-gray-400" />
          </div>
        </nav>
      </div>
    </>
  );
}
