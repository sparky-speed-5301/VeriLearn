# VeriLearn frontend research

## Sources consulted

The following official references were used as pattern targets while shaping the interface. The container had restricted outbound network access during implementation, so live fetches to the W3C and UI documentation endpoints timed out; no source code, visual assets, copy, or proprietary layouts were copied.

- [W3C Web Accessibility Initiative — Accessibility Principles](https://www.w3.org/WAI/fundamentals/accessibility-principles/)
- [shadcn/ui — Dialog](https://ui.shadcn.com/docs/components/dialog)
- [Lucide — lucide-react guide](https://lucide.dev/guide/packages/lucide-react)
- [Tailwind CSS — Responsive design](https://tailwindcss.com/docs/responsive-design)
- [Radix UI — Primitives](https://www.radix-ui.com/primitives)
- [Motion — Accessibility](https://motion.dev/docs/accessibility)

## What was learned

- **W3C WAI:** interaction states need to remain understandable without color alone; semantic structure, focus visibility, keyboard access, and reduced-motion support are foundational rather than polish.
- **shadcn/ui and Radix:** layered UI such as drawers, dialogs, and popovers should have explicit focus behavior and clear escape/close affordances. VeriLearn currently uses lightweight local composition because the foundation repository does not include shadcn or Radix dependencies.
- **Lucide:** small, consistent line icons are preferable to mixed decorative iconography. The foundation repo does not include an icon package, so the demo favors short labels, typographic marks, and accessible text actions rather than adding a dependency solely for icons.
- **Tailwind responsive design:** responsive behavior should be breakpoint-driven but content-driven. The layouts collapse the verification workspace into source → transcript → evidence rather than simply shrinking desktop panels.
- **Motion accessibility guidance:** transitions communicate state and hierarchy; they should be brief and disabled or minimized under `prefers-reduced-motion`.

## Ideas adapted

- A responsive, keyboard-visible workspace shell with a persistent desktop navigation and a mobile navigation drawer.
- Evidence status as a combination of text, status marker, and color: `Supported`, `Partially supported`, `Needs review`, and `Unverified`.
- Source timestamps as buttons/controls rather than passive metadata.
- A compact, editorial panel system with strong rules, monospace metadata, and small system labels.
- A progress pipeline that names each processing stage instead of showing an unexplained spinner.

## Ideas intentionally avoided

- Generic centered SaaS hero layouts and oversized blank marketing sections.
- Purple AI gradients, glassmorphism, neon effects, and dashboard vanity metrics.
- Chat-style answer bubbles that hide the source relationship.
- Treating confidence as truth or using color as the only status signal.
- Copying any specific product’s logo, layout, illustration, or wording.

## License and attribution

The implementation uses original VeriLearn layouts, copy, mock data, and CSS tokens. No third-party images, logos, or proprietary visual assets were added. The external references above are documentation links only and do not introduce runtime assets or attribution requirements.
