import type { Metadata } from "next";
import { Reveal } from "@/components/Waves";
import { ArticleCard, PageHero } from "@/components/cards";
import { articles } from "@/data/content";

export const metadata: Metadata = {
  title: "مركز المقالات والدلائل",
  description:
    "مقالات إرشادية مفصّلة وشاملة تغطي كل الموضوعات الزراعية بأسلوب سهل وسلس.",
};

export default function ArticlesPage() {
  return (
    <>
      <PageHero
        title="مركز المقالات والدلائل"
        subtitle="مقالات مفصّلة وشاملة تغطي الموضوعات الزراعية كافة، منظمة بأسلوب سهل وسلس — من الزراعة والتقليم إلى التسميد والوقاية."
      />
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article, i) => (
            <Reveal key={article.slug} delay={(i % 3) * 0.1}>
              <ArticleCard
                slug={article.slug}
                title={article.title}
                excerpt={article.excerpt}
                category={article.category}
                readMinutes={article.readMinutes}
                thumbnail={article.thumbnail}
              />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
