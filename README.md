# vUi

Polymorphic React primitives. CVA variants, `cn()` class dedup, token bridge to vTheme. Semantic HTML defaults, ARIA inline, ref forwarding  - no theme provider, no runtime config.

## Install

```sh
npm install @booga/vui
```

Peer deps: `react ^18`, `react-dom ^18`, `tailwindcss ^3.4`.

## Theme setup

vUi's components emit Tailwind color-role classes (`bg-primary`, `border-input`, …). Those roles are defined by `@booga/vtheme`. Apply its preset so they resolve:

```js
// tailwind.config.js
import vtheme from "@booga/vtheme/preset";

export default {
  presets: [vtheme],
  content: [
    "./src/**/*.{ts,tsx}",
    "./node_modules/@booga/vui/dist/**/*.js",
  ],
};
```

Without the preset the role classes compile to nothing  - components render unstyled.

## Usage

```tsx
import { Button, Card, CardContent, Input, cn } from "@booga/vui";

<Button variant="default" size="md">Save</Button>
<Button as="a" href="/docs">Docs</Button>
<Button asChild><a href="/docs">Docs</a></Button>

<Card>
  <CardContent>
    <Input defaultValue="hello" />
  </CardContent>
</Card>

cn("p-2", "p-4") // → "p-4"
```

## Polymorphic `as` prop

Every component accepts `as` to change the rendered element. TypeScript narrows props to the target element type.

```tsx
<Button as="a" href="/home">Link button</Button>
// → <a href="/home" class="...button classes...">Link button</a>
```

## `asChild` / Slot composition

`asChild` delegates rendering to the immediate child, merging classes and props.

```tsx
<Button asChild>
  <a href="/home">Link</a>
</Button>
// → <a href="/home" class="...button classes...">Link</a>
```

## Variants (Button)

`variant`: `default` | `secondary` | `destructive` | `outline` | `ghost` | `link`  
`size`: `sm` | `md` | `lg` | `icon`  
`tone`: `ok` | `warn` | `bad` | `info` | `meta` (paints with vTheme tone tokens)

## Proposal-vocabulary primitives

`Kicker`, `Eyebrow`, `Lead`, `Pill` carry the proposal-style typography and
density vocabulary inherited from vTheme 0.3.0. Each forwards refs, is
polymorphic via `as`, and accepts `tone` where semantic palette applies.

```tsx
import { Kicker, Eyebrow, Lead, Pill } from "@booga/vui";

<Kicker tone="info">Phase 1</Kicker>
<Eyebrow>Section overhead</Eyebrow>
<Lead>Opening paragraph with constrained measure.</Lead>
<Pill tone="ok">Client</Pill>
<Pill tone="warn" outlined>Heads up</Pill>
```

`Badge` and `Card` also accept the `tone` prop for semantic surfaces.

## Token bridge

Button's default variant references `--v-color-accent` from vTheme CSS variables. Set tokens at `:root` via `cssVars(tokens)` from `@booga/vtheme`.

## Layout primitives

`Box`, `Stack`, `Inline`, `Grid`  - flex/grid wrappers, polymorphic, extend via `className`.

## Overlay components

`Sheet`, `Dialog`, `Popover`, `Tooltip`  - compound components with ARIA defaults. Enhanced by `vAria` when installed.

```tsx
<Sheet open={open} onOpenChange={setOpen}>
  <SheetTrigger>Open</SheetTrigger>
  <SheetContent aria-label="Panel">...</SheetContent>
</Sheet>
```

## Contributing

Contributions follow the [Contributor Covenant 2.1](https://www.contributor-covenant.org/version/2/1/code_of_conduct/).

## License

MIT © 2026 bvasilenko
