"use client";

import * as React from "react";
import type { FAQItem } from "@/types";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface FAQAccordionProps {
  items: FAQItem[];
  className?: string;
  allowMultiple?: boolean;
}

export function FAQAccordion({
  items,
  className,
  allowMultiple = true,
}: FAQAccordionProps) {
  const [open, setOpen] = React.useState<string | string[] | null>(
    allowMultiple ? [] : items[0]?.id ?? null
  );

  const toggle = (id: string) => {
    if (allowMultiple) {
      setOpen((prev) => {
        const arr = (prev as string[]) ?? [];
        return arr.includes(id) ? arr.filter((x) => x !== id) : [...arr, id];
      });
    } else {
      setOpen((prev) => (prev === id ? null : id));
    }
  };

  const isOpen = (id: string) =>
    allowMultiple ? (open as string[]).includes(id) : open === id;

  return (
    <div
      className={cn(
        "divide-y divide-lavender/60 rounded-3xl bg-white border border-lavender/50 shadow-card overflow-hidden",
        className
      )}
    >
      {items.map((item) => {
        const openState = isOpen(item.id);
        const contentId = `faq-content-${item.id}`;
        const btnId = `faq-btn-${item.id}`;
        return (
          <div key={item.id}>
            <h3>
              <button
                id={btnId}
                type="button"
                aria-expanded={openState}
                aria-controls={contentId}
                onClick={() => toggle(item.id)}
                className="w-full flex items-center gap-4 text-left px-6 md:px-8 py-6 hover:bg-softLavender/40 transition-colors"
              >
                <span className="flex-1 text-base md:text-lg font-semibold text-brandText tracking-tight pr-4">
                  {item.question}
                </span>
                <span
                  className={cn(
                    "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-softLavender text-primaryPurple transition-transform duration-300",
                    openState && "rotate-180 bg-brightPurple text-offWhite"
                  )}
                >
                  <ChevronDown className="h-5 w-5" />
                </span>
              </button>
            </h3>
            <div
              id={contentId}
              role="region"
              aria-labelledby={btnId}
              className={cn(
                "grid transition-all duration-300 ease-out motion-reduce:duration-0",
                openState ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              )}
            >
              <div className="overflow-hidden">
                <div className="px-6 md:px-8 pb-7">
                  <p className="text-base md:text-[15px] leading-relaxed text-brandSecondaryText max-w-3xl">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
