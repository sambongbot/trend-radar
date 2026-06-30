import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getManifest, getCategoryDate } from "@/lib/content";
import { NewsCard } from "@/components/news-card";
import { formatDate } from "@/lib/utils";

const CATEGORY_DISPLAY: Record<string, string> = {
  "ai-saas": "AI SaaS",
  "llm": "LLM·모델",
  "ecommerce": "이커머스",
};

export async function generateStaticParams() {
  const manifest = getManifest();
  const params: { category: string; date: string }[] = [];
  for (const cat of manifest.categories) {
    for (const date of cat.dates) {
      params.push({ category: cat.slug, date });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; date: string }>;
}): Promise<Metadata> {
  const { category, date } = await params;
  const name = CATEGORY_DISPLAY[category] ?? category;
  return {
    title: `${name} ${date} — 트렌드레이더`,
    description: `${date} ${name} 분야 주요 뉴스 큐레이션.`,
  };
}

export default async function CategoryDatePage({
  params,
}: {
  params: Promise<{ category: string; date: string }>;
}) {
  const { category, date } = await params;

  if (!CATEGORY_DISPLAY[category]) notFound();

  const manifest = getManifest();
  const catMeta = manifest.categories.find((c) => c.slug === category);
  if (!catMeta) notFound();

  const dates = catMeta.dates;
  const idx = dates.indexOf(date);
  if (idx === -1) notFound();

  let items;
  try {
    items = getCategoryDate(category, date);
  } catch {
    notFound();
  }

  const name = CATEGORY_DISPLAY[category];
  const prevDate = idx + 1 < dates.length ? dates[idx + 1] : null;
  const nextDate = idx - 1 >= 0 ? dates[idx - 1] : null;

  return (
    <div className="space-y-8">
      {/* 브레드크럼 */}
      <div className="space-y-1">
        <nav className="text-xs text-muted-foreground mb-2">
          <Link href="/" className="hover:text-foreground transition-colors">홈</Link>
          <span className="mx-1">/</span>
          <Link href={`/${category}`} className="hover:text-foreground transition-colors">{name}</Link>
          <span className="mx-1">/</span>
          <span>{date}</span>
        </nav>
        <h1 className="text-2xl font-bold tracking-tight">
          {name} <span className="font-normal text-muted-foreground text-lg">— {formatDate(date)}</span>
        </h1>
        <p className="text-sm text-muted-foreground">{items.length}건 선별</p>
      </div>

      {/* 뉴스 목록 전체 */}
      <div className="space-y-3">
        {items.map((item) => (
          <NewsCard key={item.rank} item={item} />
        ))}
      </div>

      {/* 이전/다음 날짜 네비 */}
      <div className="flex items-center justify-between border-t pt-4 text-sm">
        <div>
          {prevDate ? (
            <Link
              href={`/${category}/${prevDate}`}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              ← {prevDate}
            </Link>
          ) : (
            <span className="text-muted-foreground/40">← 이전 날짜 없음</span>
          )}
        </div>
        <Link
          href={`/${category}`}
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          {name} 목록
        </Link>
        <div>
          {nextDate ? (
            <Link
              href={`/${category}/${nextDate}`}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {nextDate} →
            </Link>
          ) : (
            <span className="text-muted-foreground/40">최신 날짜</span>
          )}
        </div>
      </div>
    </div>
  );
}
