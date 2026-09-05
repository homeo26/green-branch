/**
 * Categories - the single source of truth for the site.
 * Feeds: the top navigation dropdowns, the mobile drawer,
 * the category pages and the articles hub.
 * This will move into the admin portal later.
 */

export interface SubCategory {
  slug: string;
  title: string;
}

export interface Category {
  slug: string;
  title: string;
  description: string;
  /** name of an SVG icon defined in components/icons.tsx */
  icon: string;
  subcategories: SubCategory[];
}

export interface CategoryGroup {
  slug: string;
  title: string;
  categories: Category[];
}

/** Category groups - each renders as a dropdown in the top bar */
export const categoryGroups: CategoryGroup[] = [
  {
    slug: "crops",
    title: "المحاصيل والأشجار",
    categories: [
      {
        slug: "grapes",
        title: "العنب",
        description: "كل ما يخص زراعة العنب: الأصناف، التقليم، التربية، والعناية الموسمية.",
        icon: "grape",
        subcategories: [
          { slug: "planting", title: "زراعة العنب" },
          { slug: "pruning", title: "التقليم والتربية" },
          { slug: "varieties", title: "الأصناف" },
          { slug: "diseases", title: "أمراض العنب" },
        ],
      },
      {
        slug: "figs",
        title: "التين",
        description: "دليلك الشامل لأشجار التين: الزراعة، العناية، ومعالجة المشاكل الشائعة.",
        icon: "fig",
        subcategories: [
          { slug: "planting", title: "زراعة التين" },
          { slug: "care", title: "العناية والري" },
          { slug: "varieties", title: "الأصناف" },
          { slug: "diseases", title: "الآفات والأمراض" },
        ],
      },
      {
        slug: "citrus",
        title: "الليمون والحمضيات",
        description: "إرشادات متخصصة في الليمون والبرتقال وسائر الحمضيات من الغرس حتى القطاف.",
        icon: "citrus",
        subcategories: [
          { slug: "planting", title: "الزراعة والغرس" },
          { slug: "care", title: "العناية الموسمية" },
          { slug: "varieties", title: "الأصناف" },
          { slug: "diseases", title: "الأمراض والعلاج" },
        ],
      },
      {
        slug: "field-crops",
        title: "المحاصيل الزراعية",
        description: "الخضروات والمحاصيل الحقلية: مواعيد الزراعة، الخدمة، والحصاد.",
        icon: "wheat",
        subcategories: [
          { slug: "vegetables", title: "الخضروات" },
          { slug: "grains", title: "الحبوب" },
          { slug: "seasonal", title: "الزراعات الموسمية" },
        ],
      },
    ],
  },
  {
    slug: "guidance",
    title: "الإرشاد الزراعي",
    categories: [
      {
        slug: "fertilization",
        title: "التسميد وتغذية النبات",
        description: "برامج التسميد، العناصر الغذائية، وتشخيص أعراض النقص على النبات.",
        icon: "droplet",
        subcategories: [
          { slug: "programs", title: "برامج التسميد" },
          { slug: "organic", title: "التسميد العضوي" },
          { slug: "deficiency", title: "أعراض نقص العناصر" },
        ],
      },
      {
        slug: "fruiting",
        title: "تقنيات الإثمار",
        description: "تقنيات عملية لزيادة العقد والإثمار وتحسين جودة الثمار وحجمها.",
        icon: "sprout",
        subcategories: [
          { slug: "flowering", title: "الإزهار والعقد" },
          { slug: "thinning", title: "الخف وتحسين الجودة" },
          { slug: "girdling", title: "التحليق والتطويق" },
        ],
      },
      {
        slug: "protection",
        title: "الوقاية والمبيدات",
        description: "الوقاية المتكاملة، اختيار المبيدات المناسبة، وسلامة الاستخدام.",
        icon: "shield",
        subcategories: [
          { slug: "ipm", title: "المكافحة المتكاملة" },
          { slug: "pesticides", title: "دليل المبيدات" },
          { slug: "safety", title: "سلامة الاستخدام" },
        ],
      },
    ],
  },
];

/** All categories flattened - for quick lookup by slug */
export const allCategories: Category[] = categoryGroups.flatMap((g) => g.categories);

export function getCategory(slug: string): Category | undefined {
  return allCategories.find((c) => c.slug === slug);
}

/** Static links in the top navigation */
export const staticLinks = [
  { href: "/articles", title: "المقالات" },
  { href: "/videos", title: "مكتبة الفيديو" },
  { href: "/contact", title: "تواصل معنا" },
] as const;

/** Social platform links */
export const socialLinks = {
  youtube: "https://youtube.com/@greenbranchs",
  instagram: "https://www.instagram.com/green_branchs",
  facebook:
    "https://www.facebook.com/p/الغصن-الاخضر-Green-branch-100063670356591",
} as const;
