import type { Metadata } from "next";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { AssessmentWizard } from "@/components/assessment/AssessmentWizard";

export const metadata: Metadata = {
  title: "Free Business Growth Assessment™",
  description:
    "Discover where your business may be losing time, opportunities, and revenue — and receive personalized recommendations in under 3 minutes.",
};

export default function BusinessGrowthAssessmentPage() {
  return (
    <SectionContainer background="muted" innerClassName="py-[64px] md:py-20">
      <AssessmentWizard />
    </SectionContainer>
  );
}
