"use client";

import * as React from "react";
import { CheckCircle2, Clock, Ear, HeartHandshake, ShieldCheck, Target } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { Timeline } from "@/components/ui/Timeline";
import { ScoreGauge, TierBadge } from "@/components/assessment/ScoreGauge";
import { CalendarEmbed } from "@/components/sections/CalendarEmbed";
import { RESULT_SESSION_KEY } from "@/lib/assessment/storage";
import type { AssessmentAnswers, AssessmentResult } from "@/types/assessment";

interface StoredResult {
  answers: AssessmentAnswers;
  result: AssessmentResult;
}

export function ThankYouContent() {
  const [stored, setStored] = React.useState<StoredResult | null | undefined>(undefined);

  React.useEffect(() => {
    try {
      const raw = window.sessionStorage.getItem(RESULT_SESSION_KEY);
      setStored(raw ? (JSON.parse(raw) as StoredResult) : null);
    } catch {
      setStored(null);
    }
  }, []);

  // Loading (avoids a flash of the "no result" state before sessionStorage is read).
  if (stored === undefined) return null;

  return (
    <>
      <SectionContainer background="navy" innerClassName="py-20 text-center md:py-28">
        <CheckCircle2 className="mx-auto h-14 w-14 text-green" aria-hidden="true" />
        <h1 className="mt-6 font-heading text-h2-mobile md:text-h2 font-extrabold text-white">
          Your Business Growth Assessment™ Has Been Received
        </h1>
        <p className="mx-auto mt-5 max-w-prose text-body text-white/80">
          Thank you for taking the time to share information about your business. We&rsquo;re now
          reviewing your responses to better understand your current systems, opportunities, and
          goals. Every recommendation we make is based on helping your business grow — not
          selling unnecessary services.
        </p>
      </SectionContainer>

      {stored && (
        <SectionContainer background="white">
          <div className="mx-auto max-w-4xl">
            <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
              <div className="text-center">
                <ScoreGauge score={stored.result.overallScore} tier={stored.result.overallTier} />
                <div className="mt-4">
                  <TierBadge tier={stored.result.overallTier} label={stored.result.overallLabel} />
                </div>
                <p className="mx-auto mt-4 max-w-xs text-caption text-ink-secondary">
                  This score is designed to highlight opportunities for improvement — not to
                  judge your business. Every successful business has room to grow.
                </p>
              </div>
              <div className="space-y-4">
                {stored.result.categories.map((cat) => (
                  <div key={cat.id} className="flex items-center justify-between gap-4">
                    <span className="text-small font-semibold text-navy">{cat.label}</span>
                    <div className="flex flex-1 items-center gap-3">
                      <div className="h-2 flex-1 overflow-hidden rounded-pill bg-navy/10">
                        <div
                          className={
                            cat.tier === "green"
                              ? "h-full rounded-pill bg-success"
                              : cat.tier === "yellow"
                                ? "h-full rounded-pill bg-warning"
                                : "h-full rounded-pill bg-danger"
                          }
                          style={{ width: `${cat.score}%` }}
                        />
                      </div>
                      <span aria-hidden="true">
                        {cat.tier === "green" ? "🟢" : cat.tier === "yellow" ? "🟡" : "🔴"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
              <Card>
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-input bg-green/10 text-green-hover">
                  <Target className="h-5 w-5" aria-hidden="true" />
                </div>
                <h2 className="font-heading text-h4-mobile font-bold text-navy">Recommended Priorities</h2>
                <ul className="mt-4 space-y-4">
                  {stored.result.recommendations.map((rec, i) => (
                    <li key={rec.title}>
                      <p className="text-small font-semibold text-navy">
                        Priority {i + 1}: {rec.title}
                      </p>
                      <p className="mt-1 text-small text-ink-secondary">{rec.body}</p>
                      <Badge tone="green" className="mt-2">
                        {rec.impact}
                      </Badge>
                    </li>
                  ))}
                </ul>
              </Card>

              <Card>
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-input bg-green/10 text-green-hover">
                  <Clock className="h-5 w-5" aria-hidden="true" />
                </div>
                <h2 className="font-heading text-h4-mobile font-bold text-navy">
                  Estimated Weekly Time Savings
                </h2>
                <p className="mt-3 font-heading text-h3-mobile font-extrabold text-green-hover">
                  {stored.result.estimatedWeeklyHoursSaved}
                </p>
                <p className="mt-3 text-caption text-ink-secondary">
                  Estimates vary depending on business size and processes. Your strategy session
                  will refine this based on a real conversation about your business.
                </p>
              </Card>
            </div>
          </div>
        </SectionContainer>
      )}

      <SectionContainer background="muted">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-heading text-h2-mobile font-extrabold text-navy">
            This Is a Conversation — Not a Sales Pitch.
          </h2>
          <p className="mx-auto mt-5 max-w-prose text-body text-ink-secondary">
            Our first meeting is about understanding your business. For the first 10–15 minutes,
            we&rsquo;ll discuss your goals, challenges, and what you shared in the assessment.
            Only after we fully understand your business will we recommend any solutions.
            Sometimes those recommendations involve AI and automation. Sometimes they
            don&rsquo;t. If we don&rsquo;t believe we&rsquo;re the right fit, we&rsquo;ll tell
            you.
          </p>
        </div>
      </SectionContainer>

      <SectionContainer background="white">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center font-heading text-h3-mobile font-bold text-navy">
            What Happens Next
          </h2>
          <div className="mt-12">
            <Timeline
              steps={[
                { title: "Assessment Submitted", status: "complete" },
                { title: "Business Review", description: "We review your answers and identify opportunities.", status: "current" },
                { title: "Strategy Session", description: "We discuss your business and determine fit.", status: "upcoming" },
                { title: "Growth Plan", description: "A customized plan focused on your goals.", status: "upcoming" },
              ]}
            />
          </div>
        </div>
      </SectionContainer>

      <SectionContainer background="muted">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center font-heading text-h3-mobile font-bold text-navy">
            Prepare for Your Session
          </h2>
          <div className="mx-auto mt-8 max-w-lg rounded-card bg-white p-8 shadow-sm">
            <p className="text-small font-semibold text-navy">Please have the following ready:</p>
            <ul className="mt-4 space-y-2 text-small text-ink-secondary">
              <li>• Your biggest business challenge</li>
              <li>• Your current lead process</li>
              <li>• Questions you&rsquo;d like answered</li>
              <li>• Any current software you use (optional)</li>
            </ul>
            <p className="mt-4 text-caption text-ink-secondary">
              Estimated meeting length: 30–45 minutes
            </p>
          </div>
        </div>
      </SectionContainer>

      <SectionContainer background="white">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-heading text-h2-mobile font-extrabold text-navy">Why We Exist</h2>
          <p className="mx-auto mt-6 max-w-prose text-body text-ink-secondary">
            We know that behind every business is a person balancing work, family, and
            responsibility. Our goal isn&rsquo;t just to help you automate tasks. It&rsquo;s to
            help you create a business that gives you more time to focus on the people and
            moments that matter most. Technology is simply one of the tools we use to help make
            that possible.
          </p>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {[
              { icon: Ear, label: "We Will Listen First" },
              { icon: ShieldCheck, label: "We Will Be Honest" },
              { icon: HeartHandshake, label: "We Will Build Around Your Goals" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="rounded-card bg-surface-muted p-6">
                <Icon className="mx-auto h-6 w-6 text-green-hover" aria-hidden="true" />
                <p className="mt-3 text-small font-semibold text-navy">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </SectionContainer>

      <SectionContainer background="muted">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-heading text-h2-mobile font-extrabold text-navy">
            Let&rsquo;s Build a Business That Works Better for You.
          </h2>
          <div className="mt-10">
            <CalendarEmbed />
          </div>
          <Button href="/" variant="text" className="mt-8">
            Return to Home
          </Button>
        </div>
      </SectionContainer>
    </>
  );
}
