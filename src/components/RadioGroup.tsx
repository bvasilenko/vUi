// SPDX-License-Identifier: MIT
// Copyright (c) 2026 bvasilenko
import {
  createContext,
  useContext,
  useState,
  type InputHTMLAttributes,
  type ElementType,
  type ReactNode,
  forwardRef,
} from "react";
import { cn } from "../utils/cn";
import {
  createPolymorphicComponent,
  type PolymorphicProps,
} from "../utils/polymorphic";

type RadioGroupContextValue = {
  name?: string;
  value?: string;
  onValueChange: (value: string) => void;
};

const RadioGroupContext = createContext<RadioGroupContextValue>({
  onValueChange: () => {},
});

function useRadioGroupContext(): RadioGroupContextValue {
  return useContext(RadioGroupContext);
}

type RadioGroupOwnProps = {
  name?: string;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  children?: ReactNode;
};

export type RadioGroupProps<E extends ElementType = "div"> = PolymorphicProps<
  E,
  RadioGroupOwnProps
>;

export const RadioGroup = createPolymorphicComponent<"div", RadioGroupOwnProps>(
  ({
    as: Tag = "div",
    asChild: _asChild,
    name,
    value: controlledValue,
    defaultValue,
    onValueChange,
    className,
    children,
    ...rest
  }) => {
    const [internalValue, setInternalValue] = useState<string | undefined>(
      defaultValue
    );

    const isControlled = controlledValue !== undefined;
    const hasDefaultValue = defaultValue !== undefined;
    const resolvedValue = isControlled
      ? controlledValue
      : hasDefaultValue
        ? internalValue
        : undefined;

    const handleValueChange = (next: string) => {
      if (!isControlled && hasDefaultValue) setInternalValue(next);
      onValueChange?.(next);
    };

    return (
      <RadioGroupContext.Provider
        value={{ name, value: resolvedValue, onValueChange: handleValueChange }}
      >
        <Tag
          role="radiogroup"
          className={cn("flex flex-col gap-2", className)}
          {...rest}
        >
          {children}
        </Tag>
      </RadioGroupContext.Provider>
    );
  }
);

RadioGroup.displayName = "RadioGroup";

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
        onChange={() => onValueChange(value)}
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
