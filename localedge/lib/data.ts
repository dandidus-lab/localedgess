import articlesData from "@/data/articles.json";
import companiesData from "@/data/companies.json";
import countriesData from "@/data/countries.json";
import alertsData from "@/data/alerts.json";
import type { Article, Company, Country, Alert, Category } from "./types";

export const articles = articlesData as Article[];
export const companies = companiesData as Company[];
export const countries = countriesData as Country[];
export const alerts = alertsData as Alert[];

export function getArticle(id: string): Article | undefined {
  return articles.find((a) => a.id === id);
}

export function getCompany(id: string): Company | undefined {
  return companies.find((c) => c.id === id);
}

export function getCountry(slug: string): Country | undefined {
  return countries.find((c) => c.slug === slug || c.id === slug);
}

export function countryById(id: string): Country | undefined {
  return countries.find((c) => c.id === id);
}

export function articlesByCategory(cat: Category): Article[] {
  return articles
    .filter((a) => a.category === cat)
    .sort((a, b) => b.impactScore - a.impactScore);
}

export function articlesForCompany(companyId: string): Article[] {
  return articles
    .filter((a) => a.companies.includes(companyId))
    .sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt));
}

export function articlesForCountry(countryId: string): Article[] {
  return articles
    .filter((a) => a.country === countryId)
    .sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt));
}

export function companiesForCountry(countryId: string): Company[] {
  return companies.filter(
    (c) => c.country === countryId || c.exposures.some((e) => e.country === countryId)
  );
}

export function alertById(id: string): Alert | undefined {
  return alerts.find((a) => a.id === id);
}

/* ---- Derived: trending ---- */

export function trendingCountries() {
  return [...countries]
    .map((c) => ({
      ...c,
      signalCount: articles.filter((a) => a.country === c.id).length,
    }))
    .sort((a, b) => b.trendingScore - a.trendingScore);
}

export function trendingIndustries() {
  const counts = new Map<string, { count: number; avgImpact: number; total: number }>();
  for (const a of articles) {
    for (const ind of a.industries) {
      const prev = counts.get(ind) ?? { count: 0, avgImpact: 0, total: 0 };
      prev.count += 1;
      prev.total += a.impactScore;
      prev.avgImpact = Math.round(prev.total / prev.count);
      counts.set(ind, prev);
    }
  }
  return [...counts.entries()]
    .map(([name, v]) => ({ name, count: v.count, avgImpact: v.avgImpact }))
    .sort((a, b) => b.count - a.count || b.avgImpact - a.avgImpact)
    .slice(0, 7);
}

export function mostMentionedCompanies() {
  return [...companies]
    .sort((a, b) => b.mentions.count - a.mentions.count)
    .slice(0, 6);
}

/* ---- Formatting ---- */

export function relativeTime(iso: string): string {
  const now = new Date("2026-06-02T08:00:00Z").getTime();
  const then = new Date(iso).getTime();
  const diff = Math.max(0, now - then);
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

export function absoluteTime(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "UTC",
    hour12: true,
  }) + " UTC";
}

export const categoryMeta: Record<Category, { label: string; tone: string }> = {
  signal: { label: "Conviction Signal", tone: "edge" },
  uncovered: { label: "Not Yet Covered", tone: "novel" },
  emerging: { label: "Emerging", tone: "info" },
  global: { label: "Global", tone: "muted" },
};
