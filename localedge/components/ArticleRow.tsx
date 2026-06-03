import Link from "next/link";
import { countryById, getCompany, relativeTime } from "@/lib/data";
import type { Article } from "@/lib/types";
import { ScoreChip } from "./Scores";
import { CoverageBadge, Tag } from "./Tags";
import { IconArrow } from "./icons";

export function ArticleRow({ article, showWhy = false }: { article: Article; showWhy?: boolean }) {
  const country = countryById(article.country);
  const cos = article.companies.map(getCompany).filter(Boolean);

  return (
    <Link
      href={`/article/${article.id}`}
      className="group flex gap-4 border-b border-line px-1 py-4 transition-colors last:border-0 hover:bg-white/[0.015]"
    >
      <div className="hidden w-14 shrink-0 flex-col items-center gap-1 pt-0.5 sm:flex">
        <span className="text-xl leading-none">{country?.flag}</span>
        <span className="font-mono text-[10px] uppercase tracking-wider text-content-faint">{country?.id}</span>
      </div>

      <div className="min-w-0 flex-1">
        <div className="mb-1 flex items-center gap-2 text-[11px] text-content-faint">
          <span className="font-medium text-content-muted">{article.source}</span>
          <span aria-hidden>·</span>
          <span className="font-mono">{article.originalLanguage}</span>
          <span aria-hidden>·</span>
          <span>{relativeTime(article.publishedAt)}</span>
        </div>

        <h3 className="text-sm font-semibold leading-snug text-content transition-colors group-hover:text-edge">
          {article.translatedHeadline}
        </h3>
        <p className="mt-0.5 truncate font-serif text-[13px] italic text-content-faint" lang={article.originalLanguage}>
          {article.originalHeadline}
        </p>

        {showWhy && (
          <p className="mt-2 line-clamp-2 text-[12.5px] leading-relaxed text-content-muted">
            <span className="font-medium text-content">Why it matters — </span>
            {article.whyCare}
          </p>
        )}

        <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
          <ScoreChip kind="impact" value={article.impactScore} />
          <ScoreChip kind="novelty" value={article.noveltyScore} />
          {cos.slice(0, 2).map((c) => (
            <Tag key={c!.id}>
              <span className="font-mono">{c!.ticker}</span>
            </Tag>
          ))}
          <span className="ml-auto hidden sm:block">
            <CoverageBadge covered={article.coveredByMajorMedia} />
          </span>
        </div>
      </div>

      <IconArrow
        width={15}
        height={15}
        className="mt-1 shrink-0 text-content-faint transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-edge"
      />
    </Link>
  );
}
