import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import type { Article } from "@/data/content";
import {
  deleteArticle,
  estimateReadMinutes,
  getAllArticles,
  saveArticle,
  slugify,
} from "@/lib/articles-store";
import { isR2Configured } from "@/lib/r2";
import { currentAdminEmail } from "@/lib/session";
import { allCategories } from "@/data/categories";

interface ArticlePayload {
  slug?: string;
  originalSlug?: string;
  title?: string;
  excerpt?: string;
  category?: string;
  subcategory?: string;
  thumbnail?: string;
  date?: string;
  body?: string[] | string;
}

function unauthorized() {
  return NextResponse.json({ error: "غير مصرّح" }, { status: 401 });
}

function storageUnavailable() {
  return NextResponse.json(
    {
      error:
        "تخزين R2 غير مهيّأ على الخادم. اضبط متغيرات R2_* لتمكين النشر والتعديل.",
    },
    { status: 503 }
  );
}

/** Validate an incoming payload into an article */
function buildArticle(payload: ArticlePayload): Article | { error: string } {
  const title = (payload.title ?? "").trim();
  if (!title) return { error: "العنوان مطلوب" };

  const bodyParagraphs = Array.isArray(payload.body)
    ? payload.body
    : String(payload.body ?? "")
        .split(/\n{2,}/)
        .map((p) => p.trim())
        .filter(Boolean);
  if (bodyParagraphs.length === 0) return { error: "نص المقال مطلوب" };

  const category = (payload.category ?? "").trim();
  if (!allCategories.some((c) => c.slug === category)) {
    return { error: "التصنيف غير صالح" };
  }

  const slug = slugify(payload.slug?.trim() || title);
  if (!slug) return { error: "تعذّر توليد معرّف صالح للرابط" };

  const excerpt =
    (payload.excerpt ?? "").trim() ||
    bodyParagraphs[0].slice(0, 180) + (bodyParagraphs[0].length > 180 ? "…" : "");

  const date = (payload.date ?? "").trim() || new Date().toISOString().slice(0, 10);

  return {
    slug,
    title,
    excerpt,
    category,
    subcategory: payload.subcategory?.trim() || undefined,
    thumbnail: (payload.thumbnail ?? "").trim(),
    date,
    readMinutes: estimateReadMinutes(bodyParagraphs),
    body: bodyParagraphs,
  };
}

export async function GET() {
  if (!(await currentAdminEmail())) return unauthorized();
  const articles = await getAllArticles();
  return NextResponse.json({ articles, storageReady: isR2Configured() });
}

export async function POST(request: Request) {
  if (!(await currentAdminEmail())) return unauthorized();
  if (!isR2Configured()) return storageUnavailable();

  let payload: ArticlePayload;
  try {
    payload = (await request.json()) as ArticlePayload;
  } catch {
    return NextResponse.json({ error: "طلب غير صالح" }, { status: 400 });
  }

  const built = buildArticle(payload);
  if ("error" in built) {
    return NextResponse.json({ error: built.error }, { status: 400 });
  }

  // prevent overwriting a different article when creating a new one
  const existing = await getAllArticles();
  const isRename = payload.originalSlug && payload.originalSlug !== built.slug;
  const clash = existing.some((a) => a.slug === built.slug);
  if ((!payload.originalSlug || isRename) && clash) {
    return NextResponse.json(
      { error: "يوجد مقال بنفس الرابط، اختر عنوانًا أو رابطًا مختلفًا" },
      { status: 409 }
    );
  }

  await saveArticle(built);
  if (isRename) await deleteArticle(payload.originalSlug as string);

  // refresh the public pages immediately
  revalidatePath("/");
  revalidatePath("/articles");
  revalidatePath(`/articles/${built.slug}`);
  revalidatePath(`/category/${built.category}`);

  return NextResponse.json({ ok: true, article: built });
}
