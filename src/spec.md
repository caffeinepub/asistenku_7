# Specification

## Summary
**Goal:** Stabilize the frontend preview by simplifying `frontend/src/App.tsx` routing and adding a NotFound fallback route.

**Planned changes:**
- Refactor `frontend/src/App.tsx` to be a minimal React Router entrypoint with exactly one `BrowserRouter` and exactly one `Routes` block, ensuring `"/"` renders the existing `LandingPage`.
- Add a `"*"` NotFound fallback route in `frontend/src/App.tsx` that shows a centered, calm card UI with the exact strings `404`, `Halaman tidak ditemukan.`, and a `Kembali` button that navigates to `"/"`.
- Remove/avoid duplicate router providers, duplicate route trees/`Routes` blocks, and any leftover development-only code in `frontend/src/App.tsx` that could cause render loops or preview hangs.
- Verify/fix `frontend/src/App.tsx` imports to use correct relative paths and correct filename casing for all routed components.
- Ensure `frontend/src/App.tsx` has no runtime side-effects (no hooks like `useEffect`, no timers, no listeners, no async-dependent conditional initial rendering).

**User-visible outcome:** Visiting `/` reliably shows the existing landing page, and unknown URLs show a calm 404 page with a `Kembali` button returning to the landing page (no more blank screens/hangs caused by routing).
