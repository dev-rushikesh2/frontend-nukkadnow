# Sprint 01 — Design System, UI Kit & Locality Theming

- **Sprint ID:** NNK-FE-SPRINT-01
- **Duration:** 2 Weeks
- **Target Libraries:** `libs/ui`, `libs/utilities`
- **Goal:** Build the complete atomic design system, CSS custom property tokens, reusable form controls, commerce cards, and accessible modal dialogs tailored for Indian hyperlocal retail.

---

## 1. Principles & Coding Standards

### DRY & KISS
- **Atomic CSS Variables:** All colors, spacing, typography, and elevation defined once in `tokens.scss` and `tokens.ts`.
- **Reusable Form Directives:** Unified error state rendering, accessible input wrappers, and auto-focus behaviors.
- **KISS Component APIs:** Components use Angular modern signal inputs (`input()`, `output()`) with clear default values.

### SOLID Standards
- **Single Responsibility:** UI components only handle visual rendering and emit standard DOM/custom events; no network calls or state business rules.
- **Interface Segregation:** Distinct props for presentation buttons (`variant`, `size`, `loading`) without coupling to domain concepts like "order checkout button".

---

## 2. Design System Tokens & Theming

### Locality Palette (Nagpur Market)
- **Primary:** Warm Saffron (`#F97316`) — Energetic, cultural, welcoming Indian market feel.
- **Secondary / Slate:** Deep Slate (`#0F172A`) — High-contrast text and merchant sidebar background.
- **Accent:** Vibrant Amber (`#F59E0B`) — Highlights, pending review badges, queue indicators.
- **Success:** Forest Green (`#10B981`) — Ready for pickup, open shop status, confirmed payment.
- **Error:** Crimson (`#EF4444`) — Out of stock, rejected order, payment failed.
- **Neutral Surface:** Warm Off-White (`#FAFAF9` / `#F5F5F4`) — Reduced glare on mobile screens under bright sunlight.

---

## 3. UI Component Catalog (`libs/ui`)

```text
libs/ui/src/
├── primitives/
│   ├── button/              # ui-button (primary, secondary, outline, ghost, danger)
│   ├── input/               # ui-input (text, tel, number, password with prefix/suffix)
│   ├── dialog/              # ui-dialog (accessible modal with focus trap)
│   ├── skeleton/            # ui-skeleton (shimmer loader for cards and text)
│   └── badge/               # ui-badge (neutral, success, warning, error, brand)
├── feedback/
│   ├── error-banner/        # ui-error-banner (retryable inline error alert)
│   ├── empty-state/         # ui-empty-state (illustrations, copy, and action button)
│   └── toast/               # ToastService (auto-dismissing top/bottom snackbars)
├── commerce/
│   ├── product-card/        # ui-product-card (thumbnail, veg/non-veg tag, price, quick add)
│   ├── price-display/       # ui-price-display (proper ₹ formatting from paise minor units)
│   ├── availability-badge/  # ui-availability-badge (Open Now / Closed indicator)
│   └── quantity-stepper/    # ui-quantity-stepper (decrement, count, increment)
└── design-tokens/
    ├── tokens.ts            # TypeScript token constants for canvas/JS calculations
    └── tokens.scss          # CSS variables for runtime styling
```

---

## 4. Accessibility & Mobile Standards (WCAG 2.1 AA)
- Minimum **48x48px touch targets** for all mobile touchpoints.
- Text contrast ratio $\ge 4.5:1$ against surface backgrounds.
- Dialogs implement `aria-modal="true"` and trap keyboard/screen reader focus.
- Form inputs include linked `<label [for]="id">` and `aria-describedby` for validation errors.

---

## 5. Definition of Done (DoD)
- [ ] All primitives tested across Chrome, Safari iOS, and Android WebView.
- [ ] Karma component test coverage $\ge 85\%$ for UI library.
- [ ] Zero inline style hacks; 100% adherence to CSS tokens.
- [ ] Indian currency formatting tested with integer paise values (`15000 paise` $\rightarrow$ `₹150.00`).
