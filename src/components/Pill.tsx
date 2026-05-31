// SPDX-License-Identifier: MIT
// Copyright (c) 2026 bvasilenko
//
// Pill  - semantic-tone rounded chip, mirrors the proposal-html
// `.meta-row span` general recipe:
//   font-size: 11px; font-weight: 600;
//   letter-spacing: 0.1em; text-transform: uppercase;
//   padding: 5px 12px; border-radius: 1000px;
// Carries tone-soft fill + tone-fg text + tone-fg/25 border per
// `.pill-client / .pill-meta-a / .pill-meta-b`.
//
// Token-driven via @booga/vtheme tone-* roles. Accepts `tone` (required for
// semantic intent) and `outlined` (drops the soft background, keeps border
// + text, mirroring an inverse pill treatment).
import { type ElementType } from "react";
import { cn } from "../utils/cn";
import {
  createPolymorphicComponent,
  type PolymorphicProps,
} from "../utils/polymorphic";

type Tone = "ok" | "warn" | "bad" | "info" | "meta";

const toneFillMap: Record<Tone, string> = {
  ok: "bg-tone-ok-soft text-tone-ok-fg border-tone-ok-fg/25",
  warn: "bg-tone-warn-soft text-tone-warn-fg border-tone-warn-fg/25",
  bad: "bg-tone-bad-soft text-tone-bad-fg border-tone-bad-fg/25",
  info: "bg-tone-info-soft text-tone-info-fg border-tone-info-fg/25",
  meta: "bg-tone-meta-soft text-tone-meta-fg border-tone-meta-fg/25",
};

const toneOutlinedMap: Record<Tone, string> = {
  ok: "bg-transparent text-tone-ok-fg border-tone-ok-fg/40",
  warn: "bg-transparent text-tone-warn-fg border-tone-warn-fg/40",
  bad: "bg-transparent text-tone-bad-fg border-tone-bad-fg/40",
  info: "bg-transparent text-tone-info-fg border-tone-info-fg/40",
  meta: "bg-transparent text-tone-meta-fg border-tone-meta-fg/40",
};

type PillOwnProps = {
  tone?: Tone;
  outlined?: boolean;
};

export const Pill = createPolymorphicComponent<"span", PillOwnProps>(
  ({
    as: Tag = "span",
    asChild: _asChild,
    tone,
    outlined = false,
    className,
    children,
    ...rest
  }) => (
    <Tag
      data-semantic-kind="engagement-tag"
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-wide",
        tone
          ? (outlined ? toneOutlinedMap[tone] : toneFillMap[tone])
          : "border-border bg-secondary text-secondary-foreground",
        className
      )}
      {...rest}
    >
      {children}
    </Tag>
  )
);

Pill.displayName = "Pill";

export type PillProps<E extends ElementType = "span"> = PolymorphicProps<
  E,
  PillOwnProps
>;
