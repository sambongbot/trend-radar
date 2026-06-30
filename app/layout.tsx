import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "트렌드레이더 — AI·SaaS·커머스 트렌드 큐레이션",
  description:
    "AI SaaS, LLM·모델, 이커머스 분야의 주요 뉴스를 매일 선별해 제공합니다. 트렌드레이더(TrendRadar)는 링크디가 운영하는 큐레이션 서비스입니다.",
  openGraph: {
    title: "트렌드레이더 — AI·SaaS·커머스 트렌드 큐레이션",
    description:
      "AI SaaS, LLM·모델, 이커머스 분야의 주요 뉴스를 매일 선별해 제공합니다.",
    locale: "ko_KR",
    type: "website",
    url: "https://trendradar.kr",
  },
};

const CATEGORIES = [
  { slug: "ai-saas", name: "AI SaaS" },
  { slug: "llm", name: "LLM·모델" },
  { slug: "ecommerce", name: "이커머스" },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="min-h-screen flex flex-col">
        {/* 헤더 */}
        <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <div className="flex h-14 items-center gap-6">
              {/* 로고 */}
              <Link
                href="/"
                className="flex items-baseline gap-2 font-semibold shrink-0"
              >
                <span className="text-base text-foreground tracking-tight">TrendRadar</span>
                <span className="text-xs text-muted-foreground font-normal hidden sm:inline">
                  트렌드레이더
                </span>
              </Link>

              {/* 네비 */}
              <nav className="flex items-center gap-1 text-sm">
                {CATEGORIES.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/${cat.slug}`}
                    className="px-3 py-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  >
                    {cat.name}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </header>

        {/* 메인 콘텐츠 */}
        <main className="flex-1 mx-auto w-full max-w-4xl px-4 sm:px-6 py-8">
          {children}
        </main>

        {/* 푸터 */}
        <footer className="border-t py-6 text-center text-xs text-muted-foreground">
          <p>
            © TrendRadar &nbsp;·&nbsp; powered by{" "}
            <a
              href="https://linkdi.kr"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-foreground transition-colors"
            >
              링크디(linkdi.kr)
            </a>
          </p>
        </footer>
      </body>
    </html>
  );
}
