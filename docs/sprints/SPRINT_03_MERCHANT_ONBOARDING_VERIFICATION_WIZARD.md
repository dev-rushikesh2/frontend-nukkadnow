# Sprint 03 — Merchant Onboarding, Seller Modes & Verification Wizard

- **Sprint ID:** NNK-FE-SPRINT-03
- **Duration:** 2 Weeks
- **Target Apps:** `merchant-portal`, `libs/domain-models`
- **Goal:** Implement the responsive 7-step merchant onboarding wizard supporting all seller types (Permanent Shop, Home Business, Maker/Producer, Seasonal Stall) with home address privacy controls and draft saving.

---

## 1. Principles & Coding Standards

### DRY & KISS
- **Step Configuration Schema:** Wizard steps defined declaratively with validation rules and progress tracking.
- **KISS Draft Resumption:** Form state auto-saves to LocalStorage / server draft endpoint after each completed step. If user drops off, they resume exactly where they left off.

### SOLID Standards
- **Open/Closed Principle:** Different Seller Modes (`RETAIL`, `HOME_MAKER`, `PRODUCER`, `SEASONAL`) dynamically inject different step requirements (e.g., FSSAI for food, Lead Time for makers) via strategy configuration without changing the wizard container.

---

## 2. Security & Privacy Architecture
- **Home Business Address Protection:**
  - For home businesses (`isHomeMaker = true`), the private residential address is clearly labeled: *"This address is strictly private and will NEVER be shown to customers."*
  - The merchant designates a public pickup point or general locality (e.g., "Near Shankar Nagar Square, Nagpur").
- **Verification Gatekeeper:**
  - Onboarding displays verification status: `PENDING_VERIFICATION`, `DOCS_REQUIRED`, or `ACTIVE`.
  - The UI prevents publishing live products or accepting marketplace orders until initial approval is granted.

---

## 3. The 7-Step Onboarding Wizard

```mermaid
flowchart LR
    S1[1. Business Type] --> S2[2. Brand Profile]
    S2 --> S3[3. Location & Privacy]
    S3 --> S4[4. Fulfilment Modes]
    S4 --> S5[5. Operating Hours]
    S5 --> S6[6. Verification KYC]
    S6 --> S7[7. Review & Submit]
```

1. **Business Type:** Permanent Retail, Home Business, Independent Maker, Made-to-Order, Seasonal/Pop-up.
2. **Brand Profile:** Business display name, description, category, logo/storefront photo.
3. **Location & Pickup:** GPS pin drop, address line, landmark, locality, and home address privacy toggle.
4. **Fulfilment Modes:** Pickup enabled, merchant-managed self-delivery enabled, service radius.
5. **Hours & Seasonality:** Weekly open/close schedule; start/end dates for seasonal vendors.
6. **Verification KYC:** Category compliance (optional GSTIN, FSSAI for food items).
7. **Review & Submit:** Summary review, terms acceptance, and submission for admin review.

---

## 4. Endpoints & API Specifications

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/v1/merchant/onboarding/draft` | Retrieve last saved onboarding state |
| `PUT` | `/api/v1/merchant/onboarding/step` | Save current step data (draft persistence) |
| `POST` | `/api/v1/merchant/onboarding/submit` | Final submission for verification |
| `GET` | `/api/v1/merchant/verification/status` | Current verification review state |

---

## 5. Definition of Done (DoD)
- [ ] 7-step wizard renders smoothly on both mobile screens and desktop.
- [ ] Step progress bar indicates completed, current, and pending steps.
- [ ] Home address privacy disclaimer explicitly presented when "Home Business" is selected.
- [ ] Draft state successfully restored upon browser refresh.
- [ ] Form validations prevent submission of empty business name or invalid pincode.
