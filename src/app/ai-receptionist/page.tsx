import type { Metadata } from "next";
import {
  Clock,
  CalendarCheck,
  ListChecks,
  PhoneForwarded,
  MessageCircleQuestion,
  Moon,
  PhoneMissed,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { IconCard } from "@/components/ui/IconCard";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { PageHeader } from "@/components/ui/PageHeader";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { CTABanner } from "@/components/ui/CTABanner";
import { primaryCta, aiReceptionistStartingPrice } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "GVR AI Receptionist™ | Never Miss Another Customer Call",
  description:
    "GVR AI Receptionist answers calls 24/7, qualifies leads, books appointments, and makes sure your business is never unavailable — even after hours.",
};

const benefits = [
  { icon: Moon, title: "24/7 Availability", description: "Your business is never closed to a new opportunity, even nights and weekends." },
  { icon: MessageCircleQuestion, title: "Answers FAQs", description: "Common questions get answered immediately, without pulling you away from work." },
  { icon: CalendarCheck, title: "Books Appointments", description: "Customers can schedule directly, without waiting for a callback." },
  { icon: PhoneForwarded, title: "Routes Calls", description: "Urgent or complex calls are routed to the right person automatically." },
  { icon: ListChecks, title: "Collects Lead Info", description: "Every caller's details are captured cleanly — no more scribbled notes." },
  { icon: Clock, title: "Reduces Interruptions", description: "Handle repetitive conversations automatically so you can focus on the work only you can do." },
];

const objections = [
  {
    question: "“I don’t think AI can replace me.”",
    answer:
      "It shouldn't. The goal isn't to replace your experience. It's to handle repetitive conversations so you can focus on the ones that need you.",
  },
  {
    question: "“It's too expensive.”",
    answer:
      "If one missed customer is worth $500 to your business, recovering just one or two opportunities each month may cover the investment.",
  },
  {
    question: "“My customers want a real person.”",
    answer:
      "They still can. The AI simply ensures no one feels ignored while your team is unavailable.",
  },
];

export default function AIReceptionistPage() {
  return (
    <>
      <section className="bg-navy py-20 md:py-28">
        <div className="container-page">
          <PageHeader
            eyebrow="GVR AI Receptionist™"
            title="Never Miss Another Customer Call Again."
            description="Every missed call is a customer who needed help. GVR AI Receptionist helps ensure your business is available even when you're busy, after hours, or with another customer."
            dark
          />
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button href={primaryCta.href}>{primaryCta.label}</Button>
            <Badge tone="green">Starting at {aiReceptionistStartingPrice}</Badge>
          </div>
          <p className="mt-3 text-center text-caption text-white/50">
            *Pricing depends on usage and configuration.
          </p>
        </div>
      </section>

      <SectionContainer background="muted">
        <PageHeader
          eyebrow="The Problem"
          title="What happens when someone calls after hours?"
          description="Missed calls, after-hours inquiries, repeated questions, and scheduling requests don't stop when the workday ends. Without a system, they simply go unanswered — and often, to a competitor."
        />
        <div className="mx-auto mt-10 flex max-w-2xl items-center justify-center gap-3 rounded-input bg-white p-6 shadow-sm">
          <PhoneMissed className="h-6 w-6 flex-shrink-0 text-danger" aria-hidden="true" />
          <p className="text-small text-ink-secondary">
            Most businesses don&rsquo;t intentionally ignore customers. They&rsquo;re simply
            busy. Every unanswered call represents someone who needed help — and often, they
            call the next company.
          </p>
        </div>
      </SectionContainer>

      <SectionContainer background="white">
        <PageHeader eyebrow="Core Benefits" title="What GVR AI Receptionist Does For You" />
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit) => (
            <IconCard key={benefit.title} {...benefit} tone="green" />
          ))}
        </div>
      </SectionContainer>

      <SectionContainer background="muted">
        <PageHeader eyebrow="Ideal Customer" title="Built for businesses that answer the phone" />
        <div className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-4 text-center sm:grid-cols-5">
          {["Solo Owner", "Small Team", "Busy Office", "Growing Business", "Frequently Misses Calls"].map((c) => (
            <div key={c} className="rounded-input bg-white px-4 py-6 text-small font-semibold text-navy shadow-sm">
              {c}
            </div>
          ))}
        </div>
      </SectionContainer>

      <SectionContainer background="white">
        <PageHeader eyebrow="Common Questions & Concerns" title="What Business Owners Ask Us" />
        <div className="mx-auto mt-12 max-w-3xl">
          <FAQAccordion items={objections} />
        </div>
      </SectionContainer>

      <SectionContainer background="muted">
        <CTABanner
          title="Learn About GVR AI Receptionist"
          description="Schedule a strategy session and let's talk about what happens after hours in your business."
          ctaLabel="Schedule a Strategy Session"
          ctaHref="/business-growth-assessment"
        />
      </SectionContainer>
    </>
  );
}
