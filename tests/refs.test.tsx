import { describe, it, expect } from "vitest";
import { render, act } from "@testing-library/react";
import { createRef } from "react";
import { Button } from "../src/components/Button";
import { Input } from "../src/components/Input";
import { Textarea } from "../src/components/Textarea";
import { Select } from "../src/components/Select";
import { Checkbox } from "../src/components/Checkbox";
import { RadioGroup, RadioGroupItem } from "../src/components/RadioGroup";
import { Box } from "../src/components/Box";

describe("ref forwarding", () => {
  describe("object refs (createRef)", () => {
    it("Button ref.current is HTMLButtonElement", () => {
      const ref = createRef<HTMLButtonElement>();
      render(<Button ref={ref}>Click</Button>);
      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });

    it("Input ref.current is HTMLInputElement", () => {
      const ref = createRef<HTMLInputElement>();
      render(<Input ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
    });

    it("Textarea ref.current is HTMLTextAreaElement", () => {
      const ref = createRef<HTMLTextAreaElement>();
      render(<Textarea ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
    });

    it("Select ref.current is HTMLSelectElement", () => {
      const ref = createRef<HTMLSelectElement>();
      render(<Select ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLSelectElement);
    });

    it("Checkbox ref.current is HTMLInputElement", () => {
      const ref = createRef<HTMLInputElement>();
      render(<Checkbox ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
    });

    it("RadioGroupItem ref.current is HTMLInputElement", () => {
      const ref = createRef<HTMLInputElement>();
      render(
        <RadioGroup name="group">
          <RadioGroupItem value="a" ref={ref} />
        </RadioGroup>
      );
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
    });

    it("Box ref.current is HTMLDivElement", () => {
      const ref = createRef<HTMLDivElement>();
      render(<Box ref={ref}>Content</Box>);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe("polymorphic ref type follows the as prop", () => {
    it("Button as='a' ref.current is HTMLAnchorElement", () => {
      const ref = createRef<HTMLAnchorElement>();
      render(
        <Button as="a" href="#" ref={ref as any}>
          Link
        </Button>
      );
      expect(ref.current).toBeInstanceOf(HTMLAnchorElement);
    });

    it("Box as='section' ref.current is HTMLElement (section)", () => {
      const ref = createRef<HTMLElement>();
      render(<Box as="section" ref={ref as any}>Content</Box>);
      expect(ref.current?.tagName).toBe("SECTION");
    });
  });

  describe("callback refs", () => {
    it("Button callback ref is called with the DOM element on mount", () => {
      let captured: HTMLButtonElement | null = null;
      render(<Button ref={(el) => { captured = el; }}>Click</Button>);
      expect(captured).toBeInstanceOf(HTMLButtonElement);
    });

    it("Input callback ref is called with HTMLInputElement on mount", () => {
      let captured: HTMLInputElement | null = null;
      render(<Input ref={(el) => { captured = el; }} />);
      expect(captured).toBeInstanceOf(HTMLInputElement);
    });

    it("callback ref is called with null on unmount", () => {
      let captured: HTMLButtonElement | null = null;
      const { unmount } = render(
        <Button ref={(el) => { captured = el; }}>Click</Button>
      );
      expect(captured).toBeInstanceOf(HTMLButtonElement);
      act(() => unmount());
      expect(captured).toBeNull();
    });
  });
});
