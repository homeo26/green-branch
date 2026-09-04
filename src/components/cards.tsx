import Link from "next/link";
import { allCategories, socialLinks } from "@/data/categories";
import {
  ArrowLeftIcon,
  CategoryIcon,
  ClockIcon,
  PlayIcon,
} from "@/components/icons";

export function ArticleCard({
  slug,
  title,
  excerpt,
  category,
  readMinutes,
}: {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readMinutes: number;
}) {
  const cat = allCategories.find((c) => c.slug === category);
  return (
    <Link
      href={`/articles#${slug}`}
      className="card-organic group flex h-full flex-col p-6"
    >
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-leaf-100 px-3 py-1 text-xs font-bold text-forest-700">
          {cat?.title ?? "عام"}
        </span>
        <span className="flex items-center gap-1 text-xs text-ink-muted">
          <ClockIcon width={14} height={14} />
          {readMinutes} دقائق
        </span>
      </div>
      <h3 className="mt-4 font-heading text-lg font-bold leading-8 text-forest-900 transition-colors duration-200 group-hover:text-forest-600">
        {title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-7 text-ink-muted">{excerpt}</p>
      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-gold-600">
        اقرأ المقال
        <ArrowLeftIcon
          width={16}
          height={16}
          className="transition-transform duration-300 group-hover:-translate-x-1.5"
        />
      </span>
    </Link>
  );
}

export function VideoCard({
  title,
  category,
  duration,
}: {
  title: string;
  category: string;
  duration: string;
}) {
  const cat = allCategories.find((c) => c.slug === category);
  return (
    <a
      href={socialLinks.youtube}
      target="_blank"
      rel="noopener noreferrer"
      className="card-organic group block overflow-hidden"
    >
      <div className="gradient-flow-deep relative flex aspect-video items-center justify-center">
        <CategoryIcon
          name={cat?.icon ?? "leaf"}
          width={52}
          height={52}
          className="text-white/25 transition-transform duration-500 group-hover:scale-110"
        />
        <span className="absolute flex h-16 w-16 items-center justify-center rounded-full bg-white/95 text-forest-800 shadow-leaf-lg transition-all duration-300 group-hover:scale-110 group-hover:bg-gold-500 group-hover:text-white">
          <PlayIcon width={30} height={30} />
        </span>
        <span className="absolute bottom-3 start-3 rounded-lg bg-forest-950/70 px-2 py-0.5 text-xs font-semibold text-white backdrop-blur">
          {duration}
        </span>
      </div>
      <div className="p-5">
        <span className="rounded-full bg-gold-100 px-3 py-1 text-xs font-bold text-gold-600">
          {cat?.title ?? "عام"}
        </span>
        <h3 className="mt-3 font-heading font-bold leading-7 text-forest-900 transition-colors duration-200 group-hover:text-forest-600">
          {title}
        </h3>
      </div>
    </a>
  );
}

export function PageHero({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <section className="gradient-flow relative overflow-hidden">
      <div
        className="pointer-events-none absolute -start-24 -top-24 h-72 w-72 rounded-full bg-leaf-400/15 blur-3xl"
        aria-hidden
      />
      <div className="mx-auto max-w-7xl px-4 py-14 text-center sm:px-6 lg:px-8">
        <h1 className="font-heading text-3xl font-extrabold text-forest-900 sm:text-4xl">
          {title}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl leading-8 text-ink-muted">
          {subtitle}
        </p>
      </div>
    </section>
  );
}
