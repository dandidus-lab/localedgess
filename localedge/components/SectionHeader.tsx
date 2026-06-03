import Link from "next/link";
import { IconChevron } from "./icons";

export function SectionHeader({
  kicker,
  title,
  description,
  href,
  hrefLabel = "View all",
  icon,
}: {
  kicker?: string;
  title: string;
  description?: string;
  href?: string;
  hrefLabel?: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="mb-4 flex items-end justify-between gap-4">
      <div>
        {kicker && <div className="kicker mb-1.5 flex items-center gap-1.5">{icon}{kicker}</div>}
        <h2 className="font-serif text-xl font-medium tracking-tight text-content sm:text-[22px]">{title}</h2>
        {description && <p className="mt-1 max-w-2xl text-sm text-content-muted">{description}</p>}
      </div>
      {href && (
        <Link
          href={href}
          className="group inline-flex shrink-0 items-center gap-1 rounded-lg border border-line px-3 py-1.5 text-xs font-medium text-content-muted transition-colors hover:border-line-strong hover:text-content"
        >
          {hrefLabel}
          <IconChevron width={13} height={13} className="transition-transform group-hover:translate-x-0.5" />
        </Link>
      )}
    </div>
  );
}
