import Link from "next/link";
import Image from "next/image";
import Waves, { BreathingWords, DriftingLeaves, Reveal } from "@/components/Waves";
import { ArticleCard, VideoCard } from "@/components/cards";
import { allCategories, socialLinks } from "@/data/categories";
import { articles, videos } from "@/data/content";
import {
  ArrowLeftIcon,
  BookIcon,
  CategoryIcon,
  ChatIcon,
  PlayIcon,
  WhatsAppIcon,
  YoutubeIcon,
} from "@/components/icons";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Pillars />
      <LatestVideos />
      <Categories />
      <LatestArticles />
      <ConsultCta />
    </>
  );
}

/* ─────────────── قسم البطل: خلفية خضراء متموجة ─────────────── */
function Hero() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(160deg,#eaf7ef_0%,#ffffff_50%,#f6ecdf_100%)]">
      <DriftingLeaves />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 px-4 pb-40 pt-6 sm:px-6 sm:pb-48 md:pb-56 lg:grid-cols-2 lg:px-8 lg:pt-10">
        <Reveal>
          <h1 className="font-heading text-4xl font-extrabold leading-[1.35] text-forest-900 sm:text-5xl lg:text-[3.2rem]">
            ازرع بثقة مع{" "}
            <span className="text-gradient-green">الغصن الأخضر</span>
          </h1>
          <p className="mt-4 font-heading text-2xl font-bold text-forest-700 sm:text-3xl">
            دليلك الموثوق في{" "}
            <BreathingWords
              words={[
                "زراعة العنب",
                "العناية بالتين",
                "الليمون والحمضيات",
                "التسميد الصحيح",
                "تقنيات الإثمار",
                "وقاية المحاصيل",
              ]}
              className="text-gold-600"
            />
          </p>
          <p className="mt-5 max-w-xl text-lg leading-8 text-ink-muted">
            محتوى شامل وموثوق يجمع المقالات الإرشادية ومقاطع الفيديو التعليمية
            والنصائح العملية في كل ما يخص الزراعة.
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
            className="btn btn-sheen mt-6 bg-[#FF0000] px-6 py-3 text-sm text-white shadow-[0_8px_24px_-8px_rgb(255_0_0/0.5)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#cc0000]"
          >
            <YoutubeIcon width={22} height={22} />
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
    <section className="relative z-10 mx-auto -mt-24 max-w-7xl px-4 pb-16 sm:-mt-32 sm:px-6 md:-mt-40 lg:px-8">
      <div className="grid gap-6 md:grid-cols-3">
        {pillars.map((pillar, i) => (
          <Reveal key={pillar.href} delay={i * 0.12}>
            <Link
              href={pillar.href}
              className="card-organic group block h-full p-7"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-forest-800 text-white shadow-leaf transition-all duration-300 group-hover:rotate-6 group-hover:bg-gold-500">
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
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-forest-700 to-forest-500 text-white shadow-leaf transition-all duration-300 group-hover:from-gold-600 group-hover:to-gold-400">
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
    <section className="py-16">
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
                thumbnail={article.thumbnail}
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
    <section className="gradient-flow py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            title="من مكتبة الفيديو"
            subtitle="شروحات عملية مصوّرة من قلب المزرعة — شاهدها مباشرة هنا"
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
              youtubeId={video.youtubeId}
              title={video.title}
              category={video.category}
            />
          </Reveal>
        ))}
        </div>
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
            هل لديك سؤال حول مزروعاتك؟
          </h2>
          <p className="mx-auto mt-4 max-w-2xl leading-8 text-leaf-100/90">
            فريق الغصن الأخضر مستعد للإجابة عن استفساراتكم وتقديم استشارات
            زراعية عملية تناسب أرضكم ومحصولكم.
          </p>
          <Link
            href="/contact"
            className="btn btn-sheen mt-8 bg-[#25D366] px-8 py-3.5 text-white shadow-[0_8px_24px_-8px_rgb(37_211_102/0.6)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1eb955]"
          >
            <WhatsAppIcon width={22} height={22} />
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
