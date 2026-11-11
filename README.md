# NukkadNow Frontend Monorepo

> **Locality-First Commerce & Merchant SaaS** · Nagpur Pilot · Angular 18+ Standalone Components · Ionic PWA · Turborepo · pnpm Workspace

---

## 1. Executive Architecture Overview

`nukkadnow-frontend` houses the client applications that power the NukkadNow hyperlocal marketplace ecosystem. Designed according to Domain-Driven Design (DDD) principles and Clean Architecture, this repository guarantees strict boundaries between customer experiences and merchant SaaS operations while sharing design tokens, UI primitives, and generated API contracts.

```text
nukkadnow-frontend/
├── .github/                       # CI/CD Workflows, CODEOWNERS, Dependabot
├── .husky/                        # Git hooks (pre-commit, commit-msg)
├── .vscode/                       # Recommended workspace extensions, launch, settings
├── apps/
│   ├── customer-pwa/              # Ionic Angular Mobile-First Customer PWA
│   └── merchant-portal/           # Angular Desktop/Tablet Merchant Operations Hub
├── libs/
│   ├── ui/                        # Reusable primitives, feedback, commerce UI, design tokens
│   ├── api-client/                # OpenAPI-generated TypeScript API client & WS adapters
│   ├── auth-client/               # JWT token storage, refresh loops, session management
│   ├── domain-models/             # Strongly typed presentation-facing domain models
│   ├── utilities/                 # Currency (Paise/INR), date formatting, Indian validators
│   ├── i18n/                      # Multilingual localization (English, Hindi, Marathi)
│   ├── testing/                   # Shared test helpers, fixtures, mock services
│   └── eslint-config/             # Architectural boundary and lint rules
├── tools/                         # Client generation, boundary validation scripts
├── docs/                          # Architecture, feature maps, design system, deployment guides
├── angular.json                   # Multi-project Angular workspace configuration
├── turbo.json                     # Turborepo task pipeline cache configuration
├── pnpm-workspace.yaml            # pnpm monorepo package definitions
├── tsconfig.base.json             # Root TypeScript strict configuration and path mappings
└── eslint.config.mjs              # Modern flat ESLint configuration with boundary enforcement
```

---

## 2. Applications

### 2.1 Customer PWA (`apps/customer-pwa`)
- **Technology:** Angular 18+ Standalone, Ionic Angular Mobile Shell, Signal-driven reactivity.
- **Audience:** Local buyers discovering neighborhood kiranas, food stalls, home makers, and bakeries.
- **Key Capabilities:**
  - Fast offline-capable shell with PWA service worker.
  - GPS geolocation auto-detection with fallback manual locality selection (e.g., Dharampeth, Sadar).
  - Single-merchant cart validation and scheduled pickup slot selection.
  - Dynamic digital pickup token generation with QR code and sound chimes.
  - Real-time order status tracking via WebSocket / SSE connection.
- **Port:** `http://localhost:4200`

### 2.2 Merchant Operations Portal (`apps/merchant-portal`)
- **Technology:** Angular 18+ Desktop & Tablet-first Responsive SPA.
- **Audience:** Store owners, cashiers, kitchen staff, and outlet managers.
- **Key Capabilities:**
  - Multi-outlet context switcher and tenant isolation headers (`x-tenant-id`, `x-outlet-id`).
  - High-priority real-time order inbox with audio chime for immediate order acceptance.
  - Quick walk-in counter billing with instant token caller display.
  - Fresh food / bakery batch scheduling and preorder capacity throttles.
  - Storefront table/counter QR code generation and printable standees.
  - Seller mode toggles: Retail/Kirana, Food Stall, Home Maker (address privacy protected), Seasonal Stall.
- **Port:** `http://localhost:4201`

---

## 3. Standard Feature Structure (Clean Architecture)

Every feature in both applications follows the strict layout documented in **Section 3.1** of the repository architecture specification:

```text
features/{feature-name}/
├── {feature-name}.routes.ts        # Lazy-loaded route definitions
├── pages/                          # Route-level views
│   ├── {feature-name}-list.page.ts
│   ├── {feature-name}-list.page.html
│   ├── {feature-name}-list.page.scss
│   └── {feature-name}-details.page.ts
├── components/                     # Feature-local presentation components
│   ├── {feature-name}-card.component.ts
│   └── {feature-name}-status-chip.component.ts
├── data-access/                    # Data sources, mappers, and repositories
│   ├── {feature-name}.api.ts
│   ├── {feature-name}.repository.ts
│   └── {feature-name}.mapper.ts
├── state/                          # Signal stores & reactive selectors
│   ├── {feature-name}.store.ts
│   └── {feature-name}.selectors.ts
├── models/                         # Feature view models
│   └── {feature-name}-view.model.ts
├── utils/                          # Feature-specific helpers & formatters
│   └── {feature-name}.utils.ts
├── {feature-name}.spec.ts          # Feature unit tests
└── index.ts                        # Feature public barrel exports
```

### 3.1 Engineering Rules
1. **Reactivity**: Local state is managed with Angular Signals (`signal()`, `computed()`). RxJS is used exclusively for event streams, websockets, and asynchronous boundaries.
2. **Change Detection**: Components enforce `ChangeDetectionStrategy.OnPush` and modern template control flow (`@if`, `@for (item of items; track item.id)`).
3. **Strict Boundaries**:
   - `customer-pwa` cannot import from `merchant-portal`.
   - `merchant-portal` cannot import from `customer-pwa`.
   - All shared logic must reside in `libs/*` and be consumed via `@nukkadnow/*` public path aliases.
   - Run `pnpm check:boundaries` to verify boundary compliance.

---

## 4. Shared Libraries (`libs/`)

| Package | Scope | Description |
|---|---|---|
| `@nukkadnow/ui` | Shared UI | Buttons, inputs, modals, skeletons, product cards, price displays, badges, tokens. |
| `@nukkadnow/api-client` | Networking | OpenAPI-generated HTTP contracts, WebSocket adapters, API endpoints. |
| `@nukkadnow/auth-client` | Security | JWT storage, refresh tokens, session lifecycle, authentication state. |
| `@nukkadnow/domain-models` | Types | Presentation-facing domain models (Customer, Merchant, Outlet, Order, Catalog). |
| `@nukkadnow/utilities` | Utilities | INR/Paise currency formatting, Indian phone & pincode validators, date helpers. |
| `@nukkadnow/i18n` | Localization | Multi-language translation dictionaries (English, Hindi, Marathi for Nagpur). |
| `@nukkadnow/testing` | Testing | Test helpers, mock fixtures, test harnesses for karma and playwright. |
| `@nukkadnow/eslint-config` | Linting | Monorepo boundary rules and TypeScript lint policies. |

---

## 5. Development Workflow & Commands

### Prerequisites
- **Node.js**: `>= 20.18.0` (LTS)
- **pnpm**: `>= 9.12.3`

### Common Commands

```bash
# Install dependencies
pnpm install

# Start Customer PWA (Port 4200)
pnpm dev:customer

# Start Merchant Portal (Port 4201)
pnpm dev:merchant

# Build all applications and libraries
pnpm build

# Build specific applications
pnpm build:customer
pnpm build:merchant

# Run all unit tests
pnpm test

# Run End-to-End tests
pnpm e2e

# Code formatting
pnpm format
pnpm format:check

# Architectural boundary verification
pnpm check:boundaries

# Code linting
pnpm lint
pnpm lint:fix

# Generate API Client from Backend OpenAPI Specs
pnpm generate:api
```

---

## 6. Locality Conventions (Nagpur Pilot)
- Currency: Expressed in paise minor units (`amountPaise`) internally, displayed formatted with the Rupee symbol (`₹`).
- Phone numbers: Validated against 10-digit Indian mobile format (`^[6-9]\d{9}$`).
- Address format: Locality, City, PIN code (e.g. `Dharampeth, Nagpur - 440010`).
- Languages: Primary English with seamless switching to Hindi (हिंदी) and Marathi (मराठी).
