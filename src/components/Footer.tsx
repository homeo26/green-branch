import Link from "next/link";
import Image from "next/image";
import { categoryGroups, socialLinks, staticLinks } from "@/data/categories";
import { FacebookIcon, InstagramIcon, YoutubeIcon } from "@/components/icons";

export default function Footer() {
  return (
    <footer className="gradient-flow-deep relative mt-24 text-leaf-50">
      {/* موجة علوية فاصلة */}
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className="absolute inset-x-0 -top-px h-14 w-full rotate-180 text-cream sm:h-20"
        aria-hidden
      >
        <path
          fill="currentColor"
          d="M0,32 C240,80 480,0 720,24 C960,48 1200,72 1440,32 L1440,80 L0,80 Z"
        />
      </svg>

      <div className="mx-auto max-w-7xl px-4 pb-10 pt-24 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <Image
              src="/brand/logo-white.png"
              alt="الغصن الأخضر — Green Branch"
              width={150}
              height={153}
            />
            <p className="mt-4 max-w-md leading-7 text-leaf-100/90">
              منصة الغصن الأخضر تجمع المقالات الإرشادية والفيديوهات التعليمية
              والنصائح العملية في كل ما يخص الزراعة — مرجع موحّد وميسّر لكل
              مهتم بالأرض والنبات.
            </p>
            <div className="mt-5 flex gap-3">
              <SocialLink href={socialLinks.youtube} label="قناة يوتيوب">
                <YoutubeIcon width={20} height={20} />
              </SocialLink>
              <SocialLink href={socialLinks.instagram} label="حساب انستغرام">
                <InstagramIcon width={20} height={20} />
              </SocialLink>
              <SocialLink href={socialLinks.facebook} label="صفحة فيسبوك">
                <FacebookIcon width={20} height={20} />
              </SocialLink>
            </div>
          </div>

          {categoryGroups.map((group) => (
            <nav key={group.slug} aria-label={group.title}>
              <h3 className="font-heading text-lg font-bold text-gold-400">
                {group.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {group.categories.map((cat) => (
                  <li key={cat.slug}>
                    <Link
                      href={`/category/${cat.slug}`}
                      className="text-sm text-leaf-100/85 transition-colors duration-200 hover:text-gold-400"
                    >
                      {cat.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-sm text-leaf-100/70">
            © {new Date().getFullYear()} الغصن الأخضر — Green Branch. جميع
            الحقوق محفوظة.
          </p>
          <nav aria-label="روابط سريعة" className="flex gap-5">
            {staticLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-leaf-100/70 transition-colors duration-200 hover:text-gold-400"
              >
                {link.title}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-leaf-100 transition-all duration-300 hover:-translate-y-1 hover:border-gold-400 hover:bg-gold-500 hover:text-forest-950"
    >
      {children}
    </a>
  );
}
