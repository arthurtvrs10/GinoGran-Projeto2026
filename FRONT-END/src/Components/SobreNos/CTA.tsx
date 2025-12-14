

export default function Cta(){
    return(
        <div className="bg-gray-900 py-10 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Vamos eternizar o seu projeto?</h2>
            <p className="text-black-60 mb-8 max-w-2xl mx-auto">
                Conheça nosso catálogo de pedras exóticas e clássicas ou fale com um consultor.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 px-4">
                {/* Botão Primário Laranja */}
                <button className="px-8 py-3 bg-(--Orange50-Primary) text-black-100 font-bold rounded-full hover:bg-orange-30 transition-colors shadow-lg shadow-(--Orange50-Primary)/20">
                    Ver Nossos Produtos
                </button>
                {/* Botão Secundário Outline */}
                <button className="px-8 py-3 bg-transparent text-white border-2 border-black-30 rounded-full font-bold hover:bg-black-20 transition-colors">
                    Fale Conosco
                </button>
            </div>
        </div>
    );
}