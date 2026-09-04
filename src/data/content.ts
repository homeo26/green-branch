import type { Category } from "./categories";

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  category: string; // category slug
  subcategory?: string;
  readMinutes: number;
  date: string;
}

export interface Video {
  id: string;
  title: string;
  category: string;
  duration: string;
  date: string;
}

/** مقالات تجريبية — ستُستبدل بمحتوى لوحة التحكم لاحقًا */
export const articles: Article[] = [
  {
    slug: "grape-pruning-winter",
    title: "التقليم الشتوي للعنب: خطوة بخطوة نحو موسم مثمر",
    excerpt:
      "دليل عملي مفصّل لتقليم كرمة العنب في الشتاء، مع أهم القواعد التي تضمن نموًا متوازنًا وإنتاجًا وفيرًا.",
    category: "grapes",
    subcategory: "pruning",
    readMinutes: 7,
    date: "2026-08-20",
  },
  {
    slug: "fig-tree-care-summer",
    title: "العناية بأشجار التين في الصيف: الري والتسميد الصحيح",
    excerpt:
      "كيف تحافظ على أشجار التين خلال أشهر الحر؟ جدول الري الأمثل وأخطاء شائعة يجب تجنبها.",
    category: "figs",
    subcategory: "care",
    readMinutes: 5,
    date: "2026-07-15",
  },
  {
    slug: "citrus-leaf-yellowing",
    title: "اصفرار أوراق الحمضيات: الأسباب والعلاج الفعّال",
    excerpt:
      "تشخيص دقيق لأسباب اصفرار أوراق الليمون والبرتقال، من نقص العناصر إلى مشاكل الجذور.",
    category: "citrus",
    subcategory: "diseases",
    readMinutes: 6,
    date: "2026-08-02",
  },
  {
    slug: "npk-fertilization-guide",
    title: "دليل التسميد المتوازن: متى وكيف تستخدم NPK؟",
    excerpt:
      "فهم العناصر الكبرى الثلاثة ودورها في حياة النبات، مع برنامج تسميد موسمي جاهز للتطبيق.",
    category: "fertilization",
    subcategory: "programs",
    readMinutes: 8,
    date: "2026-06-28",
  },
  {
    slug: "fruit-set-techniques",
    title: "5 تقنيات مجرّبة لزيادة عقد الثمار وتحسين الجودة",
    excerpt:
      "من الخف اليدوي إلى التحليق: تقنيات عملية يستخدمها المزارعون المحترفون لرفع الإنتاجية.",
    category: "fruiting",
    subcategory: "thinning",
    readMinutes: 6,
    date: "2026-05-10",
  },
  {
    slug: "ipm-basics",
    title: "المكافحة المتكاملة للآفات: حماية محصولك بأقل المبيدات",
    excerpt:
      "استراتيجية شاملة تجمع بين الوقاية والمراقبة والتدخل الذكي لحماية مزرعتك وصحة أسرتك.",
    category: "protection",
    subcategory: "ipm",
    readMinutes: 9,
    date: "2026-04-22",
  },
];

/** فيديوهات تجريبية — تُجمع من يوتيوب وتيك توك */
export const videos: Video[] = [
  { id: "v1", title: "طريقة تقليم العنب للمبتدئين — شرح عملي في المزرعة", category: "grapes", duration: "12:45", date: "2026-08-25" },
  { id: "v2", title: "زراعة التين من العقلة حتى الإثمار", category: "figs", duration: "9:30", date: "2026-08-10" },
  { id: "v3", title: "علاج اصفرار أوراق الليمون بخطوات بسيطة", category: "citrus", duration: "7:15", date: "2026-07-30" },
  { id: "v4", title: "برنامج تسميد متكامل لأشجار الفاكهة", category: "fertilization", duration: "15:20", date: "2026-07-12" },
  { id: "v5", title: "سر زيادة الإثمار: تقنية التحليق بالصور", category: "fruiting", duration: "8:50", date: "2026-06-18" },
  { id: "v6", title: "أهم 5 آفات تهدد محصولك وكيف تكافحها", category: "protection", duration: "11:05", date: "2026-06-01" },
];

export function articlesByCategory(category: Category): Article[] {
  return articles.filter((a) => a.category === category.slug);
}
