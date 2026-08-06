"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FAQItem {
  question: string;
  answer: string;
}

/**
 * Accessible accordion: button-controlled, aria-expanded, keyboard operable
 * by default (native <button>). Revision #1: more padding, a visible hover
 * state, and a smooth expand/collapse animation (CSS grid-rows technique —
 * no JS height measurement needed).
 */
export function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  return (
    <div className="divide-y divide-border rounded-card border border-border bg-white">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const panelId = `faq-panel-${index}`;
        const buttonId = `faq-button-${index}`;
        return (
          <div key={item.question}>
            <h3>
              <button
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex w-full items-center justify-between gap-4 px-6 py-[32px] text-left transition-colors duration-DEFAULT hover:bg-surface-muted"
              >
                <span className="font-heading font-semibold text-navy">{item.question}</span>
                <ChevronDown
                  className={cn(
                    "h-5 w-5 flex-shrink-0 text-ink-secondary transition-transform duration-DEFAULT",
                    isOpen && "rotate-180 text-green-hover"
                  )}
                  aria-hidden="true"
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={cn(
                "grid transition-[grid-template-rows] duration-DEFAULT ease-out",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              )}
            >
              <div className="overflow-hidden">
                <p className="px-6 pb-[32px] text-small text-ink-secondary leading-relaxed">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
