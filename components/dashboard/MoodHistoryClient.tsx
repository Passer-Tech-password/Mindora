"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/components/auth/AuthContext";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { moods } from "@/constants";
import type { MoodRecord } from "@/lib/firebase/functions";
import { History } from "lucide-react";

const dateTimeFormatter = new Intl.DateTimeFormat("en", {
  dateStyle: "medium",
  timeStyle: "short",
});
const weekdayFormatter = new Intl.DateTimeFormat("en", { weekday: "short" });

function formatDateTime(value: string) {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return "";
  return dateTimeFormatter.format(parsed);
}

function dayKey(date: Date) {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}

function colorForLabel(label: string) {
  const match = moods.find(
    (m) => m.label.toLowerCase() === label.toLowerCase()
  );
  return match?.color;
}

function emojiForLabel(label: string) {
  const match = moods.find(
    (m) => m.label.toLowerCase() === label.toLowerCase()
  );
  return match?.emoji;
}

function latestRecordForDay(records: MoodRecord[], day: Date): MoodRecord | null {
  const key = dayKey(day);
  let latest: MoodRecord | null = null;
  let latestTime = -Infinity;
  for (const record of records) {
    const parsed = new Date(record.createdAt);
    if (Number.isNaN(parsed.getTime())) continue;
    if (dayKey(parsed) !== key) continue;
    const time = parsed.getTime();
    if (time > latestTime) {
      latest = record;
      latestTime = time;
    }
  }
  return latest;
}

export function MoodHistoryClient() {
  const { getMoodHistory, saveMoodCheckIn } = useAuth();

  const [history, setHistory] = React.useState<MoodRecord[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [loadError, setLoadError] = React.useState<string | null>(null);

  const [selectedMoodId, setSelectedMoodId] = React.useState<string | null>(null);
  const [note, setNote] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);
  const [formError, setFormError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<string | null>(null);

  const load = React.useCallback(async () => {
    setLoading(true);
    setLoadError(null);
    try {
      const list = await getMoodHistory({ limit: 60 });
      setHistory(list);
    } catch (err) {
      setLoadError(
        err instanceof Error
          ? err.message
          : "We couldn't load your mood history right now."
      );
      setHistory([]);
    } finally {
      setLoading(false);
    }
  }, [getMoodHistory]);

  React.useEffect(() => {
    void load();
  }, [load]);

  const summary = React.useMemo(() => {
    const total = history.length;
    const distinct = new Set(history.map((h) => h.label)).size;
    const counts = new Map<string, number>();
    for (const record of history) {
      counts.set(record.label, (counts.get(record.label) ?? 0) + 1);
    }
    let topLabel: string | null = null;
    let topCount = 0;
    counts.forEach((count, label) => {
      if (count > topCount) {
        topCount = count;
        topLabel = label;
      }
    });
    return { total, distinct, topLabel };
  }, [history]);

  const last14Days = React.useMemo(() => {
    const today = new Date();
    const days: Date[] = [];
    for (let i = 13; i >= 0; i -= 1) {
      days.push(new Date(today.getFullYear(), today.getMonth(), today.getDate() - i));
    }
    return days;
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;
    const mood = moods.find((m) => m.id === selectedMoodId);
    if (!mood) {
      setFormError("Please pick a mood before saving.");
      return;
    }
    setSubmitting(true);
    setFormError(null);
    setSuccess(null);
    try {
      const record = await saveMoodCheckIn({
        label: mood.label,
        emoji: mood.emoji,
        note: note.trim() ? note.trim() : undefined,
      });
      setHistory((prev) => [record, ...prev]);
      setNote("");
      setSelectedMoodId(null);
      setSuccess("Check-in saved. Thanks for sharing how you feel.");
    } catch (err) {
      setFormError(
        err instanceof Error
          ? err.message
          : "We couldn't save your check-in. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <DashboardShell
      title="Mood History"
      subtitle="Your check-ins, patterns and gentle progress over time."
    >
      <div className="mx-auto w-full max-w-4xl space-y-6">
        {/* Summary strip */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: "Total check-ins", value: String(summary.total) },
            { label: "Distinct moods", value: String(summary.distinct) },
            {
              label: "Most frequent mood",
              value: summary.topLabel
                ? `${emojiForLabel(summary.topLabel) ?? ""} ${summary.topLabel}`.trim()
                : "—",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-3xl bg-white border border-lavender/50 shadow-card p-5"
            >
              <div className="text-[12px] font-medium uppercase tracking-wide text-brandSecondaryText">
                {stat.label}
              </div>
              <div className="mt-2 text-2xl font-bold text-brandText">
                {stat.value}
              </div>
            </div>
          ))}
        </section>

        {/* Log a check-in */}
        <section className="rounded-3xl bg-white border border-lavender/50 shadow-card p-5 md:p-6">
          <h2 className="text-lg font-semibold text-brandText tracking-tight">
            Log a check-in
          </h2>
          <p className="mt-1 text-sm text-brandSecondaryText">
            Take a moment to note how you feel right now.
          </p>

          <form onSubmit={handleSubmit} className="mt-5 space-y-5">
            <fieldset>
              <legend className="text-sm font-medium text-brandText mb-3">
                How are you feeling?
              </legend>
              <div className="flex flex-wrap gap-2">
                {moods.map((mood) => {
                  const selected = selectedMoodId === mood.id;
                  return (
                    <label
                      key={mood.id}
                      className={`inline-flex items-center gap-2 rounded-2xl border px-3.5 py-2 text-sm font-medium cursor-pointer transition ${
                        selected
                          ? "border-brightPurple bg-brightPurple/10 text-brightPurple"
                          : "border-lavender/60 bg-white text-brandSecondaryText hover:text-brandText hover:bg-softLavender/50"
                      }`}
                    >
                      <input
                        type="radio"
                        name="mood"
                        value={mood.id}
                        checked={selected}
                        onChange={() => setSelectedMoodId(mood.id)}
                        className="sr-only"
                      />
                      <span aria-hidden>{mood.emoji}</span>
                      <span>{mood.label}</span>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            <div>
              <label
                htmlFor="mood-note"
                className="block text-sm font-medium text-brandText mb-2"
              >
                Add a note (optional)
              </label>
              <textarea
                id="mood-note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={3}
                placeholder="What's contributing to how you feel?"
                className="block w-full rounded-2xl border border-lavender/50 bg-white px-4 py-3 text-sm text-brandText placeholder:text-brandSecondaryText/50 focus:outline-none focus:ring-2 focus:ring-brightPurple/40"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Button type="submit" loading={submitting} disabled={submitting}>
                Save check-in
              </Button>
            </div>

            <div aria-live="polite" className="min-h-[1rem]">
              {success && <p className="text-sm text-emerald-600">{success}</p>}
              {formError && (
                <p role="alert" className="text-sm text-red-600">
                  {formError}
                </p>
              )}
            </div>
          </form>
        </section>

        {/* 14-day pattern */}
        <section className="rounded-3xl bg-white border border-lavender/50 shadow-card p-5 md:p-6">
          <h2 className="text-lg font-semibold text-brandText tracking-tight">
            Last 14 days
          </h2>
          <p className="mt-1 text-sm text-brandSecondaryText">
            Each cell reflects the last check-in recorded that day.
          </p>

          <div className="mt-5 flex items-end gap-1.5 overflow-x-auto pb-1">
            {last14Days.map((day) => {
              const record = latestRecordForDay(history, day);
              const color = record ? colorForLabel(record.label) : undefined;
              const label = record
                ? `${formatDateTime(record.createdAt)} — ${record.label}`
                : `${weekdayFormatter.format(day)}: no check-in`;
              return (
                <div key={dayKey(day)} className="flex flex-col items-center gap-1.5">
                  <div
                    role="img"
                    aria-label={label}
                    title={label}
                    className={`h-9 w-9 rounded-xl border ${
                      color ? "border-transparent" : "border-lavender/40 bg-softLavender/50"
                    }`}
                    style={color ? { background: color } : undefined}
                  />
                  <span className="text-[10px] text-brandSecondaryText">
                    {weekdayFormatter.format(day).charAt(0)}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
            {moods.map((mood) => (
              <div key={mood.id} className="flex items-center gap-2">
                <span
                  aria-hidden
                  className="h-3 w-3 rounded-full"
                  style={{ background: mood.color }}
                />
                <span className="text-[12px] text-brandSecondaryText">
                  {mood.label}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* History list */}
        <section className="rounded-3xl bg-white border border-lavender/50 shadow-card p-5 md:p-6">
          <h2 className="text-lg font-semibold text-brandText tracking-tight">
            All check-ins
          </h2>

          {loading && (
            <div aria-busy="true" aria-label="Loading mood history" className="mt-5 space-y-3">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 rounded-2xl bg-softLavender/40 p-4 animate-pulse"
                >
                  <div className="h-10 w-10 rounded-xl bg-softLavender shrink-0" />
                  <div className="min-w-0 flex-1 space-y-2">
                    <div className="h-3.5 w-1/3 rounded-full bg-softLavender" />
                    <div className="h-3 w-2/3 rounded-full bg-softLavender/70" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && loadError && (
            <div className="mt-5 rounded-2xl border border-red-200 p-6 text-center">
              <p role="alert" className="text-sm text-brandSecondaryText">
                {loadError}
              </p>
              <div className="mt-4 flex justify-center">
                <Button onClick={() => void load()}>Try again</Button>
              </div>
            </div>
          )}

          {!loading && !loadError && history.length === 0 && (
            <div className="mt-5 rounded-2xl bg-softLavender/40 p-8 text-center">
              <div className="mx-auto h-14 w-14 rounded-2xl bg-white flex items-center justify-center text-brightPurple mb-4">
                <History className="h-7 w-7" />
              </div>
              <p className="text-sm text-brandSecondaryText leading-relaxed max-w-md mx-auto">
                No check-ins yet. Log how you feel to start seeing patterns.
              </p>
            </div>
          )}

          {!loading && !loadError && history.length > 0 && (
            <ul className="mt-5 space-y-3">
              {history.map((record) => (
                <li
                  key={record.id}
                  className="flex items-start gap-4 rounded-2xl bg-softLavender/40 p-4"
                >
                  <div
                    aria-hidden
                    className="h-10 w-10 rounded-xl bg-white flex items-center justify-center text-lg shrink-0"
                  >
                    {record.emoji}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[14px] font-semibold text-brandText">
                        {record.label}
                      </span>
                      <span className="text-[12px] text-brandSecondaryText">
                        {formatDateTime(record.createdAt)}
                      </span>
                    </div>
                    {record.note && (
                      <p className="mt-1 text-[13px] text-brandSecondaryText whitespace-pre-wrap break-words">
                        {record.note}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </DashboardShell>
  );
}
