import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { PageHero } from "@/components/cards";
import { Reveal } from "@/components/Waves";
import { socialLinks } from "@/data/categories";
import {
  ChatIcon,
  FacebookIcon,
  InstagramIcon,
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
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-leaf-100 text-forest-700">
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
                >
                  <YoutubeIcon width={20} height={20} />
                </ContactChannel>
                <ContactChannel
                  href={socialLinks.instagram}
                  label="انستغرام — green_branchs@"
                >
                  <InstagramIcon width={20} height={20} />
                </ContactChannel>
                <ContactChannel
                  href={socialLinks.facebook}
                  label="فيسبوك — الغصن الأخضر"
                >
                  <FacebookIcon width={20} height={20} />
                </ContactChannel>
                <ContactChannel
                  href="mailto:info@greenbranchs.com"
                  label="info@greenbranchs.com"
                >
                  <MailIcon width={20} height={20} />
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
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel="noopener noreferrer"
        className="group flex items-center gap-3 rounded-xl border border-border-soft p-3 transition-all duration-200 hover:border-gold-500 hover:bg-gold-100/50"
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-leaf-100 text-forest-700 transition-colors duration-300 group-hover:bg-gold-500 group-hover:text-white">
          {children}
        </span>
        <span className="text-sm font-semibold text-ink transition-colors group-hover:text-gold-600">
          {label}
        </span>
      </a>
    </li>
  );
}
