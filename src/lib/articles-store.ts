/**
 * مخزن المقالات: يقرأ ويكتب المقالات في Cloudflare R2،
 * ويعود للمحتوى المبدئي (seed) إن لم تكن إعدادات R2 مضبوطة.
 */
import "server-only";
import type { Article } from "@/data/content";
import { articles as seedArticles } from "@/data/content";
import { getText, isR2Configured, putText } from "@/lib/r2";

const ARTICLES_KEY = "content/articles.json";

/** ترتيب من الأحدث إلى الأقدم */
function sortByDateDesc(list: Article[]): Article[] {
  return [...list].sort((a, b) => (a.date < b.date ? 1 : -1));
}

/** كل المقالات — من R2 إن توفّرت، وإلا المحتوى المبدئي */
export async function getAllArticles(): Promise<Article[]> {
  if (!isR2Configured()) return sortByDateDesc(seedArticles);
  try {
    const raw = await getText(ARTICLES_KEY);
    if (!raw) return sortByDateDesc(seedArticles);
    const parsed = JSON.parse(raw) as Article[];
    if (!Array.isArray(parsed) || parsed.length === 0) {
      return sortByDateDesc(seedArticles);
    }
    return sortByDateDesc(parsed);
  } catch (error) {
    console.error("تعذّر قراءة المقالات من R2، سيتم استخدام المحتوى المبدئي", error);
    return sortByDateDesc(seedArticles);
  }
}

/**
 * البحث بالمعرّف مع مراعاة ترميز الروابط: تمرّر Next.js مقاطع المسار
 * مُرمّزة (percent-encoded)، والمعرّفات العربية تُخزَّن غير مُرمّزة.
 */
export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const all = await getAllArticles();
  const candidates = new Set<string>([slug]);
  try {
    candidates.add(decodeURIComponent(slug));
  } catch {
    /* مقطع غير صالح للفك — نتجاهله */
  }
  try {
    candidates.add(encodeURIComponent(slug));
  } catch {
    /* تجاهل */
  }
  return all.find((a) => candidates.has(a.slug)) ?? null;
}

export async function getArticlesByCategory(
  categorySlug: string
): Promise<Article[]> {
  const all = await getAllArticles();
  return all.filter((a) => a.category === categorySlug);
}

/** المقالات المخزّنة فعليًا في R2 (بدون العودة للمحتوى المبدئي) */
async function readStored(): Promise<Article[]> {
  const raw = await getText(ARTICLES_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as Article[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeStored(list: Article[]): Promise<void> {
  await putText(ARTICLES_KEY, JSON.stringify(list, null, 2));
}

/**
 * أول كتابة: ننسخ المحتوى المبدئي إلى R2 حتى لا تختفي المقالات
 * التجريبية عند إضافة أول مقال حقيقي.
 */
async function readStoredOrSeed(): Promise<Article[]> {
  const stored = await readStored();
  if (stored.length > 0) return stored;
  return [...seedArticles];
}

export async function saveArticle(article: Article): Promise<void> {
  const list = await readStoredOrSeed();
  const index = list.findIndex((a) => a.slug === article.slug);
  if (index >= 0) list[index] = article;
  else list.push(article);
  await writeStored(list);
}

export async function deleteArticle(slug: string): Promise<void> {
  const list = await readStoredOrSeed();
  await writeStored(list.filter((a) => a.slug !== slug));
}

/** تحويل عنوان عربي أو إنجليزي إلى معرّف صالح للرابط */
export function slugify(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/[\s_]+/g, "-")
    .replace(/[^\p{L}\p{N}-]/gu, "")
    .replace(/-{2,}/g, "-")
    .replace(/^-|-$/g, "");
}

/** تقدير زمن القراءة بالدقائق (≈ 200 كلمة/دقيقة) */
export function estimateReadMinutes(body: string[]): number {
  const words = body.join(" ").trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}
