// SPDX-License-Identifier: MIT
// Copyright (c) 2026 bvasilenko
//
// Lead  - opening paragraph with constrained measure, mirrors the proposal-html
// `.lead` recipe:
//   font-size: 16.5px; line-height: 1.62;
//   color: brand-ink-2; max-width: 820px;
//
// Token-driven via @booga/vtheme: `text-muted-foreground` resolves to ink-2.
// The 820px measure is expressed as `max-w-[52ch]` (52ch at 16.5px ~= 820px).
import { type ElementType } from "react";
import { cn } from "../utils/cn";
import {
  createPolymorphicComponent,
  type PolymorphicProps,
} from "../utils/polymorphic";

export const Lead = createPolymorphicComponent<"p">(
  ({ as: Tag = "p", asChild: _asChild, className, children, ...rest }) => (
    <Tag
      data-semantic-kind="lead"
      className={cn(
        "vkind-lead text-lg leading-relaxed text-muted-foreground max-w-[52ch]",
        className
      )}
      {...rest}
    >
      {children}
    </Tag>
  )
);

Lead.displayName = "Lead";

export type LeadProps<E extends ElementType = "p"> = PolymorphicProps<E>;
