// SPDX-License-Identifier: MIT
// Copyright (c) 2026 bvasilenko
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { createRef } from "react";
import { Button } from "../src/components/Button";

describe("Slot / asChild composition", () => {
  describe("element rendering", () => {
    it("asChild renders as the immediate child element, not the default button", () => {
      render(
        <Button asChild>
          <a href="/path">Link</a>
        </Button>
      );
      expect(screen.queryByRole("button")).toBeNull();
      expect(screen.getByRole("link")).toBeInTheDocument();
    });

    it("asChild=false (default) renders the component's default element", () => {
      render(<Button asChild={false}>Normal</Button>);
      expect(screen.getByRole("button")).toBeInTheDocument();
    });
  });

  describe("class merging", () => {
    it("asChild merges parent variant classes onto child element", () => {
      render(
        <Button asChild variant="destructive">
          <a href="/path">Link</a>
        </Button>
      );
      expect(screen.getByRole("link")).toHaveClass("bg-destructive");
    });

    it("asChild preserves the child's own className alongside merged classes", () => {
      render(
        <Button asChild className="mt-4">
          <a href="#" className="text-red-500">Styled</a>
        </Button>
      );
      const el = screen.getByRole("link");
      expect(el).toHaveClass("mt-4");
      expect(el).toHaveClass("text-red-500");
    });

    it("child className is appended after parent's merged classes", () => {
      render(
        <Button asChild className="px-4">
          <a href="#" className="px-8">Wide</a>
        </Button>
      );
      const cls = screen.getByRole("link").className;
      expect(cls).toContain("px-8");
    });
  });

  describe("prop preservation", () => {
    it("asChild preserves the child's href attribute", () => {
      render(
        <Button asChild>
          <a href="/target">Go</a>
        </Button>
      );
      expect(screen.getByRole("link")).toHaveAttribute("href", "/target");
    });

    it("asChild merges onClick from parent with child's own onClick (both fire)", () => {
      const parentClick = vi.fn();
      const childClick = vi.fn();
      render(
        <Button asChild onClick={parentClick}>
          <a href="#" onClick={childClick}>Link</a>
        </Button>
      );
      fireEvent.click(screen.getByRole("link"));
      expect(parentClick).toHaveBeenCalledTimes(1);
      expect(childClick).toHaveBeenCalledTimes(1);
    });
  });

  describe("ref forwarding through asChild", () => {
    it("ref.current is the child DOM element when asChild is used", () => {
      const ref = createRef<HTMLAnchorElement>();
      render(
        <Button asChild ref={ref as any}>
          <a href="#">Link</a>
        </Button>
      );
      expect(ref.current).toBeInstanceOf(HTMLAnchorElement);
    });
  });
});
