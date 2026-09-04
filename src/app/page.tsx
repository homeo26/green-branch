import Link from "next/link";
import Image from "next/image";
import Waves, { Reveal } from "@/components/Waves";
import { ArticleCard, VideoCard } from "@/components/cards";
import { allCategories, socialLinks } from "@/data/categories";
import { articles, videos } from "@/data/content";
import {
  ArrowLeftIcon,
  BookIcon,
  CategoryIcon,
  ChatIcon,
  PlayIcon,
  YoutubeIcon,
} from "@/components/icons";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Pillars />
      <Categories />
      <LatestArticles />
      <LatestVideos />
      <ConsultCta />
    </>
  );
}

/* ─────────────── قسم البطل: خلفية خضراء متموجة ─────────────── */
function Hero() {
  return (
    <section className="gradient-flow relative overflow-hidden">
      {/* هالات خضراء ناعمة */}
      <div
        className="pointer-events-none absolute -start-32 -top-32 h-96 w-96 rounded-full bg-leaf-400/15 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -end-24 top-24 h-80 w-80 rounded-full bg-gold-400/15 blur-3xl"
        aria-hidden
      />

      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-40 pt-14 sm:px-6 md:pb-48 lg:grid-cols-2 lg:px-8 lg:pt-20">
        <Reveal>
          <p className="inline-flex items-center gap-2 rounded-full border border-leaf-400/40 bg-white/70 px-4 py-1.5 text-sm font-semibold text-forest-700 backdrop-blur">
            <span className="h-2 w-2 animate-pulse rounded-full bg-leaf-500" />
            منصتك الزراعية الموثوقة
          </p>
          <h1 className="mt-5 font-heading text-4xl font-extrabold leading-[1.25] text-forest-900 sm:text-5xl lg:text-[3.4rem]">
            ازرع بثقة مع{" "}
            <span className="text-gradient-green">الغصن الأخضر</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-ink-muted">
            محتوى شامل وموثوق يجمع المقالات الإرشادية ومقاطع الفيديو التعليمية
            والنصائح العملية في كل ما يخص الزراعة — من العنب والتين والحمضيات
            إلى التسميد وتقنيات الإثمار والوقاية.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/articles" className="btn btn-primary btn-sheen px-7 py-3.5">
              <BookIcon width={20} height={20} />
              تصفّح المقالات
            </Link>
            <Link href="/videos" className="btn btn-outline px-7 py-3.5">
              <PlayIcon width={20} height={20} />
              مكتبة الفيديو
            </Link>
          </div>
          <a
            href={socialLinks.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-ink-muted transition-colors duration-200 hover:text-forest-600"
          >
            <YoutubeIcon
              width={18}
              height={18}
              className="text-gold-600 transition-transform duration-300 group-hover:scale-125"
            />
            تابعنا على يوتيوب — قناة الغصن الأخضر
          </a>
        </Reveal>

        <Reveal delay={0.15} className="relative hidden justify-center lg:flex">
          <div className="animate-float">
            <Image
              src="/brand/logo.png"
              alt="شعار الغصن الأخضر"
              width={380}
              height={388}
              priority
              className="drop-shadow-[0_25px_45px_rgb(29_74_52/0.25)]"
            />
          </div>
        </Reveal>
      </div>

      <Waves />
    </section>
  );
}

/* ─────────────── أقسام المنصة الثلاثة ─────────────── */
const pillars = [
  {
    href: "/articles",
    title: "مركز المقالات والدلائل",
    description:
      "مقالات مفصّلة وشاملة تغطي كل الموضوعات الزراعية، منظمة بأسلوب سهل وسلس للقرّاء.",
    Icon: BookIcon,
  },
  {
    href: "/videos",
    title: "مكتبة المرئيات والفيديو",
    description:
      "كل فيديوهاتنا على يوتيوب وتيك توك في مكان واحد، مقسمة حسب التصنيف والتاريخ لوصول أسرع.",
    Icon: PlayIcon,
  },
  {
    href: "/contact",
    title: "الاستشارات والتواصل المباشر",
    description:
      "قسم مخصص لاستقبال استفساراتكم والرد عليها، مع نماذج تواصل مباشرة مع فريق العمل.",
    Icon: ChatIcon,
  },
];

function Pillars() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid gap-6 md:grid-cols-3">
        {pillars.map((pillar, i) => (
          <Reveal key={pillar.href} delay={i * 0.12}>
            <Link
              href={pillar.href}
              className="card-organic group block h-full p-7"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-leaf-100 text-forest-700 transition-all duration-300 group-hover:rotate-6 group-hover:bg-forest-800 group-hover:text-white">
                <pillar.Icon width={26} height={26} />
              </span>
              <h2 className="mt-5 font-heading text-xl font-bold text-forest-900 transition-colors duration-200 group-hover:text-forest-600">
                {pillar.title}
              </h2>
              <p className="mt-3 leading-7 text-ink-muted">{pillar.description}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-gold-600">
                اكتشف المزيد
                <ArrowLeftIcon
                  width={16}
                  height={16}
                  className="transition-transform duration-300 group-hover:-translate-x-1.5"
                />
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ─────────────── التصنيفات ─────────────── */
function Categories() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <Reveal>
        <SectionHeading
          title="تصفّح حسب التصنيف"
          subtitle="اختر ما يهمك من محاصيل وإرشادات — كل تصنيف يضم مقالات وفيديوهات متخصصة"
        />
      </Reveal>
      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {allCategories.map((cat, i) => (
          <Reveal key={cat.slug} delay={i * 0.06}>
            <Link
              href={`/category/${cat.slug}`}
              className="card-organic group flex h-full flex-col items-center p-6 text-center"
            >
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-leaf-100 to-leaf-50 text-forest-700 transition-all duration-300 group-hover:from-forest-800 group-hover:to-forest-600 group-hover:text-white">
                <CategoryIcon name={cat.icon} width={28} height={28} />
              </span>
              <h3 className="mt-4 font-heading font-bold text-forest-900 transition-colors duration-200 group-hover:text-forest-600">
                {cat.title}
              </h3>
              <p className="mt-2 hidden text-xs leading-5 text-ink-muted sm:line-clamp-2">
                {cat.description}
              </p>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ─────────────── أحدث المقالات ─────────────── */
function LatestArticles() {
  const latest = articles.slice(0, 3);
  return (
    <section className="gradient-flow py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              title="أحدث المقالات"
              subtitle="إرشادات عملية مكتوبة بعناية لموسم زراعي أفضل"
            />
            <Link href="/articles" className="btn btn-outline px-5 py-2.5 text-sm">
              كل المقالات
              <ArrowLeftIcon width={16} height={16} />
            </Link>
          </div>
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {latest.map((article, i) => (
            <Reveal key={article.slug} delay={i * 0.12}>
              <ArticleCard
                slug={article.slug}
                title={article.title}
                excerpt={article.excerpt}
                category={article.category}
                readMinutes={article.readMinutes}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}


/* ─────────────── أحدث الفيديوهات ─────────────── */
function LatestVideos() {
  const latest = videos.slice(0, 3);
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            title="من مكتبة الفيديو"
            subtitle="شروحات عملية مصوّرة من قلب المزرعة"
          />
          <Link href="/videos" className="btn btn-outline px-5 py-2.5 text-sm">
            كل الفيديوهات
            <ArrowLeftIcon width={16} height={16} />
          </Link>
        </div>
      </Reveal>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {latest.map((video, i) => (
          <Reveal key={video.id} delay={i * 0.12}>
            <VideoCard
              title={video.title}
              category={video.category}
              duration={video.duration}
            />
          </Reveal>
        ))}
      </div>
    </section>
  );
}


/* ─────────────── دعوة للاستشارة ─────────────── */
function ConsultCta() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-4 sm:px-6 lg:px-8">
      <Reveal>
        <div className="gradient-flow-deep relative overflow-hidden rounded-3xl px-6 py-14 text-center sm:px-12">
          <div
            className="pointer-events-none absolute -end-20 -top-20 h-64 w-64 rounded-full bg-gold-500/20 blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -bottom-24 -start-16 h-64 w-64 rounded-full bg-leaf-400/20 blur-3xl"
            aria-hidden
          />
          <h2 className="font-heading text-3xl font-extrabold text-white sm:text-4xl">
            عندك سؤال عن مزروعاتك؟
          </h2>
          <p className="mx-auto mt-4 max-w-2xl leading-8 text-leaf-100/90">
            فريق الغصن الأخضر جاهز للإجابة على استفساراتك وتقديم استشارات
            زراعية عملية تناسب أرضك ومحصولك.
          </p>
          <Link
            href="/contact"
            className="btn btn-light btn-sheen mt-8 px-8 py-3.5"
          >
            <ChatIcon width={20} height={20} />
            اطلب استشارتك الآن
          </Link>
        </div>
      </Reveal>
    </section>
  );
}

function SectionHeading({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div>
      <h2 className="font-heading text-3xl font-extrabold text-forest-900">
        {title}
      </h2>
      <p className="mt-2 text-ink-muted">{subtitle}</p>
    </div>
  );
}
