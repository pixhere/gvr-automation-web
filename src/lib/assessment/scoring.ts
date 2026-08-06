import type { AssessmentAnswers, AssessmentResult, CategoryScore, ScoreCategoryId } from "@/types/assessment";

/**
 * Business Growth Score™ — scoring engine.
 *
 * ⚠️ MERGED MODEL — per founder decision (build checkpoint, Phase 3 review):
 * the blueprint's original point-based system (Part 3 of the 12-part
 * doc: e.g. "Misses 10+ Calls → +20", "No CRM → +15", max 100, three
 * tiers) is the scoring LOGIC. Phase 3's seven categories (Lead
 * Capture, Communication, Automation, Operations, Customer Experience,
 * Digital Presence, Owner Freedom) are the DISPLAY structure.
 *
 * Each category below is scored 0-100 using explicit, documented point
 * rules in the same spirit as the original rubric — higher score means
 * MORE opportunity (more room to improve), matching the original
 * tiers: 0-39 Strong Foundation, 40-69 Growth Opportunity, 70-100 High
 * Opportunity. The overall score is the average of all seven category
 * scores, capped at 100.
 *
 * These exact point values are a reasonable first version, not a
 * number handed down by the blueprint — they are easy to tune in one
 * place as real assessment data comes in (see "Assessment
 * Intelligence" in Part 11 of the blueprint).
 */

function clamp(n: number, min = 0, max = 100) {
  return Math.max(min, Math.min(max, n));
}

function scoreLeadCapture(a: AssessmentAnswers): number {
  let points = 0;
  if (a.monthlyLeads === "0-20") points += 25;
  if (a.leadSources.length <= 1) points += 20;
  if (a.systems.landingPages === "no") points += 15;
  if (a.systems.website === "no") points += 20;
  if (a.systems.funnels === "no") points += 10;
  if (a.systems.onlineBooking === "no") points += 10;
  return clamp(points);
}

function scoreCommunication(a: AssessmentAnswers): number {
  let points = 0;
  if (a.missedCallsPerWeek === "10+") points += 35;
  else if (a.missedCallsPerWeek === "5-10") points += 20;
  if (a.phoneAnsweredBy === "Owner" || a.phoneAnsweredBy === "No One") points += 20;
  if (a.systems.missedCallTextBack === "no") points += 20;
  if (a.systems.aiReceptionist === "no") points += 15;
  if (a.contactMethods.length <= 1) points += 10;
  return clamp(points);
}

function scoreAutomation(a: AssessmentAnswers): number {
  const checks: (keyof AssessmentAnswers["systems"])[] = [
    "onlineBooking",
    "autoFollowUp",
    "autoReviewRequests",
    "appointmentReminders",
    "crm",
    "aiReceptionist",
    "chatWidget",
    "missedCallTextBack",
  ];
  const missing = checks.filter((key) => a.systems[key] === "no").length;
  return clamp(Math.round((missing / checks.length) * 100));
}

function scoreOperations(a: AssessmentAnswers): number {
  let points = 0;
  const heavyOps = ["Scheduling", "Organization", "Paperwork", "Hiring"];
  points += a.challenges.filter((c) => heavyOps.includes(c)).length * 15;
  if (a.systems.crm === "no") points += 20;
  if (a.challenges.includes("Time Management")) points += 15;
  return clamp(points);
}

function scoreCustomerExperience(a: AssessmentAnswers): number {
  let points = 0;
  if (a.systems.autoReviewRequests === "no") points += 30;
  if (a.systems.appointmentReminders === "no") points += 20;
  if (a.systems.autoFollowUp === "no") points += 25;
  if (a.challenges.includes("Reviews")) points += 15;
  if (a.challenges.includes("Customer Communication")) points += 10;
  return clamp(points);
}

function scoreDigitalPresence(a: AssessmentAnswers): number {
  let points = 0;
  if (a.systems.website === "no") points += 30;
  if (a.systems.chatWidget === "no") points += 20;
  if (a.systems.landingPages === "no") points += 15;
  if (!a.leadSources.includes("Google")) points += 15;
  if (!a.leadSources.includes("Website")) points += 10;
  if (!a.website) points += 10;
  return clamp(points);
}

function scoreOwnerFreedom(a: AssessmentAnswers): number {
  let points = 0;
  if (a.afterHoursWork === "Every Day") points += 25;
  else if (a.afterHoursWork === "Several Times a Week") points += 15;
  if (a.lastWeekendOff === "I Can't Remember") points += 25;
  else if (a.lastWeekendOff === "More than 6 Months") points += 15;
  if (a.confidenceLeaving === "not_confident") points += 25;
  else if (a.confidenceLeaving === "somewhat_concerned") points += 15;
  if (a.phoneAnsweredBy === "Owner") points += 15;
  return clamp(points);
}

function tierForScore(score: number): "green" | "yellow" | "red" {
  if (score < 40) return "green";
  if (score < 70) return "yellow";
  return "red";
}

const categoryLabels: Record<ScoreCategoryId, string> = {
  leadCapture: "Lead Capture",
  communication: "Customer Communication",
  automation: "Automation",
  operations: "Operations",
  customerExperience: "Customer Experience",
  digitalPresence: "Digital Presence",
  ownerFreedom: "Owner Freedom",
};

export function calculateAssessmentResult(a: AssessmentAnswers): AssessmentResult {
  const scores: Record<ScoreCategoryId, number> = {
    leadCapture: scoreLeadCapture(a),
    communication: scoreCommunication(a),
    automation: scoreAutomation(a),
    operations: scoreOperations(a),
    customerExperience: scoreCustomerExperience(a),
    digitalPresence: scoreDigitalPresence(a),
    ownerFreedom: scoreOwnerFreedom(a),
  };

  const categories: CategoryScore[] = (Object.keys(scores) as ScoreCategoryId[]).map((id) => ({
    id,
    label: categoryLabels[id],
    score: scores[id],
    tier: tierForScore(scores[id]),
  }));

  const overallScore = clamp(
    Math.round(categories.reduce((sum, c) => sum + c.score, 0) / categories.length)
  );
  const overallTier = tierForScore(overallScore);
  const overallLabel =
    overallTier === "green"
      ? "Strong Foundation"
      : overallTier === "yellow"
        ? "Growth Opportunity"
        : "High Opportunity";

  const recommendations = buildRecommendations(a, categories);
  const estimatedWeeklyHoursSaved = estimateHoursSaved(a);

  return { overallScore, overallTier, overallLabel, categories, recommendations, estimatedWeeklyHoursSaved };
}

function buildRecommendations(
  a: AssessmentAnswers,
  categories: CategoryScore[]
): AssessmentResult["recommendations"] {
  const recs: AssessmentResult["recommendations"] = [];

  const highest = [...categories].sort((x, y) => y.score - x.score);

  if (a.systems.aiReceptionist === "no" && (a.missedCallsPerWeek === "10+" || a.missedCallsPerWeek === "5-10")) {
    recs.push({
      title: "GVR AI Receptionist™",
      body: "Your business may be losing opportunities simply because customers can't always reach someone quickly. An AI Receptionist ensures every call gets a response, even after hours.",
      impact: "Capture more leads",
    });
  }

  if (a.systems.crm === "no") {
    recs.push({
      title: "CRM & Business Organization",
      body: "Customer information appears difficult to organize consistently. A centralized CRM could improve communication and follow-up.",
      impact: "Strengthen customer relationships",
    });
  }

  if (a.systems.missedCallTextBack === "no" && a.missedCallsPerWeek !== "0-5") {
    recs.push({
      title: "Missed Call Text-Back",
      body: "When a call goes unanswered, an automatic text lets the customer know you'll follow up — instead of losing them to the next call they make.",
      impact: "Improve response speed",
    });
  }

  if (a.systems.onlineBooking === "no") {
    recs.push({
      title: "Online Booking",
      body: "Customers benefit from being able to schedule services even when you're unavailable to answer the phone.",
      impact: "Increase booked jobs",
    });
  }

  if (a.systems.autoReviewRequests === "no") {
    recs.push({
      title: "Review Automation",
      body: "Your business may be missing opportunities to generate additional referrals through automated review requests after completed work.",
      impact: "Increase referrals",
    });
  }

  // Always return at least the top 3 highest-opportunity categories if
  // nothing else matched, so the report never comes back empty.
  if (recs.length === 0) {
    return highest.slice(0, 3).map((c) => ({
      title: c.label,
      body: `Based on your answers, ${c.label.toLowerCase()} is the area with the most room to improve right now.`,
      impact: "Save time",
    }));
  }

  return recs.slice(0, 5);
}

function estimateHoursSaved(a: AssessmentAnswers): string {
  let hours = 2;
  if (a.phoneAnsweredBy === "Owner") hours += 4;
  if (a.missedCallsPerWeek === "10+") hours += 4;
  else if (a.missedCallsPerWeek === "5-10") hours += 2;
  if (a.systems.crm === "no") hours += 2;
  if (a.systems.autoFollowUp === "no") hours += 2;
  const low = clamp(hours - 2, 2, 20);
  const high = clamp(hours + 2, 4, 24);
  return `${low}–${high} Hours`;
}
