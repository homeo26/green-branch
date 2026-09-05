/**
 * Article store: reads and writes articles in Cloudflare R2,
 * falling back to the seed content when R2 is not configured.
 */
import "server-only";
import type { Article } from "@/data/content";
import { articles as seedArticles } from "@/data/content";
import { getText, isR2Configured, putText } from "@/lib/r2";

const ARTICLES_KEY = "content/articles.json";

/** Sort newest first */
function sortByDateDesc(list: Article[]): Article[] {
  return [...list].sort((a, b) => (a.date < b.date ? 1 : -1));
}

/** All articles - from R2 when available, otherwise the seed content */
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
    console.error("تعذّر قراءة المقالات من R2، سيتم استخدام content المبدئي", error);
    return sortByDateDesc(seedArticles);
  }
}

/**
 * Look up by slug in an encoding-safe way: Next.js passes route segments
 * percent-encoded, while Arabic slugs are stored decoded.
 */
export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const all = await getAllArticles();
  const candidates = new Set<string>([slug]);
  try {
    candidates.add(decodeURIComponent(slug));
  } catch {
    /* not decodable - ignore */
  }
  try {
    candidates.add(encodeURIComponent(slug));
  } catch {
    /* ignore */
  }
  return all.find((a) => candidates.has(a.slug)) ?? null;
}

export async function getArticlesByCategory(
  categorySlug: string
): Promise<Article[]> {
  const all = await getAllArticles();
  return all.filter((a) => a.category === categorySlug);
}

/** Articles actually stored in R2 (no seed fallback) */
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
 * First write: copy the seed content into R2 so the sample articles
 * do not vanish when the first real article is published.
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

/** Turn an Arabic or English title into a URL-safe slug */
export function slugify(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/[\s_]+/g, "-")
    .replace(/[^\p{L}\p{N}-]/gu, "")
    .replace(/-{2,}/g, "-")
    .replace(/^-|-$/g, "");
}

/** Estimate reading time in minutes (~200 words per minute) */
export function estimateReadMinutes(body: string[]): number {
  const words = body.join(" ").trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}
