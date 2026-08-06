export const industries = [
  "Junk Removal",
  "Landscaping",
  "HVAC",
  "Plumbing",
  "Roofing",
  "Electrician",
  "Cleaning",
  "Painting",
  "Pressure Washing",
  "Tree Service",
  "Barber Shop",
  "Salon",
  "Restaurant",
  "Realtor",
  "Other",
] as const;

export const employeeOptions = ["Just Me", "2-5", "6-15", "15+"] as const;

export const leadSourceOptions = [
  "Google",
  "Facebook",
  "Instagram",
  "Website",
  "Referrals",
  "Word of Mouth",
  "Yard Signs",
  "Vehicle Wraps",
  "Other",
] as const;

export const monthlyLeadOptions = ["0-20", "20-50", "50-100", "100+"] as const;

export const contactMethodOptions = ["Phone", "Text", "Website", "Facebook", "Instagram", "Email"] as const;

export const phoneAnsweredByOptions = ["Owner", "Office Staff", "Employee", "No One"] as const;

export const missedCallOptions = ["0-5", "5-10", "10+"] as const;

export const challengeOptions = [
  "Missing Calls",
  "Following Up",
  "Scheduling",
  "Marketing",
  "Reviews",
  "Organization",
  "Hiring",
  "Customer Communication",
  "Time Management",
  "Paperwork",
  "Other",
] as const;

export const goalOptions = [
  "More Leads",
  "More Revenue",
  "More Time",
  "More Reviews",
  "Better Organization",
  "Hire Less Staff",
  "Faster Growth",
  "Better Customer Experience",
] as const;

export const afterHoursWorkOptions = ["Every Day", "Several Times a Week", "Occasionally", "Rarely"] as const;

export const lastWeekendOffOptions = ["Last Week", "Last Month", "More than 6 Months", "I Can't Remember"] as const;

export const confidenceLeavingOptions = [
  { value: "not_confident", emoji: "😟", label: "Not Confident" },
  { value: "somewhat_concerned", emoji: "😕", label: "Somewhat Concerned" },
  { value: "fairly_confident", emoji: "🙂", label: "Fairly Confident" },
  { value: "very_confident", emoji: "😎", label: "Very Confident" },
] as const;

export const systemsChecklist = [
  { key: "crm", label: "CRM" },
  { key: "onlineBooking", label: "Online Booking" },
  { key: "autoReviewRequests", label: "Automatic Review Requests" },
  { key: "autoFollowUp", label: "Automated Follow-up" },
  { key: "appointmentReminders", label: "Appointment Reminders" },
  { key: "aiReceptionist", label: "AI Receptionist" },
  { key: "chatWidget", label: "Chat Widget" },
  { key: "missedCallTextBack", label: "Missed Call Text-Back" },
  { key: "website", label: "Website" },
  { key: "landingPages", label: "Landing Pages" },
  { key: "funnels", label: "Funnels" },
] as const;
