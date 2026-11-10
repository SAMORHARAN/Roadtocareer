# RoadToCareers — Product and Integration Contract (Pilot v0.1)

**Status:** Design contract; not a running API. **Date:** 2026-11-10.

## Positioning
RoadToCareers is the student/parent-facing component of Bluesky Academia OS. It should be accessible to students who begin at Class VIII, IX, X, XI, XII or graduation. It must not be restricted to Bluesky's existing admissions customers over time.

The first route, `/journey-demo`, is an interactive, synthetic-data prototype for preview and feedback. It does not authenticate, call APIs, store personal information, deliver AI recommendations, or save progress.

## Ownership of information
| Information | Owner/source of truth | RoadToCareers may display |
|---|---|---|
| Enquiry/lead, counsellor assignment, commercial funnel | Bluesky CRM | Only an approved, relevant summary if explicitly consented |
| Student education profile, counselling and approved roadmap | Academia OS | Student-facing profile, approved roadmap and milestones |
| Confidential counsellor notes and raw assessment responses | Academia OS, restricted | Never automatically |
| Parent/guardian access and consent | Academia OS with verified guardian linkage | Only lawful/consented subset |
| Degree, university, official programme eligibility | GlobalStudyMap approved catalogue | Source-linked verified facts, with checked dates |
| AI drafts | Separate draft record, validated by counsellor | Only approved, clearly labelled recommendations |

## Future roles and access rules
- **Student:** view their own age-appropriate profile, approved pathways and milestones; can record progress subject to verification workflow.
- **Guardian:** access only linked child's approved information appropriate to consent and age; no default access to confidential professional notes.
- **Counsellor:** review assigned students and draft roadmaps within Academia OS, not directly on a public student route.
- **Reviewer/programme lead:** approve recommendation releases, verify evidence and manage quality.
- **Owner:** aggregate operations and controls; access to sensitive records still follows defined purpose and audit policy.
- **School liaison:** only the designated cohort with a school-specific lawful sharing agreement; no cross-school browsing.

## Approved-only read contract (proposed, not implemented)
`GET /api/v1/student/journey` returns a server-authorized, minimally necessary projection.

Illustrative result shape:
```json
{
  "studentPublicId": "ACAD-0002",
  "stage": "X",
  "stageLabel": "Class X",
  "profileSummary": { "areasToExplore": ["Business", "Mathematics"] },
  "roadmap": {
    "id": "sample-roadmap-id",
    "version": 1,
    "approvedAt": "2026-11-10T00:00:00Z",
    "alternativesIncluded": true,
    "rationale": "Illustrative only",
    "milestones": [
      { "id": "sample-task-id", "timeline": "30_days", "title": "Verify subjects", "status": "not_started" }
    ],
    "evidence": [{ "title": "Verified official admissions source", "url": null, "checkedOn": null }]
  }
}
```

No personal data, clinical/psychometric raw scores or unapproved drafts in this example. Exact identity fields, endpoint paths, authentication and permissions remain design work.

## Journey presentation
- Six clear academic-stage entry points; direct entry permitted at any stage.
- Dynamic discovery and profiling questions by stage; do not force irrelevant earlier history.
- Student roadmap displays short-term, medium-term, annual and long-term milestones.
- Explain **why** each career/course option is suggested and show at least one alternative when appropriate.
- Academic prerequisites and programme deadlines are official-source verified; stale records are flagged.
- Parent view shows supportive actions and agreed check-in dates, not confidential notes.
- Changes in interests or academic profile trigger counsellor review, not irreversible AI decisions.
- University explorer should ultimately connect to the curated GlobalStudyMap catalogue without duplicating its database.

## Minimum validation requirements before real data
1. Authenticated session validated on the server and against RLS.
2. Student and guardian relations explicitly verified; parent permissions checked on every request.
3. Active, purpose-specific consent and school agreement where required.
4. Published roadmap must be approved and versioned; unreviewed outputs must never appear public.
5. Server-level allowlist of fields so professional notes cannot be exposed.
6. Rate limits, audit trails, data retention, access logs and verified account-recovery flows.
7. Accessibility and mobile testing; plain-language explanations appropriate for school students.
8. Cross-school isolation tests, including attempted access to unrelated student IDs.
9. Human review of career/degree recommendations; no automated admissions guarantee.
10. Pilot feedback from counsellors, students and guardians before public release.

## Pilot acceptance scenarios
- A Class IX student receives a discovery plan without being asked for Class XI–XII information.
- A Class XII student can start with admission planning without completing earlier stage modules.
- A parent sees the approved student roadmap and general guidance, but not restricted counsellor notes.
- A counsellor updates a milestone internally; after appropriate approval, the student sees the latest status.
- A programme whose official eligibility is unverified is shown as **needs verification**, not recommended as guaranteed eligible.
- No real student data is ever visible from the public demo route.
- The CRM continues to own commercial lead status and finance independently.

## Ordered build slices
1. **Now:** standalone six-stage interactive journey prototype and internal counsellor prototype on development branches.
2. **Next:** validated data/consent contracts, real role boundaries, migrations and RLS tests using synthetic records.
3. **Then:** controlled Bluesky/school pilot with onboarding, counsellor approvals and student/guardian access.
4. **After evidence:** AI-assisted explanation, source-backed career-to-course matching and GlobalStudyMap integration.
5. **Scale:** multi-school isolation, delegated roles, parent access, subscriptions only if the service model is approved.

No live deployment, external payments, real student imports or database changes are authorised by this document.
