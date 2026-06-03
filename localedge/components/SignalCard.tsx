import Link from "next/link";
import { countryById, getCompany, relativeTime } from "@/lib/data";
import type { Article } from "@/lib/types";
import { ScoreChip } from "./Scores";
import { CategoryTag, CoverageBadge, Tag } from "./Tags";
import { IconArrow, IconClock } from "./icons";

export function SignalCard({ article, rank }: { article: Article; rank?: number }) {
  const country = countryById(article.country);
  const cos = article.companies.map(getCompany).filter(Boolean);

  return (
    <Link
      href={`/article/${article.id}`}
      className="panel card-hover group relative block overflow-hidden p-5"
    >
      {typeof rank === "number" && (
        <span className="pointer-events-none absolute right-4 top-3 font-serif text-5xl font-medium leading-none text-white/[0.04]">
          {String(rank).padStart(2, "0")}
        </span>
      )}
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <CategoryTag category={article.category} />
        {country && (
          <span className="inline-flex items-center gap-1.5 text-xs text-content-muted">
            <span className="text-[13px]">{country.flag}</span>
            {country.name}
          </span>
        )}
        <span className="ml-auto inline-flex items-center gap-1 text-[11px] text-content-faint">
          <IconClock width={12} height={12} />
          {relativeTime(article.publishedAt)}
        </span>
      </div>

      <h3 className="mb-1.5 text-[15px] font-semibold leading-snug text-content transition-colors group-hover:text-edge">
        {article.translatedHeadline}
      </h3>
      <p className="mb-4 line-clamp-2 text-[13px] leading-relaxed text-content-muted">{article.aiSummary}</p>

      <div className="mb-4 flex flex-wrap items-center gap-1.5">
        <ScoreChip kind="impact" value={article.impactScore} />
        <ScoreChip kind="confidence" value={article.confidenceScore} />
        <ScoreChip kind="novelty" value={article.noveltyScore} />
      </div>

      <div className="flex items-end justify-between gap-3 border-t border-line pt-3">
        <div className="min-w-0">
          <div className="mb-1.5 flex flex-wrap gap-1">
            {cos.slice(0, 3).map((c) => (
              <Tag key={c!.id}>
                <span className="font-mono">{c!.ticker}</span>
              </Tag>
            ))}
          </div>
          <div className="flex flex-wrap gap-1">
            {article.industries.slice(0, 2).map((i) => (
              <span key={i} className="text-[11px] text-content-faint">
                {i}
              </span>
            ))}
          </div>
        </div>
        <IconArrow
          width={16}
          height={16}
          className="shrink-0 text-content-faint transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-edge"
        />
      </div>
    </Link>
  );
}
