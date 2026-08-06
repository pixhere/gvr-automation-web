import * as React from "react";
import type { LucideIcon } from "lucide-react";
import { Card } from "./Card";
import { cn } from "@/lib/utils";

/** Icon + short copy card. Used for problem cards, solution cards, pillar cards. */
export function IconCard({
  icon: Icon,
  title,
  description,
  tone = "navy",
  className,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  // Revision #2: "navy-strong" is a darker, higher-contrast treatment for
  // icons that were fading into light backgrounds (e.g. the Problem section).
  tone?: "navy" | "navy-strong" | "green";
  className?: string;
}) {
  const toneClasses = {
    navy: "bg-navy/5 text-navy",
    "navy-strong": "bg-navy-800/10 text-navy-800",
    green: "bg-green/10 text-green-hover",
  }[tone];
  return (
    // Revision #1: ~10-15% more padding than the base Card (p-11 = 44px vs
    // the base p-10 = 40px) plus more room between icon / title / description.
    <Card hoverable className={cn("h-full p-11", className)}>
      <div
        className={cn(
          "mb-7 flex h-12 w-12 items-center justify-center rounded-input",
          toneClasses
        )}
      >
        <Icon className="h-6 w-6" strokeWidth={1.75} aria-hidden="true" />
      </div>
      <h3 className="text-h4-mobile font-heading font-bold text-navy">{title}</h3>
      <p className="mt-4 text-small text-ink-secondary leading-relaxed">{description}</p>
    </Card>
  );
}
