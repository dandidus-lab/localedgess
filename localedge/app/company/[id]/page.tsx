import Link from "next/link";
import { notFound } from "next/navigation";
import {
  companies,
  getCompany,
  countryById,
  articlesForCompany,
} from "@/lib/data";
import { ArticleRow } from "@/components/ArticleRow";
import { SentimentBar, Tag } from "@/components/Tags";
import { FollowButton } from "@/components/FollowButton";
import { IconChevron, IconGlobe, IconLink, IconBuilding } from "@/components/icons";

export function generateStaticParams() {
  return companies.map((c) => ({ id: c.id }));
}

export default function CompanyPage({ params }: { params: { id: string } }) {
  const company = getCompany(params.id);
  if (!company) notFound();

  const home = countryById(company.country);
  const mentions = articlesForCompany(company.id);

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
            <div className="kicker mb-2 flex items-center gap-2">
              <span className="font-mono text-content-muted">{company.exchange}: {company.ticker}</span>
              <span>·</span>
              <span>{company.sector}</span>
            </div>
            <h1 className="font-serif text-3xl font-medium tracking-tight text-content">{company.name}</h1>
            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] text-content-muted">
              {home && (
                <Link href={`/country/${home.slug}`} className="inline-flex items-center gap-1.5 transition-colors hover:text-content">
                  <span className="text-base leading-none">{home.flag}</span>
                  {home.name}
                </Link>
              )}
              <span>{company.industry}</span>
              <span className="font-mono">Mkt cap {company.marketCap}</span>
              <span className={`font-mono ${company.priceChange.trim().startsWith("-") ? "text-bear" : "text-bull"}`}>
                {company.priceChange}
              </span>
            </div>
          </div>
          <FollowButton item={{ kind: "company", id: company.id, label: company.name, sub: company.ticker }} />
        </div>
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_320px]">
        <div className="min-w-0 space-y-8">
          <Section title="Overview">
            <p className="text-[15px] leading-relaxed text-content">{company.overview}</p>
          </Section>

          <Section title="Countries with exposure" kicker="Geographic footprint">
            <div className="space-y-2">
              {company.exposures.map((e) => {
                const c = countryById(e.country);
                return (
                  <div key={e.country} className="flex gap-3 rounded-lg border border-line bg-white/[0.015] p-3">
                    <span className="text-xl leading-none">{c?.flag ?? "🌐"}</span>
                    <div className="min-w-0">
                      {c ? (
                        <Link href={`/country/${c.slug}`} className="text-sm font-medium text-content transition-colors hover:text-edge">
                          {c.name}
                        </Link>
                      ) : (
                        <span className="text-sm font-medium text-content">{e.country}</span>
                      )}
                      <p className="mt-0.5 text-[12.5px] leading-relaxed text-content-muted">{e.note}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Section>

          <Section title="Supply chain exposure" kicker="Dependencies & linkages">
            <ul className="space-y-2">
              {company.supplyChain.map((s, i) => (
                <li key={i} className="flex gap-2.5 text-[14px] leading-relaxed text-content">
                  <IconLink width={15} height={15} className="mt-1 shrink-0 text-content-faint" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section title="Recent mentions" kicker={`${mentions.length} tracked stories`}>
            {mentions.length > 0 ? (
              <div className="panel px-4">
                {mentions.map((a) => (
                  <ArticleRow key={a.id} article={a} />
                ))}
              </div>
            ) : (
              <p className="text-sm text-content-muted">No tracked mentions yet.</p>
            )}
          </Section>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6 lg:sticky lg:top-20 lg:self-start">
          <div className="panel p-5">
            <SentimentBar score={company.sentiment.score} label={company.sentiment.label} />
            <div className="mt-4 space-y-3 border-t border-line pt-4">
              <div>
                <div className="kicker mb-1.5 text-bull">Drivers</div>
                <ul className="space-y-1">
                  {company.sentiment.drivers.map((d, i) => (
                    <li key={i} className="text-[12.5px] leading-relaxed text-content-muted">{d}</li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="kicker mb-1.5 text-bear">Risks</div>
                <ul className="space-y-1">
                  {company.sentiment.risks.map((r, i) => (
                    <li key={i} className="text-[12.5px] leading-relaxed text-content-muted">{r}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-line pt-4 text-[12px]">
              <span className="kicker">Mentions {company.mentions.window}</span>
              <span className="font-mono text-content">{company.mentions.count} · {company.mentions.trend}</span>
            </div>
          </div>

          <div className="panel p-5">
            <div className="kicker mb-3 flex items-center gap-1.5"><IconBuilding width={12} height={12} />Investment implications</div>
            <ul className="space-y-2.5">
              {company.investmentImplications.map((s, i) => (
                <li key={i} className="flex gap-2 text-[13px] leading-relaxed text-content">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-edge" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="panel p-5">
            <div className="kicker mb-3 flex items-center gap-1.5"><IconGlobe width={12} height={12} />Related industries</div>
            <div className="flex flex-wrap gap-1.5">
              {company.relatedIndustries.map((i) => (
                <Tag key={i}>{i}</Tag>
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
