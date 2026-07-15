# LurniqHub storefront

Single-page storefront for LurniqHub, an offline-first, solar-powered maritime
education venture piloting at Toli Senior Secondary School in Lusikisiki,
Eastern Cape.

The implementation follows `docs/lurniqhub-storefront-architecture-v2.md`.

## Visual architecture

The site uses three independent, section-scoped SVG illustrations:

1. A patent-poster nautical observation instrument in the hero.
2. An exploded diagram of the solar, Raspberry Pi mesh and offline content layers.
3. A labeled Pi-1 through Pi-10 classroom mesh topology.

Each illustration is fully rendered in the server HTML. GSAP 3.13.0 and
ScrollTrigger progressively add section-local animation. With reduced motion or
without JavaScript, all diagrams remain in their fully resolved state.

Oversized headings are grouped into viewport-safe lines and reveal character by
character with scroll progress; scrolling upward reverses the reveal. The hero,
assembly and signal diagrams use sticky reading stages so their complete drawings
can resolve inside one view. The assembly section also includes an accessible
explorer dialog: select a layer from the drawing or keyboard-friendly tabs to
isolate it and read deployment detail.

The topology role map currently assumes Pi-1 is the controller, Pi-2 and Pi-3
are routers, and Pi-4 through Pi-10 are end nodes. Replace the `nodes` and
`edges` arrays in `app/storefront-client.tsx` if live monitoring data confirms a
different wiring map.

## Development

Requires Node.js 22.13 or newer.

```bash
pnpm install
pnpm dev
```

Production validation:

```bash
pnpm build
pnpm test
```

## Important files

- `app/storefront-client.tsx` - page content and the three inline SVG diagrams
- `app/assembly-explorer.tsx` - interactive, keyboard-accessible architecture dialog
- `app/globals.css` - layout and shared patent-illustration language
- `public/assets/diagram-motion.js` - reduced-motion-aware GSAP timelines
- `tests/rendered-html.test.mjs` - content, SVG scope and WebGL-removal checks
- `docs/lurniqhub-storefront-architecture-v2.md` - project source of truth

The retired WebGL scene, Three.js imports and GLB hull are not part of v2.
