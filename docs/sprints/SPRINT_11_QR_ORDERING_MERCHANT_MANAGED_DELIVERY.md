# Sprint 11 — QR Ordering Standees & Merchant-Managed Delivery

- **Sprint ID:** NNK-FE-SPRINT-11
- **Duration:** 2 Weeks
- **Target Apps:** `merchant-portal`, `libs/utilities`
- **Goal:** Implement storefront counter/table QR code generator with printable marketing standees, along with merchant-managed self-delivery zones, radius/pincode delivery rules, and dispatch status tracking.

---

## 1. Principles & Coding Standards

### DRY & KISS
- **KISS QR Generation:** High-resolution SVG QR codes generated entirely in the client using canvas utilities. 1-click download of PDF counter standees with store branding.
- **Honest Delivery Communication:** UI explicitly states: *"Self-managed delivery by merchant"*. Never implies NukkadNow platform fleet unless third-party logistics integration is active.

### SOLID Standards
- **Single Responsibility:** `QrGeneratorService` handles SVG/PDF rendering; `DeliverySettingsStore` manages geofenced service radius and minimum order constraints.

---

## 2. Storefront Standees & Delivery Settings

### Printable Standee Generator
- Generates print-ready A5/table tent standees containing:
  - Store Logo & Business Name
  - Direct PWA ordering QR code: `https://nukkadnow.example/m/:merchantSlug?source=standee_table1`
  - Tagline: *"Scan to view menu, order & pickup without waiting!"*

### Self-Delivery Configuration
- **Delivery Mode:** Geofenced radius (e.g. 3 km) or specific postal codes (e.g. 440010, 440012).
- **Pricing:** Free delivery above ₹500; flat ₹30 delivery fee below minimum.
- **Dispatch Actions:** Merchant transitions order to `OUT_FOR_DELIVERY` with optional staff driver note.

---

## 3. Endpoints & API Specifications

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/v1/merchant/qr/codes` | List configured table/counter QR codes |
| `POST` | `/api/v1/merchant/qr/generate` | Create custom tracked QR code |
| `GET` | `/api/v1/merchant/delivery/settings` | Delivery radius, minimum order, and fee rules |
| `PUT` | `/api/v1/merchant/delivery/settings` | Update self-delivery rules and zones |

---

## 4. Definition of Done (DoD)
- [ ] QR generator outputs crisp vector SVGs and PDF standees for printing.
- [ ] Delivery settings validate that radius is between 0.5 km and 15 km.
- [ ] Orders tab displays active self-delivery tasks with customer address and delivery notes.
- [ ] Transitioning order to `OUT_FOR_DELIVERY` notifies customer via SMS/WebSocket.
