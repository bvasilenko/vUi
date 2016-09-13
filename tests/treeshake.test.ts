// @vitest-environment node
import { describe, it, expect } from "vitest";
import { build, type BuildOptions } from "esbuild";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

const SHARED_EXTERNALS: string[] = [
  "react",
  "react/jsx-runtime",
  "react-dom",
  "@radix-ui/react-slot",
  "lucide-react",
  "@booga/vtheme",
  "class-variance-authority",
  "clsx",
  "tailwind-merge",
];

async function bundleComponent(name: string): Promise<string> {
  const result = await build({
    entryPoints: [resolve(__dirname, `../src/components/${name}.tsx`)],
    bundle: true,
    write: false,
    format: "esm",
    jsx: "automatic",
    external: SHARED_EXTERNALS,
  } satisfies BuildOptions);
  return result.outputFiles[0]?.text ?? "";
}

describe("tree-shaking: component bundles are isolated", () => {
  describe("Button bundle", () => {
    it("does not contain Sheet-specific overlay code", async () => {
      const output = await bundleComponent("Button");
      expect(output).not.toContain("aria-modal");
      expect(output).not.toContain("buildOverlayRoot");
    }, 30_000);

    it("does not contain Icon-specific lucide wrapper code", async () => {
      const output = await bundleComponent("Button");
      expect(output).not.toContain("strokeWidth");
    }, 30_000);

    it("is under 5KB unminified (size budget)", async () => {
      const output = await bundleComponent("Button");
      expect(output.length).toBeLessThan(5000);
    }, 30_000);
  });

  describe("Sheet bundle", () => {
    it("DOES contain overlay-specific code (positive integrity check)", async () => {
      const output = await bundleComponent("Sheet");
      expect(output).toContain("aria-modal");
      expect(output).toContain("dialog");
    }, 30_000);
  });

  describe("Icon bundle", () => {
    it("does not contain overlay code", async () => {
      const output = await bundleComponent("Icon");
      expect(output).not.toContain("aria-modal");
      expect(output).not.toContain("buildOverlayRoot");
    }, 30_000);
  });
});
