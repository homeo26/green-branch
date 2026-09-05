"use client";

import { useState } from "react";
import {
  CheckIcon,
  CopyIcon,
  FacebookIcon,
  ShareIcon,
  WhatsAppIcon,
} from "@/components/icons";

/** أزرار مشاركة المقال: مشاركة النظام + واتساب + فيسبوك + نسخ الرابط */
export default function ShareButton({
  title,
  path,
}: {
  title: string;
  path: string;
}) {
  const [copied, setCopied] = useState(false);
  const [canNativeShare, setCanNativeShare] = useState(true);

  function fullUrl(): string {
    if (typeof window === "undefined") return path;
    return `${window.location.origin}${path}`;
  }

  async function handleNativeShare() {
    const url = fullUrl();
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title, text: title, url });
      } catch {
        /* أُلغيت المشاركة من المستخدم */
      }
    } else {
      setCanNativeShare(false);
      await handleCopy();
    }
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(fullUrl());
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      /* المتصفح منع النسخ */
    }
  }

  const encoded = () => encodeURIComponent(`${title}\n${fullUrl()}`);

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="me-1 font-heading text-sm font-bold text-forest-900">
        شارِك المقال:
      </span>

      {canNativeShare && (
        <button
          type="button"
          onClick={handleNativeShare}
          className="btn btn-primary btn-sheen px-4 py-2 text-sm"
        >
          <ShareIcon width={16} height={16} />
          مشاركة
        </button>
      )}

      <a
        href={`https://wa.me/?text=${encoded()}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="مشاركة على واتساب"
        className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#25D366] text-white transition-transform duration-200 hover:-translate-y-0.5"
      >
        <WhatsAppIcon width={18} height={18} />
      </a>

      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          fullUrl()
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="مشاركة على فيسبوك"
        className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1877F2] text-white transition-transform duration-200 hover:-translate-y-0.5"
      >
        <FacebookIcon width={18} height={18} />
      </a>

      <button
        type="button"
        onClick={handleCopy}
        aria-label="نسخ رابط المقال"
        className={`flex h-10 items-center justify-center gap-2 rounded-xl border px-3 text-sm font-semibold transition-colors duration-200 ${
          copied
            ? "border-leaf-400 bg-leaf-50 text-forest-800"
            : "border-border-soft text-ink-muted hover:border-forest-500 hover:text-forest-800"
        }`}
      >
        {copied ? (
          <CheckIcon width={16} height={16} />
        ) : (
          <CopyIcon width={16} height={16} />
        )}
        {copied ? "تم النسخ" : "نسخ الرابط"}
      </button>
    </div>
  );
}
