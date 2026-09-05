import { CardGridSkeleton, PageHeroSkeleton } from "@/components/skeletons";

export default function ArticlesLoading() {
  return (
    <>
      <PageHeroSkeleton />
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <CardGridSkeleton count={6} />
      </section>
    </>
  );
}
