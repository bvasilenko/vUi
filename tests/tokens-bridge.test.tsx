// SPDX-License-Identifier: MIT
// Copyright (c) 2026 bvasilenko
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Button } from "../src/components/Button";

describe("vTheme token bridge", () => {
  it("Button default variant uses the vTheme `primary` color role", () => {
    render(<Button>Save</Button>);
    const cls = screen.getByRole("button").className;
    expect(cls).toContain("bg-primary");
    expect(cls).toContain("text-primary-foreground");
  });

  it("role classes survive additional className merging", () => {
    render(<Button className="mt-4">Save</Button>);
    const cls = screen.getByRole("button").className;
    expect(cls).toContain("bg-primary");
    expect(cls).toContain("mt-4");
  });

  it("non-default variant does not carry the primary role class", () => {
    render(<Button variant="secondary">Secondary</Button>);
    const cls = screen.getByRole("button").className;
    expect(cls).not.toContain("bg-primary");
    expect(cls).toContain("bg-secondary");
  });
});
