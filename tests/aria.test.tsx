// SPDX-License-Identifier: MIT
// Copyright (c) 2026 bvasilenko
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Sheet, SheetTrigger, SheetContent, SheetClose } from "../src/components/Sheet";
import { Dialog, DialogTrigger, DialogContent } from "../src/components/Dialog";
import { Popover, PopoverTrigger, PopoverContent, PopoverClose } from "../src/components/Popover";
import { Tooltip, TooltipTrigger, TooltipContent } from "../src/components/Tooltip";
import { Switch } from "../src/components/Switch";
import { RadioGroup, RadioGroupItem } from "../src/components/RadioGroup";
import { Checkbox } from "../src/components/Checkbox";
import { Button } from "../src/components/Button";

describe("ARIA attribute overrides", () => {
  it("Button role is overridable", () => {
    render(<Button role="link">Click</Button>);
    expect(screen.getByRole("link")).toBeInTheDocument();
    expect(screen.queryByRole("button")).toBeNull();
  });

  it("Button aria-label is forwarded to DOM", () => {
    render(<Button aria-label="Submit form">Submit</Button>);
    expect(screen.getByRole("button", { name: "Submit form" })).toBeInTheDocument();
  });

  it("RadioGroup has role=radiogroup", () => {
    render(
      <RadioGroup name="test">
        <RadioGroupItem value="a" />
      </RadioGroup>
    );
    expect(screen.getByRole("radiogroup")).toBeInTheDocument();
  });
});

describe("Tooltip ARIA", () => {
  it("trigger has aria-describedby matching content id", () => {
    render(
      <Tooltip>
        <TooltipTrigger>Label</TooltipTrigger>
        <TooltipContent>Hint text</TooltipContent>
      </Tooltip>
    );
    fireEvent.mouseEnter(screen.getByText("Label"));
    const trigger = screen.getByText("Label").closest("span")!;
    const tooltip = screen.getByRole("tooltip");
    const describedById = trigger.getAttribute("aria-describedby");
    expect(describedById).toBeTruthy();
    expect(tooltip.id).toBe(describedById);
  });

  it("tooltip content is hidden when not open", () => {
    render(
      <Tooltip>
        <TooltipTrigger>Label</TooltipTrigger>
        <TooltipContent>Hidden hint</TooltipContent>
      </Tooltip>
    );
    expect(screen.queryByRole("tooltip")).toBeNull();
  });

  it("tooltip opens on mouseenter and closes on mouseleave", () => {
    render(
      <Tooltip>
        <TooltipTrigger>Hover me</TooltipTrigger>
        <TooltipContent>Tip</TooltipContent>
      </Tooltip>
    );
    const trigger = screen.getByText("Hover me");
    fireEvent.mouseEnter(trigger);
    expect(screen.getByRole("tooltip")).toBeInTheDocument();
    fireEvent.mouseLeave(trigger);
    expect(screen.queryByRole("tooltip")).toBeNull();
  });

  it("tooltip opens on focus and closes on blur", () => {
    render(
      <Tooltip>
        <TooltipTrigger>Focusable</TooltipTrigger>
        <TooltipContent>Tip</TooltipContent>
      </Tooltip>
    );
    const trigger = screen.getByText("Focusable");
    fireEvent.focus(trigger);
    expect(screen.getByRole("tooltip")).toBeInTheDocument();
    fireEvent.blur(trigger);
    expect(screen.queryByRole("tooltip")).toBeNull();
  });

  it("controlled tooltip: open=true shows content", () => {
    render(
      <Tooltip open>
        <TooltipTrigger>Label</TooltipTrigger>
        <TooltipContent>Forced open</TooltipContent>
      </Tooltip>
    );
    expect(screen.getByRole("tooltip")).toBeInTheDocument();
  });

  it("controlled tooltip: onOpenChange fires on mouseenter", () => {
    const onOpenChange = vi.fn();
    render(
      <Tooltip open={false} onOpenChange={onOpenChange}>
        <TooltipTrigger>Label</TooltipTrigger>
        <TooltipContent>Tip</TooltipContent>
      </Tooltip>
    );
    fireEvent.mouseEnter(screen.getByText("Label"));
    expect(onOpenChange).toHaveBeenCalledWith(true);
  });
});

describe("Switch disabled state", () => {
  it("disabled switch does not toggle on click", () => {
    render(<Switch disabled />);
    const sw = screen.getByRole("switch");
    fireEvent.click(sw);
    expect(sw).toHaveAttribute("aria-checked", "false");
  });

  it("disabled switch has disabled attribute", () => {
    render(<Switch disabled />);
    expect(screen.getByRole("switch")).toBeDisabled();
  });
});

describe("Checkbox indeterminate state", () => {
  it("indeterminate=true sets aria-checked=mixed", () => {
    render(<Checkbox indeterminate />);
    expect(screen.getByRole("checkbox")).toHaveAttribute("aria-checked", "mixed");
  });

  it("indeterminate=false (default) does not set aria-checked=mixed", () => {
    render(<Checkbox />);
    expect(screen.getByRole("checkbox")).not.toHaveAttribute("aria-checked", "mixed");
  });
});

describe("Overlay open/close interactions", () => {
  describe("Sheet", () => {
    it("content is hidden by default", () => {
      render(
        <Sheet>
          <SheetTrigger>Open</SheetTrigger>
          <SheetContent>Panel</SheetContent>
        </Sheet>
      );
      expect(screen.queryByRole("dialog")).toBeNull();
    });

    it("content appears after trigger click", () => {
      render(
        <Sheet>
          <SheetTrigger>Open</SheetTrigger>
          <SheetContent>Panel</SheetContent>
        </Sheet>
      );
      fireEvent.click(screen.getByText("Open"));
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });

    it("content hides after close button click", () => {
      render(
        <Sheet>
          <SheetTrigger>Open</SheetTrigger>
          <SheetContent>
            Panel
            <SheetClose>Close</SheetClose>
          </SheetContent>
        </Sheet>
      );
      fireEvent.click(screen.getByText("Open"));
      expect(screen.getByRole("dialog")).toBeInTheDocument();
      fireEvent.click(screen.getByText("Close"));
      expect(screen.queryByRole("dialog")).toBeNull();
    });

    it("content has aria-modal=true", () => {
      render(
        <Sheet>
          <SheetTrigger>Open</SheetTrigger>
          <SheetContent>Panel</SheetContent>
        </Sheet>
      );
      fireEvent.click(screen.getByText("Open"));
      expect(screen.getByRole("dialog")).toHaveAttribute("aria-modal", "true");
    });
  });

  describe("Dialog", () => {
    it("content appears after trigger click", () => {
      render(
        <Dialog>
          <DialogTrigger>Open Dialog</DialogTrigger>
          <DialogContent>Body</DialogContent>
        </Dialog>
      );
      fireEvent.click(screen.getByText("Open Dialog"));
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });
  });

  describe("Popover", () => {
    it("content appears after trigger click", () => {
      render(
        <Popover>
          <PopoverTrigger>Open Popover</PopoverTrigger>
          <PopoverContent>Popover body</PopoverContent>
        </Popover>
      );
      fireEvent.click(screen.getByText("Open Popover"));
      expect(screen.queryByRole("dialog")).toBeInTheDocument();
    });

    it("close button hides content", () => {
      render(
        <Popover>
          <PopoverTrigger>Open</PopoverTrigger>
          <PopoverContent>
            Content
            <PopoverClose>Close</PopoverClose>
          </PopoverContent>
        </Popover>
      );
      fireEvent.click(screen.getByText("Open"));
      fireEvent.click(screen.getByText("Close"));
      expect(screen.queryByRole("dialog")).toBeNull();
    });
  });

  describe("controlled overlay", () => {
    it("does not update state on trigger click when controlled", () => {
      const onOpenChange = vi.fn();
      render(
        <Sheet open={false} onOpenChange={onOpenChange}>
          <SheetTrigger>Open</SheetTrigger>
          <SheetContent>Panel</SheetContent>
        </Sheet>
      );
      fireEvent.click(screen.getByText("Open"));
      expect(screen.queryByRole("dialog")).toBeNull();
      expect(onOpenChange).toHaveBeenCalledWith(true);
    });
  });
});
