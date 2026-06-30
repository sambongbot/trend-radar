import Link from "next/link";
import { getManifest, getLatest, parseHeadline } from "@/lib/content";
import { NewsCard } from "@/components/news-card";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-static";

const CATEGORY_DISPLAY: Record<string, string> = {
  "ai-saas": "AI SaaS",
  "llm": "LLM·모델",
  "ecommerce": "이커머스",
};

export default function HomePage() {
  const manifest = getManifest();

  const sections = manifest.categories.map((cat) => {
    const latest = getLatest(cat.slug);
    const headline = parseHeadline(latest.headline);
    const topItems = latest.items.slice(0, 5);
    return { cat, latest, headline, topItems };
  });

  return (
    <div className="space-y-12">
      {/* 페이지 타이틀 */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight">오늘의 트렌드</h1>
        <p className="text-sm text-muted-foreground">
          {formatDate(sections[0]?.latest.date ?? "")} 기준 — AI SaaS, LLM·모델, 이커머스 분야 주요 뉴스
        </p>
      </div>

      {/* 분야별 섹션 */}
      {sections.map(({ cat, latest, headline, topItems }) => (
        <section key={cat.slug} className="space-y-4">
          {/* 섹션 헤더 */}
          <div className="flex items-center justify-between border-b pb-2">
            <h2 className="text-lg font-semibold">
              {CATEGORY_DISPLAY[cat.slug] ?? cat.name}
            </h2>
            <Link
              href={`/${cat.slug}`}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              전체 보기 →
            </Link>
          </div>

          {/* 헤드라인 인용 */}
          {headline && (
            <blockquote className="border-l-2 border-primary/50 pl-4 py-1 text-sm text-muted-foreground italic">
              {headline}
            </blockquote>
          )}

          {/* 뉴스 카드 Top 5 */}
          <div className="space-y-3">
            {topItems.map((item) => (
              <NewsCard key={item.rank} item={item} />
            ))}
          </div>

          {/* 분야 전체 보기 링크 */}
          <div className="pt-1">
            <Link
              href={`/${cat.slug}`}
              className="text-sm font-medium text-primary hover:underline underline-offset-4 transition-colors"
            >
              {CATEGORY_DISPLAY[cat.slug] ?? cat.name} 전체 보기 →
            </Link>
          </div>
        </section>
      ))}
    </div>
  );
}
