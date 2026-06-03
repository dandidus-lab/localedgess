"use client";

import { useMemo, useState } from "react";
import { articles, countries } from "@/lib/data";
import { SignalCard } from "@/components/SignalCard";
import { clsx } from "@/lib/clsx";
import { IconSignal } from "@/components/icons";

type Cat = "all" | "signal" | "uncovered" | "emerging" | "global";

const CATS: { id: Cat; label: string }[] = [
  { id: "all", label: "All" },
  { id: "signal", label: "Conviction" },
  { id: "uncovered", label: "Not yet covered" },
  { id: "emerging", label: "Emerging" },
  { id: "global", label: "Global" },
];

export default function SignalsPage() {
  const [cat, setCat] = useState<Cat>("all");
  const [country, setCountry] = useState<string>("all");

  const list = useMemo(() => {
    return articles
      .filter((a) => (cat === "all" ? true : a.category === cat))
      .filter((a) => (country === "all" ? true : a.country === country))
      .sort((a, b) => b.impactScore - a.impactScore);
  }, [cat, country]);

  return (
    <div className="animate-fade-up">
      <div className="kicker mb-3 flex items-center gap-1.5">
        <IconSignal width={13} height={13} />
        Intelligence feed
      </div>
      <h1 className="font-serif text-3xl font-medium tracking-tight text-content sm:text-[36px]">Conviction Signals</h1>
      <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-content-muted">
        Every tracked development, ranked by impact. Filter by category or market to focus the desk.
      </p>

      {/* Filters */}
      <div className="mt-6 space-y-3">
        <div className="flex flex-wrap gap-1.5">
          {CATS.map((c) => (
            <FilterChip key={c.id} active={cat === c.id} onClick={() => setCat(c.id)}>
              {c.label}
            </FilterChip>
          ))}
        </div>
        <div className="flex flex-wrap gap-1.5">
          <FilterChip active={country === "all"} onClick={() => setCountry("all")}>
            All markets
          </FilterChip>
          {countries.map((c) => (
            <FilterChip key={c.id} active={country === c.id} onClick={() => setCountry(c.id)}>
              <span className="mr-1">{c.flag}</span>
              {c.name}
            </FilterChip>
          ))}
        </div>
      </div>

      <div className="mt-4 text-[12px] text-content-faint">
        {list.length} {list.length === 1 ? "result" : "results"}
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {list.map((a, i) => (
          <SignalCard key={a.id} article={a} rank={cat === "all" && country === "all" ? i + 1 : undefined} />
        ))}
      </div>

      {list.length === 0 && (
        <div className="panel mt-4 p-10 text-center text-sm text-content-muted">
          No signals match the current filters.
        </div>
      )}
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        "focus-ring rounded-full border px-3 py-1.5 text-[12.5px] font-medium transition-colors",
        active
          ? "border-edge/40 bg-edge/10 text-edge"
          : "border-line text-content-muted hover:border-line-strong hover:text-content"
      )}
    >
      {children}
    </button>
  );
}
