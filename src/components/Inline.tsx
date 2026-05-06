// SPDX-License-Identifier: MIT
// Copyright (c) 2026 bvasilenko
import { type ElementType } from "react";
import { cn } from "../utils/cn";
import {
  createPolymorphicComponent,
  type PolymorphicProps,
} from "../utils/polymorphic";

type InlineOwnProps = {
  align?: "start" | "center" | "end" | "baseline" | "stretch";
  justify?: "start" | "center" | "end" | "between" | "around";
  wrap?: boolean;
};

const alignMap: Record<NonNullable<InlineOwnProps["align"]>, string> = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  baseline: "items-baseline",
  stretch: "items-stretch",
};

const justifyMap: Record<NonNullable<InlineOwnProps["justify"]>, string> = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
  around: "justify-around",
};

export const Inline = createPolymorphicComponent<"div", InlineOwnProps>(
  ({ as: Tag = "div", align, justify, wrap = false, className, children, ...rest }) => (
    <Tag
      className={cn(
        "flex flex-row",
        align && alignMap[align],
        justify && justifyMap[justify],
        wrap && "flex-wrap",
        className
      )}
      {...rest}
    >
      {children}
    </Tag>
  )
);

Inline.displayName = "Inline";

export type InlineProps<E extends ElementType = "div"> = PolymorphicProps<
  E,
  InlineOwnProps
>;
