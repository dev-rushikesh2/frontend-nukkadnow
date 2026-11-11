# Sprint 06 — Real-Time Inventory, Stock Alerts & Movement Audit

- **Sprint ID:** NNK-FE-SPRINT-06
- **Duration:** 2 Weeks
- **Target Apps:** `merchant-portal`, `libs/ui`
- **Goal:** Implement atomic stock adjustment counters, low-stock visual warnings, stock movement history logs with reason codes, and web-portal bulk CSV inventory updates.

---

## 1. Principles & Coding Standards

### DRY & KISS
- **KISS Quick Increment:** Rapid `+` / `-` stepper buttons allow cashiers to update physical stock in under 2 seconds without opening edit screens.
- **Optimistic Concurrency:** Stock updates send the last known `version` or current count to prevent silent overwrites when multiple staff adjust stock concurrently.

### SOLID Standards
- **Single Responsibility:** `InventoryAdjustmentDialog` handles adjustment input and reason code capture (`RESTOCK`, `DAMAGE`, `SPOILAGE`, `CORRECTION`). `InventoryHistoryStore` strictly manages paginated audit events.

---

## 2. Low-Stock Alerts & Notification Badges
- **Threshold Rule:** When `quantity <= lowStockThreshold`, product card highlights with amber badge: *"Low Stock: 3 left"*.
- **Stock Out Action:** When `quantity === 0`, item is marked unavailable automatically.
- **Movement Audit Log:**
  - Displays: Timestamp, Actor Name, Adjustment (`+10` or `-2`), Reason, Balance.

---

## 3. Endpoints & API Specifications

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/v1/merchant/inventory` | Inventory balances with low-stock flags |
| `POST` | `/api/v1/merchant/inventory/adjustments` | Atomic stock balance adjustment |
| `GET` | `/api/v1/merchant/inventory/movements` | Paginated audit trail of inventory adjustments |
| `POST` | `/api/v1/merchant/inventory/bulk-csv` | Bulk CSV import endpoint (Web Portal) |

---

## 4. Definition of Done (DoD)
- [ ] Fast stock adjustment reflects immediately with server acknowledgement.
- [ ] Concurrency conflict (HTTP 409) prompts merchant with latest server count.
- [ ] Stock movement audit log renders readable timestamps and reason codes.
- [ ] Web portal CSV upload validates row errors with line-number feedback before applying.
