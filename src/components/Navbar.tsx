"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
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
  WhatsAppIcon,
} from "@/components/icons";

/** Does the current path belong to this group? */
function isGroupActive(pathname: string, groupSlug: string): boolean {
  if (!pathname.startsWith("/category/")) return false;
  const slug = pathname.split("/")[2];
  const group = categoryGroups.find((g) => g.slug === groupSlug);
  return !!group?.categories.some((c) => c.slug === slug);
}

export default function Navbar() {
  const pathname = usePathname();
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* close menus on navigation */
  useEffect(() => {
    setOpenGroup(null);
    setDrawerOpen(false);
  }, [pathname]);

  /* lock page scroll while the drawer is open */
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
        {/* logo */}
        <Link
          href="/"
          className="order-2 flex flex-1 shrink-0 items-center justify-center gap-2.5 transition-transform duration-200 hover:scale-105 lg:order-1 lg:flex-none lg:justify-start"
          aria-label="الغصن الأخضر — الصفحة الرئيسية"
        >
          <Image
            src="/brand/logo-mark.png"
            alt=""
            width={44}
            height={44}
            priority
            className="h-9 w-9 shrink-0 sm:h-11 sm:w-11"
          />
          <span className="flex flex-col">
            <span className="font-heading text-base font-bold leading-5 text-forest-800 sm:text-lg sm:leading-6">
              الغصن الأخضر
            </span>
            <span
              className="text-[8px] font-bold tracking-[0.14em] text-gold-500 sm:text-[10px] sm:tracking-[0.18em]"
              dir="ltr"
            >
              GREEN BRANCH
            </span>
          </span>
        </Link>

        {/* desktop links */}
        <div className="hidden items-center gap-1 lg:order-2 lg:flex">
          <NavItem href="/" active={pathname === "/"}>
            الرئيسية
          </NavItem>

          {categoryGroups.map((group) => {
            const active = isGroupActive(pathname, group.slug);
            const open = openGroup === group.slug;
            return (
              <div
                key={group.slug}
                className="relative"
                onMouseEnter={() => openMenu(group.slug)}
                onMouseLeave={scheduleClose}
              >
                <button
                  type="button"
                  className={`flex cursor-pointer items-center gap-1 rounded-full px-4 py-2 font-heading text-[15px] font-bold transition-colors duration-200 ${
                    active || open
                      ? "bg-forest-800 text-white"
                      : "text-ink hover:bg-leaf-100 hover:text-forest-800"
                  }`}
                  aria-expanded={open}
                  aria-haspopup="true"
                  onClick={() => setOpenGroup(open ? null : group.slug)}
                  onFocus={() => openMenu(group.slug)}
                >
                  {group.title}
                  <ChevronDownIcon
                    width={16}
                    height={16}
                    className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
                  />
                </button>

                <AnimatePresence>
                  {open && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.18, ease: "easeOut" }}
                      className="absolute start-0 top-full w-60 pt-3"
                      onMouseEnter={() => openMenu(group.slug)}
                      onMouseLeave={scheduleClose}
                    >
                      <div className="rounded-2xl border border-border-soft bg-white p-2 shadow-leaf-lg">
                        {group.categories.map((cat) => {
                          const catActive = pathname === `/category/${cat.slug}`;
                          return (
                            <Link
                              key={cat.slug}
                              href={`/category/${cat.slug}`}
                              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 font-semibold transition-colors duration-150 ${
                                catActive
                                  ? "bg-forest-800 text-white"
                                  : "text-forest-900 hover:bg-leaf-100"
                              }`}
                            >
                              <span
                                className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                                  catActive
                                    ? "bg-white/15 text-white"
                                    : "bg-forest-800 text-white"
                                }`}
                              >
                                <CategoryIcon name={cat.icon} width={16} height={16} />
                              </span>
                              {cat.title}
                            </Link>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}

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

        {/* mobile menu button - right edge */}
        <button
          type="button"
          className="order-1 flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-xl border border-border-soft text-forest-800 transition-colors duration-200 hover:bg-leaf-50 lg:hidden"
          aria-label="فتح القائمة"
          aria-expanded={drawerOpen}
          onClick={() => setDrawerOpen(true)}
        >
          <MenuIcon />
        </button>

        <Link
          href="/contact"
          className="btn btn-primary btn-sheen hidden px-5 py-2.5 text-sm lg:order-3 lg:inline-flex"
        >
          <WhatsAppIcon width={18} height={18} />
          اطلب استشارة
        </Link>
        {/* spacer that keeps the logo optically centred on mobile */}
        <span className="order-3 h-11 w-11 shrink-0 lg:hidden" aria-hidden />
      </nav>

      {/* Mobile drawer - portalled into body so the backdrop-blur header cannot trap it */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {drawerOpen && (
              <MobileDrawer pathname={pathname} onClose={() => setDrawerOpen(false)} />
            )}
          </AnimatePresence>,
          document.body
        )}
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
      className={`rounded-full px-4 py-2 font-heading text-[15px] font-bold transition-colors duration-200 ${
        active
          ? "bg-forest-800 text-white"
          : "text-ink hover:bg-leaf-100 hover:text-forest-800"
      }`}
    >
      {children}
    </Link>
  );
}

function MobileDrawer({
  pathname,
  onClose,
}: {
  pathname: string;
  onClose: () => void;
}) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-[90] bg-forest-950/45 backdrop-blur-[2px] lg:hidden"
        onClick={onClose}
        aria-hidden
      />
      {/* slides in from the right, matching RTL reading order */}
      <motion.aside
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className="fixed inset-y-0 right-0 z-[100] flex w-[86%] max-w-sm flex-col overflow-y-auto bg-white shadow-2xl lg:hidden"
        role="dialog"
        aria-modal="true"
        aria-label="قائمة التصفح"
      >
        <div className="flex items-center justify-between border-b border-border-soft p-4">
          <Link href="/" className="flex items-center gap-2" onClick={onClose}>
            <Image src="/brand/logo-mark.png" alt="" width={38} height={38} />
            <span className="flex flex-col">
              <span className="font-heading font-bold leading-5 text-forest-800">
                الغصن الأخضر
              </span>
              <span
                className="text-[9px] font-bold tracking-[0.18em] text-gold-500"
                dir="ltr"
              >
                GREEN BRANCH
              </span>
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
          <DrawerLink href="/" active={pathname === "/"} onClose={onClose}>
            الرئيسية
          </DrawerLink>

          {categoryGroups.map((group) => (
            <div key={group.slug} className="mt-4">
              <p className="px-4 pb-2 text-xs font-bold tracking-wide text-gold-600">
                {group.title}
              </p>
              <div className="space-y-1">
                {group.categories.map((cat) => {
                  const active = pathname === `/category/${cat.slug}`;
                  return (
                    <Link
                      key={cat.slug}
                      href={`/category/${cat.slug}`}
                      onClick={onClose}
                      className={`flex items-center gap-3 rounded-xl px-4 py-3 font-semibold transition-colors duration-150 ${
                        active
                          ? "bg-forest-800 text-white"
                          : "text-forest-900 hover:bg-leaf-100"
                      }`}
                    >
                      <span
                        className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                          active ? "bg-white/15 text-white" : "bg-forest-800 text-white"
                        }`}
                      >
                        <CategoryIcon name={cat.icon} width={18} height={18} />
                      </span>
                      {cat.title}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}

          <div className="mt-4 space-y-1 border-t border-border-soft pt-3">
            {staticLinks.map((link) => (
              <DrawerLink
                key={link.href}
                href={link.href}
                active={pathname.startsWith(link.href)}
                onClose={onClose}
              >
                {link.title}
              </DrawerLink>
            ))}
          </div>
        </nav>

        <div className="border-t border-border-soft p-4">
          <Link
            href="/contact"
            onClick={onClose}
            className="btn btn-primary btn-sheen w-full px-5 py-3"
          >
            <WhatsAppIcon width={18} height={18} />
            اطلب استشارة زراعية
          </Link>
        </div>
      </motion.aside>
    </>
  );
}

function DrawerLink({
  href,
  active,
  onClose,
  children,
}: {
  href: string;
  active: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      onClick={onClose}
      className={`block rounded-xl px-4 py-3 font-heading font-bold transition-colors duration-150 ${
        active ? "bg-forest-800 text-white" : "text-forest-900 hover:bg-leaf-100"
      }`}
    >
      {children}
    </Link>
  );
}
