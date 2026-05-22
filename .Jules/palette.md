## 2026-05-22 - Skip to Main Content Link in SPAs
**Learning:** In Single Page Applications (SPAs) like React Router, the 'Skip to main content' link must be the first focusable element inside the router to ensure it's available on every route change. Targeting the `<main>` element with `tabIndex={-1}` allows for programmatic focus without extra visual outlines.
**Action:** Always place the skip link at the very top of the app's routing container and ensure the target `main` element has a corresponding ID and `tabIndex`.
