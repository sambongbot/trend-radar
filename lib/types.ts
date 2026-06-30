export interface NewsItem {
  rank: number;
  title: string;
  url: string;
  source: string;
  publishedDate: string;
  summary: string;
  scorePct: number;
}

export interface LatestData {
  date: string;
  headline: string;
  items: NewsItem[];
}

export interface CategoryMeta {
  slug: string;
  name: string;
  dates: string[];
}

export interface Manifest {
  generatedAt: string;
  categories: CategoryMeta[];
}

export const CATEGORY_DISPLAY: Record<string, string> = {
  "ai-saas": "AI SaaS",
  "llm": "LLM·모델",
  "ecommerce": "이커머스",
};

export const CATEGORY_SLUGS = ["ai-saas", "llm", "ecommerce"] as const;
export type CategorySlug = (typeof CATEGORY_SLUGS)[number];
