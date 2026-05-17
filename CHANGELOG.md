# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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

[0.2.0]: https://github.com/bvasilenko/vUi/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/bvasilenko/vUi/releases/tag/v0.1.0
