import * as React from "react";
import { cn } from "@/lib/utils";

type BadgeTone = "green" | "navy" | "silver" | "warning" | "danger";

const tones: Record<BadgeTone, string> = {
  green: "bg-green/10 text-green-hover",
  navy: "bg-navy/10 text-navy",
  silver: "bg-silver/30 text-ink-secondary",
  warning: "bg-warning/10 text-warning",
  danger: "bg-danger/10 text-danger",
};

export function Badge({
  tone = "navy",
  className,
  children,
}: {
  tone?: BadgeTone;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-pill px-4 py-1.5 text-caption font-semibold",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
