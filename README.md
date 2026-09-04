# الغصن الأخضر — Green Branch

منصة المحتوى الزراعي الشامل: مقالات إرشادية، فيديوهات تعليمية، ونصائح عملية
في كل ما يخص الزراعة.

A comprehensive Arabic (RTL) agriculture content platform: articles, video
library, and direct consultations.

## Sections | الأقسام

- **مركز المقالات والدلائل** — detailed guides organized by category
- **مكتبة المرئيات والفيديو** — YouTube/TikTok videos in one place
- **الاستشارات والتواصل المباشر** — consultation requests & contact

## Tech Stack

- [Next.js 15](https://nextjs.org) (App Router) + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion/) — page transitions & micro-interactions
- Arabic fonts: Alexandria (headings) + Tajawal (body) via `next/font`

## Development

```bash
npm install
npm run dev        # http://localhost:3000
npm run typecheck  # tsc --noEmit
npm run build      # production build
```

## Structure

```
src/
├── app/            # App Router pages (RTL, Arabic)
│   ├── page.tsx            # الرئيسية — animated wave hero
│   ├── articles/           # مركز المقالات
│   ├── videos/             # مكتبة الفيديو
│   ├── category/[slug]/    # صفحات التصنيفات + التصنيفات الفرعية
│   └── contact/            # الاستشارات والتواصل
├── components/     # Navbar (dropdowns + mobile drawer), Footer, Waves…
└── data/           # categories.ts — single source of truth for taxonomy
```

Content in `src/data/` is seed data; an admin dashboard for content
management is planned next.

## Social

- YouTube: [@greenbranchs](https://youtube.com/@greenbranchs)
- Instagram: [@green_branchs](https://www.instagram.com/green_branchs)
