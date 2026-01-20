import Link from "next/link";
// Importe os ícones necessários
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { IconType } from "react-icons";

// --- Dados para os links ---
const quickLinks = [
  { href: "/", label: "Início" },
  { href: "/Catalogo", label: "Catálogo" },
  { href: "/trabalhos", label: "Galeria" },
  { href: "/sobre", label: "Sobre Nós" },
  { href: "/contato", label: "Contato" },
];

const productLinks = [
  { href: "/Catalogo", label: "Mármores" },
  { href: "/Catalogo", label: "Granitos" },
];

const legalLinks = [
  { href: "#", label: "Termos" },
  { href: "#", label: "LGPD" },
];

const socialLinks: { href: string; icon: IconType; ariaLabel: string }[] = [
  {
    href: "https://www.facebook.com/profile.php?id=61581233687814",
    icon: FaFacebookF,
    ariaLabel: "Facebook",
  },
  {
    href: "https://www.instagram.com/ginogran.marmores/",
    icon: FaInstagram,
    ariaLabel: "Instagram",
  },
  {
    href: "https://wa.me/5561985921488",
    icon: FaWhatsapp,
    ariaLabel: "WhatsApp",
  },
];

// --- Componente Principal do Rodapé ---
const Footer = () => {
  return (
    <footer className="relative bg-black-80 px-6 py-12 text-white sm:px-12 md:px-20 lg:px-36 border-t border-white/5">
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {/* Coluna da Marca */}
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold tracking-tight">
            Gino<span className="text-primary">Gran</span>
          </h2>
          <p className="text-sm leading-relaxed text-gray-400">
            Transformando sonhos em realidade através da beleza natural da
            pedra. Excelência e sofisticação em cada detalhe.
          </p>
        </div>

        {/* Coluna de Links Rápidos */}
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-bold text-white">Links Rápidos</h3>
          <ul className="flex flex-col gap-2">
            {quickLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-sm text-gray-400 transition-colors hover:text-primary hover:translate-x-1 inline-block duration-300"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Coluna de Produtos */}
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-bold text-white">Produtos</h3>
          <ul className="flex flex-col gap-2">
            {productLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-sm text-gray-400 transition-colors hover:text-primary hover:translate-x-1 inline-block duration-300"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Coluna Legal */}
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-bold text-white">Legal</h3>
          <ul className="flex flex-col gap-2">
            {legalLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-sm text-gray-400 transition-colors hover:text-primary hover:translate-x-1 inline-block duration-300"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <hr className="my-8 border-white/10" />

      <div className="flex flex-col-reverse items-center justify-between gap-6 sm:flex-row">
        <p className="text-center text-sm text-gray-500 sm:text-left">
          © {new Date().getFullYear()} Direitos reservados GinoGran |
          Desenvolvido por{" "}
          <a
            href="https://www.instagram.com/tavares_devv/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-gray-300 hover:text-primary transition-colors"
          >
            Tavares
          </a>
        </p>

        <div className="flex items-center gap-6">
          {socialLinks.map((social) => (
            <a
              key={social.ariaLabel}
              href={social.href}
              aria-label={social.ariaLabel}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 transition-all hover:text-primary hover:scale-110"
            >
              <social.icon size={22} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
