// SPDX-License-Identifier: MIT
// Copyright (c) 2026 bvasilenko
import {
  createContext,
  useContext,
  useState,
  useId,
  type HTMLAttributes,
  type ElementType,
} from "react";
import { cn } from "../utils/cn";
import {
  createPolymorphicComponent,
  type PolymorphicProps,
} from "../utils/polymorphic";

type TooltipContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
  contentId: string;
};

const TooltipContext = createContext<TooltipContextValue | null>(null);

function useTooltipContext(): TooltipContextValue {
  const ctx = useContext(TooltipContext);
  if (!ctx) throw new Error("Tooltip sub-components must be used within <Tooltip>");
  return ctx;
}

type TooltipOwnProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export type TooltipProps<E extends ElementType = "span"> = PolymorphicProps<
  E,
  TooltipOwnProps
>;

export const Tooltip = createPolymorphicComponent<"span", TooltipOwnProps>(
  ({ as: Tag = "span", asChild: _asChild, open: controlledOpen, onOpenChange, className, children, ...rest }) => {
    const [internalOpen, setInternalOpen] = useState(false);
    const contentId = useId();
    const isControlled = controlledOpen !== undefined;
    const open = isControlled ? controlledOpen : internalOpen;

    const setOpen = (next: boolean) => {
      if (!isControlled) setInternalOpen(next);
      onOpenChange?.(next);
    };

    return (
      <TooltipContext.Provider value={{ open, setOpen, contentId }}>
        <Tag className={cn("relative inline-flex", className)} {...rest}>
          {children}
        </Tag>
      </TooltipContext.Provider>
    );
  }
);

Tooltip.displayName = "Tooltip";

export type TooltipTriggerProps = HTMLAttributes<HTMLSpanElement>;

export function TooltipTrigger({ className, children, ...rest }: TooltipTriggerProps) {
  const { setOpen, contentId } = useTooltipContext();
  return (
    <span
      aria-describedby={contentId}
      className={cn("inline-flex", className)}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      {...rest}
    >
      {children}
    </span>
  );
}

export type TooltipContentProps = HTMLAttributes<HTMLDivElement>;

export function TooltipContent({ className, children, ...rest }: TooltipContentProps) {
  const { open, contentId } = useTooltipContext();
  if (!open) return null;
  return (
    <div
      id={contentId}
      role="tooltip"
      className={cn(
        "absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 rounded-md bg-popover px-3 py-1.5 text-xs text-popover-foreground shadow-md",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
