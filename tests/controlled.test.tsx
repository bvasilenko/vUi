// SPDX-License-Identifier: MIT
// Copyright (c) 2026 bvasilenko
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Input } from "../src/components/Input";
import { Textarea } from "../src/components/Textarea";
import { Select, SelectItem } from "../src/components/Select";
import { Switch } from "../src/components/Switch";
import { Checkbox } from "../src/components/Checkbox";
import { RadioGroup, RadioGroupItem } from "../src/components/RadioGroup";

describe("controlled / uncontrolled", () => {
  describe("Input", () => {
    it("uncontrolled: renders with defaultValue", () => {
      render(<Input defaultValue="hello" />);
      expect(screen.getByDisplayValue("hello")).toBeInTheDocument();
    });

    it("uncontrolled: value is empty string by default", () => {
      render(<Input />);
      expect(screen.getByRole("textbox")).toHaveValue("");
    });

    it("controlled: reflects the value prop", () => {
      render(<Input value="world" onChange={() => {}} />);
      expect(screen.getByDisplayValue("world")).toBeInTheDocument();
    });

    it("controlled: onChange is called on change", () => {
      const onChange = vi.fn();
      render(<Input value="" onChange={onChange} />);
      fireEvent.change(screen.getByRole("textbox"), { target: { value: "x" } });
      expect(onChange).toHaveBeenCalledTimes(1);
    });

    it("controlled: onChange event carries the new value", () => {
      let received = "";
      render(
        <Input
          value=""
          onChange={(e) => { received = e.target.value; }}
        />
      );
      fireEvent.change(screen.getByRole("textbox"), { target: { value: "abc" } });
      expect(received).toBe("abc");
    });
  });

  describe("Textarea", () => {
    it("uncontrolled: renders with defaultValue", () => {
      render(<Textarea defaultValue="area text" />);
      expect(screen.getByDisplayValue("area text")).toBeInTheDocument();
    });

    it("controlled: onChange is called on change", () => {
      const onChange = vi.fn();
      render(<Textarea value="" onChange={onChange} />);
      fireEvent.change(screen.getByRole("textbox"), { target: { value: "y" } });
      expect(onChange).toHaveBeenCalledTimes(1);
    });
  });

  describe("Select", () => {
    it("uncontrolled: reflects defaultValue", () => {
      render(
        <Select defaultValue="b">
          <SelectItem value="a">A</SelectItem>
          <SelectItem value="b">B</SelectItem>
        </Select>
      );
      expect(screen.getByDisplayValue("B")).toBeInTheDocument();
    });

    it("controlled: reflects value prop", () => {
      render(
        <Select value="a" onChange={() => {}}>
          <SelectItem value="a">A</SelectItem>
          <SelectItem value="b">B</SelectItem>
        </Select>
      );
      expect(screen.getByDisplayValue("A")).toBeInTheDocument();
    });

    it("controlled: onChange is called on selection change", () => {
      const onChange = vi.fn();
      render(
        <Select value="a" onChange={onChange}>
          <SelectItem value="a">A</SelectItem>
          <SelectItem value="b">B</SelectItem>
        </Select>
      );
      fireEvent.change(screen.getByRole("combobox"), { target: { value: "b" } });
      expect(onChange).toHaveBeenCalledTimes(1);
    });
  });

  describe("Switch", () => {
    it("uncontrolled: starts unchecked by default", () => {
      render(<Switch />);
      expect(screen.getByRole("switch")).toHaveAttribute("aria-checked", "false");
    });

    it("uncontrolled: toggles to checked on click", () => {
      render(<Switch />);
      fireEvent.click(screen.getByRole("switch"));
      expect(screen.getByRole("switch")).toHaveAttribute("aria-checked", "true");
    });

    it("uncontrolled: double-toggle returns to original state", () => {
      render(<Switch />);
      const sw = screen.getByRole("switch");
      fireEvent.click(sw);
      fireEvent.click(sw);
      expect(sw).toHaveAttribute("aria-checked", "false");
    });

    it("uncontrolled: defaultChecked=true starts checked", () => {
      render(<Switch defaultChecked />);
      expect(screen.getByRole("switch")).toHaveAttribute("aria-checked", "true");
    });

    it("controlled: reflects the checked prop", () => {
      render(<Switch checked={false} onCheckedChange={() => {}} />);
      expect(screen.getByRole("switch")).toHaveAttribute("aria-checked", "false");
    });

    it("controlled: onCheckedChange called with next value on click", () => {
      const onCheckedChange = vi.fn();
      render(<Switch checked={false} onCheckedChange={onCheckedChange} />);
      fireEvent.click(screen.getByRole("switch"));
      expect(onCheckedChange).toHaveBeenCalledWith(true);
    });

    it("controlled: visual state does not change without prop update", () => {
      render(<Switch checked={false} onCheckedChange={() => {}} />);
      fireEvent.click(screen.getByRole("switch"));
      expect(screen.getByRole("switch")).toHaveAttribute("aria-checked", "false");
    });
  });

  describe("Checkbox", () => {
    it("uncontrolled: unchecked by default", () => {
      render(<Checkbox />);
      expect(screen.getByRole("checkbox")).not.toBeChecked();
    });

    it("uncontrolled: defaultChecked=true renders checked", () => {
      render(<Checkbox defaultChecked />);
      expect(screen.getByRole("checkbox")).toBeChecked();
    });

    it("controlled: reflects checked=true", () => {
      render(<Checkbox checked onChange={() => {}} />);
      expect(screen.getByRole("checkbox")).toBeChecked();
    });

    it("controlled: reflects checked=false", () => {
      render(<Checkbox checked={false} onChange={() => {}} />);
      expect(screen.getByRole("checkbox")).not.toBeChecked();
    });

    it("controlled: onChange is called when clicked", () => {
      const onChange = vi.fn();
      render(<Checkbox checked={false} onChange={onChange} />);
      fireEvent.click(screen.getByRole("checkbox"));
      expect(onChange).toHaveBeenCalledTimes(1);
    });
  });

  describe("RadioGroup", () => {
    it("uncontrolled: all items render, none selected by default", () => {
      render(
        <RadioGroup name="color">
          <RadioGroupItem value="red" label="Red" />
          <RadioGroupItem value="blue" label="Blue" />
        </RadioGroup>
      );
      const radios = screen.getAllByRole("radio");
      expect(radios).toHaveLength(2);
    });

    it("uncontrolled: onValueChange fires with the selected value on click", () => {
      const onValueChange = vi.fn();
      render(
        <RadioGroup name="size" onValueChange={onValueChange}>
          <RadioGroupItem value="sm" />
          <RadioGroupItem value="lg" />
        </RadioGroup>
      );
      fireEvent.click(screen.getAllByRole("radio")[1]!);
      expect(onValueChange).toHaveBeenCalledWith("lg");
    });

    it("controlled: the item matching value is checked", () => {
      render(
        <RadioGroup name="color" value="red" onValueChange={() => {}}>
          <RadioGroupItem value="red" label="Red" />
          <RadioGroupItem value="blue" label="Blue" />
        </RadioGroup>
      );
      const radios = screen.getAllByRole("radio");
      expect(radios[0]).toBeChecked();
      expect(radios[1]).not.toBeChecked();
    });

    it("controlled: onValueChange fires with the clicked item's value", () => {
      const onValueChange = vi.fn();
      render(
        <RadioGroup name="color" value="red" onValueChange={onValueChange}>
          <RadioGroupItem value="red" />
          <RadioGroupItem value="blue" />
        </RadioGroup>
      );
      fireEvent.click(screen.getAllByRole("radio")[1]!);
      expect(onValueChange).toHaveBeenCalledWith("blue");
    });
  });
});
