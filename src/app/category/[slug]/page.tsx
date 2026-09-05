import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/Waves";
import { ArticleCard, VideoCard } from "@/components/cards";
import { allCategories, getCategory } from "@/data/categories";
import { videos } from "@/data/content";
import { getArticlesByCategory } from "@/lib/articles-store";
import { CategoryIcon } from "@/components/icons";
import FadeIn from "@/components/FadeIn";

interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ sub?: string }>;
}

export const revalidate = 60;

export function generateStaticParams() {
  return allCategories.map((cat) => ({ slug: cat.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) return {};
  return { title: category.title, description: category.description };
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { sub } = await searchParams;
  const category = getCategory(slug);
  if (!category) notFound();

  const catArticles = await getArticlesByCategory(category.slug);
  const catVideos = videos.filter((v) => v.category === category.slug);
  const activeSub = category.subcategories.find((s) => s.slug === sub);

  return (
    <>
      <section className="gradient-flow relative overflow-hidden">
        <FadeIn className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-5 text-center sm:flex-row sm:text-start">
            <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-forest-800 text-white shadow-leaf">
              <CategoryIcon name={category.icon} width={38} height={38} />
            </span>
            <div>
              <h1 className="font-heading text-3xl font-extrabold text-forest-900 sm:text-4xl">
                {category.title}
                {activeSub && (
                  <span className="text-gold-600"> — {activeSub.title}</span>
                )}
              </h1>
              <p className="mt-3 max-w-2xl leading-8 text-ink-muted">
                {category.description}
              </p>
            </div>
          </div>

          {/* subcategories */}
          <nav
            aria-label="التصنيفات الفرعية"
            className="mt-8 flex flex-wrap justify-center gap-2 sm:justify-start"
          >
            <SubChip href={`/category/${category.slug}`} active={!activeSub}>
              الكل
            </SubChip>
            {category.subcategories.map((s) => (
              <SubChip
                key={s.slug}
                href={`/category/${category.slug}?sub=${s.slug}`}
                active={activeSub?.slug === s.slug}
              >
                {s.title}
              </SubChip>
            ))}
          </nav>
        </FadeIn>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <h2 className="font-heading text-2xl font-extrabold text-forest-900">
          المقالات
        </h2>
        {catArticles.length > 0 ? (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {catArticles.map((article, i) => (
              <Reveal key={article.slug} delay={(i % 3) * 0.1}>
                <ArticleCard
                  slug={article.slug}
                  title={article.title}
                  excerpt={article.excerpt}
                  category={article.category}
                  readMinutes={article.readMinutes}
                  thumbnail={article.thumbnail}
                />
              </Reveal>
            ))}
          </div>
        ) : (
          <EmptyState label="مقالات هذا التصنيف قيد الإعداد — تابعنا قريبًا." />
        )}

        <h2 className="mt-16 font-heading text-2xl font-extrabold text-forest-900">
          الفيديوهات
        </h2>
        {catVideos.length > 0 ? (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {catVideos.map((video, i) => (
              <Reveal key={video.id} delay={(i % 3) * 0.1}>
                <VideoCard
                  youtubeId={video.youtubeId}
                  title={video.title}
                  category={video.category}
                />
              </Reveal>
            ))}
          </div>
        ) : (
          <EmptyState label="فيديوهات هذا التصنيف قيد الإضافة — تابع قنواتنا." />
        )}
      </section>
    </>
  );
}

function SubChip({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`rounded-full border px-4 py-1.5 text-sm font-semibold transition-all duration-200 ${
        active
          ? "border-forest-800 bg-forest-800 text-white shadow-leaf"
          : "border-border-soft bg-white text-ink-muted hover:border-gold-500 hover:bg-gold-100 hover:text-gold-600"
      }`}
    >
      {children}
    </Link>
  );
}

function EmptyState({ label }: { label: string }) {
  return (
    <div className="mt-8 rounded-2xl border border-dashed border-border-soft bg-leaf-50/50 p-10 text-center text-ink-muted">
      {label}
    </div>
  );
}
