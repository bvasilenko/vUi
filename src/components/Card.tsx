// SPDX-License-Identifier: MIT
// Copyright (c) 2026 bvasilenko
import { type ElementType, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils/cn";
import {
  createPolymorphicComponent,
  type PolymorphicProps,
} from "../utils/polymorphic";

type Tone = "ok" | "warn" | "bad" | "info" | "meta";

const toneClassMap: Record<Tone, string> = {
  ok: "bg-tone-ok-bg text-tone-ok-fg border-tone-ok-fg/25",
  warn: "bg-tone-warn-bg text-tone-warn-fg border-tone-warn-fg/25",
  bad: "bg-tone-bad-bg text-tone-bad-fg border-tone-bad-fg/25",
  info: "bg-tone-info-bg text-tone-info-fg border-tone-info-fg/25",
  meta: "bg-tone-meta-bg text-tone-meta-fg border-tone-meta-fg/25",
};

type CardOwnProps = { tone?: Tone };

export const Card = createPolymorphicComponent<"article", CardOwnProps>(
  ({ as: Tag = "article", asChild: _asChild, tone, className, children, ...rest }) => (
    <Tag
      className={cn(
        "rounded-lg border border-border/60 bg-card text-card-foreground p-6",
        tone && toneClassMap[tone],
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
    <Tag className={cn("flex flex-col space-y-1.5 pb-4", className)} {...rest}>
      {children}
    </Tag>
  )
);

CardHeader.displayName = "CardHeader";

export const CardTitle = createPolymorphicComponent<"h3">(
  ({ as: Tag = "h3", asChild: _asChild, className, children, ...rest }) => (
    <Tag
      className={cn("font-serif text-2xl font-medium leading-tight tracking-tight", className)}
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
    <p className={cn("text-sm text-muted-foreground leading-relaxed", className)} {...rest}>
      {children}
    </p>
  );
}

export const CardContent = createPolymorphicComponent<"div">(
  ({ as: Tag = "div", asChild: _asChild, className, children, ...rest }) => (
    <Tag className={cn("pt-0", className)} {...rest}>
      {children}
    </Tag>
  )
);

CardContent.displayName = "CardContent";

export const CardFooter = createPolymorphicComponent<"div">(
  ({ as: Tag = "div", asChild: _asChild, className, children, ...rest }) => (
    <Tag className={cn("flex items-center pt-4", className)} {...rest}>
      {children}
    </Tag>
  )
);

CardFooter.displayName = "CardFooter";

export type CardProps<E extends ElementType = "article"> = PolymorphicProps<
  E,
  CardOwnProps
>;
