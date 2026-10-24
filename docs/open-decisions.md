# Open Architectural & Governance Decisions
## Project: ALUMNUX — Phase 1 Review Log

This document records architectural, governance, and policy decisions that require formal sign-off by the **Three Senior Alumni Trustees** prior to Phase 2 production deployment.

---

### 1. Decision Registry

| Decision ID | Topic | Options Considered | Recommended Direction | Designated Owner | Target Resolution | Status |
|---|---|---|---|---|---|---|
| **DEC-001** | Evidence Retention Window | A) Purge raw ID images 30 days post-verification<br>B) Immediate cryptographic purge upon review<br>C) Retain for entire duration of active account | **Option A (30 Days)**: Balances DPDP compliance with a reasonable window to handle impersonation disputes or false claims. | Trustee 1 (Security & Infrastructure Lead) | Prior to Phase 2 launch | Pending Review |
| **DEC-002** | Google OAuth Account Domain Scope | A) Allow any personal Google account (`@gmail.com`)<br>B) Restrict students to college domain email only (`@college.edu.in`)<br>C) Allow personal accounts for all, relying on uploaded certificate for alumni and college ID for students | **Option C**: Many alumni lose access to institutional email upon graduation. Relying on authentic Anna University degree certificates provides genuine verification without locking out senior alumni. | Trustee 2 (Product & User Experience Lead) | Day 5 of Phase 1 | Approved in Principle |
| **DEC-003** | Storage Encryption at Rest | A) Standard Supabase S3 server-side encryption (SSE-S3)<br>B) Customer-managed KMS encryption key with per-document envelope encryption | **Option A**: Sufficient for Phase 1/2 MVP. Envelope encryption adds high latency and key management operational overhead for an independent 3-member team. | Trustee 1 (Security & Infrastructure Lead) | Prior to Phase 2 launch | Pending Review |
| **DEC-004** | Disagreement / Voting Protocol for 3 Trustees | A) Simple 2-out-of-3 majority on verification appeals & bans<br>B) Unanimous consensus required for permanent user bans<br>C) Lead trustee holds tiebreaker | **Option A for operational decisions; Option B for permanent community expulsion**. Ensures checks and balances without gridlocking day-to-day verification. | Trustee 3 (Governance & Community Lead) | Prior to Phase 2 launch | Approved in Principle |
| **DEC-005** | Mentorship Booking Limits | A) Unlimited requests per student<br>B) Strict quota of 2 active mentorship requests per student at any time<br>C) Credit-based system | **Option B**: Protects alumni time and prevents students from spamming all available alumni in their department. | Trustee 2 (Product & User Experience Lead) | Phase 2 Backlog Grooming | Approved in Principle |

---

### 2. Risk Matrix & Mitigations

1. **Risk:** High volume of student ID submissions overwhelming 3 manual reviewers during campus placement season.
   - *Mitigation:* Implement pre-verification batching, OCR auto-extraction in Phase 2 to highlight roll numbers, and structured rejection reason templates.
2. **Risk:** Potential legal challenge or inquiry from college administration regarding use of alumni network.
   - *Mitigation:* Explicit, unambiguous disclaimers on every page stating Alumnux is an independent, non-official alumni initiative not sponsored, affiliated with, or endorsed by college management.
3. **Risk:** Accidental leakage of uploaded student identity cards.
   - *Mitigation:* Supabase storage bucket configured with public access set to strictly `false`, time-limited signed URLs only (TTL 600s), and automated purge jobs.
