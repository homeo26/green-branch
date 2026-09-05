import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getAllArticles, getArticleBySlug } from "@/lib/articles-store";
import { allCategories } from "@/data/categories";
import ShareButton from "@/components/ShareButton";
import FadeIn from "@/components/FadeIn";
import { ArrowLeftIcon, CategoryIcon, ClockIcon } from "@/components/icons";

interface Props {
  params: Promise<{ slug: string }>;
}

/** Revalidate every minute so admin edits appear */
export const revalidate = 60;

export async function generateStaticParams() {
  const articles = await getAllArticles();
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      images: article.thumbnail ? [article.thumbnail] : undefined,
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const cat = allCategories.find((c) => c.slug === article.category);

  return (
    <article>
      {/* article header */}
      <section className="gradient-flow-deep relative overflow-hidden">
        <div
          className="pointer-events-none absolute -end-16 -top-16 h-64 w-64 rounded-full bg-gold-500/20 blur-3xl"
          aria-hidden
        />
        <FadeIn className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
          {cat && (
            <Link
              href={`/category/${cat.slug}`}
              className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold text-leaf-100 backdrop-blur transition-colors hover:bg-white/20"
            >
              <CategoryIcon name={cat.icon} width={16} height={16} />
              {cat.title}
            </Link>
          )}
          <h1 className="mt-5 font-heading text-3xl font-extrabold leading-[1.4] text-white sm:text-4xl">
            {article.title}
          </h1>
          <div className="mt-4 flex items-center gap-4 text-sm text-leaf-100/80">
            <span className="flex items-center gap-1.5">
              <ClockIcon width={16} height={16} />
              {article.readMinutes} دقائق قراءة
            </span>
            <span>{new Date(article.date).toLocaleDateString("ar-EG")}</span>
          </div>
        </FadeIn>
      </section>

      {/* article image */}
      {article.thumbnail && (
        <FadeIn delay={0.08} className="mx-auto -mt-8 max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-border-soft shadow-leaf-lg">
            <Image
              src={article.thumbnail}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
              priority
            />
          </div>
        </FadeIn>
      )}

      {/* article body */}
      <FadeIn delay={0.16} className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <p className="text-lg font-semibold leading-9 text-forest-800">
          {article.excerpt}
        </p>
        <div className="mt-6 space-y-6">
          {article.body.map((paragraph, i) => (
            <p key={i} className="leading-9 text-ink">
              {paragraph}
            </p>
          ))}
        </div>

        {/* share the article */}
        <div className="mt-10 rounded-2xl border border-border-soft bg-leaf-50/60 p-5">
          <ShareButton title={article.title} path={`/articles/${article.slug}`} />
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-border-soft pt-8">
          <Link href="/articles" className="btn btn-outline px-6 py-2.5 text-sm">
            <ArrowLeftIcon width={16} height={16} className="rotate-180" />
            كل المقالات
          </Link>
          {cat && (
            <Link
              href={`/category/${cat.slug}`}
              className="btn btn-primary btn-sheen px-6 py-2.5 text-sm"
            >
              المزيد عن {cat.title}
              <ArrowLeftIcon width={16} height={16} />
            </Link>
          )}
        </div>
      </FadeIn>
    </article>
  );
}
