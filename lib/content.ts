import fs from "fs";
import path from "path";
import type { Manifest, LatestData, NewsItem } from "./types";

const CONTENT_DIR = path.join(process.cwd(), "content");

export function getManifest(): Manifest {
  const raw = fs.readFileSync(path.join(CONTENT_DIR, "manifest.json"), "utf-8");
  return JSON.parse(raw) as Manifest;
}

export function getLatest(slug: string): LatestData {
  const raw = fs.readFileSync(
    path.join(CONTENT_DIR, slug, "latest.json"),
    "utf-8"
  );
  return JSON.parse(raw) as LatestData;
}

export function getCategoryDate(slug: string, date: string): NewsItem[] {
  const raw = fs.readFileSync(
    path.join(CONTENT_DIR, slug, `${date}.json`),
    "utf-8"
  );
  return JSON.parse(raw) as NewsItem[];
}

export function getCategory(slug: string): { dates: string[] } {
  const manifest = getManifest();
  const cat = manifest.categories.find((c) => c.slug === slug);
  return { dates: cat?.dates ?? [] };
}

/** headline이 템플릿 문구거나 비어 있으면 null 반환 */
export function parseHeadline(raw: string | undefined | null): string | null {
  if (!raw) return null;
  const cleaned = raw.replace(/^>\s*/, "").trim();
  const templatePatterns = [
    /^오늘의 주요 뉴스 \d+건을 선별했습니다/,
    /^주요 뉴스 \d+건/,
    /^뉴스를 선별했습니다/,
  ];
  for (const pat of templatePatterns) {
    if (pat.test(cleaned)) return null;
  }
  return cleaned.length > 0 ? cleaned : null;
}
