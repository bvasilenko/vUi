// SPDX-License-Identifier: MIT
// Copyright (c) 2026 bvasilenko
import {
  forwardRef,
  useState,
  type ButtonHTMLAttributes,
} from "react";
import { cn } from "../utils/cn";

export type SwitchProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "role"> & {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
};

export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
  (
    {
      checked: controlledChecked,
      defaultChecked = false,
      onCheckedChange,
      className,
      disabled,
      ...rest
    },
    ref
  ) => {
    const [internalChecked, setInternalChecked] = useState(defaultChecked);

    const isControlled = controlledChecked !== undefined;
    const checked = isControlled ? controlledChecked : internalChecked;

    const toggle = () => {
      if (disabled) return;
      const next = !checked;
      if (!isControlled) setInternalChecked(next);
      onCheckedChange?.(next);
    };

    return (
      <button
        type="button"
        role="switch"
        ref={ref}
        aria-checked={checked}
        disabled={disabled}
        onClick={toggle}
        className={cn(
          "inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          checked ? "bg-primary" : "bg-input",
          className
        )}
        {...rest}
      >
        <span
          className={cn(
            "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform",
            checked ? "translate-x-5" : "translate-x-0"
          )}
        />
      </button>
    );
  }
);

Switch.displayName = "Switch";
