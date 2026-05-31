// SPDX-License-Identifier: MIT
// Copyright (c) 2026 bvasilenko
//
// Coverage + behavior for the four new proposal-vocabulary primitives plus the
// retuned Button/Card/Badge tone variants. Verifies token-bridge class output
// against the vTheme 0.3.0 + vDsl 0.3.0 contract.
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import {
  Badge,
  Button,
  Card,
  Eyebrow,
  Kicker,
  Lead,
  Pill,
} from "../src/components/index";

describe("Kicker", () => {
  it("renders inline-block pill with vkind-kicker marker", () => {
    render(<Kicker>Phase 1</Kicker>);
    const el = screen.getByText("Phase 1");
    expect(el).toHaveClass("vkind-kicker");
    expect(el).toHaveClass("inline-block");
    expect(el).toHaveClass("rounded-full");
    expect(el).toHaveClass("uppercase");
  });

  it("emits data-semantic-kind=kicker", () => {
    render(<Kicker>Phase 1</Kicker>);
    expect(screen.getByText("Phase 1")).toHaveAttribute(
      "data-semantic-kind",
      "kicker"
    );
  });

  it("default surface is secondary token pair (proposal brand-surface)", () => {
    render(<Kicker>Phase 1</Kicker>);
    const el = screen.getByText("Phase 1");
    expect(el).toHaveClass("bg-secondary");
    expect(el).toHaveClass("text-secondary-foreground");
  });

  it("tone=info swaps the surface for the info tone-soft fill", () => {
    render(<Kicker tone="info">Phase 1</Kicker>);
    const el = screen.getByText("Phase 1");
    expect(el).toHaveClass("bg-tone-info-soft");
    expect(el).toHaveClass("text-tone-info-fg");
    expect(el).not.toHaveClass("bg-secondary");
  });

  it("each tone emits its tone-soft + tone-fg pair", () => {
    const tones = ["ok", "warn", "bad", "info", "meta"] as const;
    tones.forEach((tone) => {
      const { unmount } = render(<Kicker tone={tone}>K-{tone}</Kicker>);
      const el = screen.getByText(`K-${tone}`);
      expect(el).toHaveClass(`bg-tone-${tone}-soft`);
      expect(el).toHaveClass(`text-tone-${tone}-fg`);
      unmount();
    });
  });

  it("polymorphic as prop swaps tag", () => {
    const { container } = render(<Kicker as="div">Phase 1</Kicker>);
    expect(container.firstChild?.nodeName).toBe("DIV");
  });

  it("ref forwards to span element", () => {
    const ref = createRef<HTMLSpanElement>();
    render(<Kicker ref={ref}>Phase 1</Kicker>);
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });

  it("user className wins via cn() dedup", () => {
    render(<Kicker className="bg-red-500">Phase 1</Kicker>);
    const cls = screen.getByText("Phase 1").className;
    expect(cls).toContain("bg-red-500");
    expect(cls).not.toContain("bg-secondary");
  });
});

describe("Eyebrow", () => {
  it("renders as <p> by default with vkind-eyebrow marker", () => {
    const { container } = render(<Eyebrow>Section overhead</Eyebrow>);
    const el = screen.getByText("Section overhead");
    expect(container.firstChild?.nodeName).toBe("P");
    expect(el).toHaveClass("vkind-eyebrow");
  });

  it("default color is text-primary (proposal brand-accent)", () => {
    render(<Eyebrow>Section overhead</Eyebrow>);
    expect(screen.getByText("Section overhead")).toHaveClass("text-primary");
  });

  it("emits data-semantic-kind=eyebrow", () => {
    render(<Eyebrow>Section overhead</Eyebrow>);
    expect(screen.getByText("Section overhead")).toHaveAttribute(
      "data-semantic-kind",
      "eyebrow"
    );
  });

  it("tone=warn swaps the accent color for the warn tone-fg", () => {
    render(<Eyebrow tone="warn">Heads up</Eyebrow>);
    const el = screen.getByText("Heads up");
    expect(el).toHaveClass("text-tone-warn-fg");
    expect(el).not.toHaveClass("text-primary");
  });

  it("each tone emits its tone-fg color", () => {
    const tones = ["ok", "warn", "bad", "info", "meta"] as const;
    tones.forEach((tone) => {
      const { unmount } = render(<Eyebrow tone={tone}>E-{tone}</Eyebrow>);
      expect(screen.getByText(`E-${tone}`)).toHaveClass(`text-tone-${tone}-fg`);
      unmount();
    });
  });

  it("uppercase + small caps classes are applied", () => {
    render(<Eyebrow>Section overhead</Eyebrow>);
    const el = screen.getByText("Section overhead");
    expect(el).toHaveClass("uppercase");
    expect(el).toHaveClass("font-semibold");
  });
});

describe("Lead", () => {
  it("renders as <p> by default with vkind-lead marker", () => {
    const { container } = render(<Lead>Opening paragraph.</Lead>);
    const el = screen.getByText("Opening paragraph.");
    expect(container.firstChild?.nodeName).toBe("P");
    expect(el).toHaveClass("vkind-lead");
  });

  it("emits data-semantic-kind=lead", () => {
    render(<Lead>Opening paragraph.</Lead>);
    expect(screen.getByText("Opening paragraph.")).toHaveAttribute(
      "data-semantic-kind",
      "lead"
    );
  });

  it("applies muted-foreground ink color (proposal brand-ink-2)", () => {
    render(<Lead>Opening paragraph.</Lead>);
    expect(screen.getByText("Opening paragraph.")).toHaveClass(
      "text-muted-foreground"
    );
  });

  it("applies relaxed line-height + constrained measure", () => {
    render(<Lead>Opening paragraph.</Lead>);
    const el = screen.getByText("Opening paragraph.");
    expect(el).toHaveClass("leading-relaxed");
    expect(el.className).toMatch(/max-w-\[52ch\]/);
  });

  it("polymorphic: as=div renders <div>", () => {
    const { container } = render(<Lead as="div">x</Lead>);
    expect(container.firstChild?.nodeName).toBe("DIV");
  });
});

describe("Pill", () => {
  it("renders inline-flex chip without tone defaults to secondary surface", () => {
    render(<Pill>Untagged</Pill>);
    const el = screen.getByText("Untagged");
    expect(el).toHaveClass("inline-flex");
    expect(el).toHaveClass("rounded-full");
    expect(el).toHaveClass("bg-secondary");
  });

  it("emits data-semantic-kind=engagement-tag", () => {
    render(<Pill>Tagged</Pill>);
    expect(screen.getByText("Tagged")).toHaveAttribute(
      "data-semantic-kind",
      "engagement-tag"
    );
  });

  it("tone=ok applies tone-soft fill + tone-fg text + tone-fg/25 border", () => {
    render(<Pill tone="ok">Client</Pill>);
    const el = screen.getByText("Client");
    expect(el).toHaveClass("bg-tone-ok-soft");
    expect(el).toHaveClass("text-tone-ok-fg");
    expect(el.className).toContain("border-tone-ok-fg/25");
  });

  it("each tone emits the soft + fg + border triple", () => {
    const tones = ["ok", "warn", "bad", "info", "meta"] as const;
    tones.forEach((tone) => {
      const { unmount } = render(<Pill tone={tone}>P-{tone}</Pill>);
      const el = screen.getByText(`P-${tone}`);
      expect(el).toHaveClass(`bg-tone-${tone}-soft`);
      expect(el).toHaveClass(`text-tone-${tone}-fg`);
      expect(el.className).toContain(`border-tone-${tone}-fg/25`);
      unmount();
    });
  });

  it("outlined=true drops the soft background and keeps the tone-fg + border", () => {
    render(
      <Pill tone="info" outlined>
        Outline
      </Pill>
    );
    const el = screen.getByText("Outline");
    expect(el).toHaveClass("bg-transparent");
    expect(el).toHaveClass("text-tone-info-fg");
    expect(el.className).toContain("border-tone-info-fg/40");
    expect(el).not.toHaveClass("bg-tone-info-soft");
  });

  it("outlined without tone falls back to default surface (no tone selection)", () => {
    render(<Pill outlined>No tone</Pill>);
    const el = screen.getByText("No tone");
    expect(el).toHaveClass("bg-secondary");
  });
});

describe("Button — tone variant (vUi 0.4.0)", () => {
  it("default size now applies px-8 py-2.5 (proposal proportions)", () => {
    render(<Button>Save</Button>);
    const el = screen.getByRole("button");
    expect(el).toHaveClass("px-8");
    expect(el).toHaveClass("py-2.5");
  });

  it("base classes carry tracking-tight + font-medium", () => {
    render(<Button>Save</Button>);
    const el = screen.getByRole("button");
    expect(el).toHaveClass("tracking-tight");
    expect(el).toHaveClass("font-medium");
  });

  it("tone=info emits the tone bg + fg pair", () => {
    render(<Button tone="info">Info</Button>);
    const el = screen.getByRole("button");
    expect(el).toHaveClass("bg-tone-info-bg");
    expect(el).toHaveClass("text-tone-info-fg");
  });

  it("each tone emits its bg/fg pair", () => {
    const tones = ["ok", "warn", "bad", "info", "meta"] as const;
    tones.forEach((tone) => {
      const { unmount } = render(<Button tone={tone}>B-{tone}</Button>);
      const el = screen.getByRole("button");
      expect(el).toHaveClass(`bg-tone-${tone}-bg`);
      expect(el).toHaveClass(`text-tone-${tone}-fg`);
      unmount();
    });
  });
});

describe("Card — retune (vUi 0.4.0)", () => {
  it("Card root has p-6, rounded-lg, lighter border", () => {
    const { container } = render(<Card>x</Card>);
    const el = container.firstChild as HTMLElement;
    expect(el).toHaveClass("p-6");
    expect(el).toHaveClass("rounded-lg");
    expect(el.className).toContain("border-border/60");
  });

  it("default Card no longer carries shadow-sm", () => {
    const { container } = render(<Card>x</Card>);
    expect(container.firstChild).not.toHaveClass("shadow-sm");
  });

  it("tone=warn applies the tone-bg + tone-fg + tone-fg/25 border", () => {
    const { container } = render(<Card tone="warn">x</Card>);
    const el = container.firstChild as HTMLElement;
    expect(el).toHaveClass("bg-tone-warn-bg");
    expect(el).toHaveClass("text-tone-warn-fg");
    expect(el.className).toContain("border-tone-warn-fg/25");
  });
});

describe("Badge — tone variant + retune (vUi 0.4.0)", () => {
  it("default size now uses px-3 py-1.5 uppercase tracking-wide", () => {
    render(<Badge>Tag</Badge>);
    const el = screen.getByText("Tag");
    expect(el).toHaveClass("px-3");
    expect(el).toHaveClass("py-1.5");
    expect(el).toHaveClass("uppercase");
    expect(el).toHaveClass("tracking-wide");
  });

  it("tone=meta applies the soft + fg + border triple", () => {
    render(<Badge tone="meta">Meta</Badge>);
    const el = screen.getByText("Meta");
    expect(el).toHaveClass("bg-tone-meta-soft");
    expect(el).toHaveClass("text-tone-meta-fg");
    expect(el.className).toContain("border-tone-meta-fg/25");
  });
});
