import type { Metadata } from "next";
import { ThankYouContent } from "@/components/sections/ThankYouContent";

export const metadata: Metadata = {
  title: "Your Business Growth Assessment™ Has Been Received",
  description: "Thank you for completing your Business Growth Assessment. Here's what happens next.",
  robots: { index: false, follow: false }, // post-submission page — not for search indexing
};

export default function ThankYouPage() {
  return <ThankYouContent />;
}
