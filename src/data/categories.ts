/**
 * التصنيفات — مصدر البيانات الموحّد للموقع.
 * يغذّي: القائمة العلوية (قوائم منسدلة)، القائمة الجانبية للجوال،
 * صفحات التصنيفات، ومركز المقالات.
 * لاحقًا ستُدار هذه البيانات من لوحة التحكم (Admin).
 */

export interface SubCategory {
  slug: string;
  title: string;
}

export interface Category {
  slug: string;
  title: string;
  description: string;
  /** اسم أيقونة SVG معرّفة في components/icons.tsx */
  icon: string;
  subcategories: SubCategory[];
}

export interface CategoryGroup {
  slug: string;
  title: string;
  categories: Category[];
}

/** مجموعات التصنيفات — كل مجموعة تظهر كقائمة منسدلة في الشريط العلوي */
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

/** كل التصنيفات مسطّحة — للوصول السريع حسب الـ slug */
export const allCategories: Category[] = categoryGroups.flatMap((g) => g.categories);

export function getCategory(slug: string): Category | undefined {
  return allCategories.find((c) => c.slug === slug);
}

/** روابط ثابتة في القائمة العلوية */
export const staticLinks = [
  { href: "/articles", title: "المقالات" },
  { href: "/videos", title: "مكتبة الفيديو" },
  { href: "/contact", title: "تواصل معنا" },
] as const;

/** روابط المنصات الاجتماعية */
export const socialLinks = {
  youtube: "https://youtube.com/@greenbranchs",
  instagram: "https://www.instagram.com/green_branchs",
  facebook:
    "https://www.facebook.com/p/الغصن-الاخضر-Green-branch-100063670356591",
} as const;
