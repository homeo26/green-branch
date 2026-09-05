/**
 * Loading skeletons - shown while server content is being fetched
 * and sized like the real content to avoid layout shift.
 */

/** Text line */
export function SkeletonLine({
  className = "",
  width = "100%",
}: {
  className?: string;
  width?: string;
}) {
  return (
    <span
      className={`skeleton block h-4 ${className}`}
      style={{ width }}
      aria-hidden
    />
  );
}

/** Article card */
export function ArticleCardSkeleton() {
  return (
    <div className="card-organic overflow-hidden">
      <div className="skeleton aspect-[16/9] rounded-none" aria-hidden />
      <div className="space-y-3 p-5">
        <SkeletonLine className="h-3" width="35%" />
        <SkeletonLine className="h-5" width="90%" />
        <SkeletonLine className="h-5" width="65%" />
        <div className="space-y-2 pt-1">
          <SkeletonLine className="h-3" width="100%" />
          <SkeletonLine className="h-3" width="80%" />
        </div>
        <SkeletonLine className="h-4 mt-2" width="30%" />
      </div>
    </div>
  );
}

/** Video card */
export function VideoCardSkeleton() {
  return (
    <div className="card-organic overflow-hidden">
      <div className="skeleton aspect-video rounded-none" aria-hidden />
      <div className="space-y-3 p-5">
        <SkeletonLine className="h-3" width="30%" />
        <SkeletonLine className="h-5" width="85%" />
        <SkeletonLine className="h-5" width="55%" />
      </div>
    </div>
  );
}

/** Card grid */
export function CardGridSkeleton({
  count = 6,
  variant = "article",
}: {
  count?: number;
  variant?: "article" | "video";
}) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) =>
        variant === "video" ? (
          <VideoCardSkeleton key={i} />
        ) : (
          <ArticleCardSkeleton key={i} />
        )
      )}
    </div>
  );
}

/** Light page hero (title + description) */
export function PageHeroSkeleton() {
  return (
    <section className="gradient-flow">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 py-14 sm:px-6 lg:px-8">
        <SkeletonLine className="h-9 max-w-md" width="60%" />
        <SkeletonLine className="h-4 max-w-2xl" width="80%" />
        <SkeletonLine className="h-4 max-w-xl" width="55%" />
      </div>
    </section>
  );
}

/** Admin dashboard row */
export function AdminRowSkeleton() {
  return (
    <div className="card-organic flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
      <div className="skeleton h-20 w-full shrink-0 sm:w-32" aria-hidden />
      <div className="flex-1 space-y-2.5">
        <SkeletonLine className="h-3" width="25%" />
        <SkeletonLine className="h-5" width="70%" />
        <SkeletonLine className="h-3" width="90%" />
      </div>
      <div className="flex gap-2">
        {[0, 1, 2].map((i) => (
          <span key={i} className="skeleton h-10 w-10" aria-hidden />
        ))}
      </div>
    </div>
  );
}
