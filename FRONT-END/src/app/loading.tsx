export default function Loading() {
  return (
    <div className="w-full flex flex-col gap-10 animate-pulse">
      {/* Skeleton do Slider (Topo) */}
      <div className="w-full h-[500px] bg-gray-200" />

      {/* Skeleton da FeaturesBar */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-4 gap-4 px-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-16 bg-gray-100 rounded-lg" />
        ))}
      </div>

      {/* Skeleton do Catálogo/Produtos */}
      <div className="max-w-7xl mx-auto w-full px-6 space-y-6">
        <div className="h-8 w-64 bg-gray-200 rounded" /> {/* Título */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-3">
              <div className="aspect-square bg-gray-200 rounded-xl" />
              <div className="h-4 w-3/4 bg-gray-100 rounded" />
              <div className="h-4 w-1/2 bg-gray-50 rounded" />
            </div>
          ))}
        </div>
      </div>

      {/* Skeleton da CtaSection */}
      <div className="w-full h-64 bg-gray-200 my-10" />

      {/* Skeleton do Blog */}
      <div className="max-w-7xl mx-auto w-full px-6 pb-20">
        <div className="h-8 w-48 bg-gray-200 rounded mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-4">
              <div className="h-48 bg-gray-100 rounded-lg" />
              <div className="h-6 w-full bg-gray-200 rounded" />
              <div className="h-4 w-2/3 bg-gray-50 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}