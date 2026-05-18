// Build-time config for the precompiled stylesheet (dist/styles.css).
// Consumers using their own Tailwind pipeline should instead apply
// @booga/vtheme/preset directly; this file exists only to emit the
// zero-config stylesheet for non-Tailwind consumers.
import vtheme from "@booga/vtheme/preset";

export default {
  presets: [vtheme],
  content: ["./src/**/*.{ts,tsx}"],
};
