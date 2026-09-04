"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { categoryGroups, staticLinks } from "@/data/categories";
import {
  CategoryIcon,
  ChevronDownIcon,
  CloseIcon,
  MenuIcon,
} from "@/components/icons";

export default function Navbar() {
  const pathname = usePathname();
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* إغلاق القوائم عند التنقل */
  useEffect(() => {
    setOpenGroup(null);
    setDrawerOpen(false);
  }, [pathname]);

  /* قفل تمرير الصفحة عند فتح القائمة الجانبية */
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  const openMenu = (slug: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenGroup(slug);
  };
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenGroup(null), 180);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 shadow-[0_4px_24px_-8px_rgb(29_74_52/0.18)] backdrop-blur-md"
          : "bg-white/60 backdrop-blur-sm"
      }`}
    >
      <nav
        aria-label="القائمة الرئيسية"
        className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8"
      >
        {/* الشعار */}
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 transition-transform duration-200 hover:scale-105"
          aria-label="الغصن الأخضر — الصفحة الرئيسية"
        >
          <Image
            src="/brand/logo-mark.png"
            alt=""
            width={46}
            height={46}
            priority
          />
          <span className="font-heading text-lg font-bold text-forest-800 max-[400px]:hidden">
            الغصن الأخضر
          </span>
        </Link>

        {/* روابط سطح المكتب */}
        <div className="hidden items-center gap-1 lg:flex">
          <NavItem href="/" active={pathname === "/"}>
            الرئيسية
          </NavItem>

          {categoryGroups.map((group) => (
            <div
              key={group.slug}
              className="relative"
              onMouseEnter={() => openMenu(group.slug)}
              onMouseLeave={scheduleClose}
            >
              <button
                type="button"
                className={`nav-link flex cursor-pointer items-center gap-1 rounded-lg px-3 py-2 font-heading text-[15px] font-semibold transition-colors ${
                  openGroup === group.slug || pathname.startsWith("/category")
                    ? "text-forest-600"
                    : "text-ink hover:text-forest-600"
                }`}
                aria-expanded={openGroup === group.slug}
                aria-haspopup="true"
                onClick={() =>
                  setOpenGroup(openGroup === group.slug ? null : group.slug)
                }
                onFocus={() => openMenu(group.slug)}
              >
                {group.title}
                <ChevronDownIcon
                  width={16}
                  height={16}
                  className={`transition-transform duration-300 ${
                    openGroup === group.slug ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {openGroup === group.slug && (
                  <motion.div
                    initial={{ opacity: 0, y: 12, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute start-1/2 top-full w-[560px] translate-x-1/2 pt-3"
                    onMouseEnter={() => openMenu(group.slug)}
                    onMouseLeave={scheduleClose}
                  >
                    <div className="grid grid-cols-2 gap-1 rounded-2xl border border-border-soft bg-white p-3 shadow-leaf-lg">
                      {group.categories.map((cat) => (
                        <div
                          key={cat.slug}
                          className="group rounded-xl p-3 transition-colors duration-200 hover:bg-leaf-50"
                        >
                          <Link
                            href={`/category/${cat.slug}`}
                            className="flex items-start gap-3"
                          >
                            <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-leaf-100 text-forest-700 transition-all duration-300 group-hover:bg-forest-800 group-hover:text-white">
                              <CategoryIcon name={cat.icon} width={20} height={20} />
                            </span>
                            <span>
                              <span className="block font-heading font-bold text-forest-900 transition-colors group-hover:text-forest-600">
                                {cat.title}
                              </span>
                              <span className="mt-0.5 line-clamp-2 block text-xs leading-5 text-ink-muted">
                                {cat.description}
                              </span>
                            </span>
                          </Link>
                          <div className="mt-2 flex flex-wrap gap-1.5 ps-13">
                            {cat.subcategories.map((sub) => (
                              <Link
                                key={sub.slug}
                                href={`/category/${cat.slug}?sub=${sub.slug}`}
                                className="rounded-full border border-border-soft bg-white px-2.5 py-0.5 text-[11px] text-ink-muted transition-all duration-200 hover:border-gold-500 hover:bg-gold-100 hover:text-gold-600"
                              >
                                {sub.title}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}

          {staticLinks.map((link) => (
            <NavItem
              key={link.href}
              href={link.href}
              active={pathname.startsWith(link.href)}
            >
              {link.title}
            </NavItem>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="btn btn-primary btn-sheen hidden px-5 py-2.5 text-sm lg:inline-flex"
          >
            اطلب استشارة
          </Link>

          {/* زر القائمة للجوال */}
          <button
            type="button"
            className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl border border-border-soft text-forest-800 transition-colors duration-200 hover:bg-leaf-50 lg:hidden"
            aria-label="فتح القائمة"
            aria-expanded={drawerOpen}
            onClick={() => setDrawerOpen(true)}
          >
            <MenuIcon />
          </button>
        </div>
      </nav>

      {/* القائمة الجانبية للجوال */}
      <AnimatePresence>
        {drawerOpen && <MobileDrawer onClose={() => setDrawerOpen(false)} />}
      </AnimatePresence>
    </header>
  );
}

function NavItem({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      data-active={active}
      className={`nav-link rounded-lg px-3 py-2 font-heading text-[15px] font-semibold transition-colors ${
        active ? "text-forest-600" : "text-ink hover:text-forest-600"
      }`}
    >
      {children}
    </Link>
  );
}

function MobileDrawer({ onClose }: { onClose: () => void }) {
  const [openCat, setOpenCat] = useState<string | null>(null);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-40 bg-forest-950/45 backdrop-blur-[2px] lg:hidden"
        onClick={onClose}
        aria-hidden
      />
      <motion.aside
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className="fixed inset-y-0 end-0 z-50 flex w-[86%] max-w-sm flex-col overflow-y-auto bg-white shadow-2xl lg:hidden"
        role="dialog"
        aria-modal="true"
        aria-label="قائمة التصفح"
      >
        <div className="flex items-center justify-between border-b border-border-soft p-4">
          <Link href="/" className="flex items-center gap-2" onClick={onClose}>
            <Image src="/brand/logo-mark.png" alt="" width={38} height={38} />
            <span className="font-heading font-bold text-forest-800">
              الغصن الأخضر
            </span>
          </Link>
          <button
            type="button"
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl text-ink-muted transition-colors hover:bg-leaf-50 hover:text-forest-800"
            aria-label="إغلاق القائمة"
            onClick={onClose}
          >
            <CloseIcon />
          </button>
        </div>

        <nav className="flex-1 p-4" aria-label="قائمة الجوال">
          <Link
            href="/"
            onClick={onClose}
            className="block rounded-xl px-4 py-3 font-heading font-bold text-forest-900 transition-colors hover:bg-leaf-50"
          >
            الرئيسية
          </Link>

          {categoryGroups.map((group) => (
            <div key={group.slug} className="mt-3">
              <p className="px-4 pb-1 text-xs font-bold tracking-wide text-gold-600">
                {group.title}
              </p>
              {group.categories.map((cat) => {
                const expanded = openCat === cat.slug;
                return (
                  <div key={cat.slug} className="mb-0.5">
                    <div
                      className={`flex items-center justify-between rounded-xl transition-colors duration-200 ${
                        expanded ? "bg-leaf-50" : "hover:bg-leaf-50"
                      }`}
                    >
                      <Link
                        href={`/category/${cat.slug}`}
                        onClick={onClose}
                        className="flex flex-1 items-center gap-3 px-4 py-3"
                      >
                        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-leaf-100 text-forest-700">
                          <CategoryIcon name={cat.icon} width={18} height={18} />
                        </span>
                        <span className="font-heading font-semibold text-forest-900">
                          {cat.title}
                        </span>
                      </Link>
                      <button
                        type="button"
                        className="flex h-11 w-11 cursor-pointer items-center justify-center text-ink-muted"
                        aria-expanded={expanded}
                        aria-label={`فتح تصنيفات ${cat.title}`}
                        onClick={() => setOpenCat(expanded ? null : cat.slug)}
                      >
                        <ChevronDownIcon
                          width={18}
                          height={18}
                          className={`transition-transform duration-300 ${
                            expanded ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    </div>
                    <AnimatePresence initial={false}>
                      {expanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="ms-8 border-s-2 border-leaf-100 py-1 ps-3">
                            {cat.subcategories.map((sub) => (
                              <Link
                                key={sub.slug}
                                href={`/category/${cat.slug}?sub=${sub.slug}`}
                                onClick={onClose}
                                className="block rounded-lg px-3 py-2 text-sm text-ink-muted transition-colors duration-200 hover:bg-gold-100 hover:text-gold-600"
                              >
                                {sub.title}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          ))}

          <div className="mt-4 border-t border-border-soft pt-3">
            {staticLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className="block rounded-xl px-4 py-3 font-heading font-bold text-forest-900 transition-colors hover:bg-leaf-50"
              >
                {link.title}
              </Link>
            ))}
          </div>
        </nav>

        <div className="border-t border-border-soft p-4">
          <Link
            href="/contact"
            onClick={onClose}
            className="btn btn-primary btn-sheen w-full px-5 py-3"
          >
            اطلب استشارة زراعية
          </Link>
        </div>
      </motion.aside>
    </>
  );
}
