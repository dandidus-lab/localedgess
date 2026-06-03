"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "@/lib/clsx";
import { Logo } from "./Logo";
import {
  IconDashboard,
  IconSignal,
  IconBell,
  IconStar,
  IconGlobe,
} from "./icons";

const nav = [
  { href: "/", label: "Dashboard", icon: IconDashboard },
  { href: "/signals", label: "Conviction Signals", icon: IconSignal },
  { href: "/alerts", label: "Alerts", icon: IconBell, badge: 3 },
  { href: "/watchlist", label: "Watchlist", icon: IconStar },
];

const markets = [
  { slug: "south-korea", flag: "🇰🇷", name: "South Korea" },
  { slug: "india", flag: "🇮🇳", name: "India" },
  { slug: "brazil", flag: "🇧🇷", name: "Brazil" },
  { slug: "mexico", flag: "🇲🇽", name: "Mexico" },
  { slug: "indonesia", flag: "🇮🇩", name: "Indonesia" },
  { slug: "vietnam", flag: "🇻🇳", name: "Vietnam" },
  { slug: "turkey", flag: "🇹🇷", name: "Turkey" },
];

export function Sidebar() {
  const pathname = usePathname();
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-[248px] flex-col border-r border-line bg-ink-900/80 backdrop-blur-xl lg:flex">
      <div className="flex h-16 items-center px-5">
        <Logo />
      </div>

      <nav className="flex-1 space-y-6 overflow-y-auto px-3 py-2">
        <div className="space-y-0.5">
          {nav.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link key={item.href} href={item.href} className={clsx("nav-link", active && "nav-link-active")}>
                <Icon width={17} height={17} className={active ? "text-edge" : ""} />
                <span className="flex-1">{item.label}</span>
                {item.badge && (
                  <span className="rounded-full bg-edge/15 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-edge">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        <div>
          <div className="mb-2 flex items-center gap-2 px-3">
            <IconGlobe width={13} height={13} className="text-content-faint" />
            <span className="kicker">Markets</span>
          </div>
          <div className="space-y-0.5">
            {markets.map((m) => {
              const href = `/country/${m.slug}`;
              const active = pathname === href;
              return (
                <Link key={m.slug} href={href} className={clsx("nav-link text-[13px]", active && "nav-link-active")}>
                  <span className="text-[15px] leading-none">{m.flag}</span>
                  <span>{m.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      <div className="border-t border-line p-3">
        <div className="flex items-center gap-3 rounded-lg px-2 py-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-edge/30 to-info/20 text-xs font-semibold text-content">
            AM
          </div>
          <div className="min-w-0 flex-1 leading-tight">
            <div className="truncate text-[13px] font-medium text-content">Asset Manager</div>
            <div className="truncate text-[11px] text-content-faint">Institutional · Pro</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
