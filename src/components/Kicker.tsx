// SPDX-License-Identifier: MIT
// Copyright (c) 2026 bvasilenko
//
// Kicker  - pill-style section-overhead label, mirrors the proposal-html
// `.kicker` recipe:
//   display: inline-block; font-size: 11px; font-weight: 600;
//   letter-spacing: 0.14em; text-transform: uppercase;
//   padding: 6px 14px; border-radius: 1000px;
//   color: brand-ink-2; background: brand-surface;
//
// Token-driven via @booga/vtheme (`bg-secondary` / `text-secondary-foreground`
// resolve to the proposal's surface + ink-2 pair). Accepts `tone` to swap
// the surface pair for the semantic ok/warn/bad/info/meta tone-soft fills.
import { type ElementType } from "react";
import { cn } from "../utils/cn";
import {
  createPolymorphicComponent,
  type PolymorphicProps,
} from "../utils/polymorphic";

type Tone = "ok" | "warn" | "bad" | "info" | "meta";

const toneClassMap: Record<Tone, string> = {
  ok: "bg-tone-ok-soft text-tone-ok-fg",
  warn: "bg-tone-warn-soft text-tone-warn-fg",
  bad: "bg-tone-bad-soft text-tone-bad-fg",
  info: "bg-tone-info-soft text-tone-info-fg",
  meta: "bg-tone-meta-soft text-tone-meta-fg",
};

type KickerOwnProps = { tone?: Tone };

export const Kicker = createPolymorphicComponent<"span", KickerOwnProps>(
  ({ as: Tag = "span", asChild: _asChild, tone, className, children, ...rest }) => (
    <Tag
      data-semantic-kind="kicker"
      className={cn(
        "vkind-kicker inline-block rounded-full px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-wide",
        tone ? toneClassMap[tone] : "bg-secondary text-secondary-foreground",
        className
      )}
      {...rest}
    >
      {children}
    </Tag>
  )
);

Kicker.displayName = "Kicker";

export type KickerProps<E extends ElementType = "span"> = PolymorphicProps<
  E,
  KickerOwnProps
>;
