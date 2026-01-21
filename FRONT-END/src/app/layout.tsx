// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/Components/pages/Header";
import Footer from "@/Components/pages/Footer";
import WhatsAppButton from "@/Components/ui/WhatsAppButton";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// --- CONFIGURAÇÃO OPEN GRAPH GLOBAL ---
export const metadata = {
  // Use a URL real do seu site quando publicar (ex: https://ginogran.com.br)
  metadataBase: new URL("https://www.ginogran.com.br"), // <-- ADICIONA O TEU DOMÍNIO AQUI
  title: {
    default: "Ginogran - Mármores e Granitos",
    template: "%s | Ginogran", // O %s será substituído pelo título da página interna
  },
  description:
    "Especialistas em mármores, granitos e pedras naturais de alto padrão. Transformamos pedras em obras de arte.",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://ginogran.com.br",
    siteName: "Ginogran",
    images: [
      {
        url: "/logo.png", // Imagem padrão (do seu public/)
        width: 1200,
        height: 630,
        alt: "Ginogran Mármores e Granitos",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">
        <Header />
        {children}
        <WhatsAppButton phoneNumber="5561985921488" />
        <Footer />
      </body>
    </html>
  );
}
