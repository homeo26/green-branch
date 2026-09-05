import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { deleteArticle, getArticleBySlug } from "@/lib/articles-store";
import { isR2Configured } from "@/lib/r2";
import { currentAdminEmail } from "@/lib/session";

interface Params {
  params: Promise<{ slug: string }>;
}

export async function DELETE(_request: Request, { params }: Params) {
  if (!(await currentAdminEmail())) {
    return NextResponse.json({ error: "غير مصرّح" }, { status: 401 });
  }
  if (!isR2Configured()) {
    return NextResponse.json(
      { error: "تخزين R2 غير مهيّأ على الخادم" },
      { status: 503 }
    );
  }

  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) {
    return NextResponse.json({ error: "المقال غير موجود" }, { status: 404 });
  }

  await deleteArticle(slug);

  revalidatePath("/");
  revalidatePath("/articles");
  revalidatePath(`/articles/${slug}`);
  revalidatePath(`/category/${article.category}`);

  return NextResponse.json({ ok: true });
}
