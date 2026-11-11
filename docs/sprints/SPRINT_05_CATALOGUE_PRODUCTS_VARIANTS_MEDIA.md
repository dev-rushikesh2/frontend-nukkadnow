# Sprint 05 — Catalogue, Products, Variants & Media Management

- **Sprint ID:** NNK-FE-SPRINT-05
- **Duration:** 2 Weeks
- **Target Apps:** `merchant-portal`, `libs/ui`, `libs/domain-models`
- **Goal:** Build the complete product catalogue experience on mobile and web: product listing, category filters, quick stock toggles, multi-attribute variants, made-to-order lead time settings, and client-side compressed image uploads.

---

## 1. Principles & Coding Standards

### DRY & KISS
- **KISS Product Creation:** Quick 3-field form on mobile (Name, Price, Category) with an "Advanced Options" accordion for variants, SKU, and lead times.
- **Client-Side Image Optimization:** Images are compressed and converted to WebP in the browser before upload, minimizing bandwidth on 4G networks.

### SOLID Standards
- **Single Responsibility:** Image compression handled by `ImageCompressorService`; file upload progress handled by `MediaUploadService`; product business rules handled by `CatalogueStore`.

---

## 2. Product Architecture & Variant Matrix
- **Attributes Supported:** Size (S, M, L), Weight (250g, 500g, 1kg), Flavors, Packets.
- **Price Invariant:** Base price in paise; variant prices specify absolute amount or relative delta (`+₹50`).
- **Dietary Tags:** Vegetarian (Green dot in square), Non-Vegetarian (Red dot in square), Vegan, Gluten-Free.
- **Special Configurations:**
  - Made-to-order flag (`isMadeToOrder: true`) with required lead time (e.g. 2 hours or 24 hours).
  - Maximum daily order limit to prevent kitchen overbooking.

---

## 3. Endpoints & API Specifications

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/v1/merchant/products` | Searchable product list with pagination and filters |
| `POST` | `/api/v1/merchant/products` | Create product with variants |
| `PATCH` | `/api/v1/merchant/products/:id` | Update product details |
| `PATCH` | `/api/v1/merchant/products/:id/availability` | Quick toggle product in-stock / out-of-stock |
| `POST` | `/api/v1/merchant/media/upload-url` | Obtain presigned URL for direct S3/Cloud storage upload |

---

## 4. Definition of Done (DoD)
- [ ] Product list displays price, stock count, and active status chip.
- [ ] 1-tap quick toggle changes product availability with optimistic UI update.
- [ ] Image upload shows progress spinner and handles retry on failure.
- [ ] Variants table validates that duplicate combinations (e.g. "Medium / Chocolate" twice) cannot be created.
- [ ] Currency inputs accept rupees and convert automatically to integer paise for API payload.
