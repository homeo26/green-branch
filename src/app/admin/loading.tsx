import { AdminRowSkeleton, SkeletonLine } from "@/components/skeletons";

export default function AdminLoading() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between border-b border-border-soft pb-6">
        <div className="flex items-center gap-3">
          <span className="skeleton h-11 w-11" aria-hidden />
          <div className="space-y-2">
            <SkeletonLine className="h-4" width="110px" />
            <SkeletonLine className="h-3" width="70px" />
          </div>
        </div>
        <span className="skeleton h-10 w-24 rounded-full" aria-hidden />
      </div>

      <div className="mt-8 flex items-center justify-between">
        <div className="space-y-2">
          <SkeletonLine className="h-7" width="120px" />
          <SkeletonLine className="h-3" width="90px" />
        </div>
        <span className="skeleton h-12 w-36 rounded-full" aria-hidden />
      </div>

      <div className="mt-6 space-y-3">
        {[0, 1, 2, 3].map((i) => (
          <AdminRowSkeleton key={i} />
        ))}
      </div>
    </section>
  );
}
