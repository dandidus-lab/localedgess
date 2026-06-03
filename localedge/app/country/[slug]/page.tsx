import Link from "next/link";
import { notFound } from "next/navigation";
import {
  countries,
  getCountry,
  articlesForCountry,
  companiesForCountry,
} from "@/lib/data";
import { ArticleRow } from "@/components/ArticleRow";
import { FollowButton } from "@/components/FollowButton";
import { IconChevron, IconBuilding } from "@/components/icons";

export function generateStaticParams() {
  return countries.map((c) => ({ slug: c.slug }));
}

export default function CountryPage({ params }: { params: { slug: string } }) {
  const country = getCountry(params.slug);
  if (!country) notFound();

  const feed = articlesForCountry(country.id);
  const cos = companiesForCountry(country.id);

  const macros = [
    { label: "Policy rate", value: country.policyRate },
    { label: "Inflation", value: country.inflation },
    { label: "GDP growth", value: country.gdpGrowth },
    { label: "FX YTD", value: country.fxYtd },
  ];

  return (
    <div className="animate-fade-up">
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-1 text-xs font-medium text-content-faint transition-colors hover:text-content"
      >
        <IconChevron width={13} height={13} className="rotate-180" />
        Back to dashboard
      </Link>

      {/* Header */}
      <div className="panel p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="kicker mb-2">{country.region} · {country.languageName} · {country.currency}</div>
            <h1 className="flex items-center gap-3 font-serif text-3xl font-medium tracking-tight text-content">
              <span className="text-4xl leading-none">{country.flag}</span>
              {country.name}
            </h1>
            <p className="mt-3 max-w-2xl text-[14px] leading-relaxed text-content-muted">{country.summary}</p>
          </div>
          <FollowButton item={{ kind: "country", id: country.id, label: country.name, sub: country.region }} />
        </div>

        {/* Macro strip */}
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {macros.map((m) => (
            <div key={m.label} className="rounded-xl border border-line bg-surface-sunken/50 px-4 py-3">
              <div className="kicker mb-1">{m.label}</div>
              <div className="font-mono text-base font-semibold tabular-nums text-content">{m.value}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_320px]">
        <div className="min-w-0 space-y-8">
          <Section title="Local news feed" kicker={`${feed.length} tracked stories`}>
            {feed.length > 0 ? (
              <div className="panel px-4">
                {feed.map((a) => (
                  <ArticleRow key={a.id} article={a} showWhy />
                ))}
              </div>
            ) : (
              <p className="text-sm text-content-muted">No tracked stories yet.</p>
            )}
          </Section>

          <div className="grid gap-6 sm:grid-cols-2">
            <ListPanel title="Economic developments" items={country.economicDevelopments} />
            <ListPanel title="Regulatory developments" items={country.regulatoryDevelopments} />
            <ListPanel title="Infrastructure projects" items={country.infrastructure} />
            <ListPanel title="Sector trends" items={country.sectorTrends} />
          </div>
        </div>

        {/* Sidebar: public company mentions */}
        <aside className="lg:sticky lg:top-20 lg:self-start">
          <div className="panel p-5">
            <div className="kicker mb-3 flex items-center gap-1.5"><IconBuilding width={12} height={12} />Public company mentions</div>
            <div className="space-y-1">
              {cos.map((c) => (
                <Link
                  key={c.id}
                  href={`/company/${c.id}`}
                  className="group flex items-center justify-between rounded-lg px-2 py-2 transition-colors hover:bg-white/[0.03]"
                >
                  <div className="min-w-0">
                    <div className="truncate text-sm font-medium text-content group-hover:text-edge">{c.name}</div>
                    <div className="text-[11px] text-content-faint">{c.sector}</div>
                  </div>
                  <span className="font-mono text-xs text-content-muted">{c.ticker}</span>
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Section({ title, kicker, children }: { title: string; kicker?: string; children: React.ReactNode }) {
  return (
    <section>
      {kicker && <div className="kicker mb-1.5">{kicker}</div>}
      <h2 className="mb-3 font-serif text-xl font-medium tracking-tight text-content">{title}</h2>
      {children}
    </section>
  );
}

function ListPanel({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="panel p-5">
      <h3 className="mb-3 text-sm font-semibold text-content">{title}</h3>
      <ul className="space-y-2.5">
        {items.map((s, i) => (
          <li key={i} className="flex gap-2 text-[13px] leading-relaxed text-content-muted">
            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-edge/70" />
            <span>{s}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
