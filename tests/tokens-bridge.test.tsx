import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Button } from "../src/components/Button";

describe("vTheme token bridge", () => {
  it("Button default variant className contains vTheme CSS variable reference", () => {
    render(<Button>Save</Button>);
    const el = screen.getByRole("button");
    const cls = el.className;
    expect(cls).toContain("v-color-accent");
  });

  it("token reference survives additional className merging", () => {
    render(<Button className="mt-4">Save</Button>);
    const cls = screen.getByRole("button").className;
    expect(cls).toContain("v-color-accent");
    expect(cls).toContain("mt-4");
  });

  it("non-default variant does not carry the accent token class", () => {
    render(<Button variant="secondary">Secondary</Button>);
    const cls = screen.getByRole("button").className;
    expect(cls).not.toContain("v-color-accent");
  });
});
