## 2026-05-30 - Accessible Dynamic Cart Labeling
**Learning:** Screen readers need more context than just a number for icon-only status indicators like a shopping cart badge. Using a dynamic `aria-label` that includes both the purpose of the link ("Shopping bag") and the current count ("2 items") provides a much better experience.
**Action:** When implementing cart or notification badges, always use a template like `aria-label={count === 0 ? "Empty [category]" : "[Category], ${count} item${count === 1 ? '' : 's'}"}`.
