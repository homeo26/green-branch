import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { PageHero } from "@/components/cards";
import { Reveal } from "@/components/Waves";
import { socialLinks } from "@/data/categories";
import {
  ChatIcon,
  FacebookIcon,
  InstagramGradientIcon,
  MailIcon,
  YoutubeIcon,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "الاستشارات والتواصل",
  description:
    "أرسل استفسارك الزراعي لفريق الغصن الأخضر واحصل على استشارة عملية تناسب أرضك ومحصولك.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="الاستشارات والتواصل المباشر"
        subtitle="نستقبل استفساراتكم ونرد عليها بعناية — املأ النموذج وسيتواصل معك فريق العمل في أقرب وقت."
      />
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-5">
          <Reveal className="lg:col-span-3">
            <ContactForm />
          </Reveal>

          <Reveal delay={0.15} className="lg:col-span-2">
            <div className="card-organic h-full p-7">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-forest-800 text-white shadow-leaf">
                <ChatIcon width={26} height={26} />
              </span>
              <h2 className="mt-5 font-heading text-xl font-bold text-forest-900">
                قنوات التواصل
              </h2>
              <p className="mt-3 leading-7 text-ink-muted">
                يسعدنا تواصلك معنا عبر أي من منصاتنا — نتابع الرسائل والتعليقات
                يوميًا.
              </p>
              <ul className="mt-6 space-y-3">
                <ContactChannel
                  href={socialLinks.youtube}
                  label="يوتيوب — الغصن الأخضر"
                  iconBg="bg-[#FF0000]"
                >
                  <YoutubeIcon width={20} height={20} className="text-white" />
                </ContactChannel>
                <ContactChannel
                  href={socialLinks.instagram}
                  label="انستغرام — green_branchs@"
                  iconBg="bg-white ring-1 ring-border-soft"
                >
                  <InstagramGradientIcon width={22} height={22} />
                </ContactChannel>
                <ContactChannel
                  href={socialLinks.facebook}
                  label="فيسبوك — الغصن الأخضر"
                  iconBg="bg-[#1877F2]"
                >
                  <FacebookIcon width={20} height={20} className="text-white" />
                </ContactChannel>
                <ContactChannel
                  href="mailto:info@greenbranchs.com"
                  label="info@greenbranchs.com"
                  iconBg="bg-gold-500"
                >
                  <MailIcon width={20} height={20} className="text-white" />
                </ContactChannel>
              </ul>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function ContactChannel({
  href,
  label,
  iconBg,
  children,
}: {
  href: string;
  label: string;
  iconBg: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel="noopener noreferrer"
        className="group flex items-center gap-3 rounded-xl border border-border-soft p-3 transition-all duration-200 hover:border-forest-500 hover:bg-leaf-50"
      >
        <span
          className={`flex h-11 w-11 items-center justify-center rounded-lg transition-transform duration-300 group-hover:scale-110 ${iconBg}`}
        >
          {children}
        </span>
        <span className="text-sm font-semibold text-ink transition-colors group-hover:text-forest-800">
          {label}
        </span>
      </a>
    </li>
  );
}
