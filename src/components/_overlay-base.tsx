// SPDX-License-Identifier: MIT
// Copyright (c) 2026 bvasilenko
import {
  createContext,
  useContext,
  useState,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type JSX,
  type ReactNode,
} from "react";
import { cn } from "../utils/cn";

type FnWithDisplayName<P> = ((props: P) => JSX.Element | null) & {
  displayName?: string;
};

export type OverlayContextValue = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function createOverlayContext() {
  const Ctx = createContext<OverlayContextValue | null>(null);

  function useOverlayContext(): OverlayContextValue {
    const ctx = useContext(Ctx);
    if (!ctx) throw new Error("Overlay sub-component used outside its Root");
    return ctx;
  }

  return { Ctx, useOverlayContext };
}

export type OverlayRootProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: ReactNode;
};

export function buildOverlayRoot(
  Ctx: ReturnType<typeof createOverlayContext>["Ctx"]
): FnWithDisplayName<OverlayRootProps> {
  function OverlayRoot({ open: controlledOpen, onOpenChange, children }: OverlayRootProps) {
    const [internalOpen, setInternalOpen] = useState(false);
    const isControlled = controlledOpen !== undefined;
    const open = isControlled ? controlledOpen : internalOpen;

    const handleOpenChange = (next: boolean) => {
      if (!isControlled) setInternalOpen(next);
      onOpenChange?.(next);
    };

    return (
      <Ctx.Provider value={{ open, onOpenChange: handleOpenChange }}>
        {children}
      </Ctx.Provider>
    );
  }
  return OverlayRoot;
}

export function buildOverlayTrigger(
  useOverlayContext: ReturnType<typeof createOverlayContext>["useOverlayContext"]
): FnWithDisplayName<ButtonHTMLAttributes<HTMLButtonElement>> {
  function OverlayTrigger({
    className,
    children,
    onClick,
    ...rest
  }: ButtonHTMLAttributes<HTMLButtonElement>) {
    const { onOpenChange } = useOverlayContext();
    return (
      <button
        type="button"
        className={cn("inline-flex items-center justify-center", className)}
        onClick={(e) => {
          onOpenChange(true);
          onClick?.(e);
        }}
        {...rest}
      >
        {children}
      </button>
    );
  }
  return OverlayTrigger;
}

export type OverlayContentProps = HTMLAttributes<HTMLDivElement> & {
  "aria-label"?: string;
  "aria-labelledby"?: string;
};

type OverlayContentDefaultProps = Pick<HTMLAttributes<HTMLDivElement>, "role"> & {
  "aria-modal"?: boolean | "true" | "false";
  className?: string;
};

export function buildOverlayContent(
  useOverlayContext: ReturnType<typeof createOverlayContext>["useOverlayContext"],
  defaultContentProps: OverlayContentDefaultProps
): FnWithDisplayName<OverlayContentProps> {
  function OverlayContent({
    className,
    children,
    role = defaultContentProps.role,
    "aria-modal": ariaModal = defaultContentProps["aria-modal"],
    ...rest
  }: OverlayContentProps) {
    const { open } = useOverlayContext();
    if (!open) return null;
    return (
      <div
        role={role}
        aria-modal={ariaModal as boolean | undefined}
        className={cn(defaultContentProps.className, className)}
        {...rest}
      >
        {children}
      </div>
    );
  }
  return OverlayContent;
}

export function buildOverlayClose(
  useOverlayContext: ReturnType<typeof createOverlayContext>["useOverlayContext"]
): FnWithDisplayName<ButtonHTMLAttributes<HTMLButtonElement>> {
  function OverlayClose({
    className,
    children,
    onClick,
    ...rest
  }: ButtonHTMLAttributes<HTMLButtonElement>) {
    const { onOpenChange } = useOverlayContext();
    return (
      <button
        type="button"
        aria-label="Close"
        className={cn("inline-flex items-center justify-center", className)}
        onClick={(e) => {
          onOpenChange(false);
          onClick?.(e);
        }}
        {...rest}
      >
        {children}
      </button>
    );
  }
  return OverlayClose;
}
