// SPDX-License-Identifier: MIT
// Copyright (c) 2026 bvasilenko
import { type ElementType, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils/cn";
import {
  createPolymorphicComponent,
  type PolymorphicProps,
} from "../utils/polymorphic";

export const Card = createPolymorphicComponent<"article">(
  ({ as: Tag = "article", asChild: _asChild, className, children, ...rest }) => (
    <Tag
      className={cn(
        "rounded-lg border bg-card text-card-foreground shadow-sm",
        className
      )}
      {...rest}
    >
      {children}
    </Tag>
  )
);

Card.displayName = "Card";

export const CardHeader = createPolymorphicComponent<"div">(
  ({ as: Tag = "div", asChild: _asChild, className, children, ...rest }) => (
    <Tag className={cn("flex flex-col space-y-1.5 p-6", className)} {...rest}>
      {children}
    </Tag>
  )
);

CardHeader.displayName = "CardHeader";

export const CardTitle = createPolymorphicComponent<"h3">(
  ({ as: Tag = "h3", asChild: _asChild, className, children, ...rest }) => (
    <Tag
      className={cn("text-2xl font-semibold leading-none tracking-tight", className)}
      {...rest}
    >
      {children}
    </Tag>
  )
);

CardTitle.displayName = "CardTitle";

type CardDescriptionProps = HTMLAttributes<HTMLParagraphElement> & {
  children?: ReactNode;
};

export function CardDescription({ className, children, ...rest }: CardDescriptionProps) {
  return (
    <p className={cn("text-sm text-muted-foreground", className)} {...rest}>
      {children}
    </p>
  );
}

export const CardContent = createPolymorphicComponent<"div">(
  ({ as: Tag = "div", asChild: _asChild, className, children, ...rest }) => (
    <Tag className={cn("p-6 pt-0", className)} {...rest}>
      {children}
    </Tag>
  )
);

CardContent.displayName = "CardContent";

export const CardFooter = createPolymorphicComponent<"div">(
  ({ as: Tag = "div", asChild: _asChild, className, children, ...rest }) => (
    <Tag className={cn("flex items-center p-6 pt-0", className)} {...rest}>
      {children}
    </Tag>
  )
);

CardFooter.displayName = "CardFooter";

export type CardProps<E extends ElementType = "article"> = PolymorphicProps<E>;
