// Build-time config for the precompiled stylesheet (dist/styles.css).
// Consumers using their own Tailwind pipeline should instead apply
// @booga/vtheme/preset directly; this file exists only to emit the
// zero-config stylesheet for non-Tailwind consumers.
import vtheme from "@booga/vtheme/preset";
import { dslSafelist } from "@booga/vdsl";

export default {
  presets: [vtheme],
  content: ["./src/**/*.{ts,tsx}"],
  // Pin the vDsl DSL utility classes into the precompiled bundle so primitives
  // accepting `tone` / `typeface` / `tracking` / `semanticKind` props resolve
  // without consumer-side Tailwind scanning.
  safelist: [...dslSafelist],
};
