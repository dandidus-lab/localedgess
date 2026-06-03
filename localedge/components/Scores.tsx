import { clsx } from "@/lib/clsx";

type Kind = "impact" | "confidence" | "novelty";

const META: Record<Kind, { label: string; short: string; color: string; desc: string }> = {
  impact: { label: "Impact", short: "IMP", color: "var(--edge)", desc: "Potential effect on earnings, industries, supply chains and growth." },
  confidence: { label: "Confidence", short: "CNF", color: "var(--info)", desc: "How confident the model is in the assessment." },
  novelty: { label: "Novelty", short: "NOV", color: "var(--novel)", desc: "How early this appears relative to broad market awareness." },
};

export function ScoreDial({ kind, value, size = 72 }: { kind: Kind; value: number; size?: number }) {
  const m = META[kind];
  const r = (size - 8) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth={4} />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke={m.color}
            strokeWidth={4}
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={offset}
            style={{ filter: `drop-shadow(0 0 6px ${m.color}55)` }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-mono text-lg font-semibold tabular-nums leading-none">{value}</span>
        </div>
      </div>
      <span className="kicker" title={m.desc}>{m.label}</span>
    </div>
  );
}

export function ScoreBar({ kind, value, showLabel = true }: { kind: Kind; value: number; showLabel?: boolean }) {
  const m = META[kind];
  return (
    <div className="w-full">
      {showLabel && (
        <div className="mb-1 flex items-center justify-between">
          <span className="kicker">{m.label}</span>
          <span className="font-mono text-xs font-semibold tabular-nums" style={{ color: m.color }}>{value}</span>
        </div>
      )}
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
        <div
          className="h-full rounded-full"
          style={{ width: `${value}%`, background: m.color, boxShadow: `0 0 8px ${m.color}66` }}
        />
      </div>
    </div>
  );
}

export function ScoreChip({ kind, value }: { kind: Kind; value: number }) {
  const m = META[kind];
  return (
    <span
      className={clsx("pill font-mono tabular-nums")}
      style={{ borderColor: `${m.color}40`, color: m.color, background: `${m.color}12` }}
      title={m.desc}
    >
      {m.short} {value}
    </span>
  );
}

export function ScoreTriple({
  impact,
  confidence,
  novelty,
  variant = "dial",
}: {
  impact: number;
  confidence: number;
  novelty: number;
  variant?: "dial" | "bar";
}) {
  if (variant === "bar") {
    return (
      <div className="space-y-3">
        <ScoreBar kind="impact" value={impact} />
        <ScoreBar kind="confidence" value={confidence} />
        <ScoreBar kind="novelty" value={novelty} />
      </div>
    );
  }
  return (
    <div className="flex items-center justify-between gap-2">
      <ScoreDial kind="impact" value={impact} />
      <ScoreDial kind="confidence" value={confidence} />
      <ScoreDial kind="novelty" value={novelty} />
    </div>
  );
}
