import Link from "next/link";
import Image from "next/image";
import FadeIn from "@/components/FadeIn";
import { allCategories } from "@/data/categories";
import {
  ArrowLeftIcon,
  ClockIcon,
} from "@/components/icons";

export function ArticleCard({
  slug,
  title,
  excerpt,
  category,
  readMinutes,
  thumbnail,
}: {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readMinutes: number;
  thumbnail: string;
}) {
  const cat = allCategories.find((c) => c.slug === category);
  return (
    <Link
      href={`/articles/${slug}`}
      className="card-organic group flex h-full flex-col overflow-hidden"
    >
      {/* صورة المقال */}
      <div className="relative aspect-[16/9] overflow-hidden bg-forest-950">
        <Image
          src={thumbnail}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-forest-950/60 via-transparent to-transparent"
          aria-hidden
        />
        <span className="absolute bottom-3 start-3 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-forest-800">
          {cat?.title ?? "عام"}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-1 text-xs text-ink-muted">
          <ClockIcon width={14} height={14} />
          {readMinutes} دقائق قراءة
        </div>
        <h3 className="mt-2 font-heading text-lg font-bold leading-8 text-forest-900 transition-colors duration-200 group-hover:text-forest-600">
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
      </div>
    </Link>
  );
}

export function VideoCard({
  youtubeId,
  title,
  category,
}: {
  youtubeId: string;
  title: string;
  category: string;
}) {
  const cat = allCategories.find((c) => c.slug === category);
  return (
    <div className="card-organic overflow-hidden">
      <div className="relative aspect-video bg-forest-950">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
          className="absolute inset-0 h-full w-full border-0"
        />
      </div>
      <div className="p-5">
        <span className="rounded-full bg-gold-100 px-3 py-1 text-xs font-bold text-gold-600">
          {cat?.title ?? "عام"}
        </span>
        <h3 className="mt-3 font-heading font-bold leading-7 text-forest-900">
          {title}
        </h3>
      </div>
    </div>
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
      <FadeIn className="mx-auto max-w-7xl px-4 py-14 text-center sm:px-6 lg:px-8">
        <h1 className="font-heading text-3xl font-extrabold text-forest-900 sm:text-4xl">
          {title}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl leading-8 text-ink-muted">
          {subtitle}
        </p>
      </FadeIn>
    </section>
  );
}
