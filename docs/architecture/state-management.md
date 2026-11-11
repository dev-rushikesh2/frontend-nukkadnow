# State Management Architecture

## Principles
1. **Local State with Angular Signals**: Use `signal()` and `computed()` for UI-local state. Component change detection is set to `OnPush`.
2. **Feature Store**: Each feature provides a lightweight signal-based or RxJS-based store (`*.store.ts`) scoped at the route or component level.
3. **Streaming & Async Boundaries**: Use RxJS `Observable` for WebSockets, server-sent events, real-time geolocation polling, and debounce flows.
4. **No In-Place Mutation**: State objects are immutable. Any update replaces references using standard object spread or immutable helpers.
5. **Separation of Presentation & Business Logic**: Presentation components receive signals/inputs and emit UI intent via `@Output()` or callbacks. State logic stays in the store.
