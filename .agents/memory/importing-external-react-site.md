---
name: Importing external React sites as artifacts
description: Checklist for porting a standalone GitHub React repo (own router/build tooling) into the pnpm-monorepo artifact scaffold.
---

When importing a self-contained external React repo (its own router, CSS build, figma-style asset imports) into a Replit monorepo artifact:

- Replace the scaffold's router (often `wouter`) with whatever the source repo uses (e.g. `react-router` v7) — swap the dependency in `package.json` and rewrite `App.tsx`/`main.tsx` to mount the source repo's own router/providers rather than trying to adapt the scaffold's routing.
- Merge the source repo's multiple CSS files (fonts, theme, tailwind entry, globals) into the artifact's single `src/index.css`, preserving Google Fonts imports and any custom Tailwind plugins actually used (check for `prose` classes etc. before dropping typography plugin).
- Delete unused scaffold leftovers (old pages, ui components, hooks, lib) once confirmed unreferenced by the imported app — grep first, don't assume.
- Source repos exported from tools like Figma-make sometimes have literal duplicate `import React from "react"` lines appended at file end after a trailing export — this is a known artifact of that export pipeline and shows up as `TS2300: Duplicate identifier 'React'` on typecheck; just strip the duplicate trailing imports.
- **Why:** these repos are often built as standalone SPAs with different assumptions (own build tool, own router) than the monorepo's artifact template, so a naive file copy compiles cleanly but silently keeps the wrong router/deps wired up.
