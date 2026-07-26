---
name: Bilingual page i18n conversion pattern
description: How to convert hardcoded-copy React pages to useLocale/t.* against canonical bn.json/en.json dictionaries (Kutirchar EcoFarm project, but reusable pattern).
---

When a project has canonical bn.json/en.json translation dictionaries with a namespace per page, convert each page component with this pattern:

```tsx
const { t } = useLocale();
const x = t.<namespace>;
```

Then replace every hardcoded JSX string with `x.<key>`, including array/object literals (cards, table rows, list items) — pull the entire structured data (icons, colors, phase tags) from the JSON where present, and keep only presentation-only constants (color/style lookups, icon-to-index mappings) in the component itself.

**Why:** the JSON dictionaries are the source of truth for copy; keeping data in-component causes drift between bn/en and silently reintroduces hardcoded English when the page is next touched.

**How to apply:** when a page's JSON namespace has evolved (e.g. more items, renamed fields) beyond what the old hardcoded component had, treat the JSON shape as authoritative and rewrite the component's rendering to match it — don't force old field names onto new JSON keys. Always run the workspace typecheck after each page conversion, not just at the end, so schema mismatches are caught immediately.
