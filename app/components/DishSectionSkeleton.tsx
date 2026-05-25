export default function DishSectionSkeleton() {
  return (
    <div className="flex flex-col items-center justify-center w-full px-10 py-16">
      <div className="w-full min-w-375 flex flex-col gap-14">
        <div className="flex items-center justify-between mb-5">
          <div className="h-12 w-48 bg-neutral-500 rounded-xl animate-pulse" />
          <div className="h-10 w-24 bg-neutral-500 rounded-full animate-pulse" />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-10">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-[30px] p-5 flex flex-col gap-5 shadow-lg animate-pulse"
          >
            <div className="relative overflow-hidden rounded-3xl">
              <div className="w-full h-87.5 bg-gray-200 rounded-3xl" />
            </div>
            <div className="flex flex-col gap-3 px-1">
              <div className="flex items-start justify-between">
                <div className="h-6 w-100 bg-gray-200 rounded-lg" />
                <div className="h-6 w-16 bg-gray-200 rounded-lg" />
              </div>
              <div className="space-y-2">
                <div className="h-4 w-full bg-gray-200 rounded" />
                <div className="h-4 w-4/5 bg-gray-200 rounded" />
                <div className="h-4 w-3/5 bg-gray-200 rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
