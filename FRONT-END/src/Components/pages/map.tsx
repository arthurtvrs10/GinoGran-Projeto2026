export default function MapGinogran() {
  return (
    <div className="w-full h-64 bg-gray-200 rounded-2xl overflow-hidden border border-gray-100 shadow-inner relative">
      <iframe
        src="https://maps.google.com/maps?q=-15.9238,-48.1127&hl=pt-br&z=15&output=embed"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="grayscale hover:grayscale-0 transition-all duration-500"
      ></iframe>

      {/* Botão para abrir no App (Melhora a UX no celular) */}
      <a
        href="https://www.google.com/maps/search/?api=1&query=-15.9238,-48.1127"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-50 right-4 bg-white text-xs font-bold px-3 py-2 rounded-lg shadow-md hover:bg-gray-50 text-gray-700 flex items-center gap-2"
      >
        Abrir no GPS
        <svg
          className="w-3 h-3"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
          ></path>
        </svg>
      </a>
    </div>
  );
}
