/**
 * Home page copy — sourced verbatim/near-verbatim from GVR Product Blueprint
 * Phase 2 (Marketing Website). Do not rewrite without a business reason;
 * per the Constitution, Claude implements copy, it doesn't invent it.
 */

export const problems = [
  { title: "Missing Phone Calls", description: "Every unanswered call is a customer who needed help — and often calls the next business instead." },
  { title: "Slow Follow-up", description: "Estimates and inquiries sit untouched, and opportunities quietly disappear." },
  { title: "No CRM", description: "Customer information is scattered, making it hard to stay organized or follow up consistently." },
  { title: "Manual Scheduling", description: "Booking appointments by phone or text takes time you don't have to spare." },
  { title: "Poor Organization", description: "Without a system, it's easy to lose track of who needs what, and when." },
  { title: "Losing Repeat Customers", description: "Past customers who already trust you get forgotten instead of re-engaged." },
] as const;

// Revision #2: rewritten to be outcome/benefit-focused per founder feedback
// ("people buy outcomes, not software") — GVR AI Receptionist™ and the
// Business Growth Assessment™ keep their trademarked product names.
export const solutions = [
  {
    title: "GVR AI Receptionist™",
    description: "Never miss another opportunity.",
    href: "/ai-receptionist",
  },
  {
    title: "Never Lose Another Lead",
    description: "One CRM for every customer, every conversation, and every follow-up.",
    href: "/solutions#crm",
  },
  {
    title: "Turn More Visitors Into Paying Customers",
    description: "Websites, funnels, and landing pages built to convert, not just look good.",
    href: "/solutions#websites",
  },
  {
    title: "Answer Every Visitor, Instantly",
    description: "Your AI Chat Widget responds and books appointments, even after hours.",
    href: "/solutions#chat-widget",
  },
  {
    title: "Recover Every Missed Call",
    description: "An automatic text goes out the moment you miss a call, so no one feels ignored.",
    href: "/solutions#missed-call-text-back",
  },
  {
    title: "Know Exactly What to Fix First",
    description: "The free Business Growth Assessment™ shows what's holding your business back.",
    href: "/business-growth-assessment",
  },
] as const;

export const howItWorks = [
  { title: "Complete Assessment", description: "Share a few details about how your business runs today." },
  { title: "Receive Your Business Growth Score™", description: "See personalized opportunities based on your responses." },
  { title: "Schedule Your Strategy Session", description: "Talk through your goals — no pressure, no obligation." },
  { title: "Implement Your Growth Plan", description: "Launch the right systems at the right pace for your business." },
] as const;

// Revision #2: capability-framed, not stat-fabricated. Per the founder's
// no-fabrication decision, this section describes what the systems DO
// rather than inventing specific unverified numbers ("saves 20 hours/week"),
// since no verified client data exists yet.
export const automationCapabilities = [
  {
    title: "Captures Leads Around the Clock",
    description: "Your phone, forms, and chat keep working even when you're not — nights, weekends, and everything in between.",
  },
  {
    title: "Responds While It's Still Warm",
    description: "Automated follow-up reaches out before a lead has time to call the next business on their list.",
  },
  {
    title: "Keeps Admin Work Off Your Plate",
    description: "Routine scheduling, reminders, and data entry run quietly in the background.",
  },
  {
    title: "Helps You Book More Appointments",
    description: "Fewer gaps between someone saying 'I'm interested' and getting on your calendar.",
  },
  {
    title: "Improves Every Follow-Up",
    description: "Nothing sits forgotten in an inbox, a sticky note, or a notepad by the phone.",
  },
  {
    title: "Frees Up Your Time",
    description: "Less time spent managing the business day-to-day, more time spent growing it.",
  },
] as const;

// "Built for Businesses Like Yours" industry list.
// Revision #3: swapped "Medical & Wellness Practices" for five new categories
// per founder feedback.
export const industries = [
  "Contractors",
  "HVAC",
  "Plumbing",
  "Roofing",
  "Electricians",
  "Auto Repair Shops",
  "Law Firms",
  "Realtors",
  "Insurance Agencies",
  "Landscapers",
  "Salons",
  "Barbershops",
  "Junk Removal Companies",
  "Restaurants",
] as const;

export const homeFaqs = [
  { question: "How long does the assessment take?", answer: "Less than 3 minutes. It's designed to feel like a short business check-in, not paperwork." },
  { question: "Is it really free?", answer: "Yes. There's no cost and no obligation to purchase anything after completing it." },
  { question: "Do I need technical knowledge?", answer: "No. We handle the technical setup — you just tell us about your business." },
  { question: "What happens after I submit?", answer: "You'll get a personalized Business Growth Score™ and the option to schedule a free strategy session to discuss your results." },
  { question: "Do you work with businesses outside Pennsylvania?", answer: "Our primary focus is Pennsylvania, but we work with local service businesses in other states as well." },
  { question: "Can I choose only one service?", answer: "Yes. We never bundle services you don't need — we recommend only what fits your biggest challenge." },
  { question: "Can I keep my current phone number?", answer: "Yes, in most cases your existing business number can be connected to GVR Automation's systems." },
  { question: "Can GVR work with my existing website?", answer: "Often, yes. We'll review what you have and recommend whether to improve it or build something new." },
] as const;
