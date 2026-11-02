"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { useAuth, type SavedItemRecord } from "@/components/auth/AuthContext";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { Bookmark, Trash2, Loader2 } from "lucide-react";

type SavedKind = "affirmation" | "audio" | "article";

const TABS: { label: string; kind: SavedKind; empty: string }[] = [
  {
    label: "Affirmations",
    kind: "affirmation",
    empty:
      "You haven't saved any affirmations yet. Tap the bookmark on any affirmation to keep it here.",
  },
  {
    label: "Audio",
    kind: "audio",
    empty:
      "You haven't saved any audio yet. Tap the bookmark on any track to keep it here.",
  },
  {
    label: "Articles",
    kind: "article",
    empty:
      "You haven't saved any articles yet. Tap the bookmark on any article to keep it here.",
  },
];

const dateFormatter = new Intl.DateTimeFormat("en", { dateStyle: "medium" });

function formatDate(value: string) {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return "";
  return dateFormatter.format(parsed);
}

export function SavedClient() {
  const { getSavedItems, toggleSavedItem } = useAuth();

  const [tabIndex, setTabIndex] = React.useState(0);
  const [items, setItems] = React.useState<SavedItemRecord[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [loadError, setLoadError] = React.useState<string | null>(null);
  const [actionError, setActionError] = React.useState<string | null>(null);
  const [removingId, setRemovingId] = React.useState<string | null>(null);

  const activeTab = TABS[tabIndex];
  const tabRefs = React.useRef<Array<HTMLButtonElement | null>>([]);

  const load = React.useCallback(
    async (kind: SavedKind) => {
      setLoading(true);
      setLoadError(null);
      try {
        const list = await getSavedItems({ kind, limit: 100 });
        setItems(list);
      } catch (err) {
        setLoadError(
          err instanceof Error
            ? err.message
            : "We couldn't load your saved content right now."
        );
        setItems([]);
      } finally {
        setLoading(false);
      }
    },
    [getSavedItems]
  );

  React.useEffect(() => {
    void load(activeTab.kind);
  }, [activeTab.kind, load]);

  const onTabKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next = index;
    if (e.key === "ArrowRight") next = (index + 1) % TABS.length;
    else if (e.key === "ArrowLeft") next = (index - 1 + TABS.length) % TABS.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = TABS.length - 1;
    else return;
    e.preventDefault();
    setTabIndex(next);
    tabRefs.current[next]?.focus();
  };

  const handleRemove = async (item: SavedItemRecord) => {
    setActionError(null);
    setRemovingId(item.id);
    try {
      const result = await toggleSavedItem({
        kind: item.kind,
        refId: item.refId,
        title: item.title,
        category: item.category,
        gradient: item.gradient,
      });
      if (!result.saved) {
        setItems((prev) => prev.filter((i) => i.id !== item.id));
      }
    } catch (err) {
      setActionError(
        err instanceof Error
          ? err.message
          : "We couldn't remove that item. Please try again."
      );
    } finally {
      setRemovingId(null);
    }
  };

  return (
    <DashboardShell
      title="Saved Content"
      subtitle="Affirmations, audio and articles you've kept close."
    >
      <div className="mx-auto w-full max-w-4xl">
        {/* Tabs */}
        <div
          role="tablist"
          aria-label="Saved content type"
          className="flex items-center gap-1 rounded-2xl bg-softLavender/60 p-1 mb-6 w-fit"
        >
          {TABS.map((tab, index) => {
            const selected = index === tabIndex;
            return (
              <button
                key={tab.kind}
                ref={(node) => {
                  tabRefs.current[index] = node;
                }}
                type="button"
                role="tab"
                id={`saved-tab-${tab.kind}`}
                aria-selected={selected}
                aria-controls={`saved-panel-${tab.kind}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setTabIndex(index)}
                onKeyDown={(e) => onTabKeyDown(e, index)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
                  selected
                    ? "bg-white text-brightPurple shadow-card"
                    : "text-brandSecondaryText hover:text-brandText"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Async status for remove actions */}
        <div aria-live="polite" className="min-h-[1rem] mb-3">
          {actionError && (
            <p role="alert" className="text-sm text-red-600">
              {actionError}
            </p>
          )}
        </div>

        <div
          role="tabpanel"
          id={`saved-panel-${activeTab.kind}`}
          aria-labelledby={`saved-tab-${activeTab.kind}`}
        >
          {loading && (
            <div
              aria-busy="true"
              aria-label="Loading saved content"
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 rounded-3xl bg-white border border-lavender/50 shadow-card p-4 animate-pulse"
                >
                  <div className="h-16 w-16 rounded-2xl bg-softLavender shrink-0" />
                  <div className="min-w-0 flex-1 space-y-2">
                    <div className="h-4 w-2/3 rounded-full bg-softLavender" />
                    <div className="h-3 w-1/3 rounded-full bg-softLavender/70" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && loadError && (
            <div className="rounded-3xl bg-white border border-red-200 shadow-card p-8 text-center">
              <h2 className="text-lg font-semibold text-brandText">
                Something went wrong
              </h2>
              <p role="alert" className="mt-2 text-sm text-brandSecondaryText">
                {loadError}
              </p>
              <div className="mt-5 flex justify-center">
                <Button onClick={() => void load(activeTab.kind)}>Try again</Button>
              </div>
            </div>
          )}

          {!loading && !loadError && items.length === 0 && (
            <div className="rounded-3xl bg-white border border-lavender/50 shadow-card p-10 text-center">
              <div className="mx-auto h-14 w-14 rounded-2xl bg-softLavender flex items-center justify-center text-brightPurple mb-5">
                <Bookmark className="h-7 w-7" />
              </div>
              <h2 className="text-lg font-semibold text-brandText">
                Nothing saved here yet
              </h2>
              <p className="mt-2 text-sm text-brandSecondaryText leading-relaxed max-w-md mx-auto">
                {activeTab.empty}
              </p>
              <div className="mt-6 flex justify-center">
                <Button asChild>
                  <Link href="/dashboard">Go to your dashboard</Link>
                </Button>
              </div>
            </div>
          )}

          {!loading && !loadError && items.length > 0 && (
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center gap-4 rounded-3xl bg-white border border-lavender/50 shadow-card p-4"
                >
                  <div
                    className="h-16 w-16 rounded-2xl shrink-0 overflow-hidden flex items-center justify-center bg-softLavender text-brightPurple"
                    style={item.gradient ? { background: item.gradient } : undefined}
                  >
                    {!item.gradient && <Bookmark className="h-6 w-6" />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[15px] font-semibold text-brandText truncate">
                      {item.title}
                    </p>
                    <div className="mt-1.5 flex items-center gap-2 flex-wrap">
                      {item.category && (
                        <span className="inline-flex items-center rounded-full bg-softLavender px-2.5 py-0.5 text-[11px] font-medium text-primaryPurple">
                          {item.category}
                        </span>
                      )}
                      <span className="text-[12px] text-brandSecondaryText">
                        {formatDate(item.createdAt)}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    aria-label={`Remove ${item.title}`}
                    onClick={() => void handleRemove(item)}
                    disabled={removingId === item.id}
                    className="h-9 w-9 rounded-xl flex items-center justify-center text-brandSecondaryText hover:text-red-500 hover:bg-red-50 disabled:opacity-60 disabled:cursor-not-allowed transition"
                  >
                    {removingId === item.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Trash2 className="h-4 w-4" />
                    )}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </DashboardShell>
  );
}
