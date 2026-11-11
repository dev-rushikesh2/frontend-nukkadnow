# Sprint 10 — Capacity Throttling, Pickup Slots & Preorders

- **Sprint ID:** NNK-FE-SPRINT-10
- **Duration:** 2 Weeks
- **Target Apps:** `merchant-portal`, `libs/domain-models`
- **Goal:** Implement merchant fulfillment capacity controls, configurable interval pickup slots, concurrent order throttling, advance preorder cutoffs, and fresh food batch scheduling.

---

## 1. Principles & Coding Standards

### DRY & KISS
- **Atomic Slots:** Slots (e.g. 15-minute or 30-minute intervals) are configured once in `CapacitySettingsStore` and automatically generate time windows on the marketplace.
- **KISS Capacity Throttle:** Simple slider: *"Maximum active orders: 10 orders per 15 minutes"*. When limit is reached, marketplace automatically shifts customer to next available slot.

### SOLID Standards
- **Single Responsibility:** `PickupSlotManager` handles recurring weekly slot definitions; `BatchScheduleStore` manages special production dates (e.g., Diwali Sweets, Fresh Bread morning/evening batches).

---

## 2. Capacity Architecture & Invariants
- **No Overbooking:** Backend enforces atomic capacity reservations with TTL. Frontend reflects live remaining capacity per slot.
- **Pre-Order Cutoff Windows:** For made-to-order bakers and festival stalls, merchants specify minimum advance hours (e.g., *"Orders must be placed 24 hours prior to pickup"*).
- **Batch Schedules:** Define specific release times (e.g., *"Evening Samosa Batch: Ready at 5:00 PM - 50 slots"*).

---

## 3. Endpoints & API Specifications

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/v1/merchant/capacity/settings` | Current interval, slot limits, and buffers |
| `PUT` | `/api/v1/merchant/capacity/settings` | Update max orders per slot and busy thresholds |
| `GET` | `/api/v1/merchant/capacity/slots` | Fetch date-wise slots and remaining capacity |
| `POST` | `/api/v1/merchant/preorders/batches` | Create fresh food production batch window |

---

## 4. Definition of Done (DoD)
- [ ] Capacity setting sliders update slot limits with instant validation.
- [ ] Slot calendar highlights fully booked slots in red and available slots in green.
- [ ] Batch scheduler allows setting target date, quantity cap, and preorder cutoff.
- [ ] Customer PWA reflects updated slot limits in real-time.
