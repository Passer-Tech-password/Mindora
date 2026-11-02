"use client";

import * as React from "react";
import { Search } from "lucide-react";
import type { FAQItem } from "@/types";
import { FAQAccordion } from "@/components/FAQAccordion";

interface HelpSearchProps {
  items: FAQItem[];
}

export function HelpSearch({ items }: HelpSearchProps) {
  const [query, setQuery] = React.useState("");

  const normalized = query.trim().toLowerCase();

  const filtered = React.useMemo(() => {
    if (!normalized) return items;
    return items.filter(
      (item) =>
        item.question.toLowerCase().includes(normalized) ||
        item.answer.toLowerCase().includes(normalized)
    );
  }, [items, normalized]);

  return (
    <div className="mx-auto max-w-3xl">
      <label htmlFor="help-search" className="sr-only">
        Search help articles
      </label>
      <div className="relative">
        <Search
          className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-brandSecondaryText"
          aria-hidden
        />
        <input
          id="help-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search help articles"
          autoComplete="off"
          className="w-full rounded-2xl border border-lavender/50 bg-white py-4 pl-12 pr-4 text-base text-brandText shadow-card placeholder:text-brandSecondaryText/70 focus:border-brightPurple focus:outline-none"
        />
      </div>

      <div className="mt-6">
        {filtered.length > 0 ? (
          <FAQAccordion items={filtered} />
        ) : (
          <div className="rounded-3xl border border-lavender/50 bg-white p-10 text-center shadow-card">
            <p className="text-base text-brandSecondaryText">
              No articles match &quot;{query.trim()}&quot;. Try a different
              search term.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
