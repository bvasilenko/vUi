// SPDX-License-Identifier: MIT
// Copyright (c) 2026 bvasilenko
import { type ElementType } from "react";
import { cva, type VariantProps } from "../utils/cva";
import { cn } from "../utils/cn";
import {
  createPolymorphicComponent,
  type PolymorphicProps,
} from "../utils/polymorphic";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1.5 text-xs font-semibold uppercase tracking-wide transition-colors",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground",
        secondary: "border-transparent bg-secondary text-secondary-foreground",
        destructive: "border-transparent bg-destructive text-destructive-foreground",
        outline: "text-foreground",
      },
      tone: {
        ok: "border-tone-ok-fg/25 bg-tone-ok-soft text-tone-ok-fg",
        warn: "border-tone-warn-fg/25 bg-tone-warn-soft text-tone-warn-fg",
        bad: "border-tone-bad-fg/25 bg-tone-bad-soft text-tone-bad-fg",
        info: "border-tone-info-fg/25 bg-tone-info-soft text-tone-info-fg",
        meta: "border-tone-meta-fg/25 bg-tone-meta-soft text-tone-meta-fg",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

type BadgeOwnProps = VariantProps<typeof badgeVariants>;

export const Badge = createPolymorphicComponent<"span", BadgeOwnProps>(
  ({ as: Tag = "span", asChild: _asChild, variant, tone, className, children, ...rest }) => (
    <Tag className={cn(badgeVariants({ variant, tone }), className)} {...rest}>
      {children}
    </Tag>
  )
);

Badge.displayName = "Badge";

export { badgeVariants };

export type BadgeProps<E extends ElementType = "span"> = PolymorphicProps<
  E,
  BadgeOwnProps
>;
