import type { Metadata } from "next";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { PageHeader } from "@/components/ui/PageHeader";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { CTABanner } from "@/components/ui/CTABanner";

export const metadata: Metadata = {
  title: "FAQ | AI & Automation Questions",
  description:
    "Answers to common questions about GVR Automation's AI receptionist, CRM, business automation, the free Business Growth Assessment, pricing, and how we work.",
};

const faqGroups = [
  {
    category: "The Assessment",
    items: [
      { question: "How long does the assessment take?", answer: "Less than 3 minutes for most business owners." },
      { question: "Do I need a CRM to complete it?", answer: "No — the assessment asks about your business as it runs today, whatever tools you currently use (or don't)." },
      { question: "What happens after I submit?", answer: "You'll receive a personalized Business Growth Score™ and report, and the option to schedule a free strategy session." },
      { question: "Do I have to buy anything?", answer: "No. The assessment and strategy session are both free, with no obligation." },
    ],
  },
  {
    category: "Working With GVR",
    items: [
      { question: "Can you work with my existing systems?", answer: "In most cases, yes — we'll review what you have during your strategy session and recommend whether to improve it or replace it." },
      { question: "Is this only for service businesses?", answer: "Our primary focus is local service businesses (junk removal, landscaping, HVAC, plumbing, roofing, and similar trades), with expansion into other industries planned." },
      { question: "Can I start with one solution?", answer: "Yes. We never bundle services you don't need — we recommend only what solves your biggest problem first." },
      { question: "How long does setup take?", answer: "It varies by service, but most implementations are measured in days, not months." },
      { question: "Will this replace my employees?", answer: "No. The goal is to remove repetitive work, not replace the people who make your business run." },
    ],
  },
  {
    category: "Pricing",
    items: [
      { question: "How much does it cost?", answer: "Pricing depends on which solutions fit your business — we'll walk through exact numbers during your strategy session." },
      { question: "Is there a contract?", answer: "Terms are discussed during your consultation. We believe in earning a long-term partnership through results." },
    ],
  },
] as const;

export default function FAQPage() {
  return (
    <>
      <SectionContainer background="muted" innerClassName="py-20 md:py-28">
        <PageHeader eyebrow="FAQ" title="Frequently Asked Questions" />
      </SectionContainer>

      <SectionContainer background="white">
        <div className="mx-auto max-w-3xl space-y-14">
          {faqGroups.map((group) => (
            <div key={group.category}>
              <h2 className="mb-5 font-heading text-h4-mobile font-bold text-navy">{group.category}</h2>
              <FAQAccordion items={[...group.items]} />
            </div>
          ))}
        </div>
      </SectionContainer>

      <SectionContainer background="muted">
        <CTABanner />
      </SectionContainer>
    </>
  );
}
