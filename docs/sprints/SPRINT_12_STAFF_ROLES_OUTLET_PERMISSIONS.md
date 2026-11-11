# Sprint 12 — Staff Roles, Outlet Permissions & PIN Lockout

- **Sprint ID:** NNK-FE-SPRINT-12
- **Duration:** 2 Weeks
- **Target Apps:** `merchant-portal`, `libs/auth-client`
- **Goal:** Implement role-based access control (Owner, Outlet Manager, Chef/Kitchen Staff, Cashier), quick 4-digit PIN staff switching on shared tablets, granular structural directive (`[merchantHasPermission]`), and session revocation.

---

## 1. Principles & Coding Standards

### DRY & KISS
- **Structural Directive:** `*merchantHasPermission="'orders:accept'"` conditionally renders UI buttons and routes based on active staff role.
- **KISS Shared Counter Mode:** Shared POS tablet in store stays logged in under tenant, but cashier/chef must enter their 4-digit PIN to perform privileged actions (refunds, pricing changes).

### SOLID Standards
- **Single Responsibility:** `PermissionService` strictly evaluates permission matrices; `StaffDirectoryStore` manages team invites and outlet role assignments.

---

## 2. Role Permission Matrix

| Permission | Owner | Outlet Manager | Kitchen / Chef | Cashier |
|---|:---:|:---:|:---:|:---:|
| `orders:view` | ✅ | ✅ | ✅ | ✅ |
| `orders:accept` | ✅ | ✅ | ✅ | ✅ |
| `orders:status_prep_ready` | ✅ | ✅ | ✅ | ❌ |
| `orders:refund_cancel` | ✅ | ✅ (Limit) | ❌ | ❌ |
| `catalogue:edit_price` | ✅ | ✅ | ❌ | ❌ |
| `inventory:adjust_stock`| ✅ | ✅ | ✅ | ✅ |
| `staff:invite_remove` | ✅ | ❌ | ❌ | ❌ |
| `billing:view_invoices` | ✅ | ❌ | ❌ | ❌ |

---

## 3. Endpoints & API Specifications

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/v1/merchant/staff` | List staff members and outlet assignments |
| `POST` | `/api/v1/merchant/staff/invite` | Send phone invitation with assigned role |
| `PATCH` | `/api/v1/merchant/staff/:id/role` | Update role or assigned outlets |
| `DELETE` | `/api/v1/merchant/staff/:id` | Revoke staff access immediately |
| `POST` | `/api/v1/merchant/staff/pin-verify` | Verify 4-digit staff PIN for shared terminal switch |

---

## 4. Definition of Done (DoD)
- [ ] Structural directive `[merchantHasPermission]` successfully hides restricted buttons.
- [ ] Fast PIN-based staff switch verified on shared tablet without requiring full OTP re-login.
- [ ] Owner can revoke access with immediate UI eviction on staff member device.
- [ ] Direct route navigation to `/billing` rejected with friendly unauthorized screen for cashiers.
