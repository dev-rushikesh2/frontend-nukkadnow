# Sprint 13 — Operational Analytics, Rush Hours & CSV Exports

- **Sprint ID:** NNK-FE-SPRINT-13
- **Duration:** 2 Weeks
- **Target Apps:** `merchant-portal`
- **Goal:** Build actionable operational dashboards tailored for local retail: daily sales vs reconciled payouts, peak rush hour heatmaps, average prep times, on-time pickup rates, top-selling items, and exportable CSV reports.

---

## 1. Principles & Coding Standards

### DRY & KISS
- **KISS Visual Analytics:** Clear metric summary cards and lightweight SVG bar/line charts instead of bloated charting libraries. Fast rendering on mobile.
- **Accurate Financial Vocabulary:** Distinguish **Gross Order Value** from **Reconciled Net Payout** to eliminate merchant confusion regarding platform fees or discounts.

### SOLID Standards
- **Single Responsibility:** `AnalyticsReportService` generates CSV exports; `AnalyticsDashboardStore` manages date-range filtering (Today, Yesterday, Last 7 Days, Month).

---

## 2. Core Dashboard Metrics

1. **Daily Operational Pulse:**
   - Total Orders Received / Accepted / Completed / Rejected.
   - Reconciled Paid Amount (in ₹).
2. **Speed & Fulfillment Quality:**
   - Average Preparation Time (e.g. 18 mins).
   - On-Time Pickup Rate (e.g. 96.4%).
3. **Product Performance:**
   - Top 5 Revenue Drivers.
   - Out-of-Stock Frequency (items that lost potential sales).
4. **Rush Hour Heatmap:**
   - Bar chart showing busiest order hours (e.g., 5 PM - 8 PM peak in Nagpur).

---

## 3. Endpoints & API Specifications

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/v1/merchant/analytics/summary` | Aggregated KPI metrics for selected date range |
| `GET` | `/api/v1/merchant/analytics/rush-hours` | Hourly order volume breakdown |
| `GET` | `/api/v1/merchant/analytics/products` | Best-selling products and stockout stats |
| `GET` | `/api/v1/merchant/analytics/export-csv` | Download orders & sales CSV report |

---

## 4. Definition of Done (DoD)
- [ ] Dashboard metrics load in $< 500$ ms with skeleton loading states.
- [ ] Date range selector allows filtering: Today, Yesterday, This Week, Custom Range.
- [ ] SVG charts render responsively on mobile portrait and desktop screens.
- [ ] CSV export triggers native browser file download with properly formatted date columns.
