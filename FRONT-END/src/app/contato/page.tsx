"use client";

import Image from "next/image";
import Link from "next/link";

export default function ContactPage() {


  return (
    <div className="w-full bg-white min-h-screen">
      
      {/* --- 1. HERO SECTION (Padrão) --- */}
      <section className="relative w-full h-[400px] flex items-center justify-center bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <Image
            src="https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=2070&auto=format&fit=crop"
            alt="Atendimento Ginogran"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-[22px] text-center">
          <span className="block text-[#F9A825] font-semibold tracking-widest uppercase mb-4 text-sm md:text-base">
            Fale Conosco
          </span>
          <h1 className="text-4xl md:text-6xl font-light text-white mb-6">
            Vamos realizar seu <strong className="font-bold">Projeto</strong>
          </h1>
          <p className="text-gray-200 max-w-2xl mx-auto text-lg font-light leading-relaxed">
            Estamos prontos para atender você. Entre em contato direto e tire suas dúvidas.
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* --- 2. INFORMAÇÕES DE CONTATO (Coluna Esquerda) --- */}
          <div className="space-y-12">
            
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6 border-l-4 border-[#F9A825] pl-4">
                Canais de Atendimento
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Nossa equipe de especialistas está à disposição para te ajudar a escolher a pedra ideal para sua obra.
              </p>

              <div className="space-y-6">
                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#F9A825]/10 flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6 text-[#F9A825]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">E-mail</h3>
                    <p className="text-gray-600">contato@ginogran.com.br</p>
                  </div>
                </div>

                {/* Endereço */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#F9A825]/10 flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6 text-[#F9A825]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Nosso Endereço</h3>
                    <p className="text-gray-600">
                      SIA Trecho 17, Rua 10, Lote 50<br/>
                      Brasília - DF, 71200-000
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Mapa */}
            <div className="w-full h-64 bg-gray-200 rounded-2xl overflow-hidden border border-gray-100 shadow-inner relative">
               <iframe 
                 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3839.297495027585!2d-47.9540!3d-15.7940!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTXCsDQ3JzM4LjQiUyA0N8KwNTcnMTQuNCJX!5e0!3m2!1spt-BR!2sbr!4v1620000000000!5m2!1spt-BR!2sbr" 
                 width="100%" 
                 height="100%" 
                 style={{ border: 0 }} 
                 loading="lazy"
                 className="grayscale hover:grayscale-0 transition-all duration-500"
               ></iframe>
            </div>

          </div>

          {/* --- 3. WHATSAPP DIRECT (Coluna Direita - Substitui o Form) --- */}
          <div className="bg-green-50 p-8 md:p-12 rounded-3xl border border-green-100 shadow-xl flex flex-col items-center text-center relative overflow-hidden">
            {/* Elemento decorativo de fundo */}
            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-green-200 rounded-full opacity-50 blur-2xl"></div>
            
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-6 shadow-lg animate-pulse">
               {/* Ícone do WhatsApp */}
               <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                 <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
               </svg>
            </div>

            <h3 className="text-3xl font-bold text-gray-900 mb-4">Atendimento Rápido</h3>
            <p className="text-gray-600 mb-8 max-w-sm leading-relaxed">
              Não quer esperar? Fale agora mesmo com um consultor e tire suas dúvidas instantaneamente.
            </p>

            <Link 
              href= "/whatsapp"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-green-500 text-white font-bold py-4 rounded-xl hover:bg-green-600 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 duration-200 flex items-center justify-center gap-3 text-lg"
            >
              Iniciar Conversa
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </Link>

            <p className="mt-4 text-xs text-green-700 font-medium bg-green-100 px-3 py-1 rounded-full">
              Tempo médio de resposta: 5 minutos
            </p>
          </div>

        </div>
      </main>



    </div>
  );
}