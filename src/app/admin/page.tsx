import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getAllArticles } from "@/lib/articles-store";
import { isR2Configured } from "@/lib/r2";
import { currentAdminEmail } from "@/lib/session";
import { allCategories } from "@/data/categories";
import AdminHeader from "@/components/admin/AdminHeader";
import DeleteArticleButton from "@/components/admin/DeleteArticleButton";
import {
  ClockIcon,
  ExternalIcon,
  PencilIcon,
  PlusIcon,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "لوحة التحكم",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const email = await currentAdminEmail();
  const articles = await getAllArticles();
  const storageReady = isR2Configured();

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <AdminHeader email={email} />

      {!storageReady && (
        <div className="mt-6 rounded-2xl border border-gold-500/40 bg-gold-100/60 p-5">
          <h2 className="font-heading font-bold text-gold-600">
            التخزين غير مهيّأ بعد
          </h2>
          <p className="mt-2 text-sm leading-7 text-ink">
            المقالات المعروضة هي content المبدئي فقط. لتمكين النشر والتعديل ورفع
            الصور، اضبط متغيرات البيئة:{" "}
            <code dir="ltr" className="rounded bg-white px-1.5 py-0.5 text-xs">
              R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET,
              R2_PUBLIC_BASE_URL
            </code>
          </p>
        </div>
      )}

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-heading text-2xl font-extrabold text-forest-900">
            المقالات
          </h2>
          <p className="mt-1 text-sm text-ink-muted">
            {articles.length} مقال منشور
          </p>
        </div>
        <Link
          href="/admin/articles/new"
          className="btn btn-primary btn-sheen px-6 py-3"
        >
          <PlusIcon width={18} height={18} />
          مقال جديد
        </Link>
      </div>

      <div className="mt-6 space-y-3">
        {articles.map((article) => {
          const category = allCategories.find((c) => c.slug === article.category);
          return (
            <article
              key={article.slug}
              className="card-organic flex flex-col gap-4 p-4 sm:flex-row sm:items-center"
            >
              <div className="relative h-20 w-full shrink-0 overflow-hidden rounded-xl bg-leaf-100 sm:w-32">
                {article.thumbnail ? (
                  <Image
                    src={article.thumbnail}
                    alt=""
                    fill
                    sizes="128px"
                    className="object-cover"
                  />
                ) : null}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-leaf-100 px-2.5 py-0.5 text-xs font-bold text-forest-700">
                    {category?.title ?? article.category}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-ink-muted">
                    <ClockIcon width={13} height={13} />
                    {article.readMinutes} دقائق
                  </span>
                  <span className="text-xs text-ink-muted">{article.date}</span>
                </div>
                <h3 className="mt-1.5 truncate font-heading font-bold text-forest-900">
                  {article.title}
                </h3>
                <p className="mt-1 line-clamp-1 text-sm text-ink-muted">
                  {article.excerpt}
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-2">
                <Link
                  href={`/articles/${article.slug}`}
                  target="_blank"
                  aria-label="معاينة المقال"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-border-soft text-ink-muted transition-colors hover:border-forest-500 hover:text-forest-800"
                >
                  <ExternalIcon width={17} height={17} />
                </Link>
                <Link
                  href={`/admin/articles/${article.slug}`}
                  aria-label="تعديل المقال"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-border-soft text-forest-800 transition-colors hover:bg-leaf-50"
                >
                  <PencilIcon width={17} height={17} />
                </Link>
                <DeleteArticleButton slug={article.slug} title={article.title} />
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
