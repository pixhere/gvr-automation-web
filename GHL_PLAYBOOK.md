# GoHighLevel Configuration Playbook

This is not code — it's the exact configuration to build inside your GoHighLevel
sub-account so the website's assessment submissions and contact form flow into a
working CRM. Follow it top to bottom the first time; after that it's a reference.

It corresponds to **Phase 5 (GoHighLevel CRM & Automation Engine)** and **Phase 6
(Client Portal)** of the GVR Product Blueprint. Field/tag names below match exactly
what the website already sends (see `src/lib/assessment/ghl-payload.ts`), so if you
name things differently in GHL, update that file to match — don't guess.

---

## 1. Connect the website to GHL

The site POSTs a JSON payload to two endpoints, both currently empty placeholders in
`.env.local` (see `.env.example`):

- `NEXT_PUBLIC_ASSESSMENT_WEBHOOK_URL` — fired when someone completes the Business
  Growth Assessment™ (`src/components/assessment/AssessmentWizard.tsx`)
- `NEXT_PUBLIC_CONTACT_WEBHOOK_URL` — fired from the `/contact` page form

**Recommended setup:** In GHL, create an *Inbound Webhook* trigger (Automation →
Workflows → new Workflow → Trigger: "Inbound Webhook"). GHL will give you a unique
POST URL — that's what goes in the env var. The workflow's first action should be
"Find/Create Contact" mapped from the webhook's `contact.*` fields, followed by the
tag/custom-field actions in Workflow 1 below.

If you'd rather not expose a raw webhook URL in client-side JS, route both endpoints
through a small serverless function (e.g. a Next.js Route Handler at
`/api/assessment`) that forwards server-side to the GHL API using a private API key.
That's a ~20-line addition once you're ready — flagged here rather than built
speculatively, since it depends on which auth method (API key vs. private
integration) you set up in GHL.

---

## 2. Custom Fields to create

Create these as Contact custom fields before building the workflow, so they're
available to map. Field keys below match `buildGhlPayload()` exactly.

| Field Key | Type | Notes |
|---|---|---|
| `business_growth_score` | Number | 0–100 |
| `business_growth_tier` | Text | "Strong Foundation" / "Growth Opportunity" / "High Opportunity" |
| `industry` | Text (dropdown) | Same 15 options as the assessment |
| `employees` | Text (dropdown) | Just Me / 2-5 / 6-15 / 15+ |
| `years_in_business` | Text | |
| `average_job_value` | Text | |
| `monthly_leads` | Text (dropdown) | 0-20 / 20-50 / 50-100 / 100+ |
| `missed_calls_per_week` | Text (dropdown) | 0-5 / 5-10 / 10+ |
| `primary_goal` | Text | first selected goal |
| `primary_pain_point` | Text | first selected challenge |
| `biggest_90_day_opportunity` | Large Text | the free-text answer — read this before every consultation |
| `owner_stress_level` | Text | High / Medium / Low |
| `estimated_weekly_hours_saved` | Text | e.g. "6–10 Hours" |
| `assigned_consultant` | Text | manual, for team assignment |
| `launch_date` | Date | set when a client goes live |
| `renewal_date` | Date | set at onboarding |

---

## 3. Tags to create

Applied automatically by Workflow 1 (see §5) — create these ahead of time so
autocomplete works cleanly and you don't end up with near-duplicate tags:

**Lead status:** `New Lead`, `Assessment Completed`, `Consultation Scheduled`,
`Consultation Completed`, `Proposal Sent`, `Client`, `Inactive`, `Lost`

**Industry** *(one per assessment industry option)*: `Industry: Junk Removal`,
`Industry: Landscaping`, `Industry: HVAC`, `Industry: Plumbing`, `Industry: Roofing`,
`Industry: Electrician`, `Industry: Cleaning`, `Industry: Painting`,
`Industry: Pressure Washing`, `Industry: Tree Service`, `Industry: Barber Shop`,
`Industry: Salon`, `Industry: Restaurant`, `Industry: Realtor`, `Industry: Other`

**Products interested in:** `AI Receptionist`, `CRM`, `Website`, `Landing Page`,
`Funnels`, `Chat Widget`, `Missed Call Text Back`, `Forms`, `Surveys`,
`Review Automation`

**Priority:** `High`, `Medium`, `Low`

The site also sends free-form `Goal: {value}` and `Pain Point: {value}` tags per
selection — GHL will create these on first use; no need to pre-create every
combination.

---

## 4. Pipeline

Create one pipeline, **"GVR Growth Pipeline"**, with these stages in order:

1. New Lead
2. Assessment Completed
3. Strategy Session Scheduled
4. Strategy Session Completed
5. Proposal Sent
6. Proposal Accepted
7. Implementation
8. Onboarding
9. Active Client
10. Quarterly Review
11. Expansion Opportunity

Keep a **separate "Lost" pipeline** for anything that falls out, so it doesn't skew
conversion reporting on the main pipeline.

---

## 5. Workflow 1 — Assessment Submitted

**Trigger:** Inbound Webhook (from `NEXT_PUBLIC_ASSESSMENT_WEBHOOK_URL`)

1. Find/Create Contact (map `contact.*` fields from the payload)
2. Check for duplicate — if existing contact, update instead of creating new
3. Apply tag: `Assessment Completed`
4. Apply tag: `Industry: {industry}` (from `customFields.industry`)
5. Apply tags: one `Goal: {value}` per entry in the payload's `tags` array that
   starts with `Goal:`
6. Apply tags: one `Pain Point: {value}` per entry starting with `Pain Point:`
7. Set custom fields from `customFields.*` (map 1:1 — see §2)
8. Move to pipeline stage: **Assessment Completed**
9. Internal notification → email + SMS to founder with contact name, business,
   score, and the `biggest_90_day_opportunity` field front and center
10. Send Email #1 — "Your Business Growth Report Is Ready" (copy in §8)
11. Send SMS #1 — assessment received (copy in §9)
12. Wait 24 hours → if no consultation booked → Email #2
13. Wait 48 hours → if no consultation booked → SMS reminder
14. Wait 72 hours → if no consultation booked → Email #3
15. Wait 7 days → if no consultation booked → Email #4
16. **Exit condition:** if a Strategy Session is booked at any point, exit this
    workflow immediately (GHL: "Go to Event" or a filter check before each wait step)

## 6. Workflow 2 — Strategy Session Booked

**Trigger:** Appointment Booked (on the "Business Strategy Session" calendar)

1. Move pipeline stage → **Strategy Session Scheduled**
2. Apply tag: `Consultation Scheduled`
3. Internal email + SMS to founder
4. Create internal task: "Review assessment before call with {contact.name}"
5. Confirmation email + SMS to the contact
6. Reminders: 24 hours before, 2 hours before, 30 minutes before (GHL calendar
   reminder settings handle this natively — configure on the calendar itself)

## 7. Workflow 3 — Missed Consultation (No-Show)

**Trigger:** Appointment marked "No Show"

1. Wait 30 minutes → friendly SMS with reschedule link
2. Wait 24 hours → friendly email, no guilt, offer to reschedule
3. Move pipeline stage → **Needs Follow-up** (or back to Assessment Completed)

## 8. Workflow 4 — Client Won

**Trigger:** Pipeline stage manually moved to **Proposal Accepted**

1. Move pipeline stage → **Implementation**
2. Apply tag: `Client`, remove lead-status tags
3. Send welcome email + welcome SMS
4. Create onboarding task list (Website Review, AI Receptionist Setup, CRM
   Configuration, Phone Number Connection, Domain Verification, Calendar Setup,
   Review Automation, Training Session, Go-Live Review)
5. Set `launch_date` custom field (today) and `renewal_date` (+12 months, or your
   billing cycle)

## 9. Workflow 5 — Quarterly Business Review

**Trigger:** 90 days after `launch_date` (and every 90 days after)

1. Send reminder email to the client
2. Create internal task: "Prepare Quarterly Review for {contact.name}"
3. Move pipeline stage → **Quarterly Review**
4. Offer to book via the Quarterly Business Review calendar

---

## 10. Email copy (paste directly into GHL email templates)

**Email #1 — Immediately — "Your Business Growth Report Is Ready"**
> Hi {{contact.first_name}},
>
> Thank you for completing the GVR Business Growth Assessment™. We've reviewed your
> responses and identified several opportunities that could help improve your
> business operations.
>
> Your report is now available. Inside you'll find your Business Growth Score™, key
> improvement opportunities, personalized recommendations, and suggested next
> steps.
>
> Remember, the goal isn't to add more technology. It's to help you build a business
> that's easier to run and easier to grow.
>
> [View Your Report]
>
> — The GVR Automation Team
> Growth • Value • Results

**Email #2 — 24–48 hours — "One missed call can become a missed customer."**
> Most businesses don't intentionally ignore customers. They're simply busy. Every
> unanswered phone call represents someone who needed help — and often, they call
> the next company. Whether through your team or smarter automation, reducing
> response time can significantly improve customer experience.
>
> [Schedule Strategy Session]

**Email #3 — 7 days — "When was the last time you reached out to your very first customer?"**
> As business owners, we spend a lot of time looking for the next customer. But many
> businesses overlook the people who helped build them in the first place. A simple
> follow-up at the right time can create repeat business, referrals, and long-term
> growth. Sometimes your next opportunity isn't a new customer — it's someone who
> already believes in your business.
>
> [Let's Build a Better Customer Follow-up System]

**Email #4 — 14 days — "Is your business working for you?"**
> Running a successful business shouldn't mean carrying everything yourself. Our
> goal has never been to sell software — it's to help business owners build
> businesses that continue growing without demanding every waking hour.
>
> [Schedule Your Strategy Session]

---

## 11. SMS copy

**SMS #1 — Immediately**
> Hi {{contact.first_name}}, thanks for completing your GVR Business Growth
> Assessment™. Your report is ready: {{link}}. Reply with any questions — we're
> happy to help. — GVR Automation

**SMS #2 — 48 hours**
> Hi {{contact.first_name}}, just checking in. Have you had a chance to review your
> Business Growth Report? If you'd like to discuss your results, you can schedule a
> complimentary strategy session here: {{calendar_link}}

**SMS #3 — 7 days**
> Hi {{contact.first_name}}, quick question — if you could solve just one challenge
> in your business over the next 90 days, what would it be? Reply to this message,
> we'd genuinely like to know.

**SMS rules:** never send more than one promotional SMS in a 7-day period; respect
STOP replies immediately (GHL handles opt-out compliance automatically, but confirm
it's enabled on this sub-account).

---

## 12. Calendars

Create four calendars under Settings → Calendars:

| Calendar | Duration | Reminders |
|---|---|---|
| Business Strategy Session | 30 min | 24h, 2h, 30min |
| Implementation Call | 60 min | 24h, 2h |
| Training Session | 60 min | 24h |
| Quarterly Business Review | 45 min | 24h, 2h |

Grab the **Business Strategy Session** calendar's embed URL and set it as
`NEXT_PUBLIC_GHL_CALENDAR_URL` in `.env.local` — that's what powers the calendar
embed on `/thank-you`.

---

## 13. Launch checklist

- [ ] Custom fields created (§2)
- [ ] Tags created (§3)
- [ ] Pipeline + "Lost" pipeline created (§4)
- [ ] Workflows 1–5 built and tested with a real test submission end-to-end
- [ ] Email templates 1–4 pasted in and tested
- [ ] SMS templates 1–3 pasted in and tested
- [ ] Calendars created, reminders configured
- [ ] `NEXT_PUBLIC_ASSESSMENT_WEBHOOK_URL`, `NEXT_PUBLIC_CONTACT_WEBHOOK_URL`, and
      `NEXT_PUBLIC_GHL_CALENDAR_URL` set in production environment variables
- [ ] Submitted one real test assessment from the live site and confirmed it
      appears correctly in GHL with the right tags, fields, and pipeline stage
