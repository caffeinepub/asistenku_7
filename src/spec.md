# Specification

## Summary
**Goal:** Update the landing page layout and pricing behavior by editing only `frontend/src/components/asistenku/LandingPage.tsx`, keeping all other pages, routing, backend, and existing shared components unchanged.

**Planned changes:**
- Implement the updated Hero section directly in `LandingPage.tsx`: keep the existing headline copy exactly, insert the definition line exactly under the headline and above the CTA, and resize the hero image via styling so it is less dominant (<= 40% container width on desktop; non-full-bleed and non-dominant on mobile) while continuing to use `/assets/heroimage.png`.
- Add three new informational sections immediately after the Hero (in order), with copy rendered verbatim: (1) “Bagaimana Kami Mendampingi” with four step lines plus the closing line separated by a small vertical gap, (2) “Tepat Tanpa Kehilangan Waktu” with its paragraph, (3) a “Unit Layanan” messaging section with the two specified sentences.
- Implement a “Fase Layanan (Pricing)” card group in `LandingPage.tsx` with accordion behavior: all cards collapsed by default (no price visible when collapsed), smooth 200–300ms open/close animation, and on expand show the exact three required elements in order (bold price line, secondary flexibility line, and a primary-colored button labeled exactly “Hubungi Concierge Kami”), while ensuring no “/bulan”, “upgrade”, “top up”, subscription wording, or auto-calculation phrasing is introduced.
- Continue rendering existing `Header`, `JoinTeamSection`, `Penutup`, and `Footer` components as-is from `LandingPage.tsx`.

**User-visible outcome:** The landing page shows a revised hero (with an added definition line and a smaller, less dominant image), three new informational sections with fixed Indonesian copy, and a collapsed-by-default pricing accordion that reveals the specified pricing details and CTA only when expanded.
