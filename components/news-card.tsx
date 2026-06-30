import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { NewsItem } from "@/lib/types";

interface NewsCardProps {
  item: NewsItem;
}

export function NewsCard({ item }: NewsCardProps) {
  const isTop = item.rank === 1;

  return (
    <article
      className={cn(
        "group relative flex flex-col gap-3 rounded-lg border bg-card p-5 transition-shadow hover:shadow-md",
        isTop && "border-primary/30 bg-primary/[0.02]"
      )}
    >
      {/* 상단: 순위 뱃지 + 제목 */}
      <div className="flex items-start gap-3">
        <span
          className={cn(
            "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold",
            isTop
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground"
          )}
        >
          {item.rank}
        </span>
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 text-sm font-semibold leading-snug text-foreground hover:text-primary hover:underline transition-colors"
        >
          {item.title}
        </a>
      </div>

      {/* 출처 + 발행일 */}
      <div className="flex items-center gap-2 pl-9">
        <Badge variant="secondary" className="text-xs">
          {item.source}
        </Badge>
        <span className="text-xs text-muted-foreground">{item.publishedDate}</span>
      </div>

      {/* 요약 */}
      {item.summary && (
        <p className="pl-9 text-sm text-muted-foreground leading-relaxed">
          {item.summary}
        </p>
      )}

      {/* 원문 보기 */}
      <div className="flex justify-end pl-9">
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
        >
          원문 보기
          <ExternalLink className="size-3" />
        </a>
      </div>
    </article>
  );
}
