import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;
const base = {
  width: 16,
  height: 16,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const IconDashboard = (p: P) => (
  <svg {...base} {...p}><rect x="3" y="3" width="7" height="9" rx="1.5" /><rect x="14" y="3" width="7" height="5" rx="1.5" /><rect x="14" y="12" width="7" height="9" rx="1.5" /><rect x="3" y="16" width="7" height="5" rx="1.5" /></svg>
);
export const IconSignal = (p: P) => (
  <svg {...base} {...p}><path d="M3 17 9 11l4 4 8-9" /><path d="M21 9v4h-4" /></svg>
);
export const IconBell = (p: P) => (
  <svg {...base} {...p}><path d="M18 8A6 6 0 1 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.7 21a2 2 0 0 1-3.4 0" /></svg>
);
export const IconStar = (p: P) => (
  <svg {...base} {...p}><path d="m12 3 2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9 6.8 19.6l1-5.8L3.5 9.7l5.9-.9z" /></svg>
);
export const IconGlobe = (p: P) => (
  <svg {...base} {...p}><circle cx="12" cy="12" r="9" /><path d="M3 12h18" /><path d="M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18" /></svg>
);
export const IconSearch = (p: P) => (
  <svg {...base} {...p}><circle cx="11" cy="11" r="7" /><path d="m20 20-3.2-3.2" /></svg>
);
export const IconArrow = (p: P) => (
  <svg {...base} {...p}><path d="M7 17 17 7" /><path d="M8 7h9v9" /></svg>
);
export const IconChevron = (p: P) => (
  <svg {...base} {...p}><path d="m9 6 6 6-6 6" /></svg>
);
export const IconPlus = (p: P) => (
  <svg {...base} {...p}><path d="M12 5v14M5 12h14" /></svg>
);
export const IconCheck = (p: P) => (
  <svg {...base} {...p}><path d="M20 6 9 17l-5-5" /></svg>
);
export const IconTrend = (p: P) => (
  <svg {...base} {...p}><path d="m3 17 6-6 4 4 8-8" /><path d="M21 7v4h-4" /></svg>
);
export const IconBuilding = (p: P) => (
  <svg {...base} {...p}><rect x="4" y="3" width="16" height="18" rx="1.5" /><path d="M9 7h.01M15 7h.01M9 11h.01M15 11h.01M9 15h6v6" /></svg>
);
export const IconSparkle = (p: P) => (
  <svg {...base} {...p}><path d="M12 3v4M12 17v4M5 12H1M23 12h-4M6 6l2 2M16 16l2 2M18 6l-2 2M8 16l-2 2" /><circle cx="12" cy="12" r="2.5" /></svg>
);
export const IconLink = (p: P) => (
  <svg {...base} {...p}><path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1" /><path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1" /></svg>
);
export const IconClock = (p: P) => (
  <svg {...base} {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
);
export const IconDot = (p: P) => (
  <svg width={8} height={8} viewBox="0 0 8 8" {...p}><circle cx="4" cy="4" r="4" fill="currentColor" /></svg>
);
export const IconBolt = (p: P) => (
  <svg {...base} {...p}><path d="M13 2 4 14h7l-1 8 9-12h-7z" /></svg>
);
