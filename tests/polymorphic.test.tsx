// SPDX-License-Identifier: MIT
// Copyright (c) 2026 bvasilenko
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Button } from "../src/components/Button";
import { Badge } from "../src/components/Badge";
import { Box } from "../src/components/Box";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../src/components/Card";
import { Label } from "../src/components/Label";
import { Stack } from "../src/components/Stack";
import { Inline } from "../src/components/Inline";
import { Grid } from "../src/components/Grid";
import { Separator } from "../src/components/Separator";
import { Avatar } from "../src/components/Avatar";
import { RadioGroup } from "../src/components/RadioGroup";
import { Tooltip } from "../src/components/Tooltip";

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

  describe("Avatar", () => {
    it("renders <span> by default", () => {
      const { container } = render(<Avatar />);
      expect(container.firstChild!.nodeName).toBe("SPAN");
    });

    it("renders <div> when as='div'", () => {
      const { container } = render(<Avatar as="div" />);
      expect(container.firstChild!.nodeName).toBe("DIV");
    });
  });

  describe("RadioGroup", () => {
    it("renders <div> by default", () => {
      const { container } = render(<RadioGroup />);
      expect(container.firstChild!.nodeName).toBe("DIV");
    });

    it("renders <fieldset> when as='fieldset'", () => {
      const { container } = render(<RadioGroup as="fieldset" />);
      expect(container.firstChild!.nodeName).toBe("FIELDSET");
    });

    it("retains role=radiogroup regardless of the rendered element", () => {
      const { container } = render(<RadioGroup as="fieldset" />);
      expect(container.firstChild).toHaveAttribute("role", "radiogroup");
    });
  });

  describe("Tooltip", () => {
    it("renders <span> by default", () => {
      const { container } = render(<Tooltip />);
      expect(container.firstChild!.nodeName).toBe("SPAN");
    });

    it("renders <div> when as='div'", () => {
      const { container } = render(<Tooltip as="div" />);
      expect(container.firstChild!.nodeName).toBe("DIV");
    });
  });

  describe("DOM meta-prop hygiene", () => {
    const AS_CASES: Array<[string, () => JSX.Element]> = [
      ["Button", () => <Button as="a" href="#">X</Button>],
      ["Badge", () => <Badge as="div">X</Badge>],
      ["Box", () => <Box as="section">X</Box>],
      ["Card", () => <Card as="div">X</Card>],
      ["CardHeader", () => <Card><CardHeader as="section">X</CardHeader></Card>],
      ["CardTitle", () => <Card><CardTitle as="h2">X</CardTitle></Card>],
      ["CardContent", () => <Card><CardContent as="section">X</CardContent></Card>],
      ["CardFooter", () => <Card><CardFooter as="section">X</CardFooter></Card>],
      ["Label", () => <Label as="p">X</Label>],
      ["Stack", () => <Stack as="section">X</Stack>],
      ["Inline", () => <Inline as="section">X</Inline>],
      ["Grid", () => <Grid as="section">X</Grid>],
      ["Separator", () => <Separator as="div" />],
      ["Avatar", () => <Avatar as="div" />],
      ["RadioGroup", () => <RadioGroup as="fieldset" />],
      ["Tooltip", () => <Tooltip as="div" />],
    ];

    AS_CASES.forEach(([name, renderFn]) => {
      it(`${name}: as prop is not forwarded as a DOM attribute`, () => {
        const { container } = render(renderFn());
        expect(container.firstChild).not.toHaveAttribute("as");
      });
    });

    const ASCHILD_CASES: Array<[string, () => JSX.Element]> = [
      ["Button", () => <Button asChild={false}>X</Button>],
      ["Badge", () => <Badge asChild={false}>X</Badge>],
      ["Box", () => <Box asChild={false}>X</Box>],
      ["Card", () => <Card asChild={false}>X</Card>],
      ["CardHeader", () => <Card><CardHeader asChild={false}>X</CardHeader></Card>],
      ["CardTitle", () => <Card><CardTitle asChild={false}>X</CardTitle></Card>],
      ["CardContent", () => <Card><CardContent asChild={false}>X</CardContent></Card>],
      ["CardFooter", () => <Card><CardFooter asChild={false}>X</CardFooter></Card>],
      ["Label", () => <Label asChild={false}>X</Label>],
      ["Stack", () => <Stack asChild={false}>X</Stack>],
      ["Inline", () => <Inline asChild={false}>X</Inline>],
      ["Grid", () => <Grid asChild={false}>X</Grid>],
      ["Separator", () => <Separator asChild={false} />],
      ["Avatar", () => <Avatar asChild={false} />],
      ["RadioGroup", () => <RadioGroup asChild={false} />],
      ["Tooltip", () => <Tooltip asChild={false} />],
    ];

    ASCHILD_CASES.forEach(([name, renderFn]) => {
      it(`${name}: asChild is consumed by the component and not forwarded to DOM`, () => {
        const spy = vi.spyOn(console, "error").mockImplementation(() => {});
        render(renderFn());
        const msgs = spy.mock.calls.flat().join(" ");
        spy.mockRestore();
        expect(msgs).not.toContain("asChild");
      });
    });
  });
});
