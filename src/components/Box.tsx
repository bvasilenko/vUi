// SPDX-License-Identifier: MIT
// Copyright (c) 2026 bvasilenko
import { type ElementType } from "react";
import { cn } from "../utils/cn";
import {
  createPolymorphicComponent,
  type PolymorphicProps,
} from "../utils/polymorphic";

type BoxOwnProps = {
  display?: "block" | "flex" | "grid" | "inline" | "inline-flex" | "inline-grid";
};

const displayMap: Record<NonNullable<BoxOwnProps["display"]>, string> = {
  block: "block",
  flex: "flex",
  grid: "grid",
  inline: "inline",
  "inline-flex": "inline-flex",
  "inline-grid": "inline-grid",
};

export const Box = createPolymorphicComponent<"div", BoxOwnProps>(
  ({ as: Tag = "div", asChild: _asChild, display, className, children, ...rest }) => (
    <Tag
      className={cn(display && displayMap[display], className)}
      {...rest}
    >
      {children}
    </Tag>
  )
);

Box.displayName = "Box";

export type BoxProps<E extends ElementType = "div"> = PolymorphicProps<
  E,
  BoxOwnProps
>;
