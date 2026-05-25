export default function CategoryPageSkeleton() {
  return (
    <div className="min-h-screen bg-neutral-600 space-y-20">
      <div className="w-full h-16 bg-neutral-700 animate-pulse" />

      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-6 mb-10">
          <div className="w-24 h-10 bg-neutral-500 rounded-xl animate-pulse" />
          <div className="w-48 h-10 bg-neutral-500 rounded-xl animate-pulse" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="bg-neutral-500 rounded-4xl p-4 animate-pulse"
            >
              <div className="h-48 w-full rounded-3xl bg-neutral-400 mb-4" />
              <div className="px-1 space-y-3">
                <div className="h-5 w-3/4 bg-neutral-400 rounded-lg" />
                <div className="h-6 w-1/3 bg-neutral-400 rounded-lg" />
                <div className="space-y-1">
                  <div className="h-3 w-full bg-neutral-400 rounded" />
                  <div className="h-3 w-2/3 bg-neutral-400 rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full h-24 bg-neutral-700 animate-pulse" />
    </div>
  );
}
