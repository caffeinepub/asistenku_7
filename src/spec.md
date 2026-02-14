# Specification

## Summary
**Goal:** Enable a one-time superadmin claim flow by wiring new backend methods to a “Claim Superadmin” block on the Internal Login page, using the existing Internet Identity login flow.

**Planned changes:**
- Add/ensure `hasSuperadmin()` and `claimSuperadmin()` methods exist in `backend/main.mo` with the exact required signatures and behaviors (first caller claims; idempotent for current superadmin; reject others).
- Update `frontend/src/pages/internal/InternalLogin.tsx` to query `hasSuperadmin()` on load, show a loading indicator while unknown, and conditionally render a “Claim Superadmin” card only when no superadmin exists; require Internet Identity login before allowing the claim; show backend error messages on failure; avoid the word “service/Service” in page text.
- Update exactly one frontend actor/binding helper file (e.g., `frontend/src/hooks/useActor.ts`) so the Internal Login page can call `hasSuperadmin()` and `claimSuperadmin()` after Internet Identity login, without any global refactors or routing changes.

**User-visible outcome:** On `/internal/login`, users can log in with Internet Identity and (only if no superadmin exists yet) claim superadmin once; after a successful claim the card disappears, and failed claims display the backend message.
