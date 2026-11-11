# Sprint 02 — Merchant Authentication, OTP & Session Security

- **Sprint ID:** NNK-FE-SPRINT-02
- **Duration:** 2 Weeks
- **Target Apps:** `merchant-portal`, `libs/auth-client`, `libs/api-client`
- **Goal:** Implement secure, smartphone-first merchant authentication using 10-digit Indian phone numbers, SMS OTP verification, 60-second resend countdown, automatic token refresh rotation, and Angular route guards.

---

## 1. Principles & Coding Standards

### DRY & KISS
- **KISS Auth UX:** No passwords required for merchants. Direct phone number entry $\rightarrow$ 6-digit OTP $\rightarrow$ workspace redirect.
- **DRY Interceptors:** `auth.interceptor.ts` automatically attaches bearer tokens and transparently catches 401s to initiate token refresh without boilerplate in feature code.

### SOLID Standards
- **Single Responsibility:**
  - `TokenStorageService`: Manages encrypted/browser storage persistence.
  - `AuthStateService`: Manages reactive user profile signals.
  - `AuthFacade`: Coordinates UI intent (login, logout, resend OTP).
- **Dependency Inversion:** Route guards depend on `AuthStateService` interface, allowing straightforward mock authentication in local development.

---

## 2. Security Architecture & Threat Defense
- **Zero Account Enumeration:** Response messages are identical whether a phone number is existing or new.
- **Brute-Force & Rate-Limit UI:**
  - Strict 60-second client-side resend cooldown timer.
  - After 3 consecutive invalid OTP entries, the challenge is locked with an on-screen timer.
- **Cryptographic Token Lifecycle:**
  - Access token expires in 15 minutes; refresh token is exchanged automatically in the background.
  - On token theft detection (concurrent family reuse), session is evicted immediately and user redirected to `/auth`.

---

## 3. Endpoints & API Specifications

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `POST` | `/api/v1/auth/otp/request` | Request 6-digit OTP to mobile number | Public |
| `POST` | `/api/v1/auth/otp/verify` | Submit OTP and obtain JWT tokens | Public |
| `POST` | `/api/v1/auth/token/refresh` | Exchange refresh token for new pair | Public (Refresh Token) |
| `POST` | `/api/v1/auth/logout` | Revoke active session on server | Bearer Token |
| `GET` | `/api/v1/auth/me` | Fetch authenticated merchant identity & memberships | Bearer Token |

### Sample Schemas

#### Request: `POST /api/v1/auth/otp/request`
```json
{
  "phoneNumber": "+919876543210",
  "purpose": "MERCHANT_LOGIN"
}
```

#### Response: `POST /api/v1/auth/otp/verify` (200 OK)
```json
{
  "accessToken": "eyJhbGciOi...",
  "refreshToken": "eyJhbGciOi...",
  "expiresIn": 900,
  "user": {
    "id": "usr_01j7x8k9",
    "phoneNumber": "+919876543210",
    "roles": ["MERCHANT_OWNER"],
    "activeTenantId": "mer_01j7x8z1",
    "activeOutletId": "out_01j7x8z2"
  }
}
```

---

## 4. UI Components & Screen Structure

```text
apps/merchant-portal/src/app/features/authentication/
├── authentication.routes.ts
├── pages/
│   ├── login.page.ts                 # Phone number entry with +91 prefix
│   ├── verify-otp.page.ts            # 6-box auto-focus OTP input with resend timer
│   └── session-expired.page.ts       # Friendly timeout notification
├── components/
│   ├── phone-input.component.ts      # Indian phone regex validator & formatter
│   └── otp-pin-input.component.ts    # Auto-tabbing numeric keypad
├── state/
│   ├── auth.store.ts                 # Signal store: loading, challengeId, cooldown
│   └── auth.facade.ts                # Public methods exposed to views
└── data-access/
    └── auth.api.ts                   # HTTP calls to /api/v1/auth/*
```

---

## 5. Definition of Done (DoD)
- [ ] Phone number formatted automatically with `+91` country code.
- [ ] 6-digit OTP input auto-advances to the next box on input and handles paste.
- [ ] Resend OTP button disabled until 60-second cooldown expires.
- [ ] Auth guard prevents unauthenticated access to `/dashboard` and protected routes.
- [ ] Token refresh interceptor silently renews expired access tokens without interrupting the user.
