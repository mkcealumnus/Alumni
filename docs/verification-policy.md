# User Verification & Evidence Retention Policy
## Project: ALUMNUX — Identity Integrity & Governance Framework

**Effective Date:** October 2026  
**Operating Authority:** Three Designated Senior Alumni Trustees  
**Scope:** All Student and Alumni Applicants  

---

### 1. Verification Purpose & Independent Governance

To foster a genuine, high-trust professional network, Alumnux requires every member to undergo verification before gaining access to direct messaging, mentorship booking, full contact details, and job posting privileges.

**Independence Notice:** This verification process is managed exclusively by the three designated senior alumni trustees. College management, college placement cells, and academic faculty have zero involvement or access to the verification queue or applicant identity records.

---

### 2. Evidence Requirements

#### 2.1 Student Verification Requirements
Students currently enrolled in undergraduate or postgraduate programs must supply:
1. **Academic Department:** Must match an official department (e.g., Computer Science, IT, Mechanical, Electrical, etc.).
2. **Batch / Expected Graduation Year:** Valid future year (e.g., 2025–2029).
3. **Register / Roll Number:** Institutional registration number for deduplication.
4. **Primary Evidence:** High-resolution color photos or scans of:
   - **College ID Card (Front):** Must clearly show student name, photo, register number, and department.
   - **College ID Card (Back):** Must show valid academic years/validity period and authorized signature/seal.

#### 2.2 Alumni Verification Requirements
Graduated alumni must supply:
1. **Department & Graduation Year:** Valid historical year (1970–current year).
2. **Professional Profile:** LinkedIn URL, personal portfolio, or corporate directory link.
3. **Current Employment:** Company name, current job designation, and primary location.
4. **Primary Evidence:** High-resolution scan or photo of:
   - **Anna University Degree Certificate** OR **Official Provisional Certificate**.
   - The certificate must legibly exhibit the graduate's name, degree conferred, institution name, and official university registration number.

---

### 3. Verification State Machine & Workflow

```
+-------------------------------------------------------------------------+
|                           Applicant Submits                             |
|                           Evidence Package                              |
+------------------------------------+------------------------------------+
                                     |
                                     v
                          +--------------------+
                          |      pending       |
                          +---------+----------+
                                    |
                    +---------------+---------------+
                    |                               |
          Reviewer Flags Blur/            Reviewer Validates
          Missing Information                  Credentials
                    |                               |
                    v                               v
          +--------------------+          +--------------------+
          |    needs_review    |          |      verified      |
          +---------+----------+          +--------------------+
                    |                               |
           Applicant Re-submits                     | Full Platform
              Updated Files                         | Access Granted
                    |                               |
                    +---------------+---------------+
                                    |
                           Fraudulent / Ineligible
                                    |
                                    v
                          +--------------------+
                          |      rejected      |
                          +--------------------+
```

#### 3.1 Status Definitions
- **`pending`:** Initial state upon successful file upload and form submission. Placed into the FIFO review queue.
- **`needs_review`:** Evidence was submitted but is partially illegible, cropped, expired, or exhibits minor discrepancies. The applicant receives a notification specifying exact remediation steps and can resubmit without restarting the application.
- **`verified`:** Evidence satisfies all authenticity criteria. Verified badge applied to profile; full platform capabilities unlocked.
- **`rejected`:** Submissions demonstrating deliberate fraud, forged certificates, ineligible non-alumni submissions, or failure to respond to clarification requests within 14 calendar days.

#### 3.2 Standard Rejection & Clarification Reasons
1. *Document Illegible:* "The uploaded document is blurred or resolution is too low to inspect registration details."
2. *Incomplete Evidence:* "Student verification requires both the Front and Back of the College ID card."
3. *Name Discrepancy:* "Name on identity credential does not match the name entered in the account profile."
4. *Invalid Credential Type:* "Submission does not contain an Anna University Degree or Provisional Certificate (e.g. general receipts or unofficial grade slips are not accepted)."
5. *Tampering / Alteration Suspected:* "Uploaded file displays digital alteration or inconsistency."

---

### 4. Privacy, Security & Document Retention (DPDP Act 2023 Compliance)

1. **Storage Isolation:** Identity documents are strictly stored in an isolated, private Supabase Storage bucket (`alumnux-private-credentials`). Public read access is permanently disabled.
2. **Ephemeral Access Only:** Documents are rendered in the admin console solely via time-limited signed URLs (TTL: 600 seconds). No permanent links exist.
3. **No Email Attachments:** Identity documents are NEVER transmitted via email or unencrypted chat channels.
4. **Retention Schedule:**
   - **Verified Accounts:** Upon successful verification, evidence metadata is retained for 30 days to facilitate dispute resolution, after which the raw image files are automatically scheduled for permanent cryptographic deletion (`purged_at`). The verified status flag persists in `profiles`.
   - **Rejected Accounts:** Files retained for 14 days to support resubmission, then purged.
5. **Data Minimization:** Administrators are prohibited from downloading identity documents to local personal devices.
6. **Account Deletion:** Users may request immediate and complete deactivation and data purging at any time via platform settings.
