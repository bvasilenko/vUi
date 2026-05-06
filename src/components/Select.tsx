// SPDX-License-Identifier: MIT
// Copyright (c) 2026 bvasilenko
import {
  forwardRef,
  type OptionHTMLAttributes,
  type SelectHTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "../utils/cn";

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement>;

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, ...rest }, ref) => (
    <select
      ref={ref}
      className={cn(
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...rest}
    >
      {children}
    </select>
  )
);

Select.displayName = "Select";

export type SelectItemProps = OptionHTMLAttributes<HTMLOptionElement> & {
  children?: ReactNode;
};

export function SelectItem({ children, ...rest }: SelectItemProps) {
  return <option {...rest}>{children}</option>;
}
