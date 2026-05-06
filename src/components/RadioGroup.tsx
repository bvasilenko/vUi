// SPDX-License-Identifier: MIT
// Copyright (c) 2026 bvasilenko
import {
  createContext,
  useContext,
  type HTMLAttributes,
  type InputHTMLAttributes,
  type ReactNode,
  forwardRef,
} from "react";
import { cn } from "../utils/cn";

type RadioGroupContextValue = {
  name?: string;
  value?: string;
  onValueChange?: (value: string) => void;
};

const RadioGroupContext = createContext<RadioGroupContextValue>({});

function useRadioGroupContext(): RadioGroupContextValue {
  return useContext(RadioGroupContext);
}

export type RadioGroupProps = HTMLAttributes<HTMLDivElement> & {
  name?: string;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  children?: ReactNode;
};

export function RadioGroup({
  name,
  value,
  onValueChange,
  className,
  children,
  ...rest
}: RadioGroupProps) {
  return (
    <RadioGroupContext.Provider value={{ name, value, onValueChange }}>
      <div role="radiogroup" className={cn("flex flex-col gap-2", className)} {...rest}>
        {children}
      </div>
    </RadioGroupContext.Provider>
  );
}

export type RadioGroupItemProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "name" | "checked" | "onChange"
> & {
  value: string;
  label?: string;
};

export const RadioGroupItem = forwardRef<HTMLInputElement, RadioGroupItemProps>(
  ({ value, label, className, ...rest }, ref) => {
    const { name, value: groupValue, onValueChange } = useRadioGroupContext();
    return (
      <input
        type="radio"
        ref={ref}
        name={name}
        value={value}
        checked={groupValue !== undefined ? groupValue === value : undefined}
        onChange={() => onValueChange?.(value)}
        aria-label={label}
        className={cn(
          "h-4 w-4 border border-input accent-[var(--v-color-accent)] disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...rest}
      />
    );
  }
);

RadioGroupItem.displayName = "RadioGroupItem";
