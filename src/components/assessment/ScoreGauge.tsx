import * as React from "react";
import { cn } from "@/lib/utils";

const tierColors = {
  green: "#22C55E",
  yellow: "#F59E0B",
  red: "#EF4444",
} as const;

export function ScoreGauge({
  score,
  tier,
  size = 180,
}: {
  score: number;
  tier: "green" | "yellow" | "red";
  size?: number;
}) {
  const stroke = 14;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#E5E7EB" strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={tierColors[tier]}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-[stroke-dashoffset] duration-slow ease-out"
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="font-heading text-h2-mobile font-extrabold text-navy">{score}</span>
        <span className="text-caption text-ink-secondary">/ 100</span>
      </div>
    </div>
  );
}

export function TierBadge({ tier, label }: { tier: "green" | "yellow" | "red"; label: string }) {
  const dot = { green: "🟢", yellow: "🟡", red: "🔴" }[tier];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-pill px-4 py-1.5 text-caption font-semibold",
        tier === "green" && "bg-success/10 text-success",
        tier === "yellow" && "bg-warning/10 text-warning",
        tier === "red" && "bg-danger/10 text-danger"
      )}
    >
      <span aria-hidden="true">{dot}</span> {label}
    </span>
  );
}
