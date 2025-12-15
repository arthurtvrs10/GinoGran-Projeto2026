// src/components/Footer.tsx

import Link from "next/link";
// Importe os ícones necessários
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { IconType } from "react-icons";

// --- Dados para os links (fácil de gerenciar) ---
const quickLinks = [
  { href: "/", label: "Início" },
  { href: "/produtos", label: "Produtos" },
  { href: "/galeria", label: "Galeria" },
  { href: "/sobre", label: "Sobre Nós" },
  { href: "/contato", label: "Contato" },
];

const productLinks = [
  { href: "/produtos/marmores", label: "Mármores" },
  { href: "/produtos/granitos", label: "Granitos" },
];

const legalLinks = [
  { href: "/termos", label: "Termos" },
  { href: "/lgpd", label: "LGPD" },
];

const socialLinks: { href: string; icon: IconType; ariaLabel: string }[] = [
  { href: "#", icon: FaFacebookF, ariaLabel: "Facebook" },
  { href: "#", icon: FaInstagram, ariaLabel: "Instagram" },
  {
    href: "https://wa.me/5561985921488",
    icon: FaWhatsapp,
    ariaLabel: "WhatsApp",
  },
];

// --- Componente Principal do Rodapé ---
const Footer = () => {
  return (
    <footer className="relative bg-slate-800 px-6 py-12 text-white sm:px-12 md:px-20 lg:px-36">
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {/* Coluna da Marca */}
        <div className="footer-col">
          <h2 className="text-2xl font-bold">
            Gino<span className="text-gold">Gran</span>
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Transformando sonhos em realidade através da beleza natural da
            pedra.
          </p>
        </div>

        {/* Coluna de Links Rápidos */}
        <div className="footer-col">
          <h3 className="mb-4 text-lg font-bold">Links Rápidos</h3>
          <ul className="space-y-2">
            {quickLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-slate-400 transition-colors hover:text-gold"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Coluna de Produtos */}
        <div className="footer-col">
          <h3 className="mb-4 text-lg font-bold">Produtos</h3>
          <ul className="space-y-2">
            {productLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-slate-400 transition-colors hover:text-gold"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Coluna Legal */}
        <div className="footer-col">
          <h3 className="mb-4 text-lg font-bold">Legal</h3>
          <ul className="space-y-2">
            {legalLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-slate-400 transition-colors hover:text-gold"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <hr className="my-8 border-slate-600" />

      <div className="flex flex-col-reverse items-center justify-between gap-4 sm:flex-row">
        <p className="text-center text-sm text-slate-400">
          © Direitos reservados GinoGran | Desenvolvido por{" "}
          <a
            href="https://www.instagram.com/tavares_devv/"
            className="font-bold hover:text-gold"
          >
            Tavares
          </a>
        </p>
        <div className="flex items-center gap-4">
          {socialLinks.map((social) => (
            <a
              key={social.ariaLabel}
              href={social.href}
              aria-label={social.ariaLabel}
              className="text-slate-400 transition-colors hover:text-gold"
            >
              <social.icon size={20} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;