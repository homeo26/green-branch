"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Article } from "@/data/content";
import { categoryGroups } from "@/data/categories";
import {
  ArrowLeftIcon,
  CheckIcon,
  ImageIcon,
  ShareIcon,
} from "@/components/icons";

interface Props {
  article?: Article;
  storageReady: boolean;
}

export default function ArticleEditor({ article, storageReady }: Props) {
  const router = useRouter();
  const fileInput = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState(article?.title ?? "");
  const [slug, setSlug] = useState(article?.slug ?? "");
  const [category, setCategory] = useState(article?.category ?? "");
  const [subcategory, setSubcategory] = useState(article?.subcategory ?? "");
  const [excerpt, setExcerpt] = useState(article?.excerpt ?? "");
  const [thumbnail, setThumbnail] = useState(article?.thumbnail ?? "");
  const [date, setDate] = useState(
    article?.date ?? new Date().toISOString().slice(0, 10)
  );
  const [body, setBody] = useState((article?.body ?? []).join("\n\n"));

  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [savedSlug, setSavedSlug] = useState<string | null>(null);

  const selectedGroup = categoryGroups.find((g) =>
    g.categories.some((c) => c.slug === category)
  );
  const subcategories =
    selectedGroup?.categories.find((c) => c.slug === category)?.subcategories ??
    [];

  async function handleUpload(file: File) {
    setUploading(true);
    setError(null);
    try {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: form,
      });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) {
        setError(data.error ?? "تعذّر رفع الصورة");
        return;
      }
      setThumbnail(data.url);
    } catch {
      setError("تعذّر الاتصال بالخادم أثناء رفع الصورة");
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError(null);
    setSavedSlug(null);
    try {
      const res = await fetch("/api/admin/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          slug,
          category,
          subcategory,
          excerpt,
          thumbnail,
          date,
          body,
          originalSlug: article?.slug,
        }),
      });
      const data = (await res.json()) as {
        error?: string;
        article?: Article;
      };
      if (!res.ok) {
        setError(data.error ?? "تعذّر حفظ المقال");
        return;
      }
      setSavedSlug(data.article?.slug ?? null);
      router.refresh();
    } catch {
      setError("تعذّر الاتصال بالخادم");
    } finally {
      setSaving(false);
    }
  }

  const articleUrl = savedSlug ? `/articles/${savedSlug}` : null;

  return (
    <form onSubmit={handleSubmit} className="mt-8">
      {!storageReady && (
        <p className="mb-6 rounded-xl border border-gold-500/40 bg-gold-100/60 px-4 py-3 text-sm font-semibold text-gold-600">
          التخزين غير مهيّأ: لا يمكن الحفظ أو رفع الصور حتى تُضبط متغيرات R2.
        </p>
      )}

      {error && (
        <p
          role="alert"
          className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700"
        >
          {error}
        </p>
      )}

      {savedSlug && (
        <div className="mb-6 rounded-xl border border-leaf-400 bg-leaf-50 px-4 py-4">
          <p className="flex items-center gap-2 text-sm font-bold text-forest-800">
            <CheckIcon width={18} height={18} />
            تم حفظ المقال ونشره
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <Link
              href={articleUrl as string}
              target="_blank"
              className="btn btn-outline px-4 py-2 text-sm"
            >
              معاينة المقال
            </Link>
            <ShareLinkButton path={articleUrl as string} title={title} />
          </div>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        {/* content */}
        <div className="lg:col-span-2">
          <div className="card-organic p-6">
            <Field label="عنوان المقال" htmlFor="title">
              <input
                id="title"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="مثال: التقليم الشتوي للعنب"
                className="field-input"
              />
            </Field>

            <Field label="نص المقال" htmlFor="body" className="mt-5">
              <textarea
                id="body"
                required
                rows={18}
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder={
                  "اكتب المقال هنا.\n\nاترك سطرًا فارغًا بين كل فقرة وأخرى — كل فقرة ستظهر منفصلة في صفحة المقال."
                }
                className="field-input resize-y leading-8"
              />
              <p className="mt-2 text-xs text-ink-muted">
                اترك سطرًا فارغًا بين الفقرات. يُحسب زمن القراءة تلقائيًا.
              </p>
            </Field>

            <Field label="مقتطف قصير (اختياري)" htmlFor="excerpt" className="mt-5">
              <textarea
                id="excerpt"
                rows={3}
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="يظهر في بطاقة المقال. إن تُرك فارغًا سيُؤخذ من أول فقرة."
                className="field-input resize-y"
              />
            </Field>
          </div>
        </div>

        {/* settings */}
        <div className="space-y-6">
          <div className="card-organic p-6">
            <h3 className="font-heading font-bold text-forest-900">صورة المقال</h3>
            <div className="mt-4 overflow-hidden rounded-xl border border-border-soft bg-leaf-50">
              {thumbnail ? (
                <div className="relative aspect-[16/9]">
                  <Image
                    src={thumbnail}
                    alt=""
                    fill
                    sizes="400px"
                    className="object-cover"
                    unoptimized
                  />
                </div>
              ) : (
                <div className="flex aspect-[16/9] items-center justify-center text-ink-muted">
                  <ImageIcon width={32} height={32} />
                </div>
              )}
            </div>

            <input
              ref={fileInput}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/avif,image/gif"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) void handleUpload(file);
              }}
            />
            <button
              type="button"
              onClick={() => fileInput.current?.click()}
              disabled={uploading || !storageReady}
              className="btn btn-outline mt-4 w-full px-4 py-2.5 text-sm disabled:opacity-50"
            >
              <ImageIcon width={17} height={17} />
              {uploading ? "جارٍ الرفع…" : "رفع صورة"}
            </button>

            <Field label="أو رابط صورة" htmlFor="thumbnail" className="mt-4">
              <input
                id="thumbnail"
                dir="ltr"
                value={thumbnail}
                onChange={(e) => setThumbnail(e.target.value)}
                placeholder="https://…"
                className="field-input text-xs"
              />
            </Field>
          </div>

          <div className="card-organic p-6">
            <h3 className="font-heading font-bold text-forest-900">التصنيف</h3>

            <Field label="التصنيف الرئيسي" htmlFor="category" className="mt-4">
              <select
                id="category"
                required
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  setSubcategory("");
                }}
                className="field-input"
              >
                <option value="" disabled>
                  اختر تصنيفًا
                </option>
                {categoryGroups.map((group) => (
                  <optgroup key={group.slug} label={group.title}>
                    {group.categories.map((cat) => (
                      <option key={cat.slug} value={cat.slug}>
                        {cat.title}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </Field>

            {subcategories.length > 0 && (
              <Field
                label="التصنيف الفرعي (اختياري)"
                htmlFor="subcategory"
                className="mt-4"
              >
                <select
                  id="subcategory"
                  value={subcategory}
                  onChange={(e) => setSubcategory(e.target.value)}
                  className="field-input"
                >
                  <option value="">بدون</option>
                  {subcategories.map((sub) => (
                    <option key={sub.slug} value={sub.slug}>
                      {sub.title}
                    </option>
                  ))}
                </select>
              </Field>
            )}

            <Field label="التاريخ" htmlFor="date" className="mt-4">
              <input
                id="date"
                type="date"
                dir="ltr"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="field-input"
              />
            </Field>

            <Field
              label="رابط المقال (اختياري)"
              htmlFor="slug"
              className="mt-4"
            >
              <input
                id="slug"
                dir="ltr"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="grape-pruning-winter"
                className="field-input text-xs"
              />
              <p className="mt-2 text-xs text-ink-muted">
                يُولّد من العنوان إن تُرك فارغًا.
              </p>
            </Field>
          </div>

          <div className="flex flex-col gap-3">
            <button
              type="submit"
              disabled={saving || !storageReady}
              className="btn btn-primary btn-sheen w-full px-6 py-3.5 disabled:cursor-wait disabled:opacity-60"
            >
              {saving ? "جارٍ الحفظ…" : article ? "حفظ التعديلات" : "نشر المقال"}
            </button>
            <Link href="/admin" className="btn btn-outline w-full px-6 py-3">
              <ArrowLeftIcon width={17} height={17} className="rotate-180" />
              رجوع للوحة
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
}

function ShareLinkButton({ path, title }: { path: string; title: string }) {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    const url = `${window.location.origin}${path}`;
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch {
        /* share dismissed - fall through to copying */
      }
    }
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      className="btn btn-primary btn-sheen px-4 py-2 text-sm"
    >
      {copied ? <CheckIcon width={16} height={16} /> : <ShareIcon width={16} height={16} />}
      {copied ? "تم نسخ الرابط" : "مشاركة الرابط"}
    </button>
  );
}

function Field({
  label,
  htmlFor,
  className = "",
  children,
}: {
  label: string;
  htmlFor: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label
        htmlFor={htmlFor}
        className="mb-1.5 block font-heading text-sm font-semibold text-forest-900"
      >
        {label}
      </label>
      {children}
    </div>
  );
}
