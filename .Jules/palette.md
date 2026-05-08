## 2025-05-14 - [Skip to Main Content Link]
**Learning:** The application lacked a skip-to-content bypass, which is critical for keyboard and screen reader accessibility in SPAs where navigation doesn't trigger a full page reload.
**Action:** Always ensure App.tsx includes a skip link as the first focusable element targeting a specific ID on the <main> content wrapper.
