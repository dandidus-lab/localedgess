import Link from "next/link";
import {
  articlesByCategory,
  trendingCountries,
  trendingIndustries,
  mostMentionedCompanies,
} from "@/lib/data";
import { SectionHeader } from "@/components/SectionHeader";
import { SignalCard } from "@/components/SignalCard";
import { ArticleRow } from "@/components/ArticleRow";
import { ScoreChip } from "@/components/Scores";
import {
  IconSignal,
  IconSparkle,
  IconTrend,
  IconGlobe,
  IconBuilding,
  IconBolt,
  IconArrow,
} from "@/components/icons";

export default function DashboardPage() {
  const signals = articlesByCategory("signal");
  const uncovered = articlesByCategory("uncovered");
  const emerging = articlesByCategory("emerging");
  const global = articlesByCategory("global");
  const tCountries = trendingCountries();
  const tIndustries = trendingIndustries();
  const tCompanies = mostMentionedCompanies();

  return (
    <div className="space-y-14">
      {/* Hero */}
      <header className="relative animate-fade-up">
        <div className="kicker mb-3 flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-edge animate-pulse-dot" />
          Global Intelligence Desk · {new Date("2026-06-02T08:00:00Z").toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", timeZone: "UTC" })}
        </div>
        <h1 className="max-w-3xl font-serif text-3xl font-medium leading-[1.1] tracking-tight text-content sm:text-[40px]">
          The signal reaches you{" "}
          <span className="text-edge">before</span> the market.
        </h1>
        <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-content-muted">
          LocalEdge monitors local-language financial sources across seven high-growth
          markets, translating and scoring developments for investment impact — surfacing
          what matters hours to days before it reaches Bloomberg, Reuters, or the FT.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <StatPill label="Markets tracked" value="7" />
          <StatPill label="Live signals today" value={String(signals.length + uncovered.length)} />
          <StatPill label="Avg lead time" value="~31h" accent />
          <StatPill label="Sources monitored" value="2,400+" />
        </div>
      </header>

      {/* 1. Highest Conviction Signals */}
      <section>
        <SectionHeader
          kicker="Ranked by impact × confidence"
          title="Highest Conviction Signals"
          description="The developments our models believe carry the strongest, best-substantiated market implications right now."
          href="/signals"
          icon={<IconSignal width={13} height={13} />}
        />
        <div className="stagger grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {signals.slice(0, 6).map((a, i) => (
            <SignalCard key={a.id} article={a} rank={i + 1} />
          ))}
        </div>
      </section>

      {/* 2 + 3 side by side on wide */}
      <div className="grid gap-12 xl:grid-cols-2">
        {/* 2. Not Yet Widely Covered */}
        <section>
          <SectionHeader
            kicker="Information edge"
            title="Not Yet Widely Covered"
            description="High-novelty stories from local sources that have not reached major international media."
            icon={<IconSparkle width={13} height={13} />}
          />
          <div className="panel px-4">
            {uncovered.slice(0, 5).map((a) => (
              <ArticleRow key={a.id} article={a} showWhy />
            ))}
          </div>
        </section>

        {/* 3. Emerging Stories */}
        <section>
          <SectionHeader
            kicker="Spreading internationally"
            title="Emerging Stories"
            description="Narratives gaining coverage abroad — with the market implications still in play."
            icon={<IconTrend width={13} height={13} />}
          />
          <div className="space-y-3">
            {emerging.slice(0, 4).map((a) => (
              <EmergingCard key={a.id} article={a} />
            ))}
          </div>
        </section>
      </div>

      {/* 4. Major Global Developments */}
      <section>
        <SectionHeader
          kicker="Context the desk is watching"
          title="Major Global Developments"
          description="Central bank decisions, geopolitics, commodity shocks and bellwether earnings shaping the backdrop."
          icon={<IconGlobe width={13} height={13} />}
        />
        <div className="stagger grid gap-4 sm:grid-cols-2">
          {global.map((a) => (
            <GlobalCard key={a.id} article={a} />
          ))}
        </div>
      </section>

      {/* 5 + 6 + 7 */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* 5. Trending Countries */}
        <section className="panel p-5">
          <SectionHeader kicker="Activity" title="Trending Countries" icon={<IconGlobe width={13} height={13} />} />
          <ul className="space-y-1">
            {tCountries.map((c, i) => (
              <li key={c.id}>
                <Link
                  href={`/country/${c.slug}`}
                  className="group flex items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-white/[0.03]"
                >
                  <span className="w-5 text-center font-mono text-xs text-content-faint">{i + 1}</span>
                  <span className="text-lg leading-none">{c.flag}</span>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-medium text-content group-hover:text-edge">{c.name}</div>
                    <div className="text-[11px] text-content-faint">{c.signalCount} active signals</div>
                  </div>
                  <TrendMeter value={c.trendingScore} />
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* 6. Trending Industries */}
        <section className="panel p-5">
          <SectionHeader kicker="Themes" title="Trending Industries" icon={<IconBolt width={13} height={13} />} />
          <ul className="space-y-1">
            {tIndustries.map((ind, i) => (
              <li key={ind.name} className="flex items-center gap-3 rounded-lg px-2 py-2">
                <span className="w-5 text-center font-mono text-xs text-content-faint">{i + 1}</span>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium text-content">{ind.name}</div>
                  <div className="text-[11px] text-content-faint">{ind.count} mentions</div>
                </div>
                <ScoreChip kind="impact" value={ind.avgImpact} />
              </li>
            ))}
          </ul>
        </section>

        {/* 7. Most Mentioned Companies */}
        <section className="panel p-5">
          <SectionHeader kicker="Coverage" title="Most Mentioned" icon={<IconBuilding width={13} height={13} />} />
          <ul className="space-y-1">
            {tCompanies.map((c, i) => (
              <li key={c.id}>
                <Link
                  href={`/company/${c.id}`}
                  className="group flex items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-white/[0.03]"
                >
                  <span className="w-5 text-center font-mono text-xs text-content-faint">{i + 1}</span>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-medium text-content group-hover:text-edge">{c.name}</div>
                    <div className="text-[11px] text-content-faint">
                      <span className="font-mono">{c.ticker}</span> · {c.countryName}
                    </div>
                  </div>
                  <span className="font-mono text-xs tabular-nums text-content-muted">{c.mentions.count}</span>
                  <IconArrow width={13} height={13} className="text-content-faint transition-transform group-hover:translate-x-0.5 group-hover:text-edge" />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

function StatPill({ label, value, accent = false }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="rounded-xl border border-line bg-surface-raised/60 px-4 py-2.5">
      <div className={`font-mono text-lg font-semibold tabular-nums ${accent ? "text-edge" : "text-content"}`}>{value}</div>
      <div className="kicker mt-0.5">{label}</div>
    </div>
  );
}

function TrendMeter({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="h-1 w-10 overflow-hidden rounded-full bg-white/[0.06]">
        <div className="h-full rounded-full bg-edge" style={{ width: `${value}%`, boxShadow: "0 0 6px var(--edge)" }} />
      </div>
      <span className="w-6 font-mono text-[11px] tabular-nums text-content-faint">{value}</span>
    </div>
  );
}

function EmergingCard({ article }: { article: ReturnType<typeof articlesByCategory>[number] }) {
  return (
    <Link href={`/article/${article.id}`} className="panel card-hover group block p-4">
      <div className="mb-2 flex items-center justify-between gap-3">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-info/30 bg-info/10 px-2 py-0.5 text-[11px] font-medium text-info">
          <IconTrend width={11} height={11} />
          Coverage {article.coverageGrowth}
        </span>
        <ScoreChip kind="impact" value={article.impactScore} />
      </div>
      <h3 className="text-sm font-semibold leading-snug text-content transition-colors group-hover:text-edge">
        {article.translatedHeadline}
      </h3>
      <p className="mt-1.5 line-clamp-2 text-[12.5px] leading-relaxed text-content-muted">
        <span className="font-medium text-content">Market implications — </span>
        {article.marketImplications}
      </p>
    </Link>
  );
}

function GlobalCard({ article }: { article: ReturnType<typeof articlesByCategory>[number] }) {
  return (
    <Link href={`/article/${article.id}`} className="panel card-hover group flex flex-col p-5">
      <div className="mb-2 flex items-center gap-2">
        <IconGlobe width={14} height={14} className="text-content-faint" />
        <span className="kicker">{article.source}</span>
        <span className="ml-auto"><ScoreChip kind="impact" value={article.impactScore} /></span>
      </div>
      <h3 className="text-[15px] font-semibold leading-snug text-content transition-colors group-hover:text-edge">
        {article.translatedHeadline}
      </h3>
      <p className="mt-1.5 line-clamp-3 flex-1 text-[13px] leading-relaxed text-content-muted">{article.aiSummary}</p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {article.industries.slice(0, 3).map((i) => (
          <span key={i} className="text-[11px] text-content-faint">#{i}</span>
        ))}
      </div>
    </Link>
  );
}
