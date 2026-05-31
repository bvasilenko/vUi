// SPDX-License-Identifier: MIT
// Copyright (c) 2026 bvasilenko
//
// Eyebrow  - small caps section-lede label, mirrors the proposal-html
// `.eyebrow` recipe:
//   font-size: 12px; font-weight: 600;
//   letter-spacing: 0.14em; text-transform: uppercase;
//   color: brand-accent; (no background, no padding)
//
// Token-driven via @booga/vtheme: `text-primary` resolves to the proposal's
// brand-accent. Accepts `tone` to swap the accent color for the semantic
// ok/warn/bad/info/meta tone foreground.
import { type ElementType } from "react";
import { cn } from "../utils/cn";
import {
  createPolymorphicComponent,
  type PolymorphicProps,
} from "../utils/polymorphic";

type Tone = "ok" | "warn" | "bad" | "info" | "meta";

const toneTextMap: Record<Tone, string> = {
  ok: "text-tone-ok-fg",
  warn: "text-tone-warn-fg",
  bad: "text-tone-bad-fg",
  info: "text-tone-info-fg",
  meta: "text-tone-meta-fg",
};

type EyebrowOwnProps = { tone?: Tone };

export const Eyebrow = createPolymorphicComponent<"p", EyebrowOwnProps>(
  ({ as: Tag = "p", asChild: _asChild, tone, className, children, ...rest }) => (
    <Tag
      data-semantic-kind="eyebrow"
      className={cn(
        "vkind-eyebrow text-xs font-semibold uppercase tracking-wide",
        tone ? toneTextMap[tone] : "text-primary",
        className
      )}
      {...rest}
    >
      {children}
    </Tag>
  )
);

Eyebrow.displayName = "Eyebrow";

export type EyebrowProps<E extends ElementType = "p"> = PolymorphicProps<
  E,
  EyebrowOwnProps
>;
