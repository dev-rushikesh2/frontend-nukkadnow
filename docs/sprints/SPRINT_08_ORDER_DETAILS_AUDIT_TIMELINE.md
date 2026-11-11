# Sprint 08 — Order Detail, Timeline, Kitchen Notes & Audit

- **Sprint ID:** NNK-FE-SPRINT-08
- **Duration:** 2 Weeks
- **Target Apps:** `merchant-portal`, `libs/domain-models`
- **Goal:** Build the detailed order inspection screen featuring itemized variant breakdowns, special preparation instructions, private kitchen notes, immutable audit timeline, and customer fulfillment data minimization.

---

## 1. Principles & Coding Standards

### DRY & KISS
- **KISS Fulfillment Verification:** When customer arrives, merchant inputs or scans the 4-digit pickup token; verified against backend before order handover.
- **Privacy First (Data Minimization):** Only show first name and pickup token. The customer's full address and personal data are omitted unless merchant-managed delivery is selected.

### SOLID Standards
- **Single Responsibility:** `OrderTimelineComponent` renders past audit history; `KitchenNotesComponent` manages private internal notes; `OrderDetailsPage` coordinates layout.

---

## 2. Order Details Screen Layout
- **Header:** Order Number (`#NK-8492`), Status Chip, Source (Marketplace / Walk-In / QR), Order Time.
- **Customer Section:** Name, Pickup Slot / Delivery ETA, Click-to-call button.
- **Item Breakdown:** Quantity, Item Name, Variant details, Special Instructions (e.g. *"Extra spicy, no onions"*), Unit Price, Total.
- **Financial Breakdown:** Subtotal, Taxes, Platform Fee, Total Paid, Payment State (`PAID_ONLINE` / `PAY_AT_PICKUP`).
- **Private Kitchen Notes:** Editable notes saved to order (e.g. *"Customer requested yellow packaging box"*).
- **Audit Timeline:** Chronological log with timestamps and staff actor names.

---

## 3. Endpoints & API Specifications

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/v1/merchant/orders/:id` | Full order detail with items, tokens, and timeline |
| `POST` | `/api/v1/merchant/orders/:id/notes` | Add private merchant kitchen note |
| `POST` | `/api/v1/merchant/orders/:id/verify-token` | Validate customer pickup token |

---

## 4. Definition of Done (DoD)
- [ ] Item customizations and special notes visually highlighted to kitchen staff.
- [ ] Token verification input validates 4-digit numeric code before completing handover.
- [ ] Audit timeline displays state changes with exact relative and local timestamps.
- [ ] Print receipt trigger formats clean thermal 80mm slip for kitchen printers.
