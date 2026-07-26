// ─── Kutirchar EcoFarm — Motion Tokens ───────────────────────────────────────
// Extends the brand system (brand.ts is untouched — single source of truth for
// colors/fonts). All animation timing/easing across the site reads from here.
// Rules: transform/opacity only · parallax ≤ 12% · reduced-motion fully honored.

export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const MOTION = {
  dur: {
    fast: 0.15, // micro-interactions (hover, chips, toggles)
    base: 0.3,  // standard element transitions
    slow: 0.6,  // section reveals
    scene: 1.0, // hero / scene-level choreography (0.9–1.2s band)
  },
  stagger: 0.07,     // 60–90ms band
  distance: 24,      // default reveal slide distance (px)
  parallaxMax: 0.12, // never exceed 12% translation
  viewportMargin: "-60px 0px", // trigger reveals slightly before fully in view
} as const;
