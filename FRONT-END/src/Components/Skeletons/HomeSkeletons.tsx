// src/Components/Skeletons/HomeSkeletons.tsx

export const CatalogSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    {[...Array(4)].map((_, i) => (
      <div key={i} className="flex flex-col gap-3">
        <div className="w-full aspect-square bg-gray-200 dark:bg-zinc-800 animate-pulse rounded-2xl" />
        <div className="h-4 w-3/4 bg-gray-200 dark:bg-zinc-800 animate-pulse rounded-full" />
        <div className="h-3 w-1/2 bg-gray-100 dark:bg-zinc-900 animate-pulse rounded-full" />
      </div>
    ))}
  </div>
);

// --- SKELETON MASONRY (IGUAL AO REAL) ---
export const TrabalhosSkeleton = () => {
  // Definimos alturas variadas para simular o efeito das fotos reais
  const heights = [
    "h-[400px]", 
    "h-[300px]", 
    "h-[450px]", 
    "h-[350px]", 
    "h-[420px]", 
    "h-[320px]"
  ];

  return (
    <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
      {heights.map((height, i) => (
        <div 
          key={i} 
          className={`break-inside-avoid w-full ${height} bg-gray-200 dark:bg-zinc-800 animate-pulse rounded-2xl`}
        />
      ))}
    </div>
  );
};

export const BlogSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    {[...Array(3)].map((_, i) => (
      <div key={i} className="space-y-4">
        <div className="w-full h-48 bg-gray-200 dark:bg-zinc-800 animate-pulse rounded-xl" />
        <div className="h-6 w-full bg-gray-200 dark:bg-zinc-800 animate-pulse rounded-full" />
      </div>
    ))}
  </div>
);

export const TestimonialSkeleton = () => (
  <div className="h-40 w-full bg-gray-100 dark:bg-zinc-900 animate-pulse rounded-3xl" />
);