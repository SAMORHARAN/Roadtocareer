# Integration boundary — GlobalStudyMap, Academia OS and CRM

Date: 2026-11-10. Status: Design note, not an implemented integration.

## Verified codebase context
- The existing GlobalStudyMap repository documents a student-facing `GET /api/public/courses` feed.
- Its stated projection includes approved, published, non-withdrawn course snapshots and excludes staff review data and internal account identifiers.
- The existing Bluesky CRM repository uses Supabase and separately manages leads, counselling ownership and applications.
- The current Roadtocareer repository started from a Next.js 15 enterprise boilerplate. The `/journey-demo` route added on this branch is an isolated first experience.

## Intended flows
1. **Academia OS → RoadToCareers:** Server-approved student profile summaries, published roadmap versions, milestones and parent-visible notes. No direct export of restricted assessments, raw results or confidential notes.
2. **GlobalStudyMap → RoadToCareers:** Approved programme catalogue through `GET /api/public/courses` or a versioned successor, with official-source links, checked dates and publication status. Filter and match from a server-controlled index after verifying current endpoint format and access conditions.
3. **CRM ↔ Academia OS:** Link stable identifiers for an existing student or enquiry, but keep counselling/assessment records separate from sales and finance. Review actual CRM field types and authorization before creating foreign keys or automated writes.
4. **RoadToCareers → Academia OS:** Allow students to indicate task progress, questions and changed preferences through authenticated requests; require review for material changes to approved guidance.

## Matching policy
- Hard eligibility conditions (subjects, level, prerequisites) must be explicitly checked, not guessed by a language model.
- Career and course suggestions must include rationale, alternatives and source provenance.
- Missing or stale programme evidence should yield `needs_verification`, never an admission guarantee.
- Keep verified programme facts in GlobalStudyMap; do not maintain a conflicting second tuition/eligibility table in RoadToCareers.

## Deployment gates
No production credentials, real data transfer, enrollment workflow or cross-service token exchange until an identity model, permission tests, consent flow, API schemas and operating costs are approved.

This document does not claim that either feed or synchronization is operational in RoadToCareers today.
