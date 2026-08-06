import type { Metadata } from "next";
import { PricingCard } from "@/components/ui/PricingCard";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { PageHeader } from "@/components/ui/PageHeader";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { CTABanner } from "@/components/ui/CTABanner";
import { pricingTiers, pricingFootnote } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "AI Automation Pricing & Plans",
  description:
    "GVR Start, GVR Growth, and GVR Scale — transparent monthly pricing for AI receptionist, CRM, and business automation built for local service businesses.",
};

const pricingFaqs = [
  {
    question: "Is there a setup fee?",
    answer:
      "Every plan includes Professional Setup & Configuration — we don't call it a setup fee because it's part of making sure your systems actually work on day one, not a separate line item you have to negotiate.",
  },
  {
    question: "Can I change plans later?",
    answer:
      "Yes. Most clients start with the plan that solves today's biggest problem and grow into the next tier as their business does.",
  },
  {
    question: "Do I have to sign a long-term contract?",
    answer:
      "We'll walk through terms during your strategy session — our goal is a long-term partnership earned through results, not a contract that locks you in.",
  },
];

export default function PricingPage() {
  return (
    <>
      <SectionContainer background="muted" innerClassName="py-20 md:py-28">
        <PageHeader
          eyebrow="Pricing"
          title="Investment That Matches Your Business"
          description="We don't emphasize price over outcomes. Every plan is Professional Setup & Configuration plus an ongoing partnership — not just software access."
        />
      </SectionContainer>

      <SectionContainer background="white">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {pricingTiers.map((tier) => (
            <PricingCard key={tier.id} {...tier} />
          ))}
        </div>
        <p className="mx-auto mt-10 max-w-2xl text-center text-small text-ink-secondary">
          {pricingFootnote}
        </p>
      </SectionContainer>

      <SectionContainer background="muted">
        <PageHeader title="Pricing Questions" />
        <div className="mx-auto mt-12 max-w-3xl">
          <FAQAccordion items={pricingFaqs} />
        </div>
      </SectionContainer>

      <SectionContainer background="white">
        <CTABanner ctaLabel="Talk With Us" ctaHref="/contact" secondaryLabel="" secondaryHref="" />
      </SectionContainer>
    </>
  );
}
