import Link from "next/link";
import { notFound } from "next/navigation";
import {
  articles,
  getArticle,
  getCompany,
  countryById,
  absoluteTime,
  relativeTime,
} from "@/lib/data";
import { ScoreTriple } from "@/components/Scores";
import { CategoryTag, CoverageBadge, Tag } from "@/components/Tags";
import { IconChevron, IconGlobe, IconClock, IconBuilding, IconSparkle } from "@/components/icons";

export function generateStaticParams() {
  return articles.map((a) => ({ id: a.id }));
}

export default function ArticlePage({ params }: { params: { id: string } }) {
  const article = getArticle(params.id);
  if (!article) notFound();

  const country = countryById(article.country);
  const cos = article.companies.map(getCompany).filter(Boolean);

  return (
    <article className="animate-fade-up">
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-1 text-xs font-medium text-content-faint transition-colors hover:text-content"
      >
        <IconChevron width={13} height={13} className="rotate-180" />
        Back to dashboard
      </Link>

      <div className="grid gap-10 lg:grid-cols-[1fr_300px]">
        {/* Main */}
        <div className="min-w-0">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <CategoryTag category={article.category} />
            <CoverageBadge covered={article.coveredByMajorMedia} />
          </div>

          <h1 className="font-serif text-[28px] font-medium leading-tight tracking-tight text-content sm:text-4xl">
            {article.translatedHeadline}
          </h1>

          {/* Original language block */}
          <div className="mt-5 rounded-xl border border-line bg-surface-sunken/60 p-4">
            <div className="kicker mb-2 flex items-center gap-1.5">
              <IconGlobe width={12} height={12} />
              Original · {article.originalLanguage}
            </div>
            <p className="font-serif text-lg italic leading-snug text-content" lang={article.originalLanguage}>
              {article.originalHeadline}
            </p>
            <p className="mt-2 text-[13px] leading-relaxed text-content-muted" lang={article.originalLanguage}>
              {article.originalSnippet}
            </p>
          </div>

          {/* Meta strip */}
          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-[12.5px] text-content-muted">
            {country && (
              <Link href={`/country/${country.slug}`} className="inline-flex items-center gap-1.5 transition-colors hover:text-content">
                <span className="text-base leading-none">{country.flag}</span>
                {country.name}
              </Link>
            )}
            <span className="inline-flex items-center gap-1.5">
              <IconBuilding width={13} height={13} className="text-content-faint" />
              {article.source}
              <span className="text-content-faint">· {article.sourceType}</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <IconClock width={13} height={13} className="text-content-faint" />
              {absoluteTime(article.publishedAt)}
              <span className="text-content-faint">· {relativeTime(article.publishedAt)}</span>
            </span>
          </div>

          {/* AI Summary */}
          <Block title="AI Summary" kicker="Generated analysis">
            <p className="text-[15px] leading-relaxed text-content">{article.aiSummary}</p>
          </Block>

          {/* Why care */}
          <Block title="Why investors should care" kicker="Investment relevance">
            <p className="text-[15px] leading-relaxed text-content">{article.whyCare}</p>
          </Block>

          {/* Bull / Bear */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-bull/25 bg-bull/[0.04] p-5">
              <div className="kicker mb-2 text-bull">Bull case</div>
              <p className="text-sm leading-relaxed text-content">{article.bullCase}</p>
            </div>
            <div className="rounded-xl border border-bear/25 bg-bear/[0.04] p-5">
              <div className="kicker mb-2 text-bear">Bear case</div>
              <p className="text-sm leading-relaxed text-content">{article.bearCase}</p>
            </div>
          </div>

          {/* Market implications */}
          <Block title="Market implications" kicker="What to watch">
            <p className="text-[15px] leading-relaxed text-content">{article.marketImplications}</p>
            {article.coverageGrowth && (
              <p className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-info/25 bg-info/10 px-2.5 py-1 text-[12px] font-medium text-info">
                <IconSparkle width={12} height={12} />
                International coverage {article.coverageGrowth}
              </p>
            )}
          </Block>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6 lg:sticky lg:top-20 lg:self-start">
          <div className="panel p-5">
            <div className="kicker mb-4">AI Scoring</div>
            <ScoreTriple
              impact={article.impactScore}
              confidence={article.confidenceScore}
              novelty={article.noveltyScore}
            />
            <div className="mt-4 space-y-2 border-t border-line pt-4 text-[12px] leading-relaxed text-content-muted">
              <p><span className="font-medium text-content">Impact</span> — effect on earnings, industries, supply chains and growth.</p>
              <p><span className="font-medium text-content">Confidence</span> — model certainty in the assessment.</p>
              <p><span className="font-medium text-content">Novelty</span> — how early this is vs. broad market awareness.</p>
            </div>
          </div>

          {cos.length > 0 && (
            <div className="panel p-5">
              <div className="kicker mb-3">Companies affected</div>
              <div className="space-y-1">
                {cos.map((c) => (
                  <Link
                    key={c!.id}
                    href={`/company/${c!.id}`}
                    className="group flex items-center justify-between rounded-lg px-2 py-2 transition-colors hover:bg-white/[0.03]"
                  >
                    <div className="min-w-0">
                      <div className="truncate text-sm font-medium text-content group-hover:text-edge">{c!.name}</div>
                      <div className="text-[11px] text-content-faint">{c!.sector}</div>
                    </div>
                    <span className="font-mono text-xs text-content-muted">{c!.ticker}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {article.industries.length > 0 && (
            <div className="panel p-5">
              <div className="kicker mb-3">Industries affected</div>
              <div className="flex flex-wrap gap-1.5">
                {article.industries.map((i) => (
                  <Tag key={i}>{i}</Tag>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>
    </article>
  );
}

function Block({ title, kicker, children }: { title: string; kicker: string; children: React.ReactNode }) {
  return (
    <section className="mt-8">
      <div className="kicker mb-2">{kicker}</div>
      <h2 className="mb-2 font-serif text-xl font-medium tracking-tight text-content">{title}</h2>
      {children}
    </section>
  );
}
