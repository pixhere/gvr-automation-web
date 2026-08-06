import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TimelineStep {
  title: string;
  description?: string;
  status?: "complete" | "current" | "upcoming";
}

/**
 * Connected timeline cards — vertical on mobile, horizontal with a thin
 * green connecting line on desktop. Revision #1: bigger numbered circles,
 * bolder titles, each step wrapped in a hoverable card, guides the eye
 * left to right.
 */
export function Timeline({ steps }: { steps: TimelineStep[] }) {
  // Revision #3 bugfix: gap-8 rendered as 8px (spacing override) — far too
  // tight between stacked mobile cards.
  return (
    <ol className="grid grid-cols-1 gap-10 md:grid-cols-4 md:gap-6">
      {steps.map((step, index) => {
        const status = step.status ?? "upcoming";
        const isLast = index === steps.length - 1;
        return (
          <li key={step.title} className="relative">
            {/* Connecting line — desktop only, spans from this circle to the next. */}
            {!isLast && (
              <div
                aria-hidden="true"
                className="absolute left-[calc(50%+45px)] right-[calc(-50%+45px)] top-[45px] hidden h-0.5 bg-green/40 md:block"
              />
            )}
            <div
              className={cn(
                "group flex h-full flex-col items-start gap-4 rounded-card bg-white p-6 shadow-sm transition-all duration-DEFAULT hover:-translate-y-1 hover:shadow-md md:items-center md:text-center"
              )}
            >
              {/* Revision #2: numbers enlarged ~40% (64px → 90px) so they
                  visually anchor each card. */}
              <div
                className={cn(
                  "relative z-10 flex h-[90px] w-[90px] flex-shrink-0 items-center justify-center rounded-pill font-heading text-h3-mobile font-bold ring-4 ring-white transition-transform duration-DEFAULT group-hover:scale-105",
                  status === "complete" && "bg-green text-white",
                  status === "current" && "bg-navy text-white",
                  status === "upcoming" && "bg-navy/10 text-navy"
                )}
              >
                {status === "complete" ? (
                  <Check className="h-10 w-10" aria-hidden="true" />
                ) : (
                  index + 1
                )}
              </div>
              <div>
                <p className="font-heading text-body font-extrabold text-navy">{step.title}</p>
                {step.description && (
                  <p className="mt-2 text-small text-ink-secondary leading-relaxed">
                    {step.description}
                  </p>
                )}
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
