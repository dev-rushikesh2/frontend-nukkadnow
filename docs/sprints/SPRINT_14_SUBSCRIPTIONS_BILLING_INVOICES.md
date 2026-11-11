# Sprint 14 — Subscriptions, SaaS Tiers, Invoices & Payouts

- **Sprint ID:** NNK-FE-SPRINT-14
- **Duration:** 2 Weeks
- **Target Apps:** `merchant-portal`, `libs/domain-models`
- **Goal:** Implement the merchant SaaS subscription tier manager (Starter, Pro, Enterprise), active quota meters (outlets, staff logins, product limits), GST tax invoice downloads, and platform fee settlement reporting.

---

## 1. Principles & Coding Standards

### DRY & KISS
- **KISS Plan Comparison:** Clean side-by-side pricing tier cards highlighting current active tier and 1-tap "Upgrade" button.
- **Grace Period Resilience:** In the event of a failed renewal payment, the UI maintains full read/write access to ongoing orders and clearly displays a 7-day grace period banner instead of locking the merchant out.

### SOLID Standards
- **Single Responsibility:** `SubscriptionStore` manages current entitlements and plan limits; `BillingInvoiceService` coordinates GST invoice PDF downloads.

---

## 2. Subscription Tiers & Entitlements

| Feature | Starter (Free / Pilot) | Pro Retailer | Multi-Outlet Pro |
|---|:---:|:---:|:---:|
| Max Outlets | 1 | 1 | Up to 5 |
| Staff Accounts | 2 | 5 | Unlimited |
| Products | Up to 50 | Unlimited | Unlimited |
| Counter POS Walk-ins | ✅ | ✅ | ✅ |
| Audio Alert Chimes | ✅ | ✅ | ✅ |
| Advanced Analytics | ❌ | ✅ | ✅ |
| Custom Table Standees | Standard PDF | Branded PDF | Branded Vector |

---

## 3. Endpoints & API Specifications

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/v1/merchant/subscription` | Current subscription plan and quota utilization |
| `POST` | `/api/v1/merchant/subscription/upgrade` | Initiate plan upgrade or renewal |
| `GET` | `/api/v1/merchant/billing/invoices` | List past monthly GST platform invoices |
| `GET` | `/api/v1/merchant/billing/settlements` | Platform payment settlement and payout ledger |

---

## 4. Definition of Done (DoD)
- [ ] Active quota meters show current usage vs plan limit (e.g. *Products: 34 / 50*).
- [ ] Upgrade trigger integrates smoothly with payment intent modal.
- [ ] Grace period banner rendered clearly if payment fails without breaking active order flow.
- [ ] GST Tax Invoices downloadable as PDF with merchant GSTIN and platform HSN codes.
