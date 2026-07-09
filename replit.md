# Kutirchar EcoFarm

A bilingual (Bangla default / English toggle) production website for Kutirchar EcoFarm — a proof-first smart cattle & circular energy ecosystem farm in Sirajganj, Bangladesh, currently in "Verification & Foundation Phase".

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm --filter @workspace/kutirchar-ecofarm run dev` — run the EcoFarm website (via workflow)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)
- Kutirchar EcoFarm site: React 18 + Vite + react-router v7 + Tailwind v4, frontend-only (no backend/DB), imported from source repo https://github.com/sysmoai/KutircharEcoFarm

## Where things live

- `artifacts/kutirchar-ecofarm/` — the EcoFarm website artifact
  - `src/app/brand.ts` — **source of truth** for all brand colors, fonts, and contact info. Never invent new colors/fonts/claims outside this file.
  - `src/app/routes.tsx` — defines all pages: `/`, `/project`, `/proof`, `/ecosystem`, `/products`, `/digital`, `/updates`, `/contact`, plus `/brand-guide` (14-section brand identity guide)
  - `src/app/components/layout/Root.tsx` — shared navbar/footer/phase-banner layout
  - `src/app/components/shared/i18n.tsx` — `LocaleProvider`/`useLocale` bilingual i18n system (bn default, en toggle)
  - `src/i18n/bn.json`, `src/i18n/en.json` — centralized translation dictionaries (source of truth for all copy)

## Architecture decisions

- Kutirchar EcoFarm pages are self-contained inline-styled React components (no shadcn/radix dependency) — this matched the original repo structure and was preserved as-is during import.
- Zero Fake Data Policy: all content on the site comes from the original repo's real, verified copy (bn.json/en.json, brand.ts). Phone/WhatsApp contact fields are intentionally left empty in `brand.ts` pending verification — do not fabricate values.
- Site is frontend-only; the contact form is a mailto-based fallback per the original repo's design (no backend wiring yet).

## Product

Kutirchar EcoFarm is a proof-first marketing/transparency site: it presents project status, governance/proof documents, the circular ecosystem (dairy, biogas, solar, silage), products/services, digital infrastructure, and update reports, all phase-gated and evidence-first, with a full bilingual (Bangla/English) toggle and a public brand guide.

## User preferences

- Never invent colors, fonts, or unverified claims — strictly follow `src/app/brand.ts` and existing translated copy.
- If information is missing (e.g. verification documents, phone numbers), ask the user rather than assuming or fabricating it.

## Gotchas

- `src/app/brand.ts` is the single source of truth for design tokens — always check it before styling anything on this site.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
