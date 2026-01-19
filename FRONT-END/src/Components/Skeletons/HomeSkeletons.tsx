// @/components/Skeletons/HomeSkeletons.tsx

// Skeleton para o Catálogo (4 colunas)
export const CatalogSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-10">
    {[...Array(4)].map((_, i) => (
      <div key={i} className="space-y-3">
        <div className="w-full aspect-square bg-gray-200 dark:bg-zinc-800 animate-pulse rounded-2xl" />
        <div className="h-4 w-3/4 bg-gray-200 dark:bg-zinc-800 animate-pulse rounded-full" />
        <div className="h-3 w-1/2 bg-gray-100 dark:bg-zinc-900 animate-pulse rounded-full" />
      </div>
    ))}
  </div>
);

// Skeleton para Trabalhos (Estilo Galeria/Grid)
export const TrabalhosSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-10">
    {[...Array(3)].map((_, i) => (
      <div key={i} className="h-80 w-full bg-gray-200 dark:bg-zinc-800 animate-pulse rounded-3xl" />
    ))}
  </div>
);

// Skeleton para o Blog (3 colunas com texto)
export const BlogSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-10">
    {[...Array(3)].map((_, i) => (
      <div key={i} className="space-y-4">
        <div className="w-full h-48 bg-gray-200 dark:bg-zinc-800 animate-pulse rounded-xl" />
        <div className="h-6 w-full bg-gray-200 dark:bg-zinc-800 animate-pulse rounded-full" />
        <div className="h-4 w-2/3 bg-gray-100 dark:bg-zinc-900 animate-pulse rounded-full" />
      </div>
    ))}
  </div>
);

// Skeleton para Depoimentos
export const TestimonialSkeleton = () => (
  <div className="flex flex-col items-center space-y-4 py-10">
    <div className="w-20 h-20 bg-gray-200 dark:bg-zinc-800 animate-pulse rounded-full" />
    <div className="h-4 w-1/2 bg-gray-200 dark:bg-zinc-800 animate-pulse rounded-full" />
    <div className="h-3 w-1/3 bg-gray-100 dark:bg-zinc-900 animate-pulse rounded-full" />
  </div>
);