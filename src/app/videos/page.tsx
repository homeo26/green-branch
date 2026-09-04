import type { Metadata } from "next";
import { Reveal } from "@/components/Waves";
import { PageHero, VideoCard } from "@/components/cards";
import { videos } from "@/data/content";
import { socialLinks } from "@/data/categories";
import { InstagramIcon, YoutubeIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "مكتبة المرئيات والفيديو",
  description:
    "كل فيديوهات الغصن الأخضر على يوتيوب وتيك توك في مكان واحد، مقسمة حسب التصنيف والتاريخ.",
};

export default function VideosPage() {
  return (
    <>
      <PageHero
        title="مكتبة المرئيات والفيديو"
        subtitle="جمعنا لك كل مقاطعنا المنشورة على يوتيوب وتيك توك في مكان واحد، مقسمة حسب التصنيف والتاريخ — بلا بحث طويل."
      />
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((video, i) => (
            <Reveal key={video.id} delay={(i % 3) * 0.1}>
              <VideoCard
                title={video.title}
                category={video.category}
                duration={video.duration}
              />
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-14 flex flex-col items-center gap-4 rounded-3xl border border-border-soft bg-white p-8 text-center shadow-leaf sm:flex-row sm:justify-between sm:text-start">
            <div>
              <h2 className="font-heading text-xl font-bold text-forest-900">
                محتوى جديد كل أسبوع
              </h2>
              <p className="mt-1 text-ink-muted">
                تابع قنواتنا ليصلك كل جديد فور نشره.
              </p>
            </div>
            <div className="flex gap-3">
              <a
                href={socialLinks.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-sheen px-5 py-2.5 text-sm"
              >
                <YoutubeIcon width={18} height={18} />
                يوتيوب
              </a>
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline px-5 py-2.5 text-sm"
              >
                <InstagramIcon width={18} height={18} />
                انستغرام
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
