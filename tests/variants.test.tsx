// SPDX-License-Identifier: MIT
// Copyright (c) 2026 bvasilenko
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Button, buttonVariants } from "../src/components/Button";
import type { VariantProps } from "../src/utils/cva";

type ButtonVariant = NonNullable<VariantProps<typeof buttonVariants>["variant"]>;
type ButtonSize = NonNullable<VariantProps<typeof buttonVariants>["size"]>;

const VARIANT_ACCENT_CLASSES: Record<ButtonVariant, string> = {
  default: "bg-primary",
  secondary: "bg-secondary",
  destructive: "bg-destructive",
  outline: "border",
  ghost: "hover:bg-accent",
  link: "underline-offset-4",
};

const SIZE_HEIGHT_CLASSES: Record<ButtonSize, string> = {
  sm: "h-9",
  md: "h-10",
  lg: "h-11",
  icon: "h-10",
};

describe("Button variants (buttonVariants fn — no DOM)", () => {
  describe("each variant produces its identifying class", () => {
    (Object.entries(VARIANT_ACCENT_CLASSES) as [ButtonVariant, string][]).forEach(
      ([variant, expectedClass]) => {
        it(`variant="${variant}" → includes "${expectedClass}"`, () => {
          expect(buttonVariants({ variant })).toContain(expectedClass);
        });
      }
    );
  });

  describe("each size produces correct height class", () => {
    (Object.entries(SIZE_HEIGHT_CLASSES) as [ButtonSize, string][]).forEach(
      ([size, height]) => {
        it(`size="${size}" → includes "${height}"`, () => {
          expect(buttonVariants({ size })).toContain(height);
        });
      }
    );
  });

  it("icon size also includes w-10 (square)", () => {
    expect(buttonVariants({ size: "icon" })).toContain("w-10");
  });

  it("default variant and size are applied when not specified", () => {
    const cls = buttonVariants({});
    expect(cls).toContain("bg-primary");
    expect(cls).toContain("h-10");
  });

  it("base classes are always present regardless of variant", () => {
    const base = "inline-flex items-center";
    (Object.keys(VARIANT_ACCENT_CLASSES) as ButtonVariant[]).forEach((variant) => {
      expect(buttonVariants({ variant })).toContain("inline-flex");
      expect(buttonVariants({ variant })).toContain("items-center");
    });
    void base;
  });
});

describe("Button variants (rendered)", () => {
  it("destructive + sm renders both variant and size classes", () => {
    render(<Button variant="destructive" size="sm">Delete</Button>);
    const el = screen.getByRole("button");
    expect(el).toHaveClass("bg-destructive");
    expect(el).toHaveClass("h-9");
  });

  it("user className is appended after variant classes", () => {
    render(<Button className="mt-4">Extra</Button>);
    expect(screen.getByRole("button")).toHaveClass("mt-4");
  });

  it("user className wins over conflicting variant padding class (cn dedup)", () => {
    render(<Button size="md" className="px-2">Narrow</Button>);
    const cls = screen.getByRole("button").className;
    expect(cls).toContain("px-2");
    expect(cls).not.toContain("px-4");
  });

  it("user className override does not remove unrelated variant classes", () => {
    render(<Button variant="destructive" className="px-2">Delete narrow</Button>);
    const el = screen.getByRole("button");
    expect(el).toHaveClass("bg-destructive");
    expect(el).toHaveClass("px-2");
  });
});
