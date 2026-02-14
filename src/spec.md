# Specification

## Summary
**Goal:** Implement a strict frontend-only pending client/partner activation workflow, including pending-only listing in Superadmin and pending-by-default registration.

**Planned changes:**
- Update `frontend/src/pages/superadmin/SuperadminDashboard.tsx` “Status User” tab to render only pending users where `(role === "client" || role === "partner") && isActive === false`, and replace the entire table section with the provided markup (including `formatPrincipal`, `handleCopy`, `pendingUsers`, `No` column, constant `Pending` status badge, and an `Aktifkan` action that calls `handleToggleStatus(user)`).
- Update `handleToggleStatus` in `SuperadminDashboard.tsx` to activation-only behavior: call `setUserActiveStatus(Principal.fromText(user.principal), true)` and then refresh via `fetchUsers()`.
- Update `frontend/src/pages/client/RegisterClient.tsx` submission to call `actor.saveCallerUserProfile` with `{ name, email, role: "client", isActive: false }` and set `submitted` to `true` on success.
- Update `frontend/src/pages/partner/RegisterPartner.tsx` submission to call `actor.saveCallerUserProfile` with `{ name, email, role: "partner", isActive: false }` and set `submitted` to `true` on success.
- Update workspace button behavior in `frontend/src/pages/client/LoginClient.tsx` and `frontend/src/pages/partner/LoginPartner.tsx` to be manual navigation only (no auto-redirect), navigating to `/client/dashboard` and `/partner/dashboard` respectively.
- Update the Superadmin dashboard footer text to: `PT. Asistenku Digital Indonesia. Semua Hak dilindungi.`

**User-visible outcome:** Superadmins see only pending client/partner accounts in the Status User tab, can copy full principals and activate users so they disappear from the pending list; newly registered clients/partners are saved as pending by default; client/partner workspace access occurs only via the workspace button without auto-redirect.
