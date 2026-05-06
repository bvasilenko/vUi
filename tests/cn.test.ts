// SPDX-License-Identifier: MIT
// Copyright (c) 2026 bvasilenko
import { describe, it, expect } from "vitest";
import { cn } from "../src/utils/cn";

describe("cn", () => {
  describe("Tailwind conflict resolution", () => {
    it("last conflicting class wins (padding shorthand)", () => {
      expect(cn("p-2", "p-4")).toBe("p-4");
    });

    it("last class wins across multiple independent conflict groups", () => {
      expect(cn("p-2 m-1", "p-4 m-2")).toBe("p-4 m-2");
    });

    it("responsive-prefixed classes resolve within their prefix", () => {
      expect(cn("md:p-2", "md:p-4")).toBe("md:p-4");
    });

    it("different responsive prefixes do not conflict with each other", () => {
      expect(cn("sm:p-2", "md:p-4")).toBe("sm:p-2 md:p-4");
    });

    it("modifier-prefixed classes resolve within their modifier", () => {
      expect(cn("hover:text-red-500", "hover:text-blue-500")).toBe("hover:text-blue-500");
    });

    it("modifier-prefixed class does not conflict with base class", () => {
      expect(cn("text-red-500", "hover:text-blue-500")).toBe(
        "text-red-500 hover:text-blue-500"
      );
    });
  });

  describe("non-conflicting passthrough", () => {
    it("non-conflicting classes are all preserved", () => {
      expect(cn("flex", "items-center")).toBe("flex items-center");
    });

    it("empty string inputs are ignored", () => {
      expect(cn("", "flex", "")).toBe("flex");
    });
  });

  describe("input shape handling", () => {
    it("falsy values (undefined, null, false) are silently dropped", () => {
      expect(cn("flex", undefined, null, false, "gap-4")).toBe("flex gap-4");
    });

    it("flat array inputs are spread into the class list", () => {
      expect(cn(["flex", "p-2"], "p-4")).toBe("flex p-4");
    });

    it("nested arrays are flattened", () => {
      expect(cn([["flex", "p-2"]], "p-4")).toBe("flex p-4");
    });

    it("conditional object syntax: true keys are included, false keys are not", () => {
      expect(cn({ "font-bold": true, italic: false })).toBe("font-bold");
    });

    it("returns empty string when called with no arguments", () => {
      expect(cn()).toBe("");
    });

    it("returns empty string when all inputs are falsy", () => {
      expect(cn(undefined, null, false)).toBe("");
    });
  });
});
