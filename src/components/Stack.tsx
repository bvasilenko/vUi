// SPDX-License-Identifier: MIT
// Copyright (c) 2026 bvasilenko
import { type ElementType } from "react";
import { cn } from "../utils/cn";
import {
  createPolymorphicComponent,
  type PolymorphicProps,
} from "../utils/polymorphic";

type StackOwnProps = {
  align?: "start" | "center" | "end" | "stretch";
  justify?: "start" | "center" | "end" | "between" | "around";
};

const alignMap: Record<NonNullable<StackOwnProps["align"]>, string> = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
};

const justifyMap: Record<NonNullable<StackOwnProps["justify"]>, string> = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
  around: "justify-around",
};

export const Stack = createPolymorphicComponent<"div", StackOwnProps>(
  ({ as: Tag = "div", align, justify, className, children, ...rest }) => (
    <Tag
      className={cn(
        "flex flex-col",
        align && alignMap[align],
        justify && justifyMap[justify],
        className
      )}
      {...rest}
    >
      {children}
    </Tag>
  )
);

Stack.displayName = "Stack";

export type StackProps<E extends ElementType = "div"> = PolymorphicProps<
  E,
  StackOwnProps
>;
