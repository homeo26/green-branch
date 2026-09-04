import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articles, getArticle } from "@/data/content";
import { allCategories } from "@/data/categories";
import { ArrowLeftIcon, CategoryIcon, ClockIcon } from "@/components/icons";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return { title: article.title, description: article.excerpt };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const cat = allCategories.find((c) => c.slug === article.category);

  return (
    <article>
      {/* ترويسة المقال */}
      <section className="gradient-flow-deep relative overflow-hidden">
        <div
          className="pointer-events-none absolute -end-16 -top-16 h-64 w-64 rounded-full bg-gold-500/20 blur-3xl"
          aria-hidden
        />
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
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
        </div>
      </section>

      {/* محتوى المقال */}
      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
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

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-border-soft pt-8">
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
      </section>
    </article>
  );
}
