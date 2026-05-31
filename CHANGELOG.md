# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.4.0] - 2026-05-31

### Added

- `Kicker` primitive. Polymorphic (default `<span>`), inline-block rounded-full
  pill mirroring the proposal-html `.kicker` recipe (text-[11px] font-semibold
  uppercase tracking-wide, px-3.5 py-1.5, rounded-full, surface fill via
  `bg-secondary`/`text-secondary-foreground` by default). Accepts `tone` prop
  (ok|warn|bad|info|meta) which swaps the surface pair for the matching
  `bg-tone-<t>-soft text-tone-<t>-fg` from vTheme 0.3.0. Emits
  `data-semantic-kind="kicker"` and a `vkind-kicker` class for downstream
  styling hooks.
- `Eyebrow` primitive. Polymorphic (default `<p>`), small-caps section-lede
  matching the proposal-html `.eyebrow` recipe (text-xs font-semibold uppercase
  tracking-wide, default color `text-primary` for the brand-accent reading).
  Accepts `tone` prop. Emits `data-semantic-kind="eyebrow"` and `vkind-eyebrow`.
- `Lead` primitive. Polymorphic (default `<p>`), opening-paragraph treatment
  matching the proposal-html `.lead` recipe (text-lg leading-relaxed
  text-muted-foreground, constrained measure via `max-w-[52ch]`). Emits
  `data-semantic-kind="lead"` and `vkind-lead`.
- `Pill` primitive. Polymorphic (default `<span>`), semantic-tone chip for the
  proposal-html `.meta-row span` / `.pill-client` family. Accepts `tone` prop
  (renders `bg-tone-<t>-soft text-tone-<t>-fg border-tone-<t>-fg/25`) and an
  optional `outlined` prop (drops the soft fill, keeps the tone fg + a
  thicker `/40` border). Emits `data-semantic-kind="engagement-tag"`.
- `Button` `tone` prop (ok|warn|bad|info|meta). When set, the button paints
  with the matching `bg-tone-<t>-bg text-tone-<t>-fg` from vTheme 0.3.0 plus a
  hover step into `bg-tone-<t>-soft`. Stacks with `variant` and `size`.
- `Badge` `tone` prop with the same ok|warn|bad|info|meta vocabulary; emits
  the soft + fg + border triple.
- `Card` `tone` prop with the same vocabulary; emits the tone-bg + tone-fg +
  tone-fg/25 border triple so callout cards can take a semantic wash.

### Changed

- `@booga/vtheme` dependency raised to `^0.3.0` (font-family + letter-spacing
  + 15-role tone palette).
- New `@booga/vdsl` `^0.3.0` dependency. Tailwind config now safelists the
  vDsl class set so primitives accepting `tone` / `typeface` / `tracking` /
  `semanticKind` props resolve in the precompiled `dist/styles.css` without
  any consumer-side Tailwind scanning.
- `Button` default size (`md`) padding retuned to `px-8 py-2.5`, base classes
  now include `font-medium` (was implicit) and `tracking-tight` so headline
  buttons read with the proposal-html tightening. `sm` and `lg` sizes adjusted
  in proportion (`px-4` and `px-10` respectively).
- `Card` default look retuned to match the proposal-html `.card`: `p-6`
  baked into the root (was on header/content/footer), `rounded-lg` retained,
  border lightened to `border-border/60`. `CardHeader` / `CardContent` /
  `CardFooter` drop their own `p-6` so they layer cleanly inside the new
  padded root; `CardHeader` keeps a bottom rhythm via `pb-4`, `CardFooter`
  picks up `pt-4`.
- `CardTitle` now renders in `font-serif font-medium` with `tracking-tight`
  to match the proposal-html `.card h3` Playfair treatment.
- `Badge` default sizing retuned to `px-3 py-1.5 text-xs` plus `uppercase`
  and `tracking-wide` so badges read as proposal-style pills out of the box.
- Precompiled `dist/styles.css` rebuilt against `@booga/vtheme@0.3.0`. The
  bundle now contains all 15 tone utility classes (`bg-tone-*-bg`,
  `text-tone-*-fg`, `bg-tone-*-soft`, plus `/25` and `/40` border alpha
  variants) plus the Inter/Playfair/JetBrains font-family resolution.

### Breaking

- Visual: `Card` no longer carries a default `shadow-sm`. Every site that
  rendered a vUi `Card` now reads flat-bordered instead of shadowed; layout
  unchanged. Consumers who want the old look can pass
  `className="shadow-sm"` (the `cn()` dedup keeps it intact).
- Visual: `Card` now carries `p-6` on the root. The header/content/footer
  sub-components no longer add their own padding; consumers who relied on
  the previous nested `p-6 + p-6 pt-0` density will see slightly tighter
  spacing.
- Visual: `Button` default-size padding moved from `px-4 py-2` to `px-8 py-2.5`.
  Buttons now read wider; consumers can opt back into the old proportions
  via `className="px-4 py-2"`.
- Visual: `Badge` default sizing moved from `px-2.5 py-0.5 text-xs` (no
  uppercase) to `px-3 py-1.5 text-xs uppercase tracking-wide`. Existing
  badge call sites now read as proposal-style pills.

## [0.3.1] - 2026-05-18

### Fixed

- Precompiled `dist/styles.css` was built against a stale `@booga/vtheme@0.2.1`,
  whose type scale used a 1.5 ratio  - `text-2xl` resolved to 3.375rem (54px) and
  `text-sm` to 0.667rem (10.7px). Card titles rendered grotesquely oversized and
  button/badge text was sub-legible for any consumer using the precompiled
  stylesheet. Rebuilt against `@booga/vtheme@0.2.2` (the corrected scale:
  `text-sm` 0.875rem, `text-2xl` 1.5rem). `@booga/vtheme` dependency raised to
  `^0.2.2`.

## [0.3.0] - 2026-05-18

### Added

- Precompiled stylesheet at `@booga/vui/styles.css`  - a zero-config adoption path. A consumer with no Tailwind pipeline applies the components by importing this one file; no preset, no content globs, no Tailwind build required. Consumers who run their own Tailwind should keep using `@booga/vtheme/preset` for live token integration. The stylesheet is built at package-build time against the current `@booga/vtheme`.

### Changed

- `@booga/vtheme` dependency raised to `^0.2.1` (the spacing-coherent contract); 0.2.0 is excluded.

## [0.2.0] - 2026-05-18

### Changed

- Color classes now resolve through `@booga/vtheme@^0.2.0`'s semantic role contract. `Button` (default variant), `Switch`, `Checkbox`, and `RadioGroup` previously hardcoded `var(--v-color-accent)` arbitrary-value classes; they now use the `primary` color role (`bg-primary`, `text-primary-foreground`, `accent-primary`).
- Consumers must apply vTheme's Tailwind preset (`presets: [require("@booga/vtheme/preset")]`) for vUi's classes to resolve. The preset defines every color role and the light/dark variables.
- `@booga/vtheme` dependency raised to `^0.2.0`; `tailwindcss` peer raised to `^3.4.0`.

## [0.1.0] - 2026-05-06

### Added

- `cn` utility: clsx + tailwind-merge class composition
- `cva` re-export: class-variance-authority
- `Polymorphic` type util + `createPolymorphicComponent` factory
- `Slot` re-export from `@radix-ui/react-slot`
- `Button`: polymorphic, CVA variants (default/secondary/destructive/outline/ghost/link), sizes (sm/md/lg/icon), vTheme token bridge
- `Card`, `CardHeader`, `CardTitle`, `CardContent`, `CardFooter`: polymorphic, default `<article>`
- `Input`, `Textarea`: controlled/uncontrolled, ref forwarding
- `Label`: polymorphic
- `Checkbox`, `RadioGroup`, `Switch`, `Select`: controlled/uncontrolled form primitives
- `Sheet`, `Dialog`: compound overlay components, `role="dialog"` + `aria-modal="true"` defaults
- `Popover`, `Tooltip`: compound overlay components
- `Avatar`, `AvatarImage`, `AvatarFallback`: image primitive with fallback
- `Badge`, `Separator`: misc primitives
- `Icon`: lucide-react wrapper
- `Box`, `Stack`, `Inline`, `Grid`: layout primitives

[0.4.0]: https://github.com/bvasilenko/vUi/compare/v0.3.1...v0.4.0
[0.3.0]: https://github.com/bvasilenko/vUi/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/bvasilenko/vUi/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/bvasilenko/vUi/releases/tag/v0.1.0
