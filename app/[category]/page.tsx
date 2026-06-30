import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getManifest, getLatest, parseHeadline } from "@/lib/content";
import { NewsCard } from "@/components/news-card";
import { formatDate } from "@/lib/utils";

const CATEGORY_DISPLAY: Record<string, string> = {
  "ai-saas": "AI SaaS",
  "llm": "LLM·모델",
  "ecommerce": "이커머스",
};

export async function generateStaticParams() {
  return ["ai-saas", "llm", "ecommerce"].map((category) => ({ category }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const name = CATEGORY_DISPLAY[category] ?? category;
  return {
    title: `${name} 트렌드 — 트렌드레이더`,
    description: `${name} 분야 최신 뉴스 큐레이션. 매일 선별된 주요 소식을 확인하세요.`,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  if (!CATEGORY_DISPLAY[category]) notFound();

  const manifest = getManifest();
  const catMeta = manifest.categories.find((c) => c.slug === category);
  if (!catMeta) notFound();

  const latest = getLatest(category);
  const headline = parseHeadline(latest.headline);
  const topItems = latest.items.slice(0, 5);
  const name = CATEGORY_DISPLAY[category];

  return (
    <div className="space-y-8">
      {/* 페이지 헤더 */}
      <div className="space-y-1">
        <nav className="text-xs text-muted-foreground mb-2">
          <Link href="/" className="hover:text-foreground transition-colors">홈</Link>
          <span className="mx-1">/</span>
          <span>{name}</span>
        </nav>
        <h1 className="text-2xl font-bold tracking-tight">{name}</h1>
        <p className="text-sm text-muted-foreground">
          최신: {formatDate(latest.date)}
        </p>
      </div>

      {/* 헤드라인 인용 */}
      {headline && (
        <blockquote className="border-l-2 border-primary/50 pl-4 py-1 text-sm text-muted-foreground italic">
          {headline}
        </blockquote>
      )}

      {/* 최신 뉴스 */}
      <section className="space-y-3">
        <div className="flex items-center justify-between border-b pb-2">
          <h2 className="text-base font-semibold">오늘의 주요 뉴스</h2>
          <span className="text-xs text-muted-foreground">{formatDate(latest.date)}</span>
        </div>
        {topItems.map((item) => (
          <NewsCard key={item.rank} item={item} />
        ))}
      </section>

      {/* 날짜 아카이브 네비 */}
      <section className="space-y-3">
        <div className="border-b pb-2">
          <h2 className="text-base font-semibold">날짜별 아카이브</h2>
        </div>
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {catMeta.dates.map((date) => (
            <li key={date}>
              <Link
                href={`/${category}/${date}`}
                className={
                  date === latest.date
                    ? "block rounded-md border border-primary/40 bg-primary/5 px-3 py-2 text-sm font-medium text-primary text-center"
                    : "block rounded-md border border-border px-3 py-2 text-sm text-muted-foreground hover:border-foreground/30 hover:text-foreground transition-colors text-center"
                }
              >
                {date}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
