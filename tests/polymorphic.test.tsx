import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Button } from "../src/components/Button";
import { Box } from "../src/components/Box";
import { Card } from "../src/components/Card";
import { Label } from "../src/components/Label";

describe("polymorphic as prop", () => {
  describe("Button", () => {
    it("renders <button> by default", () => {
      render(<Button>Click</Button>);
      expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("renders <a> when as='a'", () => {
      render(<Button as="a" href="/test">Link</Button>);
      const el = screen.getByRole("link");
      expect(el.tagName).toBe("A");
      expect(el).toHaveAttribute("href", "/test");
    });

    it("does not render <button> when as='a'", () => {
      render(<Button as="a" href="/test">Link</Button>);
      expect(screen.queryByRole("button")).toBeNull();
    });

    it("forwards className to the rendered element regardless of tag", () => {
      render(<Button as="a" href="/test" className="extra-class">Link</Button>);
      expect(screen.getByRole("link")).toHaveClass("extra-class");
    });
  });

  describe("Box", () => {
    it("renders <div> by default", () => {
      const { container } = render(<Box>Content</Box>);
      expect(container.firstChild!.nodeName).toBe("DIV");
    });

    it("renders <section> when as='section'", () => {
      const { container } = render(<Box as="section">Content</Box>);
      expect(container.firstChild!.nodeName).toBe("SECTION");
    });

    it("renders <main> when as='main'", () => {
      render(<Box as="main">Content</Box>);
      expect(screen.getByRole("main")).toBeInTheDocument();
    });
  });

  describe("Card", () => {
    it("renders <article> by default", () => {
      const { container } = render(<Card>Content</Card>);
      expect(container.firstChild!.nodeName).toBe("ARTICLE");
    });

    it("renders <div> when as='div'", () => {
      const { container } = render(<Card as="div">Content</Card>);
      expect(container.firstChild!.nodeName).toBe("DIV");
    });
  });

  describe("Label", () => {
    it("renders <label> by default", () => {
      render(<Label>Name</Label>);
      expect(document.querySelector("label")).toBeInTheDocument();
    });

    it("renders <p> when as='p'", () => {
      render(<Label as="p">Name</Label>);
      expect(document.querySelector("p")).toBeInTheDocument();
      expect(document.querySelector("label")).toBeNull();
    });
  });

  describe("DOM attribute hygiene", () => {
    it("the as prop is not rendered as a DOM attribute on the output element", () => {
      render(<Button as="a" href="/test">Link</Button>);
      expect(screen.getByRole("link")).not.toHaveAttribute("as");
    });

    it("the asChild prop is not rendered as a DOM attribute on the output element", () => {
      render(<Button asChild><a href="#">Link</a></Button>);
      expect(screen.getByRole("link")).not.toHaveAttribute("asChild");
    });
  });
});
