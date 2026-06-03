"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  companies,
  countries,
  getCompany,
  countryById,
  trendingIndustries,
  articles,
  relativeTime,
} from "@/lib/data";
import {
  getWatchlist,
  removeWatch,
  toggleWatch,
  type WatchItem,
} from "@/components/FollowButton";
import { clsx } from "@/lib/clsx";
import { IconStar, IconPlus, IconCheck, IconArrow } from "@/components/icons";

export default function WatchlistPage() {
  const [items, setItems] = useState<WatchItem[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const sync = () => setItems(getWatchlist());
    sync();
    window.addEventListener("localedge:watchlist", sync);
    return () => window.removeEventListener("localedge:watchlist", sync);
  }, []);

  const followed = (k: WatchItem["kind"]) => items.filter((i) => i.kind === k);
  const isFollowing = (k: WatchItem["kind"], id: string) => items.some((i) => i.kind === k && i.id === id);

  // Relevant feed: articles touching any followed company / country / industry
  const feed = articles
    .filter((a) =>
      items.some(
        (i) =>
          (i.kind === "company" && a.companies.includes(i.id)) ||
          (i.kind === "country" && a.country === i.id) ||
          (i.kind === "industry" && a.industries.includes(i.id))
      )
    )
    .sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt))
    .slice(0, 8);

  const industrySuggestions = trendingIndustries().map((i) => i.name);

  return (
    <div className="animate-fade-up">
      <div className="kicker mb-3 flex items-center gap-1.5">
        <IconStar width={13} height={13} />
        Personalized
      </div>
      <h1 className="font-serif text-3xl font-medium tracking-tight text-content sm:text-[36px]">Watchlist</h1>
      <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-content-muted">
        Follow companies, countries and industries to build a focused intelligence feed. Saved to this
        browser.
      </p>

      {/* Followed feed */}
      {mounted && items.length > 0 && (
        <section className="mt-8">
          <h2 className="mb-3 font-serif text-xl font-medium tracking-tight text-content">Your feed</h2>
          {feed.length > 0 ? (
            <div className="panel divide-y divide-line">
              {feed.map((a) => {
                const c = countryById(a.country);
                return (
                  <Link key={a.id} href={`/article/${a.id}`} className="group flex items-center gap-3 px-4 py-3 transition-colors hover:bg-white/[0.015]">
                    <span className="text-base leading-none">{c?.flag}</span>
                    <span className="min-w-0 flex-1 truncate text-sm font-medium text-content group-hover:text-edge">{a.translatedHeadline}</span>
                    <span className="hidden shrink-0 text-[11px] text-content-faint sm:block">{relativeTime(a.publishedAt)}</span>
                    <IconArrow width={14} height={14} className="shrink-0 text-content-faint transition-transform group-hover:translate-x-0.5 group-hover:text-edge" />
                  </Link>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-content-muted">No recent stories for your follows yet.</p>
          )}
        </section>
      )}

      <div className="mt-10 grid gap-8 lg:grid-cols-3">
        {/* Companies */}
        <Column title="Companies" count={followed("company").length} mounted={mounted}>
          {followed("company").map((i) => {
            const c = getCompany(i.id);
            return (
              <FollowedRow key={i.id} href={`/company/${i.id}`} label={i.label} sub={c?.sector} ticker={c?.ticker} onRemove={() => removeWatch("company", i.id)} />
            );
          })}
          <Divider label="Add companies" />
          <div className="flex flex-wrap gap-1.5">
            {companies.filter((c) => !isFollowing("company", c.id)).slice(0, 8).map((c) => (
              <AddChip key={c.id} onClick={() => setItems((toggleWatch({ kind: "company", id: c.id, label: c.name, sub: c.ticker }), getWatchlist()))}>
                {c.ticker}
              </AddChip>
            ))}
          </div>
        </Column>

        {/* Countries */}
        <Column title="Countries" count={followed("country").length} mounted={mounted}>
          {followed("country").map((i) => {
            const c = countryById(i.id);
            return (
              <FollowedRow key={i.id} href={c ? `/country/${c.slug}` : "#"} label={i.label} sub={c?.region} flag={c?.flag} onRemove={() => removeWatch("country", i.id)} />
            );
          })}
          <Divider label="Add countries" />
          <div className="flex flex-wrap gap-1.5">
            {countries.filter((c) => !isFollowing("country", c.id)).map((c) => (
              <AddChip key={c.id} onClick={() => setItems((toggleWatch({ kind: "country", id: c.id, label: c.name, sub: c.region }), getWatchlist()))}>
                <span className="mr-1">{c.flag}</span>{c.name}
              </AddChip>
            ))}
          </div>
        </Column>

        {/* Industries */}
        <Column title="Industries" count={followed("industry").length} mounted={mounted}>
          {followed("industry").map((i) => (
            <FollowedRow key={i.id} label={i.label} onRemove={() => removeWatch("industry", i.id)} />
          ))}
          <Divider label="Add industries" />
          <div className="flex flex-wrap gap-1.5">
            {industrySuggestions.filter((n) => !isFollowing("industry", n)).map((n) => (
              <AddChip key={n} onClick={() => setItems((toggleWatch({ kind: "industry", id: n, label: n }), getWatchlist()))}>
                {n}
              </AddChip>
            ))}
          </div>
        </Column>
      </div>
    </div>
  );
}

function Column({ title, count, mounted, children }: { title: string; count: number; mounted: boolean; children: React.ReactNode }) {
  return (
    <section className="panel p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-content">{title}</h2>
        <span className="font-mono text-xs text-content-faint">{mounted ? count : 0}</span>
      </div>
      <div className="space-y-1.5">{children}</div>
    </section>
  );
}

function FollowedRow({
  href,
  label,
  sub,
  ticker,
  flag,
  onRemove,
}: {
  href?: string;
  label: string;
  sub?: string;
  ticker?: string;
  flag?: string;
  onRemove: () => void;
}) {
  const inner = (
    <div className="flex items-center gap-2.5">
      {flag && <span className="text-base leading-none">{flag}</span>}
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-medium text-content">{label}</div>
        {sub && <div className="text-[11px] text-content-faint">{sub}</div>}
      </div>
      {ticker && <span className="font-mono text-[11px] text-content-muted">{ticker}</span>}
    </div>
  );
  return (
    <div className="group flex items-center gap-2 rounded-lg border border-line bg-white/[0.015] px-3 py-2">
      <div className="min-w-0 flex-1">
        {href ? <Link href={href} className="block hover:[&_*]:text-edge">{inner}</Link> : inner}
      </div>
      <button
        type="button"
        onClick={onRemove}
        aria-label={`Unfollow ${label}`}
        className="focus-ring shrink-0 rounded-md p-1 text-content-faint transition-colors hover:text-bear"
      >
        <IconCheck width={14} height={14} />
      </button>
    </div>
  );
}

function Divider({ label }: { label: string }) {
  return <div className="kicker pb-1 pt-3">{label}</div>;
}

function AddChip({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        "focus-ring inline-flex items-center rounded-full border border-line px-2.5 py-1 text-[12px] font-medium text-content-muted transition-colors hover:border-edge/40 hover:bg-edge/10 hover:text-edge"
      )}
    >
      <IconPlus width={11} height={11} className="mr-1" />
      {children}
    </button>
  );
}
