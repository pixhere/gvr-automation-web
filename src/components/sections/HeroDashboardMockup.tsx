import * as React from "react";
import { PhoneMissed, Clock, Zap, TrendingUp } from "lucide-react";

/**
 * Abstract "GVR platform" dashboard preview for the hero.
 * Intentionally NOT a literal GoHighLevel screenshot — a custom,
 * on-brand representation of the Business Growth Score™ dashboard.
 */
export function HeroDashboardMockup() {
  return (
    // Revision #1/2: premium polish pass — larger radius, deeper shadow, more
    // padding, subtle hover lift, and (rev 2) sized up since people naturally
    // look here right after reading the headline.
    <div className="relative mx-auto max-w-lg rounded-card-lg border border-white/10 bg-white/95 p-9 shadow-xl backdrop-blur transition-transform duration-slow hover:-translate-y-1">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-caption font-semibold uppercase tracking-wide text-ink-secondary">
            Business Growth Score™
          </p>
          <p className="mt-1 font-heading text-h3-mobile font-extrabold text-navy">74</p>
        </div>
        {/* Revision #3 bugfix: h-16/w-16 rendered as 16px under the spacing
            override — nowhere near enough room for "74%" text. */}
        <div className="flex h-[64px] w-[64px] flex-shrink-0 items-center justify-center rounded-pill border-4 border-green text-caption font-bold text-green-hover">
          74%
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <div className="rounded-input bg-surface-muted p-4">
          <PhoneMissed className="h-4 w-4 text-danger" aria-hidden="true" />
          <p className="mt-2 text-caption text-ink-secondary">Missed Calls</p>
          <p className="font-heading text-body font-bold text-navy">12 → 2</p>
        </div>
        <div className="rounded-input bg-surface-muted p-4">
          <Clock className="h-4 w-4 text-navy" aria-hidden="true" />
          <p className="mt-2 text-caption text-ink-secondary">Response Time</p>
          <p className="font-heading text-body font-bold text-navy">Under 2 min</p>
        </div>
        <div className="rounded-input bg-surface-muted p-4">
          <Zap className="h-4 w-4 text-green-hover" aria-hidden="true" />
          <p className="mt-2 text-caption text-ink-secondary">Automation</p>
          <p className="font-heading text-body font-bold text-navy">Active</p>
        </div>
        <div className="rounded-input bg-surface-muted p-4">
          <TrendingUp className="h-4 w-4 text-green-hover" aria-hidden="true" />
          <p className="mt-2 text-caption text-ink-secondary">Growth</p>
          <p className="font-heading text-body font-bold text-navy">+18% Leads</p>
        </div>
      </div>

      <div className="mt-5 rounded-input bg-navy p-4 text-white">
        <p className="text-caption font-semibold text-white/70">Growth Opportunity</p>
        <p className="mt-1 text-small">
          Automating follow-up could recover 3–5 leads/month.
        </p>
      </div>
    </div>
  );
}
