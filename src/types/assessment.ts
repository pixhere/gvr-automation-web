/**
 * Business Growth Assessment™ — data shape.
 * Mirrors GVR Product Blueprint Phase 3, Sections 1–7 + Final Question.
 */

export type YesNoPlanning = "yes" | "no" | "planning";

export interface AssessmentAnswers {
  // Section 1 — About Your Business
  businessName: string;
  ownerName: string;
  phone: string;
  email: string;
  website: string;
  industry: string;
  employees: "" | "Just Me" | "2-5" | "6-15" | "15+";
  yearsInBusiness: string;
  annualRevenue: string;

  // Section 2 — Lead Generation
  leadSources: string[];
  monthlyLeads: "" | "0-20" | "20-50" | "50-100" | "100+";
  averageJobValue: string;

  // Section 3 — Customer Communication
  contactMethods: string[];
  phoneAnsweredBy: "" | "Owner" | "Office Staff" | "Employee" | "No One";
  missedCallsPerWeek: "" | "0-5" | "5-10" | "10+";
  afterHoursBehavior: string;

  // Section 4 — Business Systems
  systems: {
    onlineBooking: YesNoPlanning | "";
    autoFollowUp: YesNoPlanning | "";
    autoReviewRequests: YesNoPlanning | "";
    appointmentReminders: YesNoPlanning | "";
    crm: YesNoPlanning | "";
    aiReceptionist: YesNoPlanning | "";
    chatWidget: YesNoPlanning | "";
    missedCallTextBack: YesNoPlanning | "";
    website: YesNoPlanning | "";
    landingPages: YesNoPlanning | "";
    funnels: YesNoPlanning | "";
  };

  // Section 5 — Daily Operations
  challenges: string[];
  challengesElaborate: string;

  // Section 6 — Business Goals
  goals: string[];
  goalsElaborate: string;

  // Section 7 — Owner Well-Being
  afterHoursWork: "" | "Every Day" | "Several Times a Week" | "Occasionally" | "Rarely";
  lastWeekendOff: "" | "Last Week" | "Last Month" | "More than 6 Months" | "I Can't Remember";
  confidenceLeaving: "" | "not_confident" | "somewhat_concerned" | "fairly_confident" | "very_confident";
  wellBeingElaborate: string;

  // Final Question
  biggestOpportunity90Days: string;

  // Consent
  consent: boolean;
}

export const emptyAnswers: AssessmentAnswers = {
  businessName: "",
  ownerName: "",
  phone: "",
  email: "",
  website: "",
  industry: "",
  employees: "",
  yearsInBusiness: "",
  annualRevenue: "",

  leadSources: [],
  monthlyLeads: "",
  averageJobValue: "",

  contactMethods: [],
  phoneAnsweredBy: "",
  missedCallsPerWeek: "",
  afterHoursBehavior: "",

  systems: {
    onlineBooking: "",
    autoFollowUp: "",
    autoReviewRequests: "",
    appointmentReminders: "",
    crm: "",
    aiReceptionist: "",
    chatWidget: "",
    missedCallTextBack: "",
    website: "",
    landingPages: "",
    funnels: "",
  },

  challenges: [],
  challengesElaborate: "",

  goals: [],
  goalsElaborate: "",

  afterHoursWork: "",
  lastWeekendOff: "",
  confidenceLeaving: "",
  wellBeingElaborate: "",

  biggestOpportunity90Days: "",

  consent: false,
};

export type ScoreCategoryId =
  | "leadCapture"
  | "communication"
  | "automation"
  | "operations"
  | "customerExperience"
  | "digitalPresence"
  | "ownerFreedom";

export interface CategoryScore {
  id: ScoreCategoryId;
  label: string;
  score: number; // 0-100, higher = more opportunity (more room to improve)
  tier: "green" | "yellow" | "red";
}

export interface AssessmentResult {
  overallScore: number; // 0-100
  overallTier: "green" | "yellow" | "red";
  overallLabel: string;
  categories: CategoryScore[];
  recommendations: { title: string; body: string; impact: string }[];
  estimatedWeeklyHoursSaved: string;
}
