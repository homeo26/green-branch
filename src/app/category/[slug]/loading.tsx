import { CardGridSkeleton, SkeletonLine } from "@/components/skeletons";

export default function CategoryLoading() {
  return (
    <>
      <section className="gradient-flow">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-5 sm:flex-row">
            <span className="skeleton h-20 w-20 shrink-0 rounded-3xl" aria-hidden />
            <div className="w-full space-y-3">
              <SkeletonLine className="h-8" width="45%" />
              <SkeletonLine width="85%" />
              <SkeletonLine width="60%" />
            </div>
          </div>
          <div className="mt-8 flex flex-wrap gap-2">
            {[0, 1, 2, 3, 4].map((i) => (
              <span
                className="skeleton h-8 w-24 rounded-full"
                key={i}
                aria-hidden
              />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <SkeletonLine className="h-7 mb-8" width="140px" />
        <CardGridSkeleton count={3} />
        <SkeletonLine className="mb-8 mt-16 h-7" width="140px" />
        <CardGridSkeleton count={3} variant="video" />
      </section>
    </>
  );
}
