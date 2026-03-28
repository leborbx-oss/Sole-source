## 2025-05-14 - Skip Link & Accessible Navigation Patterns
**Learning:** In SPAs, route changes do not automatically reset focus, making 'Skip to main content' links and explicit ARIA markers (`aria-current`, `aria-expanded`) critical for providing context to keyboard and screen reader users after navigation.
**Action:** Always include a 'Skip to main content' link as the first focusable element in `App.tsx` and ensure navigation links use `aria-current="page"` to indicate the active route.

## 2025-05-14 - Dynamic ARIA Labels for Interactive Components
**Learning:** Static ARIA labels can be insufficient when component state changes (e.g., cart count). Providing dynamic labels (e.g., "View cart, 1 item") significantly improves the experience for screen reader users by conveying real-time state.
**Action:** Use context values (like `totalItems` from `CartProvider`) to construct descriptive, dynamic `aria-label` strings for interactive elements.
