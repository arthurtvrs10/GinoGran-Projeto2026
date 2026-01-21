export default function Loading() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-stone-200 border-t-orange-500 rounded-full animate-spin"></div>
        <p className="text-stone-500 animate-pulse">Carregando detalhes da pedra...</p>
      </div>
    </div>
  );
}