# Palette UX Journal 🎨

## 2026-06-08 - Accessible Skip Links in Tailwind
**Learning:** When implementing 'Skip to main content' links, adding `tabIndex={-1}` to the target `<main>` element ensures focus shifts correctly for screen readers, but can cause a visible focus ring in some browsers. Using the `outline-none` class on the target element removes this distracting artifact without compromising programmatic focus functionality.
**Action:** Always pair programmatic focus targets (`tabIndex={-1}`) with `outline-none` when using Tailwind to maintain a clean UI for mouse users.
