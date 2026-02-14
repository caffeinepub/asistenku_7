# Specification

## Summary
**Goal:** Register existing internal dashboard pages as new TanStack Router routes in `frontend/src/App.tsx` without changing any existing routing code.

**Planned changes:**
- In `frontend/src/App.tsx`, add missing imports for the existing dashboard page components (only if not already imported).
- Add new `createRoute({ ... })` route constants for the 7 dashboard paths:
  - `/superadmin/dashboard` -> `SuperadminDashboard`
  - `/admin/dashboard` -> `AdminDashboard`
  - `/asistenmu/dashboard` -> `AsistenmuDashboard`
  - `/concierge/dashboard` -> `ConciergeDashboard`
  - `/strategicpartner/dashboard` -> `StrategicPartnerDashboard`
  - `/management/dashboard` -> `ManagementDashboard`
  - `/finance/dashboard` -> `FinanceDashboard`
- Append the new route constants into `routeTree = rootRoute.addChildren([ ... ])` without removing or modifying existing entries.

**User-visible outcome:** Visiting each of the 7 new dashboard URLs renders the correct existing dashboard page instead of the 404 page, with all existing routes continuing to work unchanged.
