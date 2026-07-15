# LurniqHub Storefront — Architecture & Creative Context Document (v2)

**Purpose of this document:** ground truth for any AI coding agent (Codex, Claude Code, etc.) building the LurniqHub public storefront. Feed this in full before the build prompt at the bottom.

**v2 change log:** the original brief used one abstract geometry morphing continuously through the whole scroll. That diluted the thing that actually made the vision compelling — concrete, annotated, patent-style technical illustration — and it also caused a real bug (the object followed the user down the page, fighting for contrast against every section behind it). v2 replaces that with three separate, section-anchored illustrations, each literal and specific to what that section is actually saying, tied together by one consistent line-illustration language rather than one shared 3D object.

---

## 1. Project Brief

LurniqHub is an offline-first, solar-powered maritime training platform (Raspberry Pi mesh network, STCW-aligned) piloting at Toli Senior Secondary School in Lusikisiki, Eastern Cape. Co-founded by Aphelele and Siya. It is also the empirical vehicle for an MCom research project on the "Frugal Scalability Paradox" (hyper-local delivery vs. non-negotiable global STCW compliance standards).

**This site is the storefront, not the product.** Its job:
- Communicate the mission and the paradox it resolves, in plain language
- Show traction (pilot site, partnerships, milestones)
- Introduce the founders credibly
- Feel like a top-tier, funded, technically serious venture — because the visual bar itself is evidence of capability

**Audience:** funders, university/DTIC/DEDEAT stakeholders, potential partner schools, academic reviewers, press. NOT the offline learners themselves — they will never load this page over 3G. Keep that audience split explicit in every design decision.

---

## 2. Narrative Arc — three literal, section-anchored illustrations, one shared visual language

Reject both the original multi-metaphor brief (maritime + industrial forge + AI particles + solarpunk + deep ocean all at once) AND the v1 abstraction (one geometry morphing through three vague states). Instead: **three separate illustrations, each concrete and literal to what its section is actually about, each living only within that section, unified by one consistent style** — annotated, patent-poster technical linework (see reference set: antique buoy/navigational-apparatus patents, radial-engine and jet-compressor blueprint illustrations).

- **Hero — "Grit."** A patent-poster style nautical instrument illustration (in the spirit of the buoy patent / navigational apparatus / nautical observation apparatus references) — annotated linework on a blueprint-navy or aged-paper ground, with reference numerals and a patent-style title block. Can use a subtle scroll-triggered "trace-in" line-draw reveal (stroke-dashoffset animation) so it feels hand-drafted rather than instantly rendered. Lives only in the hero — does not persist into later sections.
- **"How it works" / Assembly section — the exploded modular diagram.** In the spirit of the radial-engine and jet-compressor exploded blueprint references: a labeled, exploded technical diagram of LurniqHub's actual modular stack — solar power, Raspberry Pi mesh, offline content store — pulled apart into clearly labeled layers as the user scrolls through this section. This is where "modular architecture" stops being a phrase and becomes something visible. Lives only in this section.
- **"Signal" / Network section — the real node graph.** A literal, labeled node-and-edge diagram of the actual mesh topology: Controller, Router, and End Node types, colour-coded and labeled (Pi-1 through Pi-10, matching the real deployment naming), connected exactly as the real mesh is wired. This is not a metaphor — it should read as real infrastructure evidence, the same way a funder deck would show an actual network diagram. If a real topology-monitoring tool already produces this diagram (see open question below), prefer echoing or embedding that over hand-illustrating a fake one. Lives only in this section.

**Shared throughline (what ties the three together without needing one shared 3D object):** consistent line weight, consistent annotation/label style (small caps reference tags, thin leader lines), and the same two-colour restraint (ink navy / off-white ground, one warm accent) across all three. The unity comes from *style*, not from literally being the same mesh.

---

## 3. Design System

| Token | Value / Direction |
|---|---|
| Primary palette | Deep ink navy (#0B1C2C–ish), warm dawn amber accent, off-white/aged-paper ground. 2 accent colors max. |
| Typography — display | One oversized, utilitarian display face for section headers |
| Typography — body | One highly legible sans, small, restrained |
| Illustration style | Patent-poster technical linework: thin uniform strokes, annotation leader-lines, small-caps reference labels, occasional numbered callouts — consistent across all three section illustrations even though each depicts something different |
| Motion language | Scroll-triggered per-section (GSAP ScrollTrigger), each illustration animates only while its own section is in view — not a continuous cross-page transform |
| Iconography | Line-based, matches the patent-illustration linework |

**Rule:** if a new visual idea doesn't reuse the existing line-illustration language, palette, or annotation style, cut it.

---

## 4. Technical Architecture

- **Stack:** SVG (primary medium for all three illustrations — these are linework diagrams, not 3D forms, so SVG is simpler, smaller, and easier to animate/annotate than WebGL) + GSAP ScrollTrigger for per-section reveal/explode/build animations. Three.js is no longer required for the hero — reserve it only if the Network section benefits from a lightly interactive force-directed layout (optional, not required for v2).
- **Each illustration is section-scoped:** built and animated only while its own section is in the viewport (`ScrollTrigger` with `start`/`end` bound to that section's element), not persisted or faded across the whole page. This directly fixes the earlier bug where the hull object trailed behind text on later sections.
- **Network section graph:** render as labeled SVG circles (nodes) + lines (edges), colour-coded by role (e.g. controller = one colour, router = another, end node = a third, following the same 2-accent-max restraint — pick from the existing palette rather than introducing 3 new colours). Node positions can be simple, human-legible layout (not force-directed chaos) — legibility over cleverness.
- **Exploded diagram section:** build as layered SVG groups (solar layer, mesh layer, content-store layer) with GSAP animating their vertical/horizontal separation and label fade-in as the user scrolls through that section, echoing the exploded-parts blueprint references.
- **Reduced-motion fallback (non-negotiable, build first, not last):** detect `prefers-reduced-motion` → freeze each illustration at its fully-resolved end state (fully drawn hero, fully exploded diagram, fully connected network graph) with no animation, rather than an empty/half-drawn state.
- **Content sections that must exist regardless of illustration layer:** Mission, The Paradox (plain-language explainer), Pilot/Traction (Toli, DEDEAT, partnerships), Founders, Contact/CTA. All real copy stays in real DOM/HTML text, never baked into SVG-as-image or canvas textures — required for accessibility, SEO, and so funders/academics can actually read and search the page.

---

## 5. Content Architecture (section-by-section)

1. **Hero** — patent-style nautical instrument illustration (trace-in reveal), one-line mission statement, scroll cue
2. **The Problem / Paradox** — plain-language explainer of hyper-local vs. STCW-standard tension, no illustration competing with this text — this is the intellectual credibility section
3. **How It Works / Assembly** — exploded modular diagram (solar / Pi mesh / offline content), labeled
4. **Traction** — Toli pilot, DEDEAT symposium presence, partnership contacts, timeline — plain typography, no background illustration
5. **Signal / The Network** — literal labeled node graph of the real mesh topology
6. **Founders** — Aphelele + Siya, credible not cutesy, plain typography
7. **CTA / Contact** — partner, fund, follow, plain typography

---

## 6. Performance & Accessibility Contract

- Lighthouse performance ≥ 85 (SVG + GSAP is inherently lighter than WebGL, so this should be easier to hit than the v1 approach)
- No blocking font loads before first paint
- Every scroll animation must have a static, fully-resolved equivalent state if `prefers-reduced-motion` is set or JS fails to load

---

## 7. Asset Sourcing Plan (no local Blender / no admin rights)

No 3D modelling tool is needed for v2 — everything is SVG, which can be hand-coded directly or drafted in a browser-based vector tool. If you want a design-first pass before hand-coding paths:
- **Figma (browser-based, free tier)** — draft the patent-style illustration and exploded diagram visually, then export as SVG.
- Avoid: any workflow requiring Blender, Maya, Spline, or GLTF — that whole pipeline is no longer part of this build.

---

## 8. Dev/Deploy Workflow (browser-only)

- Development: GitHub Codespaces or StackBlitz/CodeSandbox (browser-based, no local install)
- Version control: GitHub (CtrlAltDefeat18)
- Hosting: Netlify or Vercel, connected to GitHub repo for auto-deploy on push
- Preview/QA: test the reduced-motion fallback path explicitly before calling any section "done"

---

## 9. Rewritten Codex Build Prompt (v2)

> Rebuild the storefront's illustrations as three separate, section-scoped SVG diagrams — remove the single continuous WebGL/3D hero object entirely, along with any blend-mode or persistence logic tied to it.
>
> 1. **Hero:** a patent-poster style annotated line illustration of a nautical navigation instrument (in the style of antique patent drawings — thin uniform strokes, small-caps reference labels, leader lines, a title block). Animate it with a scroll-triggered stroke "trace-in" (stroke-dasharray/dashoffset) as the user scrolls into the hero. This illustration lives only in the hero section and does not persist or fade into later sections.
> 2. **"How it works" section:** an exploded, labeled technical diagram showing LurniqHub's real modular stack — solar power layer, Raspberry Pi mesh layer, offline content-store layer — built as separate SVG groups that animate apart (position/opacity) as the user scrolls through this section, in the style of exploded mechanical blueprint diagrams. Lives only in this section.
> 3. **"Signal" section:** a literal, labeled node-and-edge diagram of the real mesh topology — node types Controller, Router, End Node, colour-coded (using only the site's existing 2-accent palette, no new colours), labeled Pi-1 through Pi-10 to match the real deployment naming. Simple, legible layout — not a chaotic force-directed graph. Lives only in this section.
>
> All three share one consistent illustration language: same stroke weight, same label/annotation style, same palette (ink navy, off-white, one warm accent). None of them persist or animate outside their own section's scroll range. Detect `prefers-reduced-motion` and render each illustration at its fully-resolved end state with no animation in that case. All real page copy (mission statement, the Paradox explainer, Traction details, founder bios, CTA) stays in real DOM text elements, never baked into the SVGs as flattened images.

---

## 10. Open Questions / Risks to Resolve Before Building

- **Is the Pi-1–Pi-10 node graph screenshot from a real, currently-running topology/monitoring tool?** If yes, the stronger move is echoing or embedding that tool's real output rather than hand-illustrating a static recreation — real infrastructure evidence beats a lookalike.
- Confirm final copy for "The Paradox" section is locked before build starts
- Decide whether founder photos/bios are ready, or whether that section ships as a placeholder initially
- Confirm hosting/domain target (lurniqhub.tech point to this, or a subdomain during build?)
