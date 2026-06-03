"use client";

import { useEffect, useState } from "react";
import { clsx } from "@/lib/clsx";
import { IconPlus, IconCheck } from "./icons";

const STORE_KEY = "localedge:watchlist:v1";

export type WatchKind = "company" | "country" | "industry";

export interface WatchItem {
  kind: WatchKind;
  id: string;
  label: string;
  sub?: string;
}

function read(): WatchItem[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(window.localStorage.getItem(STORE_KEY) || "[]");
  } catch {
    return [];
  }
}

function write(items: WatchItem[]) {
  window.localStorage.setItem(STORE_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event("localedge:watchlist"));
}

export function getWatchlist(): WatchItem[] {
  return read();
}

export function toggleWatch(item: WatchItem) {
  const items = read();
  const exists = items.some((i) => i.kind === item.kind && i.id === item.id);
  const next = exists
    ? items.filter((i) => !(i.kind === item.kind && i.id === item.id))
    : [...items, item];
  write(next);
  return !exists;
}

export function removeWatch(kind: WatchKind, id: string) {
  write(read().filter((i) => !(i.kind === kind && i.id === id)));
}

export function FollowButton({
  item,
  size = "md",
}: {
  item: WatchItem;
  size?: "sm" | "md";
}) {
  const [following, setFollowing] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const sync = () => setFollowing(read().some((i) => i.kind === item.kind && i.id === item.id));
    sync();
    window.addEventListener("localedge:watchlist", sync);
    return () => window.removeEventListener("localedge:watchlist", sync);
  }, [item.kind, item.id]);

  return (
    <button
      type="button"
      onClick={() => setFollowing(toggleWatch(item))}
      className={clsx(
        "focus-ring inline-flex items-center gap-1.5 rounded-lg border font-medium transition-colors",
        size === "sm" ? "px-2.5 py-1 text-[12px]" : "px-3 py-1.5 text-[13px]",
        following
          ? "border-edge/40 bg-edge/10 text-edge"
          : "border-line text-content-muted hover:border-line-strong hover:text-content"
      )}
      aria-pressed={following}
    >
      {following ? <IconCheck width={13} height={13} /> : <IconPlus width={13} height={13} />}
      {mounted && following ? "Following" : "Follow"}
    </button>
  );
}
