// SPDX-License-Identifier: MIT
// Copyright (c) 2026 bvasilenko
import {
  createContext,
  useContext,
  useState,
  type ImgHTMLAttributes,
  type HTMLAttributes,
  type ElementType,
} from "react";
import { cn } from "../utils/cn";
import {
  createPolymorphicComponent,
  type PolymorphicProps,
} from "../utils/polymorphic";

type AvatarContextValue = {
  imageStatus: "idle" | "loaded" | "error";
  setImageStatus: (s: "idle" | "loaded" | "error") => void;
};

const AvatarContext = createContext<AvatarContextValue | null>(null);

function useAvatarContext(): AvatarContextValue {
  const ctx = useContext(AvatarContext);
  if (!ctx) throw new Error("Avatar sub-components must be used within <Avatar>");
  return ctx;
}

export type AvatarProps<E extends ElementType = "span"> = PolymorphicProps<E>;

export const Avatar = createPolymorphicComponent<"span">(
  ({ as: Tag = "span", asChild: _asChild, className, children, ...rest }) => {
    const [imageStatus, setImageStatus] = useState<"idle" | "loaded" | "error">(
      "idle"
    );
    return (
      <AvatarContext.Provider value={{ imageStatus, setImageStatus }}>
        <Tag
          className={cn(
            "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
            className
          )}
          {...rest}
        >
          {children}
        </Tag>
      </AvatarContext.Provider>
    );
  }
);

Avatar.displayName = "Avatar";

type AvatarImageProps = ImgHTMLAttributes<HTMLImageElement>;

export function AvatarImage({ className, onLoad, onError, ...rest }: AvatarImageProps) {
  const { setImageStatus } = useAvatarContext();
  return (
    <img
      className={cn("aspect-square h-full w-full object-cover", className)}
      onLoad={(e) => {
        setImageStatus("loaded");
        onLoad?.(e);
      }}
      onError={(e) => {
        setImageStatus("error");
        onError?.(e);
      }}
      {...rest}
    />
  );
}

type AvatarFallbackProps = HTMLAttributes<HTMLSpanElement>;

export function AvatarFallback({ className, children, ...rest }: AvatarFallbackProps) {
  const { imageStatus } = useAvatarContext();
  if (imageStatus === "loaded") return null;
  return (
    <span
      className={cn(
        "flex h-full w-full items-center justify-center rounded-full bg-muted text-sm font-medium",
        className
      )}
      {...rest}
    >
      {children}
    </span>
  );
}
