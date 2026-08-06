import type { AssessmentAnswers, AssessmentResult } from "@/types/assessment";

/**
 * Maps a completed assessment into the tag/field structure described in
 * the blueprint (Phase 3 "Data Structure" + Phase 5 "Custom Fields").
 * This is what gets POSTed to `siteConfig.assessment.submitEndpoint` —
 * a GoHighLevel inbound webhook, or any middleware that forwards to
 * the GHL API. See /README.md "Connecting GoHighLevel" for setup.
 */
export function buildGhlPayload(answers: AssessmentAnswers, result: AssessmentResult) {
  const scoreRange =
    result.overallScore < 40 ? "0-39" : result.overallScore < 70 ? "40-69" : "70-100";

  const ownerStressLevel =
    answers.confidenceLeaving === "not_confident" || answers.afterHoursWork === "Every Day"
      ? "High"
      : answers.confidenceLeaving === "somewhat_concerned"
        ? "Medium"
        : "Low";

  const priorityOpportunity = [...result.categories].sort((a, b) => b.score - a.score)[0]?.label ?? "";

  return {
    contact: {
      firstName: answers.ownerName.split(" ")[0] ?? answers.ownerName,
      lastName: answers.ownerName.split(" ").slice(1).join(" "),
      name: answers.ownerName,
      email: answers.email,
      phone: answers.phone,
      companyName: answers.businessName,
      website: answers.website,
    },
    tags: [
      "Assessment Completed",
      `Industry: ${answers.industry}`,
      `Employee Size: ${answers.employees}`,
      `Growth Score Range: ${scoreRange}`,
      ...answers.goals.map((g) => `Goal: ${g}`),
      ...answers.challenges.map((c) => `Pain Point: ${c}`),
      `Owner Stress Level: ${ownerStressLevel}`,
      `Priority Opportunity: ${priorityOpportunity}`,
    ],
    customFields: {
      business_growth_score: result.overallScore,
      business_growth_tier: result.overallLabel,
      industry: answers.industry,
      employees: answers.employees,
      years_in_business: answers.yearsInBusiness,
      average_job_value: answers.averageJobValue,
      monthly_leads: answers.monthlyLeads,
      missed_calls_per_week: answers.missedCallsPerWeek,
      primary_goal: answers.goals[0] ?? "",
      primary_pain_point: answers.challenges[0] ?? "",
      biggest_90_day_opportunity: answers.biggestOpportunity90Days,
      owner_stress_level: ownerStressLevel,
      estimated_weekly_hours_saved: result.estimatedWeeklyHoursSaved,
    },
    rawAnswers: answers,
    result,
    submittedAt: new Date().toISOString(),
  };
}

export type GhlPayload = ReturnType<typeof buildGhlPayload>;
