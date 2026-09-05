import type { Metadata } from "next";
import { isR2Configured } from "@/lib/r2";
import { currentAdminEmail } from "@/lib/session";
import AdminHeader from "@/components/admin/AdminHeader";
import ArticleEditor from "@/components/admin/ArticleEditor";

export const metadata: Metadata = {
  title: "مقال جديد",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function NewArticlePage() {
  const email = await currentAdminEmail();
  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <AdminHeader email={email} />
      <h1 className="mt-8 font-heading text-2xl font-extrabold text-forest-900">
        مقال جديد
      </h1>
      <ArticleEditor storageReady={isR2Configured()} />
    </section>
  );
}
