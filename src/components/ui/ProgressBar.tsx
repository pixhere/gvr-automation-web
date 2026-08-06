import * as React from "react";

/** Assessment progress indicator: step label + percentage bar. */
export function ProgressBar({
  current,
  total,
  label,
}: {
  current: number;
  total: number;
  label?: string;
}) {
  const percent = Math.round((current / total) * 100);
  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-caption font-semibold text-ink-secondary">
        <span>{label ?? `Step ${current} of ${total}`}</span>
        <span>{percent}% Complete</span>
      </div>
      <div
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        className="h-2 w-full overflow-hidden rounded-pill bg-navy/10"
      >
        <div
          className="h-full rounded-pill bg-green transition-all duration-slow ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
