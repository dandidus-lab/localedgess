import Link from "next/link";
import { clsx } from "@/lib/clsx";
import { categoryMeta } from "@/lib/data";
import type { Category, Country } from "@/lib/types";
import { IconDot } from "./icons";

const toneStyle: Record<string, { color: string; bg: string; border: string }> = {
  edge: { color: "var(--edge)", bg: "rgba(227,183,101,0.10)", border: "rgba(227,183,101,0.30)" },
  novel: { color: "var(--novel)", bg: "rgba(155,140,240,0.10)", border: "rgba(155,140,240,0.30)" },
  info: { color: "var(--info)", bg: "rgba(107,166,245,0.10)", border: "rgba(107,166,245,0.30)" },
  muted: { color: "var(--text-muted)", bg: "rgba(255,255,255,0.04)", border: "rgba(255,255,255,0.12)" },
};

export function CategoryTag({ category }: { category: Category }) {
  const meta = categoryMeta[category];
  const s = toneStyle[meta.tone] ?? toneStyle.muted;
  return (
    <span className="pill" style={{ color: s.color, background: s.bg, borderColor: s.border }}>
      <IconDot className="opacity-80" />
      {meta.label}
    </span>
  );
}

export function CoverageBadge({ covered }: { covered: boolean }) {
  if (covered) {
    return (
      <span className="pill" style={{ color: "var(--text-muted)", background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.12)" }}>
        Covered by major media
      </span>
    );
  }
  return (
    <span className="pill" style={{ color: "var(--edge)", background: "rgba(227,183,101,0.10)", borderColor: "rgba(227,183,101,0.30)" }}>
      <span className="h-1.5 w-1.5 rounded-full bg-edge animate-pulse-dot" />
      Not yet widely covered
    </span>
  );
}

export function CountryTag({ country, size = "sm" }: { country: Country; size?: "sm" | "md" }) {
  return (
    <Link
      href={`/country/${country.slug}`}
      className={clsx(
        "inline-flex items-center gap-1.5 rounded-full border border-line bg-white/[0.03] font-medium text-content-muted transition-colors hover:border-line-strong hover:text-content",
        size === "sm" ? "px-2 py-0.5 text-[11px]" : "px-2.5 py-1 text-xs"
      )}
    >
      <span className="text-[13px] leading-none">{country.flag}</span>
      {country.name}
    </Link>
  );
}

export function Tag({ children, href }: { children: React.ReactNode; href?: string }) {
  const cls =
    "inline-flex items-center rounded-md border border-line bg-white/[0.02] px-2 py-0.5 text-[11px] font-medium text-content-muted";
  if (href) {
    return (
      <Link href={href} className={clsx(cls, "transition-colors hover:border-line-strong hover:text-content")}>
        {children}
      </Link>
    );
  }
  return <span className={cls}>{children}</span>;
}

export function SentimentBar({ score, label }: { score: number; label: string }) {
  // score range -100..100 -> 0..100 position
  const pos = Math.round((score + 100) / 2);
  const color = score > 15 ? "var(--bull)" : score < -15 ? "var(--bear)" : "var(--text-muted)";
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <span className="kicker">News Sentiment</span>
        <span className="font-mono text-xs font-semibold" style={{ color }}>
          {score > 0 ? "+" : ""}
          {score} · {label}
        </span>
      </div>
      <div className="relative h-1.5 w-full rounded-full bg-gradient-to-r from-bear/40 via-white/10 to-bull/40">
        <div
          className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-ink"
          style={{ left: `${pos}%`, background: color, boxShadow: `0 0 8px ${color}` }}
        />
      </div>
      <div className="mt-1 flex justify-between text-[10px] font-mono uppercase tracking-wider text-content-faint">
        <span>Bearish</span>
        <span>Bullish</span>
      </div>
    </div>
  );
}
