import { SkeletonLine } from "@/components/skeletons";

export default function ArticleLoading() {
  return (
    <article>
      {/* header */}
      <section className="gradient-flow-deep">
        <div className="mx-auto max-w-3xl space-y-4 px-4 py-16 sm:px-6 lg:px-8">
          <span
            className="skeleton skeleton-dark block h-7 w-32 rounded-full"
            aria-hidden
          />
          <div className="space-y-3 pt-2">
            <span
              className="skeleton skeleton-dark block h-9 w-full"
              aria-hidden
            />
            <span
              className="skeleton skeleton-dark block h-9 w-3/5"
              aria-hidden
            />
          </div>
          <span
            className="skeleton skeleton-dark block h-4 w-48"
            aria-hidden
          />
        </div>
      </section>

      {/* article image */}
      <div className="mx-auto -mt-8 max-w-3xl px-4 sm:px-6 lg:px-8">
        <div
          className="skeleton aspect-[16/9] rounded-2xl border border-border-soft"
          aria-hidden
        />
      </div>

      {/* body */}
      <section className="mx-auto max-w-3xl space-y-6 px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-2.5">
          <SkeletonLine className="h-5" width="100%" />
          <SkeletonLine className="h-5" width="88%" />
        </div>
        {[0, 1, 2, 3].map((block) => (
          <div key={block} className="space-y-2.5">
            <SkeletonLine width="100%" />
            <SkeletonLine width="97%" />
            <SkeletonLine width="92%" />
            <SkeletonLine width="60%" />
          </div>
        ))}
      </section>
    </article>
  );
}
