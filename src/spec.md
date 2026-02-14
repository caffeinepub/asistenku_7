# Specification

## Summary
**Goal:** Insert a new titleless micro-authority text block on the landing page directly under “Tepat Tanpa Kehilangan Waktu” while keeping all existing sections and ordering intact.

**Planned changes:**
- Update only `frontend/src/components/asistenku/LandingPage.tsx` to add the specified `<section className="py-8"> ... </section>` block between “Tepat Tanpa Kehilangan Waktu” and the existing “Unit Layanan” section.
- Ensure the new block has no title and no additional UI elements/wrappers beyond the exact provided JSX structure and Tailwind classes, and that all existing sections (including “Unit Layanan” and “Fase Layanan (Pricing)”) remain unchanged and in the correct order.

**User-visible outcome:** The landing page shows an additional short, titleless explanatory text block immediately below “Tepat Tanpa Kehilangan Waktu”, followed by the unchanged “Unit Layanan” section and the existing “Fase Layanan (Pricing)” section.
