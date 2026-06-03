import Link from "next/link";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="group inline-flex items-center gap-2.5">
      <span className="relative flex h-8 w-8 items-center justify-center rounded-lg border border-edge/30 bg-gradient-to-br from-edge/20 to-transparent">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--edge)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9" opacity="0.35" />
          <path d="M3 12h18" opacity="0.35" />
          <path d="M12 3a14 14 0 0 1 0 18" opacity="0.35" />
          <path d="m6 15 4-4 3 3 5-6" />
        </svg>
        <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-edge shadow-[0_0_6px_var(--edge)]" />
      </span>
      {!compact && (
        <span className="flex flex-col leading-none">
          <span className="text-[15px] font-semibold tracking-tight text-content">
            Local<span className="text-edge">Edge</span>
          </span>
          <span className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.2em] text-content-faint">
            Intelligence
          </span>
        </span>
      )}
    </Link>
  );
}
