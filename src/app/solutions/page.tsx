import type { Metadata } from "next";
import {
  PhoneCall,
  Database,
  Globe,
  MessageSquare,
  PhoneMissed,
  ClipboardList,
  Star,
  Workflow,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { PageHeader } from "@/components/ui/PageHeader";
import { CTABanner } from "@/components/ui/CTABanner";

export const metadata: Metadata = {
  title: "Business Automation Solutions",
  description:
    "AI receptionist, CRM, missed call text-back, AI chat widget, and websites built for local service businesses — explore every GVR Automation solution in one place.",
};

const solutions = [
  {
    id: "ai-receptionist",
    icon: PhoneCall,
    title: "GVR AI Receptionist™",
    description:
      "Answers calls 24/7, qualifies leads, books appointments, and routes urgent calls — so no opportunity goes unanswered.",
    href: "/ai-receptionist",
    linkLabel: "View AI Receptionist details",
  },
  {
    id: "crm",
    icon: Database,
    title: "CRM & Business Organization",
    description:
      "One place for every customer, every conversation, and every follow-up — nothing falls through the cracks.",
  },
  {
    id: "websites",
    icon: Globe,
    title: "Websites, Funnels & Landing Pages",
    description:
      "Professional online experiences built to convert visitors into customers, not just look good.",
  },
  {
    id: "chat-widget",
    icon: MessageSquare,
    title: "AI Chat Widget",
    description: "Answers visitor questions and books appointments on your website, 24/7.",
  },
  {
    id: "missed-call-text-back",
    icon: PhoneMissed,
    title: "Missed Call Text-Back",
    description:
      "Automatically texts anyone whose call you miss, so they know you'll be right with them.",
  },
  {
    id: "forms",
    icon: ClipboardList,
    title: "Forms, Surveys & Business Growth Assessment™",
    description:
      "Collect better information and qualify leads automatically, starting with the free Business Growth Assessment.",
    href: "/business-growth-assessment",
    linkLabel: "Take the Assessment",
  },
  {
    id: "reviews",
    icon: Star,
    title: "Review Automation",
    description:
      "Automatically requests reviews after completed work and tracks reputation growth over time.",
    comingSoon: true,
  },
  {
    id: "automation",
    icon: Workflow,
    title: "Workflow Automation",
    description:
      "The behind-the-scenes engine that ties everything together — reminders, follow-ups, and internal notifications.",
  },
] as const;

export default function SolutionsPage() {
  return (
    <>
      <SectionContainer background="navy" innerClassName="py-20 md:py-28">
        <PageHeader
          eyebrow="Solutions"
          title="Every System Your Business Needs to Grow"
          description="We don't start with software. We start by understanding how your business operates today — then recommend only what solves your biggest challenge first."
          dark
        />
      </SectionContainer>

      <SectionContainer background="white">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {/* Revision #2: p-9 (slightly less than the base p-10) + larger
              description text fills the excess whitespace these cards had. */}
          {solutions.map((solution) => (
            <Card key={solution.id} id={solution.id} hoverable className="scroll-mt-28 p-9">
              <div className="flex items-start justify-between">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-input bg-green/10 text-green-hover">
                  <solution.icon className="h-6 w-6" strokeWidth={1.75} aria-hidden="true" />
                </div>
                {"comingSoon" in solution && solution.comingSoon && (
                  <Badge tone="silver">Coming Soon</Badge>
                )}
              </div>
              <h2 className="text-h4-mobile font-heading font-bold text-navy">{solution.title}</h2>
              <p className="mt-3 text-body text-ink-secondary leading-relaxed">{solution.description}</p>
              {"href" in solution && solution.href && (
                <a
                  href={solution.href}
                  className="mt-5 inline-block text-small font-semibold text-green-hover hover:underline"
                >
                  {solution.linkLabel}
                </a>
              )}
            </Card>
          ))}
        </div>
      </SectionContainer>

      <SectionContainer background="muted">
        <CTABanner />
      </SectionContainer>
    </>
  );
}
