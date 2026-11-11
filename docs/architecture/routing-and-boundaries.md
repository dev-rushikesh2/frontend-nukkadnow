# Routing & Feature Boundary Architecture

## Rules & Standards
1. **Lazy Routing**: Every feature route is loaded on demand using `loadChildren` or `loadComponent`.
2. **Feature Isolation**: Each feature is a self-contained module containing:
   - `pages/`: Route-level views
   - `components/`: Feature-local reusable UI pieces
   - `data-access/`: API adapters, repositories, and DTO mappers
   - `state/`: Signal stores and selectors
   - `models/`: Feature-level view models
   - `utils/`: Local helpers and formatters
   - `{feature}.routes.ts`: Feature routing definition
   - `index.ts`: Feature public exports
3. **Strict Boundaries**: Features cannot reach into internal private files of other features. All inter-feature communication happens through routing parameters, shared state in `core/`, or common models in `@nukkadnow/domain-models`.
