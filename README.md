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

## لوحة التحكم | Admin portal

The admin portal lives at **`/admin`** and is protected by a password-based
session. It lets you write articles, upload images to Cloudflare R2, and copy
or share the article link.

### 1. Create the admin credentials

```bash
npm run hash-password "your-strong-password"
```

This prints `ADMIN_PASSWORD_HASH` (scrypt) and a random `AUTH_SECRET`.

### 2. Create a Cloudflare R2 bucket

1. Cloudflare dashboard → **R2** → *Create bucket* (e.g. `green-branch`)
2. **Manage R2 API Tokens** → create a token with *Object Read & Write*
3. Enable public access for the bucket (r2.dev subdomain or a custom domain) —
   this URL becomes `R2_PUBLIC_BASE_URL`

### 3. Set the environment variables

Copy `.env.example` to `.env.local` for local development, and set the same
variables on Netlify:

```bash
netlify env:set ADMIN_EMAIL "you@example.com"
netlify env:set ADMIN_PASSWORD_HASH "scrypt:..."
netlify env:set AUTH_SECRET "..."
netlify env:set R2_ACCOUNT_ID "..."
netlify env:set R2_ACCESS_KEY_ID "..."
netlify env:set R2_SECRET_ACCESS_KEY "..."
netlify env:set R2_BUCKET "green-branch"
netlify env:set R2_PUBLIC_BASE_URL "https://pub-xxxxxxxx.r2.dev"
```

### How content is stored

| What | Where |
|------|-------|
| Articles | `content/articles.json` in R2 |
| Uploaded images | `media/YYYY-MM/<uuid>.<ext>` in R2 |

Public pages read from R2 with **ISR (60s)** and fall back to the seed content
in `src/data/content.ts` when R2 isn't configured — so the site never breaks if
credentials are missing. The seed articles are copied into R2 on the first save,
so nothing disappears when you publish your first real article.

### Notes

- Article slugs are generated from the Arabic title by default, which produces
  percent-encoded URLs when shared. Type a custom English slug in the editor's
  **رابط المقال** field for cleaner links.
- Sessions last 12 hours and use an HttpOnly, SameSite=Lax cookie.
- `/admin` is excluded from search engines via `robots: noindex`.

## Social

- YouTube: [@greenbranchs](https://youtube.com/@greenbranchs)
- Instagram: [@green_branchs](https://www.instagram.com/green_branchs)
