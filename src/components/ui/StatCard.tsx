import * as React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function StatCard({
  label,
  value,
  trend,
  trendDirection = "up",
  className,
}: {
  label: string;
  value: string;
  trend?: string;
  trendDirection?: "up" | "down";
  className?: string;
}) {
  const TrendIcon = trendDirection === "up" ? TrendingUp : TrendingDown;
  return (
    <div className={cn("rounded-card bg-white p-6 shadow-sm", className)}>
      <p className="text-caption font-semibold uppercase tracking-wide text-ink-secondary">
        {label}
      </p>
      <div className="mt-2 flex items-end justify-between">
        <p className="font-heading text-h3-mobile font-extrabold text-navy">{value}</p>
        {trend && (
          <span
            className={cn(
              "flex items-center gap-1 text-caption font-semibold",
              trendDirection === "up" ? "text-success" : "text-danger"
            )}
          >
            <TrendIcon className="h-3.5 w-3.5" aria-hidden="true" />
            {trend}
          </span>
        )}
      </div>
    </div>
  );
}
