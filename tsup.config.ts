// SPDX-License-Identifier: MIT
// Copyright (c) 2026 bvasilenko
import { defineConfig } from "tsup";

const componentNames = [
  "Avatar",
  "Badge",
  "Box",
  "Button",
  "Card",
  "Checkbox",
  "Dialog",
  "Eyebrow",
  "Grid",
  "Icon",
  "Inline",
  "Input",
  "Kicker",
  "Label",
  "Lead",
  "Pill",
  "Popover",
  "RadioGroup",
  "Select",
  "Separator",
  "Sheet",
  "Slot",
  "Stack",
  "Switch",
  "Textarea",
  "Tooltip",
];

const componentEntries = Object.fromEntries(
  componentNames.map((name) => [
    `components/${name}`,
    `src/components/${name}.tsx`,
  ])
);

export default defineConfig({
  entry: {
    index: "src/index.ts",
    "utils/cn": "src/utils/cn.ts",
    "utils/cva": "src/utils/cva.ts",
    "utils/polymorphic": "src/utils/polymorphic.ts",
    ...componentEntries,
  },
  format: ["esm", "cjs"],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  treeshake: true,
  external: ["react", "react-dom", "react/jsx-runtime"],
});
