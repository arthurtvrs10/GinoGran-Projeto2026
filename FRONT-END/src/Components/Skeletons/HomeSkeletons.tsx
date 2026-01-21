// src/Components/Skeletons/HomeSkeletons.tsx

export const CatalogSkeleton = () => (
  <section className="w-full pt-0 pb-10 md:pb-22 bg-white dark:bg-transparent overflow-hidden">
    <div className="max-w-full mx-auto px-4 md:px-22">
      {/* --- CABEÇALHO --- */}
      <div className="flex flex-row justify-between items-end border-t border-gray-100/50 pb-8 pt-6">
        <div className="space-y-2">
          {/* "Nossa Coleção" */}
          <div className="h-3 w-24 bg-gray-200 dark:bg-zinc-800 animate-pulse rounded-md" />
          {/* "Destaques" */}
          <div className="h-8 w-48 bg-gray-200 dark:bg-zinc-800 animate-pulse rounded-lg" />
        </div>

        {/* Link "Ver catálogo" (apenas desktop) */}
        <div className="hidden md:block h-4 w-40 bg-gray-200 dark:bg-zinc-800 animate-pulse rounded-md" />
      </div>

      {/* --- CARDS HÍBRIDOS (Scroll Mobile / Grid Desktop) --- */}
      <div
        className="
        flex gap-4 overflow-hidden pb-6 -mx-4 px-4
        md:grid md:grid-cols-4 md:gap-6 md:pb-0 md:mx-0 md:px-0
      "
      >
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="
              min-w-[85%] sm:min-w-[45%] md:min-w-0 
              flex flex-col gap-3
            "
          >
            {/* Imagem do Produto (Aspect Ratio) */}
            <div className="w-full aspect-[4/4] bg-gray-200 dark:bg-zinc-800 animate-pulse rounded-xl" />

            {/* Infos do Produto */}
            <div className="space-y-2 mt-1">
              <div className="h-4 w-3/4 bg-gray-200 dark:bg-zinc-800 animate-pulse rounded-full" />
              <div className="h-3 w-1/2 bg-gray-100 dark:bg-zinc-900 animate-pulse rounded-full" />
              <div className="h-4 w-1/3 bg-gray-200 dark:bg-zinc-800 animate-pulse rounded-full mt-2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const TrabalhosSkeleton = () => {
  return (
    // Container ajustado para Grid Uniforme (não mais Masonry) e Scroll Mobile
    <div
      className="
      flex gap-4 overflow-hidden pb-6 -mx-4 px-4
      md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6 md:pb-0 md:mx-0 md:px-0
    "
    >
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="
            min-w-[85%] sm:min-w-[45%] md:min-w-0
            relative rounded-2xl overflow-hidden
          "
        >
          {/* Aspect Ratio igual ao componente real: 3/4 Mobile, 4/5 Desktop */}
          <div className="w-full aspect-[3/4] md:aspect-[4/5] bg-gray-200 dark:bg-zinc-800 animate-pulse" />
        </div>
      ))}
    </div>
  );
};

export const BlogSkeleton = () => (
  // Container ajustado com padding lateral específico do Blog (-mx-5 px-5)
  <div
    className="
    flex gap-4 overflow-hidden pb-6 -mx-5 px-5
    md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-8 md:pb-0 md:mx-0 md:px-0
  "
  >
    {[...Array(4)].map((_, i) => (
      <div
        key={i}
        className="
          min-w-[85%] sm:min-w-[45%] md:min-w-0
          space-y-4
        "
      >
        <div className="w-full h-48 bg-gray-200 dark:bg-zinc-800 animate-pulse rounded-xl" />
        <div className="h-6 w-3/4 bg-gray-200 dark:bg-zinc-800 animate-pulse rounded-full" />
        <div className="h-4 w-full bg-gray-100 dark:bg-zinc-900 animate-pulse rounded-full" />
        <div className="h-4 w-2/3 bg-gray-100 dark:bg-zinc-900 animate-pulse rounded-full" />
      </div>
    ))}
  </div>
);

export const TestimonialSkeleton = () => (
  <div className="h-40 w-full bg-gray-100 dark:bg-zinc-900 animate-pulse rounded-3xl" />
);
