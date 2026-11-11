# Sprint 00 — Frontend Architecture, Monorepo Workspace & Foundation

- **Sprint ID:** NNK-FE-SPRINT-00
- **Duration:** 1 Week
- **Target Apps:** `customer-pwa`, `merchant-portal`, `libs/*`
- **Goal:** Establish clean monorepo architecture, Turborepo pipelines, strict boundary enforcement, TypeScript path aliases, base HTTP/WS adapters, and Angular Signals state conventions.

---

## 1. Principles & Coding Standards

### DRY & KISS
- **Zero Cross-App Leakage:** Shared libraries in `libs/` serve both apps. Neither application may import directly from the other.
- **KISS Tooling:** Standard Angular CLI with Turborepo caching. No custom complicated build orchestrators.
- **Unified TypeScript Configuration:** `tsconfig.base.json` provides centralized path mappings (`@nukkadnow/*`) and strict typing flags (`strict: true`, `noImplicitAny: true`).

### SOLID Standards
- **Single Responsibility:** Each library in `libs/` owns one distinct domain (UI primitives, API contracts, Auth state, Utilities, Localization).
- **Open/Closed:** Core HTTP adapter (`HttpClientAdapter`) provides interceptor hooks for authentication, tenant context, and correlation IDs without modifying its core request logic.
- **Dependency Inversion:** Features depend on domain model interfaces rather than concrete API payload implementations.

---

## 2. Security Architecture & Threat Defense
- **Enforced Boundaries:** ESLint boundary rules prevent accidental leaks of customer private code into merchant portals or vice versa.
- **Correlation ID Propagation:** All HTTP requests inject `x-correlation-id` for end-to-end W3C distributed tracing.
- **Secret Hygiene:** Strict `.gitignore` and `.env.example` guardrails ensure no production API keys, secrets, or database URLs can ever be committed to the frontend repository.

---

## 3. Libraries & Infrastructure Setup

| Library | Namespace | Responsibility |
|---|---|---|
| UI Library | `@nukkadnow/ui` | Atomic design tokens, reusable buttons, inputs, modals, commerce cards |
| API Client | `@nukkadnow/api-client` | Generated OpenAPI types, HTTP client adapter, WebSocket relay |
| Auth Client | `@nukkadnow/auth-client` | Session state, token storage, refresh interceptor |
| Domain Models | `@nukkadnow/domain-models` | Presentation view models and business interfaces |
| Utilities | `@nukkadnow/utilities` | Currency formatters (Paise/INR), date parsers, Indian validators |
| i18n | `@nukkadnow/i18n` | Multi-language translation engine (EN, HI, MR) |
| Testing Harness | `@nukkadnow/testing` | Shared test fixtures, component harnesses, and mocks |

---

## 4. Definition of Done (DoD)
- [ ] Monorepo workspace bootstrapped with `pnpm` and `turbo.json`.
- [ ] `angular.json` multi-project workspace configured with `customer-pwa` and `merchant-portal`.
- [ ] Strict TypeScript compilation passing with zero type errors.
- [ ] Automated boundary validation script (`node tools/check-boundaries.mjs`) passing in CI.
- [ ] Root README and developer onboarding guidelines documented.
