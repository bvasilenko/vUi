// SPDX-License-Identifier: MIT
// Copyright (c) 2026 bvasilenko
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Home } from "lucide-react";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  Badge,
  Box,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Grid,
  Icon,
  Inline,
  Label,
  Select,
  SelectItem,
  Separator,
  Slot,
  Stack,
} from "../src/components/index";

describe("Avatar", () => {
  it("renders wrapper and shows fallback while image is not loaded", () => {
    render(
      <Avatar>
        <AvatarImage src="https://example.com/img.png" alt="User" />
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>
    );
    expect(screen.getByText("AB")).toBeInTheDocument();
  });

  it("fallback hides after image load event", () => {
    render(
      <Avatar>
        <AvatarImage src="https://example.com/img.png" alt="User" />
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>
    );
    fireEvent.load(screen.getByRole("img"));
    expect(screen.queryByText("AB")).toBeNull();
  });

  it("fallback stays visible after image error event", () => {
    render(
      <Avatar>
        <AvatarImage src="broken.png" alt="User" />
        <AvatarFallback>ER</AvatarFallback>
      </Avatar>
    );
    fireEvent.error(screen.getByRole("img"));
    expect(screen.getByText("ER")).toBeInTheDocument();
  });

  it("AvatarFallback throws when rendered outside Avatar", () => {
    expect(() => render(<AvatarFallback>FB</AvatarFallback>)).toThrow();
  });

  it("AvatarImage throws when rendered outside Avatar", () => {
    expect(() => render(<AvatarImage src="x.png" alt="x" />)).toThrow();
  });
});

describe("Badge", () => {
  it("renders content as default variant", () => {
    render(<Badge>New</Badge>);
    expect(screen.getByText("New")).toBeInTheDocument();
  });

  it("secondary variant renders content", () => {
    render(<Badge variant="secondary">Tag</Badge>);
    expect(screen.getByText("Tag")).toBeInTheDocument();
  });

  it("destructive variant renders content", () => {
    render(<Badge variant="destructive">Error</Badge>);
    expect(screen.getByText("Error")).toBeInTheDocument();
  });

  it("outline variant renders content", () => {
    render(<Badge variant="outline">Draft</Badge>);
    expect(screen.getByText("Draft")).toBeInTheDocument();
  });
});

describe("Box", () => {
  it("applies flex class when display=flex", () => {
    const { container } = render(<Box display="flex">X</Box>);
    expect(container.firstChild).toHaveClass("flex");
  });

  it("applies grid class when display=grid", () => {
    const { container } = render(<Box display="grid">X</Box>);
    expect(container.firstChild).toHaveClass("grid");
  });

  it("applies no display class when display is not specified", () => {
    const { container } = render(<Box>X</Box>);
    expect(container.firstChild).not.toHaveClass("flex");
    expect(container.firstChild).not.toHaveClass("grid");
  });
});

describe("Stack", () => {
  it("renders flex-col layout by default", () => {
    const { container } = render(<Stack>X</Stack>);
    expect(container.firstChild).toHaveClass("flex-col");
  });

  it("align=center adds items-center", () => {
    const { container } = render(<Stack align="center">X</Stack>);
    expect(container.firstChild).toHaveClass("items-center");
  });

  it("justify=between adds justify-between", () => {
    const { container } = render(<Stack justify="between">X</Stack>);
    expect(container.firstChild).toHaveClass("justify-between");
  });

  it("align and justify compose independently", () => {
    const { container } = render(<Stack align="end" justify="around">X</Stack>);
    expect(container.firstChild).toHaveClass("items-end");
    expect(container.firstChild).toHaveClass("justify-around");
  });
});

describe("Inline", () => {
  it("renders flex-row layout by default", () => {
    const { container } = render(<Inline>X</Inline>);
    expect(container.firstChild).toHaveClass("flex-row");
  });

  it("wrap=true adds flex-wrap", () => {
    const { container } = render(<Inline wrap>X</Inline>);
    expect(container.firstChild).toHaveClass("flex-wrap");
  });

  it("wrap=false (default) does not add flex-wrap", () => {
    const { container } = render(<Inline>X</Inline>);
    expect(container.firstChild).not.toHaveClass("flex-wrap");
  });
});

describe("Grid", () => {
  it("renders grid container by default", () => {
    const { container } = render(<Grid>X</Grid>);
    expect(container.firstChild).toHaveClass("grid");
  });

  it("columns=3 adds grid-cols-3", () => {
    const { container } = render(<Grid columns={3}>X</Grid>);
    expect(container.firstChild).toHaveClass("grid-cols-3");
  });

  it("columns=6 adds grid-cols-6", () => {
    const { container } = render(<Grid columns={6}>X</Grid>);
    expect(container.firstChild).toHaveClass("grid-cols-6");
  });
});

describe("Card", () => {
  it("renders full compound structure with all sub-components", () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Title</CardTitle>
          <CardDescription>Description</CardDescription>
        </CardHeader>
        <CardContent>Body</CardContent>
        <CardFooter>Footer</CardFooter>
      </Card>
    );
    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Description")).toBeInTheDocument();
    expect(screen.getByText("Body")).toBeInTheDocument();
    expect(screen.getByText("Footer")).toBeInTheDocument();
  });

  it("root renders as <article>", () => {
    const { container } = render(<Card>Content</Card>);
    expect(container.firstChild!.nodeName).toBe("ARTICLE");
  });
});

describe("Label", () => {
  it("renders text content", () => {
    render(<Label htmlFor="field">Name</Label>);
    expect(screen.getByText("Name")).toBeInTheDocument();
  });
});

describe("Separator", () => {
  it("horizontal by default: has h-px class", () => {
    const { container } = render(<Separator />);
    expect(container.firstChild).toHaveClass("h-px");
  });

  it("vertical orientation: has w-px class", () => {
    const { container } = render(<Separator orientation="vertical" />);
    expect(container.firstChild).toHaveClass("w-px");
  });


});

describe("Icon", () => {
  it("renders an SVG element", () => {
    const { container } = render(<Icon icon={Home} aria-label="Home" />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("aria-hidden=true when no aria-label is provided", () => {
    const { container } = render(<Icon icon={Home} />);
    expect(container.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
  });

  it("aria-hidden is not present when aria-label is provided", () => {
    const { container } = render(<Icon icon={Home} aria-label="Home icon" />);
    expect(container.querySelector("svg")).not.toHaveAttribute("aria-hidden", "true");
  });
});

describe("Slot", () => {
  it("merges className onto the child element", () => {
    render(
      <Slot className="extra">
        <button>Click</button>
      </Slot>
    );
    expect(screen.getByRole("button")).toHaveClass("extra");
  });

  it("preserves the child's own className alongside merged className", () => {
    render(
      <Slot className="extra">
        <button className="original">Click</button>
      </Slot>
    );
    const btn = screen.getByRole("button");
    expect(btn).toHaveClass("extra");
    expect(btn).toHaveClass("original");
  });
});

describe("Select", () => {
  it("renders a combobox with option children", () => {
    render(
      <Select>
        <SelectItem value="a">Apple</SelectItem>
        <SelectItem value="b">Banana</SelectItem>
      </Select>
    );
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("SelectItem renders an option element", () => {
    render(
      <Select>
        <SelectItem value="x">Item X</SelectItem>
      </Select>
    );
    expect(screen.getByRole("option", { name: "Item X" })).toBeInTheDocument();
  });
});
