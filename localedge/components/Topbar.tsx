"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { articles, companies, countries } from "@/lib/data";
import { IconSearch, IconDot } from "./icons";

type Result = { type: string; label: string; sub: string; href: string; flag?: string };

export function Topbar() {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [clock, setClock] = useState("");
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tick = () =>
      setClock(
        new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
          timeZone: "UTC",
        })
      );
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const results = useMemo<Result[]>(() => {
    const term = q.trim().toLowerCase();
    if (!term) return [];
    const out: Result[] = [];
    for (const c of companies) {
      if (c.name.toLowerCase().includes(term) || c.ticker.toLowerCase().includes(term))
        out.push({ type: "Company", label: c.name, sub: `${c.ticker} · ${c.sector}`, href: `/company/${c.id}` });
    }
    for (const c of countries) {
      if (c.name.toLowerCase().includes(term))
        out.push({ type: "Market", label: c.name, sub: c.region, href: `/country/${c.slug}`, flag: c.flag });
    }
    for (const a of articles) {
      if (a.translatedHeadline.toLowerCase().includes(term))
        out.push({ type: "Signal", label: a.translatedHeadline, sub: a.source, href: `/article/${a.id}` });
    }
    return out.slice(0, 7);
  }, [q]);

  const go = (href: string) => {
    setOpen(false);
    setQ("");
    router.push(href);
  };

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-line bg-ink/70 px-4 backdrop-blur-xl sm:px-6 lg:pl-6">
      <div className="lg:hidden">
        <Link href="/" className="font-semibold tracking-tight">
          Local<span className="text-edge">Edge</span>
        </Link>
      </div>

      <div ref={boxRef} className="relative mx-auto w-full max-w-xl">
        <div className="flex items-center gap-2 rounded-xl border border-line bg-surface-sunken px-3 py-2 transition-colors focus-within:border-line-strong">
          <IconSearch width={15} height={15} className="text-content-faint" />
          <input
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            placeholder="Search signals, companies, markets…"
            className="w-full bg-transparent text-sm text-content placeholder:text-content-faint focus:outline-none"
          />
          <kbd className="hidden rounded border border-line px-1.5 py-0.5 font-mono text-[10px] text-content-faint sm:block">
            ⌘K
          </kbd>
        </div>

        {open && results.length > 0 && (
          <div className="absolute left-0 right-0 top-full z-30 mt-2 overflow-hidden rounded-xl border border-line-strong bg-surface-raised shadow-panel">
            {results.map((r, i) => (
              <button
                key={i}
                onClick={() => go(r.href)}
                className="flex w-full items-center gap-3 border-b border-line px-4 py-2.5 text-left transition-colors last:border-0 hover:bg-white/[0.04]"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-md border border-line bg-white/[0.02] text-[13px]">
                  {r.flag ?? r.type[0]}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[13px] font-medium text-content">{r.label}</span>
                  <span className="block truncate text-[11px] text-content-faint">{r.sub}</span>
                </span>
                <span className="kicker">{r.type}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="hidden items-center gap-4 md:flex">
        <span className="inline-flex items-center gap-1.5 text-[11px] text-content-muted">
          <IconDot className="text-bull animate-pulse-dot" />
          Live
        </span>
        <span className="font-mono text-xs tabular-nums text-content-muted">{clock} UTC</span>
      </div>
    </header>
  );
}
