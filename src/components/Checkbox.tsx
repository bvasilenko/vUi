// SPDX-License-Identifier: MIT
// Copyright (c) 2026 bvasilenko
import {
  forwardRef,
  useEffect,
  useRef,
  type InputHTMLAttributes,
  type MutableRefObject,
} from "react";
import { cn } from "../utils/cn";

export type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  indeterminate?: boolean;
};

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, indeterminate = false, ...rest }, forwardedRef) => {
    const localRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      if (localRef.current) {
        localRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate]);

    return (
      <input
        type="checkbox"
        ref={(el) => {
          (localRef as MutableRefObject<HTMLInputElement | null>).current = el;
          if (typeof forwardedRef === "function") forwardedRef(el);
          else if (forwardedRef)
            (forwardedRef as MutableRefObject<HTMLInputElement | null>).current = el;
        }}
        aria-checked={indeterminate ? "mixed" : undefined}
        className={cn(
          "h-4 w-4 rounded border border-input accent-[var(--v-color-accent)] disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...rest}
      />
    );
  }
);

Checkbox.displayName = "Checkbox";
