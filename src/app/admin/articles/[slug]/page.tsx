import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/articles-store";
import { isR2Configured } from "@/lib/r2";
import { currentAdminEmail } from "@/lib/session";
import AdminHeader from "@/components/admin/AdminHeader";
import ArticleEditor from "@/components/admin/ArticleEditor";

export const metadata: Metadata = {
  title: "تعديل مقال",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [email, article] = await Promise.all([
    currentAdminEmail(),
    getArticleBySlug(slug),
  ]);
  if (!article) notFound();

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <AdminHeader email={email} />
      <h1 className="mt-8 font-heading text-2xl font-extrabold text-forest-900">
        تعديل: <span className="text-forest-600">{article.title}</span>
      </h1>
      <ArticleEditor article={article} storageReady={isR2Configured()} />
    </section>
  );
}
