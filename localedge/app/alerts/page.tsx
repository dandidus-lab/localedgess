"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { alerts, countryById, getCompany, relativeTime } from "@/lib/data";
import { clsx } from "@/lib/clsx";
import { IconBell, IconArrow } from "@/components/icons";

const SEV: Record<string, { label: string; color: string; bg: string; border: string }> = {
  critical: { label: "Critical", color: "var(--bear)", bg: "rgba(239,111,111,0.10)", border: "rgba(239,111,111,0.30)" },
  high: { label: "High", color: "var(--edge)", bg: "rgba(227,183,101,0.10)", border: "rgba(227,183,101,0.30)" },
  medium: { label: "Medium", color: "var(--info)", bg: "rgba(107,166,245,0.10)", border: "rgba(107,166,245,0.30)" },
  low: { label: "Low", color: "var(--text-muted)", bg: "rgba(255,255,255,0.04)", border: "rgba(255,255,255,0.12)" },
};

export default function AlertsPage() {
  const types = useMemo(() => ["All", ...Array.from(new Set(alerts.map((a) => a.type)))], []);
  const [type, setType] = useState("All");

  const list = useMemo(() => {
    const order = { critical: 0, high: 1, medium: 2, low: 3 } as Record<string, number>;
    return alerts
      .filter((a) => (type === "All" ? true : a.type === type))
      .sort((a, b) => order[a.severity] - order[b.severity] || +new Date(b.time) - +new Date(a.time));
  }, [type]);

  return (
    <div className="animate-fade-up">
      <div className="kicker mb-3 flex items-center gap-1.5">
        <IconBell width={13} height={13} />
        Real-time monitoring
      </div>
      <h1 className="font-serif text-3xl font-medium tracking-tight text-content sm:text-[36px]">Alerts</h1>
      <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-content-muted">
        High-impact signals, regulatory changes, supply-chain disruptions and commodity developments
        as the desk detects them.
      </p>

      <div className="mt-6 flex flex-wrap gap-1.5">
        {types.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setType(t)}
            className={clsx(
              "focus-ring rounded-full border px-3 py-1.5 text-[12.5px] font-medium transition-colors",
              type === t
                ? "border-edge/40 bg-edge/10 text-edge"
                : "border-line text-content-muted hover:border-line-strong hover:text-content"
            )}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="mt-6 space-y-3">
        {list.map((a) => {
          const sev = SEV[a.severity] ?? SEV.low;
          const country = countryById(a.country);
          const cos = a.companies.map(getCompany).filter(Boolean);
          return (
            <Link
              key={a.id}
              href={`/article/${a.articleId}`}
              className="panel card-hover group block p-5"
              style={{ borderLeft: `3px solid ${sev.color}` }}
            >
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <span
                  className="pill"
                  style={{ color: sev.color, background: sev.bg, borderColor: sev.border }}
                >
                  {sev.label}
                </span>
                <span className="kicker">{a.type}</span>
                {country && (
                  <span className="inline-flex items-center gap-1 text-[12px] text-content-muted">
                    <span className="text-sm leading-none">{country.flag}</span>
                    {country.name}
                  </span>
                )}
                <span className="ml-auto text-[11px] text-content-faint">{relativeTime(a.time)}</span>
              </div>

              <h3 className="text-[15px] font-semibold leading-snug text-content transition-colors group-hover:text-edge">
                {a.title}
              </h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-content-muted">{a.description}</p>

              <div className="mt-3 flex items-center gap-2">
                <div className="flex flex-wrap gap-1.5">
                  {cos.map((c) => (
                    <span key={c!.id} className="rounded-md border border-line bg-white/[0.02] px-2 py-0.5 font-mono text-[11px] text-content-muted">
                      {c!.ticker}
                    </span>
                  ))}
                  {a.industries.map((i) => (
                    <span key={i} className="text-[11px] text-content-faint">#{i}</span>
                  ))}
                </div>
                <IconArrow
                  width={15}
                  height={15}
                  className="ml-auto shrink-0 text-content-faint transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-edge"
                />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
